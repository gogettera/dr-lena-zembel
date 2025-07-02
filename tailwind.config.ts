
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
        dental: {
          navy: '#2C3E50',     // Deep sophisticated blue
          sky: '#74B9FF',      // Soft French blue  
          ocean: '#0984E3',    // Classic French blue
          azure: '#DDD6FE',    // Lavender
          pink: '#FDF2F8',     // Soft rose
          orange: '#E67E22',   // Warm sophisticated orange
          beige: '#FAF9F7',    // Warm ivory
          textDark: '#2C3E50', // Rich charcoal
          muted: '#6C757D',    // Sophisticated muted
          accent: '#FDCB6E',   // Golden accent
          highlight: '#FFE8E8', // Soft blush
          champagne: '#F7ECE1', // Champagne
          pearl: '#F8F6F0',     // Pearl white
          sage: '#A8B5A0',      // Sage green
          lavender: '#E6E6FA',  // French lavender
          cream: '#FFFDD0',     // Cream
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        "elegant-fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "french-slide": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in": "slide-in 0.8s ease-out forwards",
        "elegant-fade-in": "elegant-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "french-slide": "french-slide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
      },
      fontFamily: {
        sans: ['Inter', 'Assistant', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Heebo', 'system-ui', 'serif'],
        body: ['Inter', 'Assistant', 'system-ui', 'sans-serif'],
        elegant: ['Crimson Text', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px -2px rgba(44, 62, 80, 0.08), 0 2px 8px -1px rgba(44, 62, 80, 0.04)',
        'premium': '0 8px 32px -4px rgba(44, 62, 80, 0.12), 0 4px 16px -2px rgba(44, 62, 80, 0.08)',
        'french': '0 10px 40px -10px rgba(44, 62, 80, 0.15)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(230, 126, 34, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'elegant': '0.025em',
        'wide': '0.05em',
        'wider': '0.1em',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
