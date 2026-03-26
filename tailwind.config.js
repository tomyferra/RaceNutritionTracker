/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d1410',
        surface: '#141b12',
        card: '#1b2619',
        card2: '#202e1d',
        border: '#263322',
        border2: '#3a4e35',
        amber: {
          DEFAULT: '#e8a020',
          l: '#f5c060',
          d: '#b87818',
        },
        green: {
          DEFAULT: '#52a852',
          d: '#346e34',
        },
        blue: {
          DEFAULT: '#4090c8',
        },
        red: {
          DEFAULT: '#c84040',
        },
        text: '#dcdad0',
        text2: '#7a9274',
        text3: '#4a5e46',
      },
      fontFamily: {
        font: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
        display: ['"Bebas Neue"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
