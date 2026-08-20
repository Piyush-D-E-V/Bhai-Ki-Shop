"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_IDS_QUERY } from "@/sanity/queries/products";
import { getOrCreateStripeCustomer } from "@/lib/actions/customer";
import { Any } from "next-sanity";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia",
});

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function createCheckoutSession(
  items: CartItem[]
): Promise<CheckoutResult> {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, error: "Please sign in to checkout" };
    }

    if (!items || items.length === 0) {
      return { success: false, error: "Your cart is empty" };
    }

    const productIds = items.map((item) => item.productId);
    const products = await client.fetch(PRODUCT_BY_IDS_QUERY, {
      ids: productIds,
    });

    const validationErrors: string[] = [];
    const validatedItems: {
      product: (typeof products)[number];
      quantity: number;
    }[] = [];

    for (const item of items) {
      const product = products.find(
        (p: { _id: string }) => p._id === item.productId
      );

      if (!product) {
        validationErrors.push(`Product "${item.name}" is no longer available`);
        continue;
      }

      if ((product.stock ?? 0) === 0) {
        validationErrors.push(`"${product.name}" is out of stock`);
        continue;
      }

      if (item.quantity > (product.stock ?? 0)) {
        validationErrors.push(
          `Only ${product.stock} of "${product.name}" available`
        );
        continue;
      }

      validatedItems.push({ product, quantity: item.quantity });
    }

    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(". ") };
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      validatedItems.map(({ product, quantity }) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name ?? "Product",
            // Safely fetch from the images array to bypass type errors
            images: (product.images as Any)?.[0]?.asset?.url ? [(product.images as Any)[0].asset.url] : [],
            metadata: {
              productId: product._id,
            },
          },
          unit_amount: Math.round((product.price ?? 0) * 100),
        },
        quantity,
      }));

    const userEmail = user.emailAddresses[0]?.emailAddress ?? "";
    const userName =
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || userEmail;

    const { stripeCustomerId, sanityCustomerId } =
      await getOrCreateStripeCustomer(userEmail, userName, userId);

    const metadata = {
      clerkUserId: userId,
      userEmail,
      sanityCustomerId,
      productIds: validatedItems.map((i) => i.product._id).join(","),
      quantities: validatedItems.map((i) => i.quantity).join(","),
    };

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["upi","card","amazon_pay"],
      line_items: lineItems,
      customer: stripeCustomerId,
      shipping_address_collection: {
        allowed_countries: [
          "GB", "US", "CA", "AU", "NZ", "IE", "DE", "FR", "ES", "IT", 
          "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "PT", "PL", 
          "CZ", "GR", "HU", "RO", "BG", "HR", "SI", "SK", "LT", "LV", 
          "EE", "LU", "MT", "CY", "JP", "SG", "HK", "KR", "TW", "MY", 
          "TH", "IN", "AE", "SA", "IL", "ZA", "BR", "MX", "AR", "CL", "CO"
        ],
      },
      metadata,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    });

    return { success: true, url: session.url ?? undefined };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    });

    if (session.metadata?.clerkUserId !== userId) {
      return { success: false, error: "Session not found" };
    }

    return {
      success: true,
      session: {
        id: session.id,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status,
        shippingAddress: session.customer_details?.address,
        lineItems: session.line_items?.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          amount: item.amount_total,
        })),
      },
    };
  } catch (error) {
    console.error("Get session error:", error);
    return { success: false, error: "Could not retrieve order details" };
  }
}