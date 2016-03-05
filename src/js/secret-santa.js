  var participants = {};

  var nbCouples = 0;

  var nbSingles = 0;

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
    name = capitalizeFirstLetter(name);
    if (partner) {
      partner = capitalizeFirstLetter(partner);
    }
    if (!participants.hasOwnProperty(name)) {
      participants[name] = partner;
      var partnerLabel = partner ? "(in a couple with " + partner + ")" : "";
      $("#participants").prepend("<tr class='participant'><td class='rowNumber'>" + Object.keys(participants).length + "</td>" +
        "<td class='participantName'>" + name + "</td>" +
        "<td class='partner'>" + partnerLabel + "</td>" +
        "<td><button type='button' onclick='secretsanta.deleteParticipant($(this))'>DELETE</button></td></tr>");
    } else {
      displayModal('Sorry, the name "' + name + '" is already in the list.');
    }
  };

  var makeSingle = function(participantName) {
    $("#participants tr td.participantName:contains(" + participantName + ")").siblings('.partner').html('');
    participants[participantName] = '';
  };

  var displayModal = function(text) {
    $('.modal-body').text(text);
    $('.modal').modal();
  };

  var drawConditionOK = function() {
    var errorText = 'Sorry, Impossible to draw at random ';
    if (nbSingles === 0) {
      if (nbCouples === 0) {
        displayModal(errorText + '(no participants!).');
        return false;
      } else {
        if (nbCouples === 1) {
          displayModal(errorText + '(only one couple).');
          return false;
        }
        return true;
      }
    }
    if (nbSingles === 1) {
      if (nbCouples === 0) {
        displayModal(errorText + '(only one person!).');
        return false;
      }
      if (nbCouples === 1) {
        displayModal(errorText + '(only one person and one couple).');
        return false;
      }
      return true;
    }
    return true;
  };

  var draw = function() {
    console.debug(participants);
    var resultat = {};
    var givers = Object.keys(participants);
    var receivers = Object.keys(participants);
    var nbParticipants = givers.length;
    var i = 0;
    while (nbParticipants > 0 && i < (nbParticipants * 20)) {
      i++;
      var randomNumberGiver = Math.floor((Math.random() * nbParticipants));
      var randomNumberReceiver = Math.floor((Math.random() * nbParticipants));
      var giver = givers[randomNumberGiver];
      var receiver = receivers[randomNumberReceiver];
      if (giver !== receiver && participants[giver] !== receiver) {
        console.debug(giver + " => " + receiver);
        resultat[giver] = receiver;
        givers.splice(randomNumberGiver, 1);
        receivers.splice(randomNumberReceiver, 1);
        nbParticipants--;
      }
    }
    if (givers.length === 0) {
      displayResult(resultat);
    } else {
      displayModal('Impossible to complete the draw, please try again.');
    }
  };

  var displayResult = function(resultat) {
    $("#participants tbody tr").remove();
    var i = 1;
    for (var prop in resultat) {
      if (resultat.hasOwnProperty(prop)) {
        var line = "<tr><td>" + i + "</td><td>" + prop + "</td><td>gives to</td><td>" + resultat[prop] + "</td></tr>";
        $("#participants tbody ").append(line);
        i++;
      }
    }
  };

  //public static functions called from html
  var addParticipantKeypress = function(event) {
    if (event.which == 13) {
      secretsanta.addParticipant();
    }
  };

  var addParticipant = function() {
    var newParticipant = $('input[name=newParticipant]').val();
    $('input[name=newParticipant]').val('');
    if (newParticipant) {
      var participantsTab = newParticipant.toLowerCase().split(separator);
      switch (participantsTab.length) {
        case 1:
          addOneParticipant(participantsTab[0]);
          nbSingles++;
          break;
        case 2:
          var participant1 = $.trim(participantsTab[0]);
          var participant2 = $.trim(participantsTab[1]);
          if (participant1 !== participant2) {
            addOneParticipant(participant1, participant2);
            addOneParticipant(participant2, participant1);
            nbCouples++;
          } else {
            displayModal("Sorry, the names are identical.");
          }
          break;
        default:
          displayModal('Sorry, the algorithm has not been designed for polyamory relationships. :(');
      }
    }
  };

  var deleteParticipant = function(deleteButtonJq) {
    var row = deleteButtonJq.parent().parent();
    var participantName = row.children(".participantName").html();
    row.hide('slow', function() {
      $(this).remove();
      //s'il avait un partenaire, ce partenaire devient celibataire
      if (participants[participantName]) {
        makeSingle(participants[participantName]);
        nbCouples--;
        nbSingles++;
      } else {
        nbSingles--;
      }
      delete participants[participantName];
      renumberRows();
    });
  };

  var drawAtRandom = function() {
    if (drawConditionOK()) {
      draw();
    }
  };

  var reset = function() {
    $("#participants tbody tr").remove();
    participants = {};
    nbCouples = 0;
    nbSingles = 0;
  };

  module.exports = {
    addParticipantKeypress: addParticipantKeypress,
    addParticipant: addParticipant,
    deleteParticipant: deleteParticipant,
    drawAtRandom: drawAtRandom,
    reset: reset
  };
