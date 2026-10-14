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
        display: ["Montserrat", "Inter", "ui-sans-serif", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        /* Primary brand blue — #1A5F7A */
        brand: {
          50: "#F1F7FA",
          100: "#DCECF2",
          200: "#B9D7E3",
          300: "#8CBAD0",
          400: "#4F92AF",
          500: "#1A5F7A",
          600: "#154E64",
          700: "#113F52",
          800: "#0E3444",
          900: "#0B2B39",
        },
        /* Secondary brand orange — #F49D37 (also backs shadcn's `accent` states) */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#FEF5E9",
          100: "#FDE8CE",
          200: "#FBD29E",
          300: "#F8BC6E",
          400: "#F6AB4E",
          500: "#F49D37",
          600: "#DC841C",
          700: "#B46815",
          800: "#8E5211",
          900: "#6B3E0D",
        },
        /* Main text — #2C3E50 */
        ink: {
          DEFAULT: "#2C3E50",
          soft: "#45596D",
          muted: "#5B6B7D",
        },
        /* Light background #F8F9FA · light borders #D1D5DB */
        surface: {
          DEFAULT: "#FFFFFF",
          mist: "#F8F9FA",
          line: "#D1D5DB",
        },
        /* Dark background — #121212 */
        coal: "#121212",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      lineHeight: {
        /* Official body line-height: 1.7 */
        relaxed: "1.7",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(44,62,80,0.04), 0 12px 32px -14px rgba(44,62,80,0.14)",
        card: "0 1px 3px rgba(44,62,80,0.05), 0 18px 48px -22px rgba(44,62,80,0.22)",
        lift: "0 24px 60px -28px rgba(26,95,122,0.4)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 7s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;