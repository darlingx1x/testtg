module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          DEFAULT: '#18181B', // глубокий тёмный фон
          light: '#23232A',
          accent: '#FFD700', // золотой акцент
          accent2: '#00C6AE', // бирюзовый акцент
          surface: '#222226',
          border: '#2A2A31',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        card: '0 4px 24px 0 rgba(0,0,0,0.12)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
      },
      transitionProperty: {
        'bg': 'background-color',
        'color': 'color',
      },
    },
  },
  plugins: [],
}; 