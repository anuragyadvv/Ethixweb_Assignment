import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080A",
        foreground: "#F8FAFC",
        brand: {
          dark: "#08080A",
          surface: "#0E0F14",
          elevated: "#151720",
          card: "#0F1117",
          border: "#1E222D",
          borderHover: "#2E3342",
          red: "#EF4444",
          redHover: "#DC2626",
          redGlow: "#B91C1C",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "glow": "glow 6s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 15px rgba(239, 68, 68, 0.25))" },
          "100%": { filter: "drop-shadow(0 0 35px rgba(239, 68, 68, 0.55))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
