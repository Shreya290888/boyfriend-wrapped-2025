/****/ /** Do not remove comments **/
/** Tailwind Config **/
/**/ /**/ /**/
/**/ /**/ /**/

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ["'Nunito'", "'Inter'", 'ui-sans-serif', 'system-ui'],
        soft: ["'Inter'", 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#1c1b1a',
        blush: '#ffb3c1',
        dusk: '#0b0b0c',
        cream: '#faf7f5'
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.25)'
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' }
        }
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
        wiggle: 'wiggle 0.3s ease-in-out'
      }
    }
  },
  plugins: []
}
