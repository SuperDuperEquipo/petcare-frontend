/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rosas
        petPink:          '#E91E63',
        petPinkMid:       '#C11952',
        petPinkDark:      '#981340',
        petPinkLight:     '#FDEFF4',
        petPinkLighter:   '#FBDAE6',
        // Índigos
        petIndigo:        '#4448C5',
        petIndigoDark:    '#2C2F81',
        petIndigoMid:     '#383BA3',
        petIndigoLight:   '#F3F3FB',
        petIndigoLighter: '#E2E2F6',
        petIndigoSubtle:  '#D0D1F0',
        // Neutros
        petDark:          '#14163D',
        petMuted:         '#8A8CDB',
        petSubtle:        '#ADAFE5',
        petCard:          '#F9F9FE',
        petBorder:        '#EDEDFB',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}