module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        'title': ['Megrim', 'Courier New', 'Courier', 'monospace'],
        'heading':  ['Do Hyeon', 'Trebuchet MS', 'Helvetica', 'sans-serif'],
        'body': ['Nanum Gothic', 'Helvetica', 'sans-serif']
      },
      colors: {
        'black': '#191919',
        'purple': '#5B5F97',
        'white': '#FFFFFF'
      },
      height: {
        '128': "32 rem",
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [],
}
