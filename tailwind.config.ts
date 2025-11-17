import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "1rem",
        pill: "9999px",
      },
      colors: {
        // New refined color palette
        "bg-base": "#0F0F0F",        // black
        "bg-panel": "#1A1A1A",       // charcoal
        "bg-alt": "#F7F4E9",         // offwhite
        
        // Accent colors
        "accent-yellow": "#F6C63F",
        "accent-yellow-light": "#F4D25B",
        "accent-teal": "#7DB5A5",
        "accent-red": "#C73538",
        "accent-purple": "#7B3DDB",
        "accent-raspberry": "#D94A66",
        
        // Text colors
        "text-primary": "#F3F3F3",
        "text-secondary": "#A3A3A3",
        "text-muted": "#7A7A7A",
        "text-on-accent": "#111111",
        
        // Border colors
        "border-subtle": "#20252A",
        "border-strong": "#363C42",
        
        // Existing shadcn colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          50: "var(--blue-50)",
          500: "var(--primary)",
          600: "var(--blue-600)",
          900: "#0c1222",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        purple: {
          50: "var(--purple-50)",
          100: "var(--purple-100)",
          500: "var(--purple-500)",
          600: "var(--purple-600)",
        },
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
        },
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          500: "var(--green-500)",
          600: "var(--green-600)",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        "soft-card": "0 18px 40px rgba(0,0,0,0.35)",
      },
      maxWidth: {
        content: "1120px",
      },
      spacing: {
        "section-y": "6rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
