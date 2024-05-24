/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'fff5e1': '#FFF5E1',
        'ff7043': '#FF7043',
        'ffcc80': '#FFCC80',
        '66bb6a': '#66BB6A',
        'ef5350': '#EF5350',
        'ffca28': '#FFCA28'
        // ... add other colors similarly
      },
      textColor: {
        '4e342e': '#4E342E',
        '42a5f5': '#42A5F5',
        // ... add other colors similarly
      },
      borderColor: {
        '8bc34a': '#8BC34A',
        // ... add other colors similarly
      }
      // ... continue for other utilities like `borderColor`, `gradientColorStops` etc.
    },
    
  },
  plugins: [],
}

