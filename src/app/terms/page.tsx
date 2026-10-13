import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Engagement | Ethixweb India",
  description: "Terms and conditions governing sprint engagements, intellectual property, and warranties at Ethixweb India.",
};

export default function TermsPage() {
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
            <FileText className="h-3.5 w-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Terms of Commercial Engagement
          </h1>
          <p className="text-sm text-brand-muted">
            Last Updated: October 2026 • Ethixweb Technologies India Pvt Ltd
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed rounded-2xl border border-brand-border bg-brand-surface/70 p-8 backdrop-blur">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Sprint Delivery Model</h2>
            <p>
              Ethixweb delivers software via defined sprint cycles (Starter Sprint, Growth Engine, Enterprise Platform). 
              Each sprint has a documented technical specification, agreed milestones, and staging acceptance tests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Intellectual Property (IP) Ownership</h2>
            <p>
              Upon receipt of full payment for a milestone, all client-specific custom source code, database architectures, 
              and frontend designs transfer 100% to the client. Ethixweb does not hold client IP hostage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Indian Taxation (GST)</h2>
            <p>
              All quoted sprint fees in Indian Rupees (INR) are subject to applicable Goods and Services Tax (GST at 18%). 
              GST-compliant tax invoices with HSN/SAC codes are issued for all corporate engagements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Assessment Demonstration Notice</h2>
            <p>
              This website is an engineering demonstration created for the Ethixweb Full Stack Developer Assessment. 
              Project case studies and representative brand examples are illustrative architectures.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
