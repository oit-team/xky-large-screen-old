const tailwindcss = require('tailwindcss')
const pxtoviewport = require('postcss-px-to-viewport')
const autoprefixer = require('autoprefixer')
const projectConfig = require('./src/project.config')

module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
          pxtoviewport({
            viewportWidth: projectConfig.viewportWidth, // UI设计稿的宽度
            unitPrecision: 6, // 保留精度
          }),
        ],
      },
    },
  },
}
