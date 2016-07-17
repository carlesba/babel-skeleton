const webpack = require('webpack')
const path = require('path')
const bourbonPaths = require('bourbon').includePaths

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '8888'

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './index.js' // Your appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'resolve-url', 'sass']
      },
      {
        test: /(\.png|\.woff|.ttf)$/,
        loaders: ['url'],
        include: __dirname
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    contentBase: './public',
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  sassLoader: {
    includePaths: [
      path.join(__dirname, '/src/styles'),
      bourbonPaths
    ],
    indentedSyntax: true
  }
}
