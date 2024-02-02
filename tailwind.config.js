/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer-gradient': 'linear-gradient(rgba(0,0,0,80%) 15%,#000)',
        'footer-blend': 'linear-gradient(rgba(7,9,34,0%) 15%,rgba(0,0,0,80%))',
        'card': 'linear-gradient(#14144C,rgba(30,30,125,0))',
        'card-hover': 'linear-gradient(#222274, rgba(30, 30, 125, 0))'
      }
    },
  },
  plugins: [],
}

