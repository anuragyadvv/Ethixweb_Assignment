"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception caught by Next.js error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center bg-brand-dark px-4 text-center">
      <div className="space-y-4 max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-rose-400 font-semibold block">
          Application Error
        </span>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Something went wrong
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          An unexpected server or client error was encountered while rendering this view.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-semibold text-white hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-6 py-3 text-xs font-medium text-slate-300 hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
