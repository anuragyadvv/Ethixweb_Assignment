import React from "react";
import { Terminal, Cpu, GitMerge, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Terminal,
    title: "Architecture & Blueprint",
    description: "We analyze your target audience, conversion friction, and technical requirements to create an immutable specification covering database schemas, API contracts, and UX flows.",
    deliverable: "Tech Spec • Data Models • Wireframes",
  },
  {
    number: "02",
    icon: Cpu,
    title: "High-Velocity Engineering",
    description: "Our senior developers build in focused 2-week sprints with Next.js App Router, TypeScript, and clean modular components. Continuous reviews ensure zero tech debt.",
    deliverable: "Production Code • Automated Tests • Preview Staging",
  },
  {
    number: "03",
    icon: GitMerge,
    title: "Indian Ecosystem Integrations",
    description: "We wire up the foundational pipes of Indian commerce: 1-click UPI checkout, Razorpay webhooks, WhatsApp Cloud API conversational triggers, and CRM synchronizations.",
    deliverable: "Payment Gateways • WhatsApp Automations • CRM Sync",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Launch & 24/7 SRE Retainers",
    description: "We execute zero-downtime production deployments to Vercel/AWS edge with automated database backups, DPDP 2023 compliance checks, and real-time uptime monitoring.",
    deliverable: "Zero-Downtime Deploy • Uptime SLA • SRE Retainer",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-brand-surface/40 border-b border-brand-border/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
            <span>Execution Model</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            How we take you from concept to production.
          </h2>
          <p className="text-base sm:text-lg text-brand-muted">
            Predictable sprints, transparent milestones, and senior-led engineering. 
            No vague timelines or endless junior delegation.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col justify-between rounded-xl border border-brand-border bg-brand-surface p-6 backdrop-blur transition-all duration-300 hover:border-brand-red/50 hover:bg-brand-elevated"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-brand-red/40">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-brand-muted">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-subtle block">
                    Deliverable:
                  </span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
