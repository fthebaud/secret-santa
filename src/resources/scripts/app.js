//namespace : window.secretsanta
var secretsanta = secretsanta || {};

(function() {
  /*global $:false */
  "use strict";

  //private stuff (hidden in the closure)
  var participants = {};

  var separator = 'and';

  var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  var renumberRows = function() {
    var nbRows = $('.participant').length;
    $('.participant').each(function(i) {
      $(this).children('.rowNumber').text(nbRows - i);
    });
  };

  var addOneParticipant = function(name, partner) {
    if(!participants.hasOwnProperty(name)){
      participants[name] = partner;
      partner = partner ? "(in a couple with " + partner + ")" : "";
      $("#participants").prepend("<tr class='participant'><td class='rowNumber'>" + Object.keys(participants).length + "</td>" +
        "<td class='participantName'>" + capitalizeFirstLetter(name) + "</td>" +
        "<td>" + partner + "</td>" +
        "<td><button type='button' onclick='secretsanta.deleteParticipant($(this))'>DELETE</button></td></tr>");
    }else{
      //TODO mettre une belle popup
      alert('nop, le participant ' + name + ' existe deja');
    }
  };

  //public static functions called from html
  secretsanta.addParticipantKeypress = function(event) {
    if (event.which == 13) {
      secretsanta.addParticipant();
    }
  };

  secretsanta.addParticipant = function() {
    var newParticipant = $('input[name=newParticipant]').val();
    $('input[name=newParticipant]').val('');
    if (newParticipant) {
      var participantsTab = newParticipant.toLowerCase().split(separator);
      switch (participantsTab.length) {
        case 1:
          addOneParticipant(participantsTab[0]);
          break;
        case 2:
          var participant1 = $.trim(participantsTab[0]);
          var participant2 = $.trim(participantsTab[1]);
          if (participant1 !== participant2){
            addOneParticipant(participant1, participant2);
            addOneParticipant(participant2, participant1);
          }else{
            //TODO mettre une belle popup
            alert("nop, les deux personnes on le meme nom");
          }
          break;
        default:
          //TODO mettre une belle popup
          alert('nop pas de menage a trois ou plus');
      }
    }
  };

  secretsanta.deleteParticipant = function(deleteButtonJq) {
    var row = deleteButtonJq.parent().parent();
    var praticipantName = row.children(".participantName").html();
    delete participants.participantName;
    row.hide('slow', function() {
      $(this).remove();
      renumberRows();
    });
  };

}());
