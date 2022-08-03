const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    'FormGenerator': path.join(__dirname, '..', 'src', 'libs', 'FormGenerator.js'),
    'FormValidator': path.join(__dirname, '..', 'src', 'libs', 'FormValidator.js'),
    'scss': path.join(__dirname, '..', 'src', 'scss', 'style.scss'), 
  },

  output: {
    clean: true,
    library: '[name]',
    filename: '[id].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
