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

    $('#user_search').typeahead({
       minLength: 1,
        highlight: true,
        hint: true
    }, {
        name: 'engine',
        display: 'username',
        source: engine,
        limit:50
    });

});
