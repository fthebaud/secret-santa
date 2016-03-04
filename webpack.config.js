var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js'], //extensions to add when resolving modules (dont entry !)
    //directories in which we should look for modules
    root: [path.resolve(__dirname, 'src')], //root of our project (absolute path)
    modulesDirectories: ['node_modules'] //directories for modules resolved via node's resolving algorithm
  },
  entry: {
    "secret-santa": ['./src/index.js']
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'secretsanta'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: "file-loader?name=[name].html"
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false
    })
  ]
};
