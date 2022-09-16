const spacing = (() => {
  const spacers = {}
  const spacer = 5
  for (let i = 0, l = 20; i <= l; i++)
    spacers[i] = `${i * spacer}px`

  return spacers
})()

module.exports = {
  important: '#app',
  darkMode: false,
  theme: {
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50, // 基准
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
      auto: 'auto',
    },
    extend: {
      spacing: {
        ...spacing,
        auto: 'auto',
      },
      borderRadius: {
        circle: '50%',
      },
      colors: {
        gray: {
          DEFAULT: '#f2f2f2',
        },
      },
    },
  },
  plugins: [],
}
