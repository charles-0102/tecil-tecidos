import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        leaf: {
          50: "hsl(var(--leaf-50))",
          100: "hsl(var(--leaf-100))",
          200: "hsl(var(--leaf-200))",
          300: "hsl(var(--leaf-300))",
          400: "hsl(var(--leaf-400))",
          500: "hsl(var(--leaf-500))",
          600: "hsl(var(--leaf-600))",
          700: "hsl(var(--leaf-700))",
          800: "hsl(var(--leaf-800))",
          900: "hsl(var(--leaf-900))",
        },
        sand: {
          100: "hsl(var(--sand-100))",
          200: "hsl(var(--sand-200))",
          300: "hsl(var(--sand-300))",
          500: "hsl(var(--sand-500))",
          700: "hsl(var(--sand-700))",
        },
        warm: {
          0: "hsl(var(--warm-0))",
          50: "hsl(var(--warm-50))",
          100: "hsl(var(--warm-100))",
          150: "hsl(var(--warm-150))",
          200: "hsl(var(--warm-200))",
          300: "hsl(var(--warm-300))",
          400: "hsl(var(--warm-400))",
          500: "hsl(var(--warm-500))",
          600: "hsl(var(--warm-600))",
          700: "hsl(var(--warm-700))",
          800: "hsl(var(--warm-800))",
          900: "hsl(var(--warm-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "ui-serif", "serif"],
        display: ["var(--font-display)", "Georgia", "ui-serif", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(20,24,12,0.04)",
        sm: "0 1px 4px rgba(20,24,12,0.06), 0 1px 2px rgba(20,24,12,0.04)",
        md: "0 4px 12px rgba(20,24,12,0.07), 0 2px 4px rgba(20,24,12,0.04)",
        lg: "0 12px 28px rgba(20,24,12,0.09), 0 4px 8px rgba(20,24,12,0.04)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite linear",
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        float: "float 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
