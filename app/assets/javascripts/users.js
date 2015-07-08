var ready;

ready = function() {
    var dt=[  
       {  
          "id":568,
          "state":"al",
          "city":"pittsview"
       },
       {  
          "id":4095,
          "state":"ga",
          "city":"pitts"
       }
    ];
    var engine = new Bloodhound({
        datumTokenizer: function(d) {
            console.log(d);
            return Bloodhound.tokenizers.whitespace("city");
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local:dt
        // remote: {
        //     url: "../users/autocomplete?query=viv",
        //     filter: function(resp) {
        //         debugger
        //         return resp
        //     }
        // }
    });

    // var promise = engine.initialize();

    // promise
    //     .done(function() { console.log('success!'); })
    //     .fail(function() { console.log('err!'); });

    $('#city_or_zip').typeahead({
        minLength: 1,
        highlight: true,
        hint: true
    }, {
        name: 'engine',
        displayKey: 'city',
        source: engine.ttAdapter()
    });
}

$(document).ready(ready);
