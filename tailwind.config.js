module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        'title': ['Megrim', 'Courier New', 'Courier', 'monospace'],
        'heading':  ['Nanum Gothic Coding', 'Courier New', 'Courier', 'monospace'],
        'body': ['Nanum Gothic', 'Helvetica', 'sans-serif']
      },
      colors: {
        'black': '#191919',
        'purple': '#5B5F97',
        'white': '#FFFFFF',
        'shadow': 'rgba(0, 0, 0, 0.5)',
        'spectrum-1': '#D73B48',
        'spectrum-2': '#E95A54',
        'spectrum-3': '#FF9760',
        'spectrum-4': '#F3BB63',
        'spectrum-5': '#F1CD65',
        'spectrum-6': '#FFE465',
        'spectrum-7': '#CFDB5E',
        'spectrum-8': '#AECD7B',
        'spectrum-9': '#C0DF9E',
        'spectrum-10': '#D8F4C2',
        'spectrum-11': '#D6EACD',
        'spectrum-12': '#EAF9EA'
      },
      height: {
        '96': '24rem',
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem'
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
}
