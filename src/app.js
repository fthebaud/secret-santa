console.log('start app');

/**application dependencies**/
//THIS IS THE MAIN MODULE (entry point). IT WILL BE EXPORTED BY WEBPACK UNDER THE VAR secretsanta
// css
require('css/style-main');
// js
module.exports = require('js/secret-santa-gui');

//initialisation
$(document).ready(function() {
  secretsanta.wireGui();
});


console.log('end app');
