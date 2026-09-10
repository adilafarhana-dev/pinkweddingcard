import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dustyRose: {
          50: "#FAF2F3",
          100: "#F4E3E5",
          200: "#E8C5C8",
          300: "#DCA7AC",
          400: "#CF8A90",
          500: "#B86B72",
        },
        pastelRose: {
          50: "#FDFAF9",
          100: "#F7EBEB",
          200: "#EED7D8",
        },
        warmIvory: {
          50: "#FFFFFF",
          100: "#FFFDF9",
          200: "#F9F5EE",
          300: "#F1EADF",
        },
        goldFoil: {
          light: "#F5E8C7",
          DEFAULT: "#D4AF37",
          shimmer: "#EED279",
          dark: "#A38020",
          deep: "#7A5F13",
        },
        charcoal: {
          ink: "#2B2325",
          soft: "#4A3E41",
          muted: "#75666A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        script: ["var(--font-pinyon)", "Pinyon Script", "cursive"],
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      animation: {
        "shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wax-glow": "waxGlow 2.5s infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        waxGlow: {
          "0%": { boxShadow: "0 0 15px rgba(212, 175, 55, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4)" },
          "100%": { boxShadow: "0 0 35px rgba(212, 175, 55, 0.85), inset 0 2px 8px rgba(255, 255, 255, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
