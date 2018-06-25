/* 0.9.1 */
const CONFIG = {
  app: 'short-message-templates-vue' /* filename of the JS and CSS bundle */
};

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/css/styles.scss',
    './src/js/vue/app.js'
  ],

  output: {
    filename: `${CONFIG.app}.js`,
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    useLocalIp: true,
    watchContentBase: true
  },

  devtool: '#eval-source-map',

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      },
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin(`${CONFIG.app}.css`)
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js' /* use the ES module build without the template compiler */
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

if (process.env.NODE_ENV === 'test') {
  module.exports.target = 'node'

  // exclude NPM deps from test bundle
  module.exports.externals = [require('webpack-node-externals')()]
  // use inline source map so that it works with mocha-webpack
  module.exports.devtool = 'inline-cheap-module-source-map'
}
