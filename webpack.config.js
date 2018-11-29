// webpack 用于打包项目的资源
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 引入html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// ExtractPlugin 将非html的资源作为单独的文件打包出来
const ExtractPlugin = require('extract-text-webpack-plugin')
const path = require('path');// 获取当前路径对象
const isDev = process.env.NODE_ENV === 'development'

const config = {
  
  // 1.声明入口路径 使用绝对路径
  // __dirname 是当前文件路径，即根目录
  // join函数将2个参数拼接为一个
  entry:path.join(__dirname,'src/index.js'),
  // 2.声明出口路径 使用绝对路径
  output:{
    filename:'bundle.[hash:8].js',
    path:path.join(__dirname,'dist')
  },
  // 3.声明使用到的插件
  plugins: [
    // 此处添加webpack.DefinePlugin使得其内的变量可以在我们的JS中访问到
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      title:"Vue自构建项目",// 生成html文件的标题
      filename: 'index.html', // 就是html文件的文件名，默认是index.html
      // template: 'index.html',
      inject: 'body', // script标签位于html文件的 body 底部
      // favicon:path.join(__dirname,'src/assets/images/cir_select.png'),
      meta:[
        { name:'viewport', content:'width=device-width, initial-scale=1.0,use-scalable=no' },
        { name:'keywords', content:'vue' },
        { name:'keywords', content:'webpack,构建' }
      ],
    })
  ],
  // 4.声明当前的模式 '开发' 或者 '生产'
  mode:"development",//'development' or 'production'
  // 5.声明模块规则，如指定的文件类型.vue 通过什么来加载编译
  module:{
    rules:[
      { test:/\.vue$/, loader:'vue-loader' },
      { test:/\.jsx$/, loader:'babel-loader' },
      // { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { 
        test:/\.(gif|jpg|jepg|png|svg)/,
        use:[
          { 
            loader:'url-loader',
            options:{
              limit:1024,
              name:'[name]-pic.[ext]'
            }
          }
        ]
      }
      
    ]
  },
  // 6.声明编译的目标是web平台
  target:'web'

}
// 7.设置当开发环境时多一个配置项
if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port:8000,
    host:'0.0.0.0', // 同个局域网内别人可以访问你的电脑web页面,手机也可以访问
    overlay:{
      errors:true,//编译过程有任何的错误都显示在网页上
    },
    // open:true, // 执行dev命令自动打开页面
    hot:true,
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  config.module.rules.push({ 
    test:/\.styl(us)?$/,
    use:[
      {loader:'style-loader'},
      {loader:'css-loader'},
      {
        loader:'postcss-loader',
        options:{
          sourceMap:true,
        }
      },
      {loader:'stylus-loader'}
    ] 
  })
}else{
  config.entry = {
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({ 
    test:/\.styl(us)?$/,
    use:ExtractPlugin.extract({
      fallback:'style-loader',
      use:[
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            sourceMap:true,
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css')
  )
  config.optimization = {
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
  }
}

module.exports = config