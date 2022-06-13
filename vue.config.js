/*
 * @Descripttion:
 * @Author: voanit
 * @Date: 2022-06-13 21:40:47
 * @LastEditors: voanit
 * @LastEditTime: 2022-06-13 22:27:34
 */
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL, // 根地址，默认/
  outputDir: 'dist', // 打包目录
  assetsDir: 'assets', // 静态资源目录
  lintOnSave: true,
  productionSourceMap: false, // 建议生产关闭
  devServer: {
    open: true,
    host: 'localhost',
    port: 8088,
    https: false,
    hot: 'only',
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://192.168.1.54:3007',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 别名
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  transpileDependencies: true
})
