/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        cyber: {
          900: '#0a0a0f',
          800: '#12121e',
          700: '#1a1a2e',
          600: '#16213e',
        },
        neon: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          green: '#4ade80',
          pink: '#ec4899',
          yellow: '#facc15',
          orange: '#fb923c',
        },
        retro: {
          bg: '#0f0f23',
          card: '#1a1a3e',
          border: '#2d2d5e',
        }
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.3), 0 0 10px rgba(34, 211, 238, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.2)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
