const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    configureWebpack: config => {
        config.plugins.push(AutoImport({
            resolvers: [ElementPlusResolver()]
          }))
          config.plugins.push(Components({
            resolvers: [ElementPlusResolver()]
          }))
    },
  devServer: {
      https: false,
      proxy: {
        '/vue': {
          target: 'http://localhost:8090/api/v1'
        }
      }
  },
  css: {
    loaderOptions: {
      sass: {
        // 8版本用prependData
        additionalData: `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  }
}
