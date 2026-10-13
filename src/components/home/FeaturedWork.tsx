import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

const caseStudies = [
  {
    tag: "Concept Architecture 01",
    sector: "D2C Commerce & Beauty",
    title: "Veda Botanicals: Headless Commerce & Instant UPI Checkout",
    challenge: "Traditional monolithic storefront was sluggish on mobile 4G (4.8s LCP), leading to massive cart abandonment during peak festive flash sales.",
    solution: "Engineered a headless Next.js App Router architecture with edge-cached product catalogs, native Razorpay 1-click UPI intent checkout, and automated WhatsApp order tracking.",
    technicalHighlights: [
      "Sub-1.2s mobile LCP across Indian telecom networks",
      "Native UPI intent handling with zero checkout redirects",
      "Automated WhatsApp status and COD verification pipeline",
    ],
    stack: ["Next.js App Router", "Tailwind CSS", "Razorpay UPI", "WhatsApp Cloud API"],
  },
  {
    tag: "Concept Architecture 02",
    sector: "B2B Logistics & Supply Chain",
    title: "Kavach Logistics: Inter-City Freight Telemetry & GST Automation",
    challenge: "Manual spreadsheet coordination and disjointed telephone dispatching across 12 Indian states crippled operational scalability and slowed e-way bill generation.",
    solution: "Built a high-concurrency dispatch dashboard with Supabase PostgreSQL, real-time vehicle telemetry tracking, automated GST/E-Way bill generation, and SMS/WhatsApp driver alerts.",
    technicalHighlights: [
      "Sub-200ms real-time telemetry updates with WebSockets",
      "Automated Indian GST & E-Way Bill compliance generation",
      "Granular role-based access for depot managers and drivers",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "GST API", "WebSockets"],
  },
  {
    tag: "Concept Architecture 03",
    sector: "FinTech & Wealth Management",
    title: "Pratham Wealth: Institutional Client Portal & DigiLocker KYC",
    challenge: "High-net-worth investors required institutional-grade security for portfolio reports with instant paperless onboarding compliant with Indian financial regulations.",
    solution: "Developed an encrypted client portal featuring Supabase Row-Level Security, DigiLocker & Aadhaar verification pipeline, and automated portfolio rebalancing reports.",
    technicalHighlights: [
      "Zero-trust Row Level Security preventing unauthorized access",
      "Instant DigiLocker KYC completion under 3 minutes",
      "DPDP 2023 compliant encrypted document vault",
    ],
    stack: ["Next.js", "Supabase Auth & RLS", "DigiLocker API", "Zod Validation"],
  },
];

export function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 bg-brand-surface/30 border-b border-brand-border/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
              <span>Featured Concepts</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Architectural concepts built for Indian scale.
            </h2>
            <p className="text-base sm:text-lg text-brand-muted">
              Explore three illustrative concept architectures designed to solve real operational bottlenecks 
              for modern Indian D2C, B2B SaaS, and FinTech ventures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-brand-dark/80 px-4 py-2 rounded-lg border border-brand-border">
            <ShieldCheck className="h-4 w-4 text-brand-red" />
            <span>Clearly labelled demonstrative concepts</span>
          </div>
        </div>

        {/* 3 Case Study Concept Cards */}
        <div className="mt-14 space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-brand-border bg-brand-surface/90 p-8 backdrop-blur transition-all duration-300 hover:border-brand-red/50 hover:bg-brand-elevated"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                
                {/* Left Header */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-red px-2.5 py-1 rounded bg-brand-red/10 border border-brand-red/30">
                      {study.tag}
                    </span>
                    <span className="text-xs font-mono text-brand-muted">
                      {study.sector}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-red transition-colors leading-snug">
                    {study.title}
                  </h3>

                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-wider font-mono text-brand-subtle block mb-1">
                      Problem Context
                    </span>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md border border-brand-border bg-brand-dark px-2.5 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Architectural Solution */}
                <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-brand-border/60 bg-brand-dark/60 p-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-mono text-brand-red font-semibold block mb-2">
                      Engineering Solution
                    </span>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {study.solution}
                    </p>

                    <div className="mt-6 space-y-3">
                      <span className="text-xs font-mono text-brand-subtle uppercase tracking-wider block">
                        Target Architectural Benchmarks:
                      </span>
                      {study.technicalHighlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-red shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-border/50 flex items-center justify-between">
                    <span className="text-xs text-brand-muted font-mono">
                      Target Production Standard: 99.9% Uptime
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-brand-red transition-colors"
                    >
                      <span>Discuss similar architecture</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
