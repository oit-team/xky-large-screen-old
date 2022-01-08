const spacing = (() => {
  const spacers = {}
  const spacer = 5
  for (let i = 0, l = 20; i <= l; i++) {
    spacers[i] = `${i * spacer}px`
  }
  return spacers
})()

const corePlugins = [
  'display',
  'backgroundColor',
  'overflow',
  'position',
  'inset',
  'zIndex',
  'flex',
  'flexDirection',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gap',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'alignContent',
  'alignItems',
  'alignSelf',
  'placeContent',
  'placeItems',
  'placeSelf',
  'padding',
  'margin',
  'space',
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'textColor',
  'textOpacity',
  'textDecoration',
  'textOverflow',
  'verticalAlign',
  'whitespace',
  'wordBreak',
  'backgroundColor',
  'backgroundOpacity',
  'borderRadius',
  'borderWidth',
  'borderColor',
  'borderOpacity',
  'borderStyle',
  'divideWidth',
  'divideColor',
  'divideOpacity',
  'divideStyle',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'cursor',
  'userSelect',
  'translate',
  'transform',
]

const variants = (() => {
  const map = {}
  corePlugins.forEach(item => {
    map[item] = []
  })
  return map
})()

module.exports = {
  important: '#app',
  purge: ['./src/**/*.{vue,js,scss,sass}'],
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
  // 启用哪些样式
  corePlugins,
  variants: {
    ...variants,
  },
}
