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
            $( ".container" ).append( "<div class='alert alert-success fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + participant + "</div>");    
        }
    }
}