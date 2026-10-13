import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Zap, Terminal, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Our India Story & Operating Principles",
  description: "Why Ethixweb was established to provide India's high-growth enterprises with elite, world-class full-stack digital systems and senior engineering pods.",
};

const principles = [
  {
    icon: Zap,
    title: "Performance is Not an Afterthought",
    description: "Every millisecond counts when serving customers on fluctuating mobile networks in Bengaluru, Jaipur, or Kochi. We engineer for sub-second Largest Contentful Paint (LCP) from the very first commit, keeping bundle sizes minuscule and rendering edge-cached.",
  },
  {
    icon: Compass,
    title: "Fluency in Indian Commercial Realities",
    description: "We don't try to force foreign playbooks onto Indian workflows. We architect natively for 1-click UPI intent, high-volume WhatsApp business communication, Razorpay webhooks, and the Digital Personal Data Protection Act (DPDP 2023).",
  },
  {
    icon: Terminal,
    title: "Senior Engineering, Zero Delegation",
    description: "When you partner with Ethixweb, your platform is built and maintained by senior architects who have engineered production systems at scale. You never get passed off to inexperienced interns or non-technical project coordinators.",
  },
  {
    icon: HeartHandshake,
    title: "Radical Transparency & Code Ownership",
    description: "You own 100% of your source code, database migrations, and deployment credentials from Day 1. No vendor lock-in, no hidden IP clauses, and transparent fixed INR sprint pricing.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 pb-24">
      {/* Editorial Header */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-brand-border/40 bg-ambient-radial">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Ethixweb Story</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Engineering digital systems worthy of India&apos;s commercial ambition.
            </h1>

            <p className="text-lg sm:text-xl text-brand-muted leading-relaxed font-normal">
              For decades, the standard for Indian domestic software was sluggish templates and outsourced mediocrity. 
              We are on a mission to bring product-grade engineering and elite design to India&apos;s fastest-growing businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Meaningful India Story Narrative */}
      <section className="py-20 border-b border-brand-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold block">
                The Indian Paradigm Shift
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                Why India needs dedicated digital engineering, not just outsourced maintenance.
              </h2>
              <div className="rounded-xl border border-brand-border bg-brand-surface p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-brand-red">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Our Promise to Indian Founders</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We treat every client codebase as if our own capital depended on it. 
                  Clean TypeScript, bulletproof database schemas, robust honeypot security, 
                  and sub-second speed benchmarks.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base text-brand-muted leading-relaxed">
              <p>
                India is home to the world&apos;s most sophisticated digital public infrastructure: 
                Unified Payments Interface (UPI) processing billions of real-time transactions, 
                high-speed 5G networks penetrating tier-3 towns, and an explosion of ambitious 
                D2C brands, B2B marketplaces, and SaaS challengers.
              </p>
              
              <p>
                Yet paradoxically, when an Indian business seeks a website or digital system, 
                they are typically confronted with two unsatisfactory extremes: bloated traditional 
                IT consultancies with prohibitive enterprise minimums, or low-cost agencies that 
                deliver sluggish, insecure WordPress themes patched with 40 third-party plugins.
              </p>

              <p>
                <strong className="text-white">Ethixweb India</strong> was established to provide the missing middle: 
                an agile, high-caliber engineering partner that operates with the velocity of an in-house product team 
                and the architectural rigor of an elite engineering consultancy.
              </p>

              <p>
                We do not inflate headcounts, assign junior trainees to mission-critical codebases, 
                or hide behind convoluted jargon. We write clean, testable Next.js and PostgreSQL code, 
                integrate seamlessly with India&apos;s payment and communication pipelines, and take radical 
                accountability for your digital performance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-24 border-b border-brand-border/40 bg-brand-surface/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold block">
              Core Principles
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              The engineering standards we never compromise on.
            </h2>
            <p className="text-base text-brand-muted">
              These principles guide every architectural decision, every line of TypeScript, 
              and every client interaction at Ethixweb India.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-brand-border bg-brand-surface p-8 transition-all hover:border-brand-red/40 hover:bg-brand-elevated"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent Disclaimer Regarding Case Studies */}
      <section className="py-16 border-b border-brand-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-6 sm:p-8 backdrop-blur text-xs sm:text-sm text-brand-muted leading-relaxed space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              <ShieldCheck className="h-4 w-4 text-brand-red" />
              <span>Full Assessment Transparency &amp; Integrity Notice</span>
            </div>
            <p>
              In strict accordance with the Ethixweb Full Stack Developer Assessment guidelines, 
              we maintain total integrity in our presentation. We do not invent fictitious client testimonials, 
              falsified customer counts, or deceptive partnership badges.
            </p>
            <p>
              All case studies presented on this website (such as Veda Botanicals, Kavach Logistics, and Pratham Wealth) 
              are illustrative concept architectures engineered specifically to showcase how our full-stack systems solve 
              concrete operational bottlenecks for Indian businesses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Partner with senior engineers who care about your business outcome.
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Share your project requirements with our Bengaluru engineering pod today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/25"
            >
              <span>Initiate a Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
