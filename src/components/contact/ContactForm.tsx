"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldAlert, 
  Building, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  IndianRupee 
} from "lucide-react";
import { leadFormSchema, type LeadFormData } from "@/lib/validations/lead";

const serviceOptions = [
  { value: "high-performance-websites", label: "High-Performance Websites (Next.js)" },
  { value: "web-applications-saas", label: "Custom Web Application / SaaS Platform" },
  { value: "ai-agents-automation", label: "AI Agents & Autonomous Workflows" },
  { value: "crm-whatsapp-integrations", label: "WhatsApp Cloud API & CRM Integration" },
  { value: "seo-growth-marketing", label: "India Technical SEO & Geo-Targeting" },
  { value: "maintenance-infrastructure", label: "24/7 SRE Retainer & Infrastructure" },
  { value: "other", label: "Other / Full Architectural Audit" },
];

const budgetOptions = [
  { value: "starter_1_2.5l", label: "₹1,25,000 – ₹2,50,000 (Starter Sprint)" },
  { value: "growth_2.5_5l", label: "₹2,50,000 – ₹5,00,000 (Growth Engine)" },
  { value: "scale_5_10l", label: "₹5,00,000 – ₹10,00,000 (Scale Architecture)" },
  { value: "enterprise_10l_plus", label: "₹10,00,000+ (Enterprise Custom)" },
  { value: "undecided", label: "Flexible / To Be Determined in Discovery" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service_interest: preselectedService || "high-performance-websites",
    budget_range: "growth_2.5_5l",
    message: "",
    website_hp: "", // Honeypot
    source_page: "contact",
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_interest: preselectedService }));
    }
  }, [preselectedService]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate_limited">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successReferenceId, setSuccessReferenceId] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific field error on user keystroke
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");
    setFieldErrors({});

    // 1. Client-Side Validation with Zod
    const clientValidation = leadFormSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      const issues = clientValidation.error.issues || (clientValidation.error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> }).errors || [];
      issues.forEach((err) => {
        const fieldName = err.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setFieldErrors(errors);
      setSubmitStatus("error");
      setErrorMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Submit to Next.js API Route Handler
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 429) {
        setSubmitStatus("rate_limited");
        setErrorMessage(result.error || "Rate limit reached. Please wait a few moments.");
        setIsSubmitting(false);
        return;
      }

      if (!response.ok || !result.success) {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "We could not process your enquiry. Please check your inputs or try again."
        );
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setIsSubmitting(false);
        return;
      }

      // 3. Verified Success
      setSubmitStatus("success");
      setSuccessReferenceId(result.id || "ETHIX-" + Math.floor(100000 + Math.random() * 900000));
      // Reset form but keep confirmation visible
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service_interest: "high-performance-websites",
        budget_range: "growth_2.5_5l",
        message: "",
        website_hp: "",
        source_page: "contact",
      });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setSubmitStatus("error");
      setErrorMessage("Network connection error. Please verify your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface/90 p-6 sm:p-10 backdrop-blur shadow-2xl">
      {/* Success Notification Banner */}
      {submitStatus === "success" && (
        <div 
          className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-emerald-200 animate-in fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Enquiry Successfully Received!
              </h3>
              <p className="text-sm text-emerald-300/90 leading-relaxed">
                Thank you for reaching out. Your enquiry has been persisted to our database 
                under reference code <strong className="font-mono text-white bg-emerald-900/60 px-2 py-0.5 rounded">{successReferenceId}</strong>.
              </p>
              <p className="text-xs text-emerald-400 font-mono">
                ⚡ Our Bengaluru solutions pod responds to all qualified enquiries within 2 hours during IST business hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rate Limited Notification Banner */}
      {submitStatus === "rate_limited" && (
        <div 
          className="mb-8 rounded-xl border border-amber-500/30 bg-amber-950/40 p-5 text-amber-200 animate-in fade-in"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Rate Limit Reached</h3>
              <p className="text-xs text-amber-300 mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* General Error Banner */}
      {submitStatus === "error" && (
        <div 
          className="mb-8 rounded-xl border border-rose-500/30 bg-rose-950/40 p-5 text-rose-200 animate-in fade-in"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Submission Error</h3>
              <p className="text-xs text-rose-300 mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Anti-Spam Honeypot Field (Visually Hidden from real humans, attractive to bots) */}
        <div 
          aria-hidden="true" 
          style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0 }}
        >
          <label htmlFor="website_hp">Do not fill this field</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_hp}
            onChange={handleChange}
          />
        </div>

        {/* Row 1: Name & Work Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Full Name <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={100}
                placeholder="Rohan Sharma"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={`w-full rounded-xl border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.name 
                    ? "border-rose-500 focus-visible:ring-rose-500" 
                    : "border-brand-border focus-visible:ring-brand-red focus-visible:border-brand-red"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-rose-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Work Email <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={150}
                placeholder="rohan@company.in"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.email 
                    ? "border-rose-500 focus-visible:ring-rose-500" 
                    : "border-brand-border focus-visible:ring-brand-red focus-visible:border-brand-red"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-rose-400">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Company & Phone */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Company / Brand Name <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Building className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="company"
                name="company"
                required
                maxLength={120}
                placeholder="Acme Brands India"
                value={formData.company}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.company}
                aria-describedby={fieldErrors.company ? "company-error" : undefined}
                className={`w-full rounded-xl border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.company 
                    ? "border-rose-500 focus-visible:ring-rose-500" 
                    : "border-brand-border focus-visible:ring-brand-red focus-visible:border-brand-red"
                }`}
              />
            </div>
            {fieldErrors.company && (
              <p id="company-error" className="mt-1.5 text-xs text-rose-400">
                {fieldErrors.company}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Phone / WhatsApp Number <span className="text-zinc-500 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={20}
                placeholder="+91 98765 43210"
                value={formData.phone || ""}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                className={`w-full rounded-xl border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.phone 
                    ? "border-rose-500 focus-visible:ring-rose-500" 
                    : "border-brand-border focus-visible:ring-brand-red focus-visible:border-brand-red"
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-rose-400">
                {fieldErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Service Interest & Budget Range (INR) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Service Interest */}
          <div>
            <label htmlFor="service_interest" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Service Interest <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Briefcase className="h-4 w-4" />
              </div>
              <select
                id="service_interest"
                name="service_interest"
                required
                value={formData.service_interest}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-border bg-brand-dark pl-10 pr-8 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-brand-dark text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label htmlFor="budget_range" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Estimated Investment (INR)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <IndianRupee className="h-4 w-4" />
              </div>
              <select
                id="budget_range"
                name="budget_range"
                value={formData.budget_range || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-border bg-brand-dark pl-10 pr-8 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-brand-dark text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Project Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            Project Overview &amp; Goals <span className="text-brand-red">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={2000}
            placeholder="Tell us about your current digital challenges, business goals, target launch timeline, or specific integrations needed (e.g. Razorpay, WhatsApp, CRM)..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={`w-full rounded-xl border bg-brand-dark p-4 text-sm text-white placeholder-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              fieldErrors.message 
                ? "border-rose-500 focus-visible:ring-rose-500" 
                : "border-brand-border focus-visible:ring-brand-red focus-visible:border-brand-red"
            }`}
          />
          <div className="mt-1.5 flex items-center justify-between text-xs text-brand-subtle">
            {fieldErrors.message ? (
              <p id="message-error" className="text-rose-400">
                {fieldErrors.message}
              </p>
            ) : (
              <span>Minimum 10 characters</span>
            )}
            <span className="font-mono">{formData.message.length} / 2000</span>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-red py-4 text-sm font-semibold text-white transition-all hover:bg-brand-redHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-60 shadow-lg shadow-brand-red/25"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Persisting to Supabase...</span>
              </>
            ) : (
              <>
                <span>Submit Project Enquiry</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        <div className="text-center text-xs text-brand-subtle">
          🔒 Your information is confidential under mutual NDA and protected under the Indian DPDP Act 2023.
        </div>

      </form>
    </div>
  );
}
