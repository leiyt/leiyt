'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const autoprefixer=require("autoprefixer")

var glob = require('glob')

var entries = getEntry(['./src/pages/*.js', './src/pages/**/*.js']); // 获得入口js文件

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// var entries = getEntry('./src/module/**/*.js'); // 获得入口js文件

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry: entries,

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/style'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          vueLoaderConfig,
          postcss:[require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6'] })]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
          name: utils.assetsPath('img/[name].[ext]')   // 解决多页打包后 文件唯一性 造成的 替换问题
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('media/[name].[hash:7].[ext]')
          name: utils.assetsPath('media/[name].[ext]')   // 解决多页打包后 文件唯一性 造成的 替换问题
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          name: utils.assetsPath('fonts/[name].[ext]')   // 解决多页打包后 文件唯一性 造成的 替换问题
        }
      }
    ]
  }
}


function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  return entries;
}
