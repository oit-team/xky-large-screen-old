const spacing = (() => {
  const spacers = {}
  const spacer = 5
  for (let i = 0, l = 20; i <= l; i++) {
    spacers[i] = `${i * spacer}px`
  }
  return spacers
})()

module.exports = {
  purge: ['./src/**/*.{vue,js,scss}'],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        ...spacing,
        auto: 'auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
