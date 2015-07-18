$(document).ready(function(){

  var engine = new Bloodhound({
        datumTokenizer: function(d) {
            console.log(d);
            return Bloodhound.tokenizers.whitespace(d);
        },
        
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/users/autocomplete?query=%QUERY',
            // filter: function(resp) {
            //     console.log(resp);
            //     return resp
            // },
            wildcard: "%QUERY"
        }
    });

    var promise = engine.initialize();

    promise
        .done(function() { console.log('success!'); })
        .fail(function() { console.log('err!'); });

    $('#breed_search').typeahead({
       minLength: 1,
        highlight: true,
        hint: true
    }, {
        name: 'engine',
        display: 'username',
        source: engine,
        limit:50,
        templates: {
            empty: [
              '<div class="empty-message" style="padding:0px 5px;">',
                'Unable to find any breed matching the current query',
              '</div>'
            ].join('\n')
             // suggestion: function(breeds){
             //    return  '<p><strong>' + breeds.username + '</strong>' +
             //            ' in ' + breeds.value +
             //            '</p>' ;
             //  }
        }
    });
    $('#breed_search').on('typeahead:selected',function(evt,data){
        console.log('data==>' + data.username); //selected datum object  
    });

});
