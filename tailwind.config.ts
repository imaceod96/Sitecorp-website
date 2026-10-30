import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
        display: ['"Plus Jakarta Sans"', '"Manrope"', "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        /* Primary brand deep blue — #123F55 */
        brand: {
          50: "#F0F6F9",
          100: "#DCEAF1",
          200: "#B8D6E3",
          300: "#85B9D0",
          400: "#4692B4",
          500: "#123F55",
          600: "#0F3447",
          700: "#0C2A3A",
          800: "#09212E",
          900: "#061720",
        },
        /* Secondary brand teal — #1A7B91 */
        teal: {
          50: "#F0F9FB",
          100: "#D6F0F5",
          200: "#AEE1EC",
          300: "#75CBDE",
          400: "#38ACCA",
          500: "#1A7B91",
          600: "#166477",
          700: "#145160",
          800: "#12434F",
          900: "#0F3640",
        },
        /* Accent brand amber — #F49D37 */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#FEF8F0",
          100: "#FDEEDC",
          200: "#FBDEB9",
          300: "#F8C88B",
          400: "#F5B05A",
          500: "#F49D37",
          600: "#D88224",
          700: "#B0641B",
          800: "#8A4E1A",
          900: "#6E3F17",
        },
        /* Main text — #243746 */
        ink: {
          DEFAULT: "#243746",
          soft: "#415566",
          muted: "#63788A",
        },
        /* Light background #F4F7F9 · light borders #E2E8F0 */
        surface: {
          DEFAULT: "#FFFFFF",
          mist: "#F4F7F9",
          line: "#E2E8F0",
        },
        coal: "#101E28",
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
  plugins: [tailwindcssAnimate],
} satisfies Config;