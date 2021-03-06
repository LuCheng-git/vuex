
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports={
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/name.scss";
        `
      },
      scss: {
        prependData: `@import "~@/variables.scss";`
      },
      less:{
        globalVars: {
          primary: '#fff'
        }
      }
    }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  },

  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg
    config.module
        .rule('svg-smart')
        .test(/\.svg$/)
        .include
        .add(resolve('src/icons')) //处理svg目录
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
  }



}

