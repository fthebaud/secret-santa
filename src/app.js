console.log('start app');

/**application dependencies**/
//THIS IS THE MAIN MODULE (entry point). IT WILL BE EXPORTED BY WEBPACK UNDER THE VAR secretsanta
// css
require('css/style-main');
// js
var secretsantalib = require('js/secret-santa-lib');

var initialize = function() {
  console.log('todo');
  console.dir(secretsantalib);
};

module.exports = {
  initialize: initialize
};

console.log('end app');
