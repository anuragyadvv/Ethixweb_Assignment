import React from "react";
import { Zap, MessageSquareQuote, ShieldAlert, Smartphone } from "lucide-react";

const pillars = [
  {
    icon: Smartphone,
    title: "Mobile-First & Tier-2/3 Network Resilience",
    description: "Over 78% of Indian digital commerce and business evaluation happens on mobile screens with variable network conditions. We strip away heavy client-side JavaScript, leveraging server components and local asset caching to guarantee sub-1s LCP across all Indian telecom providers.",
    stat: "Sub-1s LCP on 4G/5G",
  },
  {
    icon: MessageSquareQuote,
    title: "WhatsApp-First Business Funnels",
    description: "Email open rates for Indian enterprise leads hover under 18%, while WhatsApp engagement exceeds 80%. We build direct WhatsApp Cloud API automations that qualify inbound enquiries, deliver instant quotes, and notify account managers within 60 seconds.",
    stat: "3.8x higher response velocity",
  },
  {
    icon: Zap,
    title: "Native UPI & Frictionless Checkout",
    description: "UPI processes over 14 billion transactions monthly in India. We engineer 1-click UPI intent flows, automated QR generation, split payment handling, and automated GST invoice issuance directly linked with Indian tax compliance systems.",
    stat: "Zero drop-off checkout intent",
  },
  {
    icon: ShieldAlert,
    title: "DPDP Act 2023 Compliance & Security",
    description: "Indian data regulations demand strict privacy controls and explicit consent handling. Our systems are architected with local data residency considerations, row-level database security, and cryptographic audit logs to safeguard your customer records.",
    stat: "Enterprise audit-ready",
  },
];

export function IndiaAdvantage() {
  return (
    <section className="py-24 bg-brand-dark border-b border-brand-border/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
              <span>Market Understanding</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
              Engineered for India&apos;s unique digital reality.
            </h2>
            
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Western digital agency playbooks fail in India because they overlook the unique payment 
              dynamics, mobile bandwidth realities, and conversational preferences of Indian consumers 
              and enterprise decision-makers.
            </p>

            <div className="rounded-xl border border-brand-border bg-brand-surface/60 p-5 backdrop-blur">
              <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold block mb-1">
                The Indian Consumer Paradox
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                Indian buyers demand global-tier aesthetics and instantaneous responsiveness, 
                yet operate in an ecosystem dominated by UPI, WhatsApp, and hyper-competitive alternatives. 
                We engineer systems specifically designed to thrive in this high-velocity environment.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-brand-border bg-brand-surface/80 p-6 backdrop-blur transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-elevated"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      {pillar.stat}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
