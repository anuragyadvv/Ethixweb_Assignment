import React from "react";
import Link from "next/link";
import { 
  Globe, 
  Code2, 
  Bot, 
  MessageSquare, 
  Search, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  HelpCircle
} from "lucide-react";

export const metadata = {
  title: "Full-Stack Services & Indian Investment Tiers",
  description: "Explore Ethixweb India's complete engineering catalog: high-performance websites, custom SaaS, WhatsApp automation, and INR investment tiers.",
};

const detailedServices = [
  {
    id: "websites",
    icon: Globe,
    title: "High-Performance Next.js Websites",
    subtitle: "Sub-second load times engineered for India's mobile-first consumer base.",
    overview: "We architect headless, edge-rendered websites that deliver instant page loads across Jio, Airtel, and Wi-Fi networks in Tier-1, Tier-2, and Tier-3 cities.",
    outcomes: [
      "95+ Google PageSpeed Insights on both mobile and desktop",
      "Sub-1.2s Largest Contentful Paint (LCP) across Indian networks",
      "Headless CMS integration (Sanity / Strapi) for non-technical marketing teams",
      "Tailwind CSS responsive design system with zero layout shifts (CLS < 0.02)",
    ],
    idealFor: "Indian D2C brands, venture-funded startups, and established enterprises needing high conversion rates.",
  },
  {
    id: "web-apps",
    icon: Code2,
    title: "Full-Stack Web Applications & SaaS",
    subtitle: "Production-grade digital platforms with rock-solid security and PostgreSQL scale.",
    overview: "From multi-tenant SaaS dashboards to bespoke client portals, we build durable web software using Next.js App Router, Supabase, and TypeScript.",
    outcomes: [
      "Row Level Security (RLS) guaranteeing strict data isolation between tenants",
      "Role-based access control (RBAC) with secure session verification",
      "High-concurrency database schemas with automated migration pipelines",
      "Real-time event subscriptions and interactive analytics dashboards",
    ],
    idealFor: "B2B SaaS companies, logistics operators, fintechs, and modern service platforms.",
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Autonomous Workflows",
    subtitle: "Automating repetitive Indian business workflows with domain-specific AI logic.",
    overview: "We deploy practical AI agents that parse incoming RFPs, categorize customer enquiries, extract GST information from invoices, and qualify inbound leads 24/7.",
    outcomes: [
      "Zero-latency enquiry qualification before routing to sales executives",
      "Automated PDF and invoice OCR parsing with structured JSON output",
      "Integration with OpenAI, Anthropic, or locally hosted Llama models",
      "Strict data privacy controls ensuring sensitive company data never leaks",
    ],
    idealFor: "Professional services, distribution networks, real estate, and high-volume sales teams.",
  },
  {
    id: "crm-whatsapp",
    icon: MessageSquare,
    title: "WhatsApp Cloud API & CRM Integrations",
    subtitle: "Turn conversational interactions into closed revenue across India's favorite channel.",
    overview: "Email alone fails in India. We wire official WhatsApp Cloud API triggers directly into your CRM (Zoho, LeadSquared, HubSpot, or custom databases).",
    outcomes: [
      "Automated two-way WhatsApp notifications upon website lead submission",
      "Real-time lead distribution to regional sales reps via WhatsApp alerts",
      "Instant Cash-on-Delivery (COD) verification messages to cut RTO losses",
      "Seamless synchronization with Zoho CRM, LeadSquared, and Google Sheets",
    ],
    idealFor: "D2C brands fighting COD returns, B2B sales teams, and service booking businesses.",
  },
  {
    id: "seo-growth",
    icon: Search,
    title: "India Technical SEO & Geo-Targeting",
    subtitle: "Capture high-intent commercial search volume in key Indian metropolitan hubs.",
    overview: "We construct technical SEO foundations that win competitive keywords across Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Tier-2 growth hubs.",
    outcomes: [
      "Semantic HTML5 structure and clean JSON-LD Schema markup",
      "Automated XML sitemaps and dynamic OpenGraph image generation",
      "Geo-targeted landing page architectures with localized keyword relevance",
      "Fast indexation pipelines that keep your new pages ranking within days",
    ],
    idealFor: "Companies relying on inbound qualified organic search demand without perpetual ad spend.",
  },
  {
    id: "maintenance",
    icon: Activity,
    title: "24/7 SRE Retainers & Digital Operations",
    subtitle: "Proactive uptime monitoring and continuous sprint iterations.",
    overview: "Never worry about crashed servers during festive sales or broken checkout flows. Our site reliability engineers monitor your digital assets around the clock.",
    outcomes: [
      "99.9% production uptime SLA backed by real-time alerting",
      "Sub-1-hour emergency response for critical operational issues",
      "Continuous dependency patching, security audits, and automated backups",
      "Dedicated monthly sprint hours for feature enhancements and CRO testing",
    ],
    idealFor: "Growing enterprises that require dependable technical operations without hiring an expensive in-house dev team.",
  },
];

const pricingTiers = [
  {
    name: "Starter Sprint",
    price: "₹1,45,000",
    period: "one-time",
    timeline: "2 Weeks Delivery",
    description: "Ideal for seed-stage startups and businesses upgrading from slow WordPress sites to a high-converting Next.js website.",
    features: [
      "Up to 5 custom-designed Next.js App Router pages",
      "Sub-1.2s mobile LCP & 90+ PageSpeed guarantee",
      "Lead enquiry form with honeypot & Supabase persistence",
      "Basic WhatsApp click-to-chat & lead email alerts",
      "SEO meta tags, sitemap.xml & robots.txt",
      "14 days post-launch warranty & support",
    ],
    popular: false,
    cta: "Select Starter Sprint",
    serviceParam: "high-performance-websites",
  },
  {
    name: "Growth Engine",
    price: "₹3,75,000",
    period: "one-time",
    timeline: "4 Weeks Delivery",
    description: "Our flagship package for scaling Indian D2C and B2B brands requiring advanced integrations and custom automations.",
    features: [
      "Complete custom Next.js web platform (up to 12 pages)",
      "Razorpay / Cashfree 1-click UPI checkout integration",
      "Official WhatsApp Cloud API 2-way lead automation",
      "Protected /admin portal with real-time lead status pipeline",
      "Zoho / LeadSquared or custom database CRM sync",
      "Full technical SEO architecture & Core Web Vitals audit",
      "30 days dedicated post-launch SRE monitoring",
    ],
    popular: true,
    cta: "Select Growth Engine",
    serviceParam: "crm-whatsapp-integrations",
  },
  {
    name: "Enterprise Platform",
    price: "Custom",
    period: "from ₹7,50,000",
    timeline: "6-8 Weeks Delivery",
    description: "For established enterprises, fintechs, and high-volume platforms requiring bespoke SaaS architecture and compliance.",
    features: [
      "Multi-tenant SaaS application or complex client portal",
      "Supabase PostgreSQL with strict Row Level Security",
      "Role-based authentication & enterprise SSO readiness",
      "DigiLocker / Aadhaar KYC or GST API integrations",
      "DPDP Act 2023 compliance & data residency controls",
      "Custom AI document parsing / lead qualification agent",
      "Ongoing 24/7 dedicated SRE retainer with 99.9% SLA",
    ],
    popular: false,
    cta: "Discuss Enterprise Scale",
    serviceParam: "web-applications-saas",
  },
];

const faqs = [
  {
    q: "Why do you quote in Indian Rupees (INR) with fixed sprint pricing?",
    a: "We believe in radical transparency. Most Indian agencies either bill vague hourly rates that spiral out of control, or cut corners to meet unrealistically cheap quotes. Our sprint packages deliver senior-level engineering with clear milestones, defined deliverables, and zero hidden costs.",
  },
  {
    q: "How does Ethixweb achieve 90+ PageSpeed on mobile networks in India?",
    a: "We use Next.js App Router server components that ship zero unnecessary JavaScript to the browser. Assets are edge-cached on Indian Cloudflare/Vercel POPs in Mumbai, Chennai, and Delhi. Images are optimized into modern AVIF/WebP formats with responsive srcSets.",
  },
  {
    q: "Can you connect our lead forms to our existing Indian CRM?",
    a: "Yes. We regularly build two-way integrations with Zoho CRM, LeadSquared, Salesforce, and custom PostgreSQL databases, as well as webhook triggers into WhatsApp Business API.",
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes. Before commencing any technical discovery or reviewing internal architectures, we execute mutual NDAs to protect your proprietary ideas and business data.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-brand-border/40 bg-ambient-radial">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red mb-6">
            <Zap className="h-3.5 w-3.5" />
            <span>Full Capabilities Catalog</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl leading-[1.1]">
            Engineering systems that turn Indian digital traffic into revenue.
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-brand-muted leading-relaxed">
            We operate across six specialized disciplines—each engineered to withstand high-volume Indian traffic, 
            instantaneous UPI transactions, and multi-channel conversational sales.
          </p>
        </div>
      </section>

      {/* Detailed Services Deep Dive */}
      <section className="py-20 border-b border-brand-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {detailedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="rounded-2xl border border-brand-border bg-brand-surface/70 p-8 lg:p-10 backdrop-blur transition-all duration-300 hover:border-brand-red/40"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                    
                    {/* Left: Title & Overview */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark border border-brand-border text-brand-red">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-xs text-brand-muted uppercase tracking-wider">
                          Practice Area 0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {service.title}
                      </h2>

                      <p className="text-sm font-medium text-brand-red">
                        {service.subtitle}
                      </p>

                      <p className="text-sm leading-relaxed text-brand-muted">
                        {service.overview}
                      </p>

                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-brand-subtle block mb-1">
                          Ideal For:
                        </span>
                        <p className="text-xs text-slate-300">
                          {service.idealFor}
                        </p>
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-red transition-colors"
                        >
                          <span>Enquire about this service</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: Concrete Outcomes */}
                    <div className="lg:col-span-7 rounded-xl border border-brand-border/80 bg-brand-dark/80 p-6 sm:p-8">
                      <h3 className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold mb-4">
                        Guaranteed Architectural Outcomes
                      </h3>

                      <div className="space-y-4">
                        {service.outcomes.map((outcome, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-3 text-sm text-slate-200">
                            <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-mono text-brand-subtle">
                        <span>Standard: Production Next.js 14+</span>
                        <span className="text-emerald-400">Verified SLA</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent Indian Investment Tiers in INR */}
      <section className="py-24 border-b border-brand-border/40 bg-brand-surface/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
              <span>Transparent INR Pricing</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Predictable sprint investment. No surprises.
            </h2>
            <p className="text-base sm:text-lg text-brand-muted">
              Choose the sprint tier matching your business maturity. All packages include direct access 
              to senior engineers, clean source code ownership, and staging environments.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-2xl border p-8 backdrop-blur transition-all duration-300 ${
                  tier.popular
                    ? "border-brand-red/60 bg-brand-surface shadow-[0_0_40px_rgba(239,68,68,0.15)] scale-105 z-10"
                    : "border-brand-border bg-brand-surface/70 hover:border-brand-borderHover"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular in India
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span className="font-mono text-xs text-brand-red bg-brand-dark px-2.5 py-1 rounded border border-brand-border">
                      {tier.timeline}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-brand-border/60">
                    <span className="text-4xl font-black tracking-tight text-white font-mono">
                      {tier.price}
                    </span>
                    <span className="text-xs text-brand-subtle font-mono">
                      / {tier.period}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-brand-subtle block">
                      Included in Sprint:
                    </span>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?service=${tier.serviceParam}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all ${
                      tier.popular
                        ? "bg-brand-red text-white hover:bg-brand-redHover shadow-lg shadow-brand-red/25"
                        : "border border-brand-border bg-brand-dark text-white hover:border-brand-red/50 hover:bg-brand-elevated"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-brand-subtle">
            All prices exclude applicable GST (18%). Custom milestones available for enterprise contracts.
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 border-b border-brand-border/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Questions Indian Founders Frequently Ask
            </h2>
            <p className="text-sm text-brand-muted">
              Everything you need to know about our engineering engagements and delivery guarantees.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-brand-border bg-brand-surface/60 p-6 backdrop-blur"
              >
                <h3 className="text-base font-bold text-white flex items-center gap-2.5 mb-2.5">
                  <HelpCircle className="h-4 w-4 text-brand-red shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm leading-relaxed text-brand-muted pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Have a custom architecture requirement?
          </h2>
          <p className="mt-4 text-brand-muted text-base">
            Send us your brief. A senior engineer will review your tech stack and schedule a 30-minute discovery call.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
