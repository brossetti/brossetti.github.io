module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      colors: {
        space: '#191919',
        exo: '#5B5F97',
        thermo: '#D199B6',
        meso: '#68C3D4',
        tropo: '#A9FFF7',
        terra: '#43AA8B'
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [],
}
