import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden py-28 bg-brand-dark">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[450px] w-[600px] rounded-full bg-brand-red/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-surface px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-brand-red mb-6">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>SLA-Backed Digital Engineering</span>
        </div>

        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
          Ready to scale your digital infrastructure in India?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-muted leading-relaxed">
          Book an architecture review with our senior engineering pod. We will audit your current bottlenecks, 
          propose a modular system blueprint, and deliver a transparent sprint timeline within 48 hours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand-red px-8 py-4 text-base font-semibold text-white transition-all hover:bg-brand-redHover shadow-xl shadow-brand-red/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <span>Start a project enquiry</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:+918049602100"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-6 py-4 text-base font-medium text-slate-200 transition-colors hover:border-brand-red/40 hover:text-white"
          >
            <PhoneCall className="h-4 w-4 text-brand-red" />
            <span>+91 80 4960 2100</span>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-subtle font-mono">
          <span>⚡ 2-Hour Response SLA</span>
          <span>•</span>
          <span>🛡️ NDA on Request</span>
          <span>•</span>
          <span>📍 Bengaluru • Mumbai • Delhi NCR</span>
        </div>
      </div>
    </section>
  );
}
