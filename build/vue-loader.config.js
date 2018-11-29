// const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev)=>{
  return {
    preserveWhitespace:true,  // 使得vue中存在的空格不被渲染
    extractCSS:!isDev,    //  使用extract插件处理.vue文件的css,单独打包到文件
    cssModules:{
      // localIndetName 当使用cssmodules调用css的时候会生成一个独一无二的类名
      localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
      camelCase:true  // 设置样式类名为驼峰命名
    },
    // postcss
    // hotReload:false   // 设置.vue文件template内容的热重载，默认根据process.env.NODE_ENV的值自动生成，当为production时会关闭
    // 定义.vue文件中的模块 如template、style、script模块
    // loaders:{
    //   'docs':docsLoader
    // }
  }
}