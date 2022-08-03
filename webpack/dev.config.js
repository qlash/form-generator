const { merge } = require('webpack-merge')
const sharedConfig = require('./shared.config.js')

module.exports = merge(sharedConfig, {
  mode: 'development',
  devtool: 'source-map',
  
  devServer: {
    static: './dist',
  },
})
