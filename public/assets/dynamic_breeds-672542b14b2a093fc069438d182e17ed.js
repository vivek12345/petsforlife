function petSelected(){pet_name=$("#listing_pet_type").val(),options=document.getElementById("listing_breed_type").options,options.length=1;for(var e=0;e<breeds.length;e++)breeds[e][0]==pet_name&&(options[options.length]=new Option(breeds[e][1],breeds[e][2]));1==options.length?$(".breed_type").addClass("disabled"):$(".breed_type").removeClass("disabled")}$(document).ready(function(){$(".pet_type").change(function(){$(".breed_type").dropdown("restore defaults"),petSelected()}),$(".filter").click(function(){$(".ui.dropdown").dropdown("restore defaults")});var e=function(e){return function(t,n){var d;d=[],substrRegex=new RegExp(t,"i"),$.each(e,function(e,t){substrRegex.test(t)&&d.push(t)}),n(d)}};"undefined"!=typeof breeds&&$("#breed_search").typeahead({minLength:1,highlight:!0,hint:!0},{name:"engine",source:e(breeds),templates:{empty:['<div class="empty-message" style="padding:0px 5px;">',"Unable to find any breed matching the current query","</div>"].join("\n")}})});