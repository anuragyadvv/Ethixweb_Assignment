import React, { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Loader2 } from "lucide-react";

export const metadata = {
  title: "Start a Project Enquiry | Ethixweb India",
  description: "Connect with Ethixweb India's senior engineering team. Submit your project requirements for custom web applications, high-performance websites, or AI systems.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 pb-24">
      {/* Banner */}
      <section className="relative overflow-hidden pt-16 pb-16 border-b border-brand-border/40 bg-ambient-radial">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
              <span>Direct Engineering Access</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Start an engineering enquiry.
            </h1>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Have an ambitious web platform, high-concurrency commerce store, or custom AI automation 
              in mind? Fill out the brief below to connect directly with our engineering pod.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Info */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-brand-border bg-brand-surface p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Direct Contact Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="rounded-2xl border border-brand-border bg-brand-surface/70 p-6 sm:p-8 backdrop-blur space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">
                    Direct Contact Hub
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Prefer direct communication? Reach our leadership team directly.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-200">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-subtle block">
                        Work Enquiries
                      </span>
                      <a href="mailto:contact@ethixweb.com" className="font-medium hover:text-brand-red transition-colors">
                        contact@ethixweb.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-subtle block">
                        Direct Phone / WhatsApp
                      </span>
                      <a href="tel:+918049602100" className="font-medium hover:text-brand-red transition-colors">
                        +91 80 4960 2100
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-subtle block">
                        Bengaluru Headquarters
                      </span>
                      <span className="text-brand-muted text-xs leading-relaxed block">
                        100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 space-y-3 text-xs text-brand-muted">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Response Time SLA: Under 2 business hours (IST)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-brand-red shrink-0" />
                    <span>Mutual Non-Disclosure Agreement (NDA) executed on request</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="rounded-2xl border border-brand-border bg-brand-surface/50 p-6 backdrop-blur space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold block">
                  What Happens Next?
                </span>
                <ol className="space-y-3 text-xs text-brand-muted list-decimal list-inside leading-relaxed">
                  <li>
                    <strong className="text-slate-200">Architect Review:</strong> A senior full-stack engineer inspects your requirements within 2 hours.
                  </li>
                  <li>
                    <strong className="text-slate-200">Discovery Sprint:</strong> We host a 30-minute scoping call to define database models and sprint milestones.
                  </li>
                  <li>
                    <strong className="text-slate-200">Fixed Proposal:</strong> You receive a comprehensive architecture spec with guaranteed INR pricing.
                  </li>
                </ol>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
