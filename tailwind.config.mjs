/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F4E5F',
          dark: '#163A47',
          light: '#3E7589',
        },
        bg: {
          DEFAULT: '#F5EFE6',
          alt: '#FAF6EF',
          white: '#FFFFFF',
        },
        text: {
          DEFAULT: '#2A2A2A',
          muted: '#6B6B6B',
          inverse: '#F5EFE6',
        },
        border: '#E5DDD0',
        accent: {
          DEFAULT: '#C17B5A',
          dark: '#A66745',
          light: '#F0DED3',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter Variable"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        image: '16px',
      },
    },
  },
  plugins: [],
};
