import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-dark text-slate-300">
      {/* Upper Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-surface border border-brand-border group-hover:border-brand-red/50 transition-colors">
                <span className="font-mono text-base font-bold text-brand-red">[E]</span>
              </div>
              <span className="font-mono text-xl font-black tracking-widest text-white">
                ETHIX<span className="text-brand-red">WEB</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-brand-muted">
              Senior engineering and digital operations partner for India&apos;s high-velocity D2C brands, 
              B2B SaaS platforms, and enterprise modernizers. Delivering resilient architectures, 
              sub-second performance, and unified digital systems.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-brand-subtle">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                99.9% Production SLA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-slate-300">
                <ShieldCheck className="h-3 w-3 text-brand-red" />
                DPDP 2023 Compliant
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              Solutions
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#websites" className="text-brand-muted hover:text-white transition-colors">
                  High-Performance Websites
                </Link>
              </li>
              <li>
                <Link href="/services#web-apps" className="text-brand-muted hover:text-white transition-colors">
                  Web Applications & SaaS
                </Link>
              </li>
              <li>
                <Link href="/services#ai-agents" className="text-brand-muted hover:text-white transition-colors">
                  AI Agents & Workflows
                </Link>
              </li>
              <li>
                <Link href="/services#crm-whatsapp" className="text-brand-muted hover:text-white transition-colors">
                  CRM & WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link href="/services#seo-growth" className="text-brand-muted hover:text-white transition-colors">
                  SEO & India Geo-Targeting
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-brand-muted hover:text-white transition-colors">
                  24/7 SRE & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-brand-muted hover:text-white transition-colors">
                  About Our India Story
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-brand-muted hover:text-white transition-colors">
                  Services & Pricing (INR)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Start an Enquiry
                </Link>
              </li>
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1 text-brand-muted hover:text-brand-red transition-colors">
                  <span>Admin Portal</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* India Hubs & Direct Contact */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              India Presence
            </h2>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-red mt-0.5" />
                <span>
                  Bengaluru (HQ): 100 Feet Rd, Indiranagar, Bengaluru, KA 560038
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                <a href="mailto:contact@ethixweb.com" className="hover:text-white transition-colors">
                  contact@ethixweb.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                <a href="tel:+918049602100" className="hover:text-white transition-colors">
                  +91 80 4960 2100
                </a>
              </li>
              <li className="pt-2 text-xs text-brand-subtle">
                Operational hubs: Bengaluru • Mumbai • Delhi NCR
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer & Copyright Bar */}
      <div className="border-t border-brand-border/60 bg-black/40 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-brand-subtle sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Ethixweb Technologies India Pvt Ltd. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-500 text-center sm:text-right">
            Note: Client case studies and performance figures are demonstrative concept architectures for the assessment.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Engagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
