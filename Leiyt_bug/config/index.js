'use strict'
const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    host: 'localhost',
    port: 8087,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    
    cssSourceMap: false
   
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    // assetsPublicPath: '/oss/',    // 根目录创建 oss 文件夹(img,js,css)
    // assetsPublicPath: 'https://ykdstatic.52dd.cn/oss/',   // 正式环境
    // assetsPublicPath: 'https://ykdstatic.52dd.cn/oss/wnl/',   // 正式环境 wnl
    assetsPublicPath: 'https://ykdstatic.52dd.cn/oss/',   // 正式环境 52dd

    // assetsPublicPath: '/',     //  默认

    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
}
