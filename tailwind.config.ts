import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft Blue Accent
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Soft Green / Emerald Accent
        emerald: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Soft Purple / Violet Accent
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        // Soft Blush / Rose for beauty accents
        blush: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        // Forest green for deep editorial headers
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#1b4332",
          900: "#081c15",
          950: "#030f0a",
        },
        editorial: {
          dark: "#0f172a",
          light: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334155',
            lineHeight: '1.8',
            h1: {
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#0f172a',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#0f172a',
              letterSpacing: '-0.015em',
              marginTop: '2em',
              marginBottom: '0.8em',
              paddingBottom: '0.3em',
              borderBottom: '1px solid #f1f5f9',
            },
            h3: {
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#1e293b',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            strong: {
              color: '#0f172a',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#0ea5e9',
              backgroundColor: '#f8fafc',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              fontStyle: 'italic',
              color: '#475569',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
