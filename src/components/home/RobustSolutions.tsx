import React from "react";
import Link from "next/link";
import { 
  Globe, 
  Code2, 
  Bot, 
  MessageSquare, 
  CreditCard, 
  Search, 
  Activity, 
  Sparkles,
  ArrowRight 
} from "lucide-react";

const solutions = [
  {
    icon: Globe,
    title: "High-Performance Websites",
    description: "Ultra-fast headless websites built with Next.js and Tailwind. Optimized for sub-second LCP even on mobile 4G across Tier-2 and Tier-3 Indian cities.",
    metrics: "Sub-1s mobile LCP • 95+ Core Web Vitals",
    category: "Websites",
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Production-grade SaaS platforms, client portals, and administrative dashboards engineered for high concurrency, rock-solid security, and scalable databases.",
    metrics: "Role-based auth • PostgreSQL & Supabase",
    category: "Software",
  },
  {
    icon: Bot,
    title: "AI Workflows & Agents",
    description: "Autonomous agents that triage customer requests, parse complex documents, extract GST data, and route sales opportunities directly to your team.",
    metrics: "24/7 autonomous triage • Zero human lag",
    category: "AI & ML",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & CRM Integrations",
    description: "Eliminate email drop-off in India with official WhatsApp Cloud API funnels, two-way notifications, and seamless syncing with Zoho and LeadSquared.",
    metrics: "3x higher open rate vs email • Instant response",
    category: "Automation",
  },
  {
    icon: CreditCard,
    title: "UPI & Payment Architecture",
    description: "Seamless Indian payment stack integration: Razorpay, Cashfree, automated UPI intent triggers, recurring subscriptions, and compliant GST invoices.",
    metrics: "Higher checkout success • Instant reconciliation",
    category: "FinTech",
  },
  {
    icon: Search,
    title: "India SEO & Geo-Targeting",
    description: "Dominate search rankings across high-intent queries in Indian commercial hubs with technical SEO, schema markup, and geo-targeted landing page architectures.",
    metrics: "High-intent organic pipeline • Local prominence",
    category: "Growth",
  },
  {
    icon: Activity,
    title: "24/7 Infrastructure & SRE",
    description: "Continuous uptime monitoring, proactive security patching, automated backups, and sub-1-hour critical response times by senior site reliability engineers.",
    metrics: "99.9% uptime SLA • <1hr emergency SLA",
    category: "Reliability",
  },
  {
    icon: Sparkles,
    title: "Conversion Design Systems",
    description: "Editorial, premium design systems built mobile-first. Every component is engineered to maximize conversion rates and communicate deep brand credibility.",
    metrics: "Consistent design tokens • Accessible WCAG AA",
    category: "Design",
  },
];

export function RobustSolutions() {
  return (
    <section className="py-24 bg-brand-dark border-b border-brand-border/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
            <span>Robust Solutions</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Senior operators for the systems that scale your pipeline.
          </h2>
          <p className="text-base sm:text-lg text-brand-muted">
            We don&apos;t just deliver static templates. We engineer interconnected digital systems 
            built to withstand real Indian consumer traffic and complex enterprise workflows.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-xl border border-brand-border bg-brand-surface/70 p-6 backdrop-blur transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-elevated hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.12)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-dark border border-brand-border group-hover:border-brand-red/40 group-hover:text-brand-red transition-colors text-slate-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-subtle px-2 py-0.5 rounded bg-brand-dark border border-brand-border/50">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <span className="font-mono text-xs text-brand-red font-medium block">
                    {item.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Services */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-red/50 hover:bg-brand-elevated"
          >
            <span>Explore all services &amp; transparent investment tiers</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-brand-red" />
          </Link>
        </div>

      </div>
    </section>
  );
}
