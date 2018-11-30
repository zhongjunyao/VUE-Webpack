// webpack 用于打包项目的资源

const path = require('path');// 获取当前路径对象
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 6.声明编译的目标是web平台
  target: 'web',
  // 1.声明入口路径 使用绝对路径
  // __dirname 是当前文件路径，即根目录
  // join函数将2个参数拼接为一个
  entry: path.join(__dirname, '../client/index.js'),
  // 2.声明出口路径 使用绝对路径
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  // 4.声明当前的模式 '开发' 或者 '生产'
  mode: "development",//'development' or 'production'
  // 5.声明模块规则，如指定的文件类型.vue 通过什么来加载编译
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        //eslint检查报告的格式规范
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      { test: /\.jsx$/, loader: 'babel-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(gif|jpg|jepg|png|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

}


module.exports = config
