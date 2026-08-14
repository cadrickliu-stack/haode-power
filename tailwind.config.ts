import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060D1A",
          900: "#0B1F3A",
          800: "#102A4C",
          700: "#14335E",
          600: "#1C4272",
        },
        steel: {
          400: "#7C8CA5",
          500: "#5C6E88",
          600: "#45566E",
        },
        orange: {
          500: "#F26522",
          600: "#DC5416",
          400: "#FF8A3D",
          300: "#FFA733",
        },
        ink: "#0A0E14",
        paper: "#F6F7F9",
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      clipPath: {
        angle: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drawLine: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeIn: "fadeIn 1s ease forwards",
        marquee: "marquee 30s linear infinite",
        drawLine: "drawLine 1.2s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
