var path = require('path');

module.exports = {
  resolve : {
    // TODO: utilite du '' ?
    extensions: ['','.js'],
    //pour pouvoir faire require('js/secret-santa'); au lieu de require('./src/js/secret-santa');
    root: path.resolve(__dirname, 'src'),
    // TODO: voir si le build est plus rapide en etant plus precis au niveau du node_modules
    modulesDirectories: ['node_modules']
  },
  entry: {
    "secret-santa": ['./src/index.js']
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'secretsanta'
  }
};
