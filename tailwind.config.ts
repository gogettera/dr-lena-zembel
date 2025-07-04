
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // Premium Dental Brand Colors - World-Class Design
        dental: {
          primary: 'hsl(221 83% 53%)',        // #007AFF - Professional trust
          'primary-dark': 'hsl(221 100% 40%)', // #0056CC - Authority depth
          'primary-light': 'hsl(221 100% 70%)', // #66B3FF - Approachable
          coral: 'hsl(12 100% 70%)',          // #FF6B6B - Warmth & care
          'coral-light': 'hsl(12 100% 85%)',  // Soft coral accents
          mint: 'hsl(171 100% 42%)',          // #00D4AA - Health & fresh
          cream: 'hsl(40 40% 98%)',           // #FAFAFA - Pure cleanliness
          gold: 'hsl(45 100% 50%)',           // #FFB800 - Premium quality
          navy: 'hsl(220 13% 11%)',           // #1C1C1E - Sophistication
          white: '#FFFFFF',
          black: 'hsl(220 13% 11%)',
        },
        // Premium Gray Scale - Apple-inspired precision
        gray: {
          50: 'hsl(0 0% 98%)',      // #FAFAFA
          100: 'hsl(220 14% 96%)',   // #F2F2F7
          200: 'hsl(220 13% 91%)',   // #E5E5EA
          300: 'hsl(220 9% 82%)',    // #D1D1D6
          400: 'hsl(220 10% 78%)',   // #C7C7CC
          500: 'hsl(220 9% 69%)',    // #AEAEB2
          600: 'hsl(220 9% 58%)',    // #8E8E93
          700: 'hsl(220 9% 39%)',    // #636366
          800: 'hsl(220 13% 29%)',   // #48484A
          900: 'hsl(220 13% 11%)',   // #1C1C1E
        },
        // Premium System Colors
        blue: 'hsl(221 83% 53%)',     // #007AFF
        green: 'hsl(142 71% 45%)',    // #34C759
        orange: 'hsl(35 100% 50%)',   // #FF9500
        red: 'hsl(4 90% 58%)',        // #FF3B30
        purple: 'hsl(281 100% 58%)',  // #AF52DE
        pink: 'hsl(322 100% 60%)',    // #FF2D92
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: '0.125rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'base': ['1rem', { lineHeight: '1.65', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.015em' }],
        'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.05em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.06em' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600', 
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      boxShadow: {
        // Premium shadow system
        'soft': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'button-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'floating': '0 20px 40px rgba(0, 0, 0, 0.06)',
        'focus': '0 0 0 3px hsl(221 83% 53% / 0.2)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.3)',
        'premium': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem', 
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      animation: {
        // Premium animation system
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "premium-float": "premium-float 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "premium-glow": "premium-glow 2s ease-in-out infinite",
        "premium-shimmer": "premium-shimmer 2s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "premium-float": {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        },
        "premium-glow": {
          "0%, 100%": { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" },
          "50%": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)" }
        },
        "premium-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'premium-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'apple': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

