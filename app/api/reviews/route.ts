import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

// Create a version of the client that has write permissions
const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // Must be false for mutations
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { productId, userName, rating, comment } = body;

    if (!productId || !userName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use writeClient instead of the default client
    const review = await writeClient.create({
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      userId,
      userName,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}