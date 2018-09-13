const webpack = require('webpack')
const path = require('path')
const happypackFactory = require('./happypack')
const DEV_API_ROOT = require('../config/dev-api-root')

const ROOT_PATH = path.resolve(__dirname, '../')
const GLOBAL_CONFIG = require(`../config/${process.env.ENV}.env.js`)

module.exports = {
  output: {
    filename: '[name].[hash].bundle.js'
  },
  devServer: {
    port: process.env.npm_config_PORT || 8082,
    hot: true,
    inline: true,
    progress: true,
    contentBase: path.resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    open: true,
    overlay: true,
    proxy: { // 处理跨域问题
      '/proxy/*': {
        target: DEV_API_ROOT,
        pathRewrite: {
          '^/proxy': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: [ // 除去node_modules和src/styles/common下面的less文件，其他less文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: 'happypack/loader?id=less.development.modules'
      },
      {
        test: /.less$/,
        include: path.resolve(ROOT_PATH, 'src/styles/common'),
        use: 'happypack/loader?id=less.development'
      },
      {
        test: /\.css$/,
        exclude: [ // 除去node_modules和src/styles/common下面的css文件，其他css文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: 'happypack/loader?id=css.development.modules'
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: 'happypack/loader?id=css.development'
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(ROOT_PATH, `dist/dll/${process.env.NODE_ENV}/devWebpack-manifest.json`)
    }),
    new webpack.DefinePlugin(GLOBAL_CONFIG), //向代码里注入配置文件的变量
    happypackFactory('less.development'),
    happypackFactory('less.development.modules'),
    happypackFactory('css.development'),
    happypackFactory('css.development.modules')
  ]
}