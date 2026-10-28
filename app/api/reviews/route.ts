import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    // 1. Verify user authentication (added await)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse the incoming request body
    const body = await req.json();
    const { productId, userName, rating, comment } = body;

    if (!productId || !userName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Save the review to Sanity
    const review = await client.create({
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