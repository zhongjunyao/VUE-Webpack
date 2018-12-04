// webpack 用于打包项目的资源
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 引入html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// ExtractPlugin 将非html的资源作为单独的文件打包出来
const ExtractPlugin = require('extract-text-webpack-plugin')
// 合并配置工具
const merge = require('webpack-merge')
// 导入基础配置
const baseConfig = require('./webpack.config.base.js')

const path = require('path');// 获取当前路径对象
const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8000,
  host: '0.0.0.0', // 同个局域网内别人可以访问你的电脑web页面,手机也可以访问
  overlay: {
    errors: true,//编译过程有任何的错误都显示在网页上
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  // open:true, // 执行dev命令自动打开页面
  hot: true,
}

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
    new HTMLPlugin({
      title: "Vue自构建项目",// 生成html文件的标题
      filename: 'index.html', // 就是html文件的文件名，默认是index.html
      // template: 'index.html',
      inject: 'body', // script标签位于html文件的 body 底部
      // favicon:path.join(__dirname,'client/assets/images/cir_select.png'),
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0,use-scalable=no' },
        { name: 'keywords', content: 'vue' },
        { name: 'keywords', content: 'webpack,构建' }
      ],
    })
  ],
}
let config
// 7.设置当开发环境时多一个配置项
if (isDev) {
  config = merge(baseConfig, defaultConfig, {
    // 4.声明当前的模式 '开发' 或者 '生产'
    mode: "development",//'development' or 'production'
    // devtool: '#cheap-module-eval-source-map',
    devServer,
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
} else {
  config = merge(baseConfig, defaultConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    plugins: [
      new ExtractPlugin('styles.[chunkhash:8].css')
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime.${entrypoint.name}`
      }
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
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
              'stylus-loader'
            ]
          })
        }
      ]
    }
  })
}

module.exports = config
