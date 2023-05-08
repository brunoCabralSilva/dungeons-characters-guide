/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mobile': "url('images/wallpapers/mobile.jpg')",
        'fullscreen': "url('images/wallpapers/fullScreen.jpeg')",
      },
      spacing: {
        '3vh': '3vh',
      }
    },
    screens: {
      'sm3': '300px',
      'sm2': '450px',
      'sm':	'640px',
      'md':	'768px',
      'lg':	'1024px',
      'xl':	'1280px',
      '2xl': '1536px',
    },

  },
  plugins: [],
}
