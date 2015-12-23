//namespace : window.secretsanta
var secretsanta = secretsanta || {};

(function() {
  /*global $:false */
  "use strict";

  //private stuff (hidden in the closure)
  var nbParticipants = 0;

  var renumberRows = function() {
    $('.participant').each(function (i) {
      $(this).children('.participantId').text(nbParticipants - i);
    });
  };

  //public static functions
  secretsanta.addParticipantKeypress = function(event) {
    if (event.which == 13) {
      secretsanta.addParticipant();
    }
  };

  secretsanta.addParticipant = function() {
    var newParticipant = $('input[name=newParticipant]').val();
    $('input[name=newParticipant]').val('');
    if (newParticipant) {
      nbParticipants++;
      $("#participants").prepend("<tr class='participant'><td class='participantId'>" + nbParticipants + "</td><td>" + newParticipant +
        "</td><td></td><td><button type='button' onclick='secretsanta.deleteParticipant($(this))'>DELETE</button></td></tr>");
    }
  };

  secretsanta.deleteParticipant = function(deleteButtonJq) {
    nbParticipants--;
    deleteButtonJq.parent().parent().hide('slow', function() {
      $(this).remove();
      renumberRows();
    });
  };

}());
