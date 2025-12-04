/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores institucionales UNMSM (MANTENER)
        unmsm: {
          primary: '#6F191C',
          dark: '#4A1113',
          light: '#8F2428',
          lighter: '#B8383C',
        },
        // Colores de acento
        accent: {
          blue: '#2563EB',
          blueLight: '#3B82F6',
          green: '#10B981',
          greenLight: '#34D399',
          orange: '#F59E0B',
          orangeLight: '#FBBF24',
          red: '#EF4444',
          redLight: '#F87171',
        },
        // Fondos estilo LinkedIn
        background: {
          main: '#F3F2EF',      // Fondo beige claro LinkedIn
          card: '#FFFFFF',       // Cards blanco puro
          hover: '#F8F8F8',      // Hover sutil
        },
        // Bordes estilo LinkedIn
        border: {
          light: '#E0DFDC',      // Borde muy claro
          medium: '#D0CFCC',     // Borde medio
        },
        // Texto estilo LinkedIn
        text: {
          primary: '#000000',    // Negro
          secondary: '#666666',  // Gris medio
          tertiary: '#999999',   // Gris claro
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'card': 'none',                                    // Sin sombra (LinkedIn style)
        'card-hover': '0 0 0 1px rgba(0, 0, 0, 0.08)',   // Borde sutil en hover
        'navbar': '0 1px 2px rgba(0, 0, 0, 0.08)',        // Sombra navbar
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'card': '8px',         // Bordes más sutiles (LinkedIn)
        'button': '24px',      // Botones redondeados
        'input': '4px',
      },
      transitionDuration: {
        'fast': '150ms',       // Transiciones rápidas (LinkedIn)
        'normal': '200ms',
        'slow': '300ms',
      },
    },
  },
  plugins: [],
}

