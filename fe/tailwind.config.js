/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hotel-pattern': "url('/public/hotel.jpg')"
      },
    },
    plugins: [],
  }
}