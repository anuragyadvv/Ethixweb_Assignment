"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Shield, Lock, Mail, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid admin credentials");
        setIsSubmitting(false);
        return;
      }

      if (data?.session) {
        // Redirect to protected dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage("Authentication failed. Please check credentials.");
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      console.error("Admin sign in failed:", err);
      setErrorMessage("Could not connect to authentication service. Check Supabase environment variables.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4 py-12">
      {/* Background ambient red glow */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[400px] w-[400px] rounded-full bg-brand-red/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to public website</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface/90 p-8 backdrop-blur shadow-2xl">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark border border-brand-border text-brand-red shadow-inner">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Ethixweb Admin Portal
            </h1>
            <p className="text-xs text-brand-muted">
              Secure lead management authenticated via Supabase
            </p>
          </div>

          {errorMessage && (
            <div 
              className="mb-6 rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label 
                htmlFor="admin-email" 
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  id="admin-email"
                  required
                  placeholder="admin@ethixweb.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-brand-border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:border-brand-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  id="admin-password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-brand-border bg-brand-dark pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:border-brand-red transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-redHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-60 shadow-lg shadow-brand-red/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Setup / Instructions Note */}
          <div className="mt-8 pt-6 border-t border-brand-border/60 text-xs text-brand-muted space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-red font-semibold block">
              Admin Setup Guide
            </span>
            <p className="leading-relaxed text-[11px]">
              Admin accounts are provisioned via your Supabase Dashboard under <strong>Authentication &gt; Users</strong>. 
              See the project README for exact demo admin setup instructions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
