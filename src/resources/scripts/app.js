var secretsanta = {

    //TODO make private, use modules... (ES6)
    nbParticipants : 0,
    
    init : function() {
        $('input[name=participant]').bind("keypress", function(event) {
            if(event.which == 13) {
                event.preventDefault();
                secretsanta.addParticipant();
            }
        });
    },
    
    addParticipant : function(text){
        var participant = $('input[name=participant]').val();
        $('input[name=participant]').val('');
        if (participant){
            secretsanta.nbParticipants++;
            $( "#participants" ).prepend( "<tr><th>" + secretsanta.nbParticipants + "</th><td>" + participant + "</td><td></td><td><button type='button' onclick='secretsanta.deleteLine(" + secretsanta.nbParticipants + ")'>DELETE</button></td></tr>" );    
        }
    },
    
    deleteLine : function(lineNumber){
        alert("delete line " + lineNumber);
    }
}
