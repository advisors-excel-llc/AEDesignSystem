const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const path = require('path')
const entries = function () {
  const files = WebpackWatchedGlobEntries.getEntries(
    [
      path.resolve(__dirname, 'src/**/*.jsx'),
      path.resolve(__dirname, 'src/**/*(!.test.).js')
    ],
    {
    ignore: '**/__tests__/*'
  })()
  files.index = Object.keys(files)

  return files
}

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    library: 'aeDesignSystem',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  },
  plugins: [
    new WebpackWatchedGlobEntries(),
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