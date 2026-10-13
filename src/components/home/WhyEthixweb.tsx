import React from "react";
import { Check, X, Shield, Clock, Users, Zap } from "lucide-react";

const comparisons = [
  {
    feature: "Technical Team Caliber",
    ethixweb: "Senior full-stack architects with direct executive access",
    typicalAgencies: "Junior developers managed by non-technical account reps",
    freelancers: "Fragmented individual contributors with varying skills",
  },
  {
    feature: "Performance Benchmark",
    ethixweb: "Strict 90+ Core Web Vitals on mobile 4G across India",
    typicalAgencies: "Heavy WordPress templates bloated with 35+ plugins",
    freelancers: "Focus solely on visual appearance, ignoring performance",
  },
  {
    feature: "Indian Ecosystem Fluency",
    ethixweb: "Native 1-click UPI, Razorpay, WhatsApp API, and DPDP 2023",
    typicalAgencies: "Generic Stripe/PayPal plugins that suffer high Indian drop-offs",
    freelancers: "Ad-hoc payment links without automated reconciliation",
  },
  {
    feature: "Architecture & Maintenance",
    ethixweb: "Clean Next.js, Supabase RLS, automated tests, 24/7 SRE",
    typicalAgencies: "Spaghetti codebases with fragile plugins and update fears",
    freelancers: "No ongoing support once final invoice is cleared",
  },
];

export function WhyEthixweb() {
  return (
    <section className="py-24 bg-brand-dark border-b border-brand-border/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
            <span>Why Ethixweb</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Built like an internal technology team.
          </h2>
          <p className="text-base sm:text-lg text-brand-muted">
            The traditional agency model in India is broken: sluggish delivery, junior handoffs, 
            and brittle code. We replaced it with a modern engineering partnership.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Senior-Led Pods</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              You collaborate directly with the engineers designing your database and writing your code. Zero bureaucratic middlemen.
            </p>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Sub-Second Obsession</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Every millisecond of latency costs Indian conversions. We optimize server components, image delivery, and bundle weights relentlessly.
            </p>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Rapid 2-Week Sprints</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Predictable bi-weekly deployments with staging links and clear deliverables. No multi-month black-box surprises.
            </p>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Enterprise Durability</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              PostgreSQL Row-Level Security, automated CI/CD testing, and 24/7 SRE retainers ensure your infrastructure never crashes during flash traffic.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/70 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table">
              <thead className="border-b border-brand-border bg-brand-dark/80 text-xs font-mono uppercase text-brand-muted">
                <tr>
                  <th scope="col" className="px-6 py-4">Capability</th>
                  <th scope="col" className="px-6 py-4 text-brand-red font-bold">Ethixweb India</th>
                  <th scope="col" className="px-6 py-4 text-zinc-400">Legacy Indian Agencies</th>
                  <th scope="col" className="px-6 py-4 text-zinc-400">Freelancer Marketplace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 text-slate-300">
                {comparisons.map((item, index) => (
                  <tr key={index} className="hover:bg-brand-elevated/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-100 bg-brand-red/5">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                        <span>{item.ethixweb}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{item.typicalAgencies}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{item.freelancers}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
