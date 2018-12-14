// webpack 用于打包项目的资源
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 引入html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 合并配置工具
const merge = require('webpack-merge')
// 导入基础配置
const baseConfig = require('./webpack.config.base.js')

const path = require('path');// 获取当前路径对象
const isDev = process.env.NODE_ENV === 'development'

let defaultConfig = {
  // 3.声明使用到的插件
  plugins: [
    // 此处添加webpack.DefinePlugin使得其内的变量可以在我们的JS中访问到
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
  ],
}
let config = merge(baseConfig, defaultConfig, {
  entry: path.join(__dirname, '../client/server-entry.js'),
  // 4.声明当前的模式 '开发' 或者 '生产'
  mode: "development",//'development' or 'production'
  devtool: 'source-map',
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          { loader: 'stylus-loader' }
        ]
      }
    ]
  }
})


module.exports = config
