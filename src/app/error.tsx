"use client";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center text-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <h1 className="text-8xl font-bold text-red-500 mb-4">500</h1>
      <h2 className="text-3xl font-bold tracking-tight mb-6">Something went wrong!</h2>
      <p className="text-lg text-foreground/70 max-w-md mx-auto mb-10">
        An unexpected error occurred. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-brand-accent px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-accent/90"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try again
        </button>
        <Link href="/" className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-8 py-3 text-sm font-medium transition-colors hover:bg-border">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
