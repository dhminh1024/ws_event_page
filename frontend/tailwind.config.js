/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{html,jsx,tsx,js,ts}"],
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
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
        playlist: ["Playlist"],
        tropen: ["Tropen"]
      },
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
        brand: {
          primary: "hsl(var(--brand-primary))",
          teal: "hsl(var(--brand-teal))",
          persian: "hsl(var(--brand-persian))",
          lime: "hsl(var(--brand-lime))",
          honey: "hsl(var(--brand-honey))",
          amber: "hsl(var(--brand-amber))",
        },
        happy_box: {
          foreground: "hsl(var(--page-foreground))",
          cream: "hsl(var(--page-cream))",
          red: "hsl(var(--page-red))",
          honey: "hsl(var(--page-honey))",
          brick: "hsl(var(--page-brick))",
          blue: "hsl(var(--page-deep-blue))",
          mint: "hsl(var(--page-mint))",
          light_yellow: "hsl(var(--page-light-yellow))",
          light_red: "hsl(var(--page-light-red))"
        },
        hr: {
          background: "#E6EBFF",
          blue: "#172A52",
          honey: "#F5AA1E",
          ember: "#F05023",
          steel_blue: "#3B6DAE",
          lime: "#BED232"
        },
        status: {
          success: "hsl(var(--success))",
          danger: "hsl(var(--danger))",
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
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "swing-left": {
          from: {
            "transform": "rotate(-3deg) scale(1)",
            "transform-origin": "bottom left"
          },
          to: {
            "transform": "rotate(3deg) scale(1.05)"
          }
        },
        "swing-right": {
          from: {
            "transform": "rotate(3deg) scale(1.05)",
            "transform-origin": "bottom right"
          },
          to: {
            "transform": "rotate(-3deg) scale(1)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s linear",
        "fade-out": "fade-out 0.5s linear",
        "swing-left": "swing-left 5s ease-in-out infinite alternate",
        "swing-right": "swing-right 5s ease-in-out infinite alternate"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
