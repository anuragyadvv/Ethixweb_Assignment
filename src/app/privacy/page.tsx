import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & DPDP Act 2023 Compliance",
  description: "Ethixweb India privacy policy and compliance with the Digital Personal Data Protection Act 2023.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand-red">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Data Protection Compliance</span>
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Privacy Policy &amp; DPDP Act 2023 Commitment
          </h1>
          <p className="text-sm text-brand-muted">
            Last Updated: October 2026 • Governing Law: Republic of India
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed rounded-2xl border border-brand-border bg-brand-surface/70 p-8 backdrop-blur">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Scope and Application</h2>
            <p>
              This Privacy Policy explains how Ethixweb Technologies India Pvt Ltd collects, uses, and safeguards 
              information submitted through our online website and enquiry mechanisms in full compliance with the 
              Digital Personal Data Protection Act (DPDP Act 2023) of India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Information Collected</h2>
            <p>
              When you submit an architectural enquiry or project brief, we collect: your name, business email, company name, 
              optional phone number, service requirements, and project message. We also generate an anonymized IP hash 
              strictly for spam mitigation and rate limiting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Purpose of Processing</h2>
            <p>
              Your contact details are processed solely to evaluate your business requirements, prepare architectural 
              scoping documents, and communicate with you regarding engineering services. We do not sell, rent, or monetize 
              client or prospect data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Data Residency &amp; Storage Security</h2>
            <p>
              Lead records are encrypted in transit via TLS 1.3 and stored securely in PostgreSQL with Supabase Row Level Security (RLS) 
              guaranteeing that unauthorized anonymous actors cannot read or query prospect information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Your Rights as a Data Principal</h2>
            <p>
              Under the DPDP Act 2023, you have the right to request a summary of your personal data, request correction or 
              complete erasure of your contact details from our database. To exercise your rights, email us directly at 
              <a href="mailto:privacy@ethixweb.com" className="text-brand-red ml-1 hover:underline">privacy@ethixweb.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
