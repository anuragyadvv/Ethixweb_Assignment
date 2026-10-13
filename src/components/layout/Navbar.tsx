"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Shield, Clock } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Admin Portal", icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/60 bg-brand-dark/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-surface border border-brand-border group-hover:border-brand-red/50 transition-colors">
            <span className="font-mono text-base font-bold text-brand-red">[E]</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-black tracking-widest text-white group-hover:text-brand-red transition-colors">
              ETHIX<span className="text-brand-red">WEB</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted">
              India • Engineering
            </span>
          </div>
        </Link>

        {/* Live IST indicator (Middle Badge) */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/80 px-3.5 py-1 text-xs text-brand-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <Clock className="h-3.5 w-3.5 text-brand-subtle" />
          <span className="font-mono text-[11px] text-slate-300">
            IST {currentTime || "05:30 PM"} • Bengaluru Hub
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-elevated text-brand-red border border-brand-red/20"
                    : "text-slate-300 hover:text-white hover:bg-brand-surface"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Start a Project CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red shadow-lg shadow-white/5"
          >
            <span>Start a project</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-brand-border bg-brand-surface p-2 text-slate-300 hover:text-white hover:border-brand-red/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-dark px-4 pb-6 pt-2 animate-in slide-in-from-top-2">
          <div className="mb-4 flex items-center justify-between rounded-lg border border-brand-border bg-brand-surface p-2.5 text-xs text-brand-muted">
            <span className="flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              IST {currentTime || "05:30 PM"}
            </span>
            <span className="text-[11px] text-brand-subtle">India Digital Ops</span>
          </div>

          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-surface text-brand-red border border-brand-red/30"
                      : "text-slate-200 hover:bg-brand-surface hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {Icon && <Icon className="h-4 w-4 text-brand-red" />}
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-brand-subtle" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-brand-border">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-redHover shadow-md shadow-brand-red/20"
            >
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
