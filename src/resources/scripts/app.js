//namespace : window.secretsanta
var secretsanta = secretsanta || {};

(function() {
  /*global $:false */
  "use strict";

  //private variable
  var nbParticipants = 0;

  //private functions
  var addParticipant = function() {
    var participant = $('input[name=participant]').val();
    $('input[name=participant]').val('');
    if (participant) {
      nbParticipants++;
      $("#participants").prepend("<tr><th>" + nbParticipants + "</th><td>" + participant +
        "</td><td></td><td><button type='button' class='deleteButton'>DELETE</button></td></tr>");
    }
  };

  //public function binding html elements to javascript functions
  secretsanta.init = function() {
    $('input[name=participant]').on("keypress", function(event) {
      if (event.which == 13) {
        addParticipant();
      }
    });

    $('#buttonAdd').on("click", function() {
      addParticipant();
    });

    $('.deleteButton').on("click", function() {
      console.log("delete");
      //$(this).parent().parent().remove();
      //$target.hide('slow', function(){ $target.remove(); });
    });
  };

}());
