const path = require('path')

const babelConfig = require('./babel.config')

module.exports = {
  mode: process.env.NODE_ENV,
  bail: true,
  name: 'web',
  target: 'web',
  devtool: 'source-map',

  entry: [path.join(__dirname, `index.js`)],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelConfig,
              sourceMaps: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.js', '.jsx'],
  },
}
