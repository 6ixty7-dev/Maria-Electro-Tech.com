import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
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
        cream: {
          50: "#FFFDF7",
          100: "#FFF8E7",
          200: "#FFF3D6",
          300: "#FFECC0",
          400: "#FFE4A8",
        },
        blush: {
          50: "#FFF5F5",
          100: "#FFF0F0",
          200: "#FFE0E0",
          300: "#FFD0D0",
        },
      },
      fontFamily: {
        script: ["'Dancing Script'", "cursive"],
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        handwritten: ["'Caveat'", "cursive"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
        "envelope-open": "envelopeOpen 0.8s ease-out forwards",
        "letter-unfold": "letterUnfold 0.6s ease-out 0.4s forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.05)" },
        },
        envelopeOpen: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(180deg)" },
        },
        letterUnfold: {
          "0%": { transform: "translateY(0) scaleY(0)", opacity: "0" },
          "100%": { transform: "translateY(-20px) scaleY(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
