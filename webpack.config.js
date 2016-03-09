// modules dependencies
var path = require('path');
var webpack = require("webpack");

// plugins dependencies
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  cache: true,
  resolve: {
    extensions: ['', '.js', '.css'], //extensions to add when resolving modules (dont entry !)
    //directories in which we should look for modules
    root: [path.resolve(__dirname, 'src')], //root of our project (absolute path)
    modulesDirectories: ['node_modules', 'node_modules/bootstrap/dist/css'] //directories for modules resolved via node's resolving algorithm
  },
  context: path.resolve(__dirname, 'src'),
  entry: {
    "secret-santa": ['index.js']
  },
  output: {
    filename: 'resources/[name]-bundle-[hash].js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'secretsanta'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    }, {
      test: /\.eot$/,
      loader: "file-loader",
      query: {
        name: 'resources/[name].[ext]'
      }
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url-loader",
      query: {
        limit: '5000',
        prefix: 'font/',
        name: 'resources/[name].[ext]'
      }
    }, {
      test: /\.ttf$/,
      loader: "url-loader",
      query: {
        limit: '10000',
        mimetype: 'application/octet-stream',
        name: 'resources/[name].[ext]'
      }
    }, {
      test: /\.svg$/,
      loader: "url-loader",
      query: {
        limit: '10000',
        mimetype: 'image/svg+xml',
        name: 'resources/[name].[ext]'
      }
    }, {
      // TODO: tester en url loader
      test: /\.png$/,
      loader: "file-loader",
      query: {
        limit: '10000',
        mimetype: 'image/png',
        name: 'resources/[name].[ext]'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false
    }),
    //cssExtractor
    new ExtractTextPlugin('resources/[name]-bundle-[hash].css'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: "jquery"
    }),
  ]
};
