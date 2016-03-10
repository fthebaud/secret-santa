/**application dependencies**/
// css
require('css/style-main');
// js
module.exports = require('js/secret-santa');

$(document).ready(function() {
  secretsanta.addEventListeners();
});
