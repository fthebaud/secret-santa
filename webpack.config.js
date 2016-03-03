var path = require('path');

module.exports = {
  resolve : {
    // TODO: voir si le build est plus rapide en étant plus précis au niveau du node_modules
    modulesDirectories: ['src/javascript', 'node_modules']
  },
  entry: {
    "secret-santa": ['./src/main.js']
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'secretsanta'
  }
};
