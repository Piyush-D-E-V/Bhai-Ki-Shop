import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/client";
import { ORDER_BY_STRIPE_PAYMENT_ID_QUERY } from "@/sanity/queries/orders";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-07-29.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");

    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    console.error(
      "Webhook signature verification failed:",
      message
    );

    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  console.log(`Stripe webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        await handleCheckoutCompleted(session);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      `Error processing Stripe event ${event.type}:`,
      error
    );

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  /*
   * Stripe Checkout normally provides payment_intent as a string.
   * We handle all possible values safely.
   */
  const stripePaymentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : null;

  if (!stripePaymentId) {
    throw new Error(
      `No payment_intent found for Checkout Session ${session.id}`
    );
  }

  console.log(
    `Processing Checkout Session ${session.id}`
  );

  console.log(
    `Stripe Payment Intent: ${stripePaymentId}`
  );

  /*
   * Idempotency check.
   *
   * IMPORTANT:
   * Use writeClient instead of the CDN client so we don't
   * accidentally read stale Sanity data.
   */
  const existingOrder = await writeClient.fetch(
    ORDER_BY_STRIPE_PAYMENT_ID_QUERY,
    {
      stripePaymentId,
    }
  );

  if (existingOrder) {
    console.log(
      `Webhook already processed for payment ${stripePaymentId}, skipping`
    );

    return;
  }

  /*
   * Extract metadata that was added when the Checkout Session
   * was created in lib/actions/checkout.ts
   */
  const {
    clerkUserId,
    userEmail,
    sanityCustomerId,
    productIds: productIdsString,
    quantities: quantitiesString,
  } = session.metadata ?? {};

  if (!clerkUserId) {
    throw new Error(
      "Missing clerkUserId in Stripe Checkout Session metadata"
    );
  }

  if (!productIdsString) {
    throw new Error(
      "Missing productIds in Stripe Checkout Session metadata"
    );
  }

  if (!quantitiesString) {
    throw new Error(
      "Missing quantities in Stripe Checkout Session metadata"
    );
  }

  const productIds = productIdsString
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const quantities = quantitiesString
    .split(",")
    .map((quantity) => Number(quantity));

  if (productIds.length === 0) {
    throw new Error("No product IDs found in checkout metadata");
  }

  if (productIds.length !== quantities.length) {
    throw new Error(
      `Product/quantity mismatch. Products: ${productIds.length}, Quantities: ${quantities.length}`
    );
  }

  /*
   * Get the actual Stripe line items.
   */
  const lineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    {
      limit: 100,
    }
  );

  /*
   * Build Sanity order items.
   *
   * IMPORTANT:
   * amount_total is the TOTAL for the line.
   * We divide by quantity so priceAtPurchase stores the
   * per-unit price.
   */
  const orderItems = productIds.map((productId, index) => {
    const quantity = quantities[index];

    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new Error(
        `Invalid quantity for product ${productId}`
      );
    }

    const lineItem = lineItems.data[index];

    if (!lineItem) {
      throw new Error(
        `Missing Stripe line item for product ${productId}`
      );
    }

    const lineTotal = lineItem.amount_total ?? 0;

    const priceAtPurchase =
      quantity > 0
        ? lineTotal / 100 / quantity
        : 0;

    return {
      _key: `item-${index}`,
      product: {
        _type: "reference" as const,
        _ref: productId,
      },
      quantity,
      priceAtPurchase,
    };
  });

  /*
   * Generate a unique order number.
   */
  const orderNumber = `ORD-${Date.now()
    .toString(36)
    .toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase()}`;

  /*
   * Extract shipping address from Stripe.
   */
  const shippingAddress =
    session.customer_details?.address;

  const address = shippingAddress
    ? {
        name:
          session.customer_details?.name ?? "",
        line1:
          shippingAddress.line1 ?? "",
        line2:
          shippingAddress.line2 ?? "",
        city:
          shippingAddress.city ?? "",
        postcode:
          shippingAddress.postal_code ?? "",
        country:
          shippingAddress.country ?? "",
      }
    : undefined;

  /*
   * Create the order in Sanity.
   */
  const orderData = {
    _type: "order" as const,

    orderNumber,

    ...(sanityCustomerId
      ? {
          customer: {
            _type: "reference" as const,
            _ref: sanityCustomerId,
          },
        }
      : {}),

    clerkUserId,

    email:
      userEmail ??
      session.customer_details?.email ??
      "",

    items: orderItems,

    total:
      (session.amount_total ?? 0) / 100,

    status: "paid",

    stripePaymentId,

    ...(address ? { address } : {}),

    createdAt:
      new Date().toISOString(),
  };

  console.log(
    "Creating Sanity order:",
    JSON.stringify(orderData, null, 2)
  );

  const order = await writeClient.create(orderData);

  console.log(
    `Order created successfully: ${order._id} (${orderNumber})`
  );

  /*
   * Decrease product stock after the order has been created.
   */
  const transaction = productIds.reduce(
    (tx, productId, index) => {
      const quantity = quantities[index];

      return tx.patch(productId, (patch) =>
        patch.dec({
          stock: quantity,
        })
      );
    },
    writeClient.transaction()
  );

  await transaction.commit();

  console.log(
    `Stock updated successfully for ${productIds.length} products`
  );
}