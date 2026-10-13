import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center bg-brand-dark px-4 text-center">
      <div className="space-y-4 max-w-md">
        <span className="font-mono text-sm uppercase tracking-widest text-brand-red font-semibold">
          Error 404
        </span>
        <h1 className="text-4xl font-black text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          The requested route does not exist or has been relocated to another endpoint.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-semibold text-white hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-6 py-3 text-xs font-medium text-slate-300 hover:text-white"
          >
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
