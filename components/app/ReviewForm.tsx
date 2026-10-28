"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId }: { productId: string }) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="p-6 border rounded-lg text-center bg-gray-50 dark:bg-gray-900">
        <p className="mb-3 text-sm font-medium">You must be signed in to leave a review.</p>
        <SignInButton mode="modal">
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm">
            Sign In to Review
          </button>
        </SignInButton>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userName: user.fullName || user.firstName || "Anonymous User",
          rating,
          comment,
        }),
      });

      if (res.ok) {
        setComment("");
        setRating(5);
        router.refresh(); 
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input 
          type="number" 
          min="1" 
          max="5" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-2 w-24 text-black"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)}
          className="border rounded p-2 w-full text-black h-24"
          placeholder="What did you think of this product?"
          maxLength={1000}
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}