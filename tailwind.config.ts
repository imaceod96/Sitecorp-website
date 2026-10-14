import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          '"Plus Jakarta Sans"',
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#EEF3FF",
          100: "#DCE6FF",
          200: "#BACCFE",
          300: "#8FAEFC",
          400: "#5C86F7",
          500: "#1B4FD8",
          600: "#1741B4",
          700: "#153690",
          800: "#162E72",
          900: "#132456",
        },
        ink: {
          DEFAULT: "#0E1B33",
          soft: "#3A4A66",
          muted: "#6B7A93",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          mist: "#F4F7FE",
          line: "#E4EBF8",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,27,51,0.04), 0 12px 32px -14px rgba(16,27,51,0.14)",
        card: "0 1px 3px rgba(16,27,51,0.05), 0 18px 48px -22px rgba(16,27,51,0.22)",
        lift: "0 24px 60px -28px rgba(19,54,144,0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 7s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-line": "pulse-line 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;