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
    }
  },
  plugins: [],
}
