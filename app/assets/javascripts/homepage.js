$(document)
  .ready(function() {

    var
      changeSides = function() {
        $('.ui.shape')
          .eq(0)
            .shape('flip over')
            .end()
          .eq(1)
            .shape('flip over')
            .end()
          .eq(2)
            .shape('flip back')
            .end()
          .eq(3)
            .shape('flip back')
            .end()
        ;
      },
      validationRules = {
        firstName: {
          identifier  : 'email',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter an e-mail'
            },
            {
              type   : 'email',
              prompt : 'Please enter a valid e-mail'
            }
          ]
        }
      }
    ;

    $('.ui.dropdown')
      .dropdown({
        on: 'hover'
      })
    ;

    $('.ui.form')
      .form(validationRules, {
        on: 'blur'
      })
    ;

    $('.masthead .information')
      .transition('scale in', 1000)
    ;

    setInterval(changeSides, 3000);

  })
;

 /*$(function() {

  var mediaDropzone;
  mediaDropzone = new Dropzone("#media-dropzone");
  Dropzone.options.dropzoneJsForm = {

    //prevents Dropzone from uploading dropped files immediately
    autoProcessQueue: false,
    previewsContainer: ".dropzone-previews",
  };
  return mediaDropzone.on("success", function(file, responseText) {
    var _this = this;
    appendContent(responseText.file_name.url, responseText.id);
    
  });
});

var appendContent = function(imageUrl, mediaId) {
  $("#media-contents").append('<div class="col-lg-4">' + 
    '<div class="thumbnail"><img src="' + imageUrl + '"/>' +
    '<div class="caption">' +
    '<input id="media_contents_" name="photos[]" value="' + mediaId +'" type="checkbox">' + 
    '</div>' +
    '</div></div>');
  $("#delete").removeAttr('disabled');
  $("#no-media").html("");
};*/

