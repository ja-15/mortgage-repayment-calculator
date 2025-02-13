import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "Lime": 'hsl(61, 70%, 52%)',
        "light-red": "hsl(4, 69%, 50%)",
        "White": "hsl(0, 0%, 100%)",
        "Slate-900": "hsl(202, 55%, 16%)"
      },

    },
  },
  plugins: [],
} satisfies Config;
