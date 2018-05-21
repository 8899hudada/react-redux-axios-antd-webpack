const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const happypackFactory = require('./happypack')

const ROOT_PATH = path.resolve(__dirname, '../')
const GLOBAL_CONFIG = require(`../config/${process.env.ENV}.env.js`)

module.exports = {
  output: {
    filename: '[name].[chunkHash].bundle.js'
  },
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: [ // 除去node_modules和src/styles/common下面的less文件，其他less文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: ExtractTextPlugin.extract({
          use: 'happypack/loader?id=less.production.modules',
          fallback: 'style-loader'
        })
      },
      {
        test: /.less$/,
        include: path.resolve(ROOT_PATH, 'src/styles/common'),
        use: ExtractTextPlugin.extract({
          use: 'happypack/loader?id=less.production',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        exclude: [ // 除去node_modules和src/styles/common下面的css文件，其他css文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: ExtractTextPlugin.extract({
          use: 'happypack/loader?id=css.production.modules',
          fallback: 'style-loader'
        })  
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: ExtractTextPlugin.extract({
          use: 'happypack/loader?id=css.production',
          fallback: 'style-loader'
        })  
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 使用hash作为模块的命名，防止新加入模块后，缓存模块的chunkHash变化，导致缓存失效
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      exclude: ['dll']
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].bundle.css',
      allChunks: true //当有多个js文件时需要将此项设置为true
    }),
    new webpack.DefinePlugin(GLOBAL_CONFIG), //向代码里注入配置文件的变量
    happypackFactory('less.production.modules'),
    happypackFactory('less.production'),
    happypackFactory('css.production.modules'),
    happypackFactory('css.production')
  ]
}

