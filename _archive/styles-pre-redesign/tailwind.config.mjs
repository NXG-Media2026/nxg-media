/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0033CC',
          dark: '#002299',
          light: '#3366FF',
        },
        bg: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F5',
          white: '#FFFFFF',
        },
        text: {
          DEFAULT: '#111111',
          muted: '#555555',
          inverse: '#FFFFFF',
        },
        border: '#E0E0E0',
        accent: {
          DEFAULT: '#FFE600',
          dark: '#E6CF00',
          light: '#FFF9C4',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        body: ['"Inter Variable"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        script: ['"Caveat"', '"Segoe Print"', 'cursive'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        image: '16px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text.muted'),
            '--tw-prose-headings': theme('colors.text.DEFAULT'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.DEFAULT'),
            '--tw-prose-bullets': theme('colors.primary.DEFAULT'),
            '--tw-prose-counters': theme('colors.primary.DEFAULT'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.text.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
            maxWidth: 'none',
            lineHeight: '1.8',
            fontSize: '1.0625rem',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'rgba(0, 51, 204, 0.3)',
              transition: 'text-decoration-color 200ms',
              '&:hover': {
                textDecorationColor: theme('colors.primary.dark'),
              },
            },
            h2: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '800',
              fontSize: '1.75em',
              marginTop: '2.5em',
              marginBottom: '0.75em',
              lineHeight: '1.2',
            },
            h3: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '700',
              fontSize: '1.375em',
              marginTop: '2em',
              marginBottom: '0.6em',
              lineHeight: '1.25',
            },
            h4: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '700',
              fontSize: '1.125em',
              marginTop: '1.75em',
              marginBottom: '0.5em',
            },
            'ul > li': {
              paddingLeft: '0.25em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ol > li': {
              paddingLeft: '0.25em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              lineHeight: '1.7',
            },
            strong: {
              fontWeight: '700',
            },
            hr: {
              marginTop: '2.5em',
              marginBottom: '2.5em',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.8',
            p: {
              marginTop: '1.35em',
              marginBottom: '1.35em',
            },
            h2: {
              fontSize: '1.875em',
              marginTop: '2.5em',
              marginBottom: '0.8em',
            },
            h3: {
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '0.65em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
