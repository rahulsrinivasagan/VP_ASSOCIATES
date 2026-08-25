"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white p-4 font-sans">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-neutral-400 text-sm mb-6">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
