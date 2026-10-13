import React from "react";

const capabilities = [
  "HIGH-CONCURRENCY WEBSITES",
  "UPI & RAZORPAY PAYMENT GATEWAYS",
  "WHATSAPP CRM AUTOMATION",
  "D2C HEADLESS COMMERCE",
  "B2B SAAS PLATFORMS",
  "TIER-1 TO TIER-3 5G/4G OPTIMIZATION",
  "DPDP 2023 DATA RESIDENCY",
  "LOCAL SEO & GEO-INTENT",
  "24/7 DEDICATED SRE & MAINTENANCE",
];

export function CapabilitiesTicker() {
  return (
    <div className="relative w-full overflow-hidden border-b border-brand-border bg-brand-surface/60 py-4 select-none">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-mono font-medium tracking-widest text-brand-muted">
        {/* First set */}
        {capabilities.map((item, index) => (
          <div key={`cap-1-${index}`} className="flex items-center gap-8">
            <span className="hover:text-white transition-colors">{item}</span>
            <span className="text-brand-red font-bold">◆</span>
          </div>
        ))}
        {/* Duplicate set for seamless continuous loop */}
        {capabilities.map((item, index) => (
          <div key={`cap-2-${index}`} className="flex items-center gap-8">
            <span className="hover:text-white transition-colors">{item}</span>
            <span className="text-brand-red font-bold">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
