const webpack = require('webpack')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: ['babel-polyfill', path.resolve(__dirname, 'lib/index.js')]
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'lib')]
  },
  plugins: [
    new MiniExtractCssPlugin({
      filename: '[name].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.s?[ac]?ss$/,
        use: [
          MiniExtractCssPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff2?|svg|ttf|gif|png[8|24|32]?|jpe?g|tiff?)/,
        use: ['file-loader']
      }
    ]
  }
}