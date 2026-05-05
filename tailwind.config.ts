import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "#F8FAFC",
        foreground: "#0B1220",
        brand: {
          primary: "#4F46E5",
          gradient: {
            start: "#4F46E5",
            via: "#6366F1",
            end: "#7C3AED",
          },
          accent: "#F97316",
          text: {
            primary: "#0B1220",
            secondary: "#475569",
          },
          border: "#E2E8F0",
          card: "#FFFFFF",
          success: "#10B981",
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 0 50px -12px rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
