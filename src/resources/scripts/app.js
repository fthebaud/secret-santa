var secretsanta = {
    
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
        if (participant){
            $( "#participants" ).prepend( "<tr><th>1</th><td>" + participant + "</td><td></td><td><button type='button'>DELETE</button></td></tr>" );    
        }
    }
}