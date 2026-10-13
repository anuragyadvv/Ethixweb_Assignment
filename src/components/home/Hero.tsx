import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-ambient-radial border-b border-brand-border/40">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[480px] w-[480px] rounded-full bg-brand-red/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-surface/90 px-4 py-1.5 text-xs font-medium text-slate-200 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand-red" />
              <span>Engineered for India&apos;s High-Growth Enterprise</span>
              <span className="font-mono text-brand-red">v2.0</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              We run the <span className="text-brand-red underline decoration-brand-red/40 decoration-4 underline-offset-8">tech</span>.<br />
              You run the <span className="text-white">business</span>.
            </h1>

            {/* Sub-headline */}
            <p className="max-w-2xl text-lg sm:text-xl font-normal leading-relaxed text-brand-muted">
              We design, build, and operate resilient digital systems for India&apos;s modern brands—from 
              sub-second Next.js commerce and AI customer workflows to unified WhatsApp CRM pipelines 
              and enterprise cloud architectures.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                <span>Zero legacy bloat • Sub-second 4G/5G speeds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                <span>Native UPI &amp; Razorpay payment architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                <span>High-concurrency WhatsApp business automations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                <span>Senior technical operators, zero offshore handoffs</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-dark transition-all hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red shadow-xl shadow-white/5"
              >
                <span>Start a project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#featured-work"
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/80 px-6 py-3.5 text-base font-medium text-slate-200 transition-colors hover:border-brand-red/50 hover:bg-brand-elevated hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                <span>Explore case studies</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Abstract Connected-Digital-Network Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              
              {/* Concentric SVG Network Web */}
              <svg 
                viewBox="0 0 400 400" 
                className="absolute inset-0 w-full h-full text-brand-red/25 select-none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Concentric Web Octagons */}
                <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                <circle cx="200" cy="200" r="125" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
                <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
                <circle cx="200" cy="200" r="40" fill="url(#netGlow)" stroke="#ef4444" strokeWidth="2" />

                {/* Radiating Spokes / Strands */}
                <line x1="200" y1="30" x2="200" y2="370" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="30" y1="200" x2="370" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="80" y1="80" x2="320" y2="320" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="80" y1="320" x2="320" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />

                {/* Node Junction Points */}
                <circle cx="200" cy="80" r="4" fill="#ef4444" />
                <circle cx="200" cy="320" r="4" fill="#ef4444" />
                <circle cx="80" cy="200" r="4" fill="#ef4444" />
                <circle cx="320" cy="200" r="4" fill="#ef4444" />
                <circle cx="115" cy="115" r="4" fill="#ef4444" />
                <circle cx="285" cy="285" r="4" fill="#ef4444" />
                <circle cx="115" cy="285" r="4" fill="#ef4444" />
                <circle cx="285" cy="115" r="4" fill="#ef4444" />
              </svg>

              {/* Central Glowing Hub */}
              <div className="relative z-10 flex flex-col items-center justify-center h-28 w-28 rounded-2xl bg-brand-surface/90 border-2 border-brand-red p-2 text-center shadow-[0_0_40px_rgba(239,68,68,0.35)] backdrop-blur">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-red font-semibold">Hub</span>
                <span className="text-xs font-bold text-white leading-tight">Digital Systems</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5">India Core</span>
              </div>

              {/* Orbiting Satellite Node Badges */}
              {/* Node 1: Top Right */}
              <div className="absolute -top-1 -right-2 z-20 flex items-center gap-2 rounded-full border border-brand-border bg-brand-dark/95 px-3 py-1.5 shadow-xl backdrop-blur transition-transform hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-xs font-medium text-slate-200">1-Click UPI Checkout</span>
              </div>

              {/* Node 2: Top Left */}
              <div className="absolute top-10 -left-4 z-20 flex items-center gap-2 rounded-full border border-brand-border bg-brand-dark/95 px-3 py-1.5 shadow-xl backdrop-blur transition-transform hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Sub-Second 4G/5G LCP</span>
              </div>

              {/* Node 3: Bottom Left */}
              <div className="absolute -bottom-2 -left-2 z-20 flex items-center gap-2 rounded-full border border-brand-border bg-brand-dark/95 px-3 py-1.5 shadow-xl backdrop-blur transition-transform hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                <span className="text-xs font-medium text-slate-200">WhatsApp CRM Engine</span>
              </div>

              {/* Node 4: Bottom Right */}
              <div className="absolute bottom-12 -right-4 z-20 flex items-center gap-2 rounded-full border border-brand-border bg-brand-dark/95 px-3 py-1.5 shadow-xl backdrop-blur transition-transform hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-200">99.9% Production SLA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
