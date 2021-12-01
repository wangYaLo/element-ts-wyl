/* eslint-disable no-dupe-keys */
const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir)
}
// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
  lintOnSave: true,
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: './',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: true,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://172.28.6.68:9877', // 张工
        // target: 'http://172.28.14.152:9877', // 廖工
        // target: 'http://172.28.14.149:9877', // 梁工
        // target: 'http://support.gree.com:9877', // 服务器
        target: 'http://test-front-alb-863622653.ap-southeast-1.elb.amazonaws.com:9877' // 测试
        //     ws: true,
        //     changeOrigin: true,
        //     pathRewrite: {}
      }
    }
  },
  configureWebpack: {
    name: 'vue',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': resolve('src'),
        '@img': resolve('src/assets/img'),
        '@css': resolve('src/assets/css'),
        '@api': resolve('src/request/api')
      }
    },
    entry: {
      index: resolve('src/index.ts')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
  }
}
