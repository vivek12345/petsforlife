$(document).ready(function()
{	

  listing_id=0;
	Dropzone.options.mediaDropzone=false;
 
  
    mediaDropzone=new Dropzone('div#media-dropzone',
    {
      url:"/listings/media",
      headers: 
      {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      autoProcessQueue:false,
      addRemoveLinks:true,
      parallelUploads: 10
    });
    mediaDropzone.on("success",function(file,responseText)
    {
      console.log(responseText.file_name.url);
      listing_id=responseText.listing_id
      console.log(responseText);
    });
    mediaDropzone.on("queuecomplete", function (file) {
      alert("All files have uploaded ");
      window.location.replace('/listings/'+listing_id);
    });

    $('.ui.form')
  .form({
    name: {
      identifier  : 'listing_title',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter your title'
        }
      ]
    },
    gender: {
      identifier  : 'listing_gender',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please select a gender'
        }
      ]
    },
    pet_type: {
      identifier : 'listing_pet_type',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please select a pet_type'
        }
      ]
    },
    price: {
      identifier : 'listing_price',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter a price'
        },
        {
          type   : 'integer',
          prompt : 'Please enter a valid price'
        }
      ]
    },
    terms: {
      identifier : 'terms',
      rules: [
        {
          type   : 'checked',
          prompt : 'You must agree to the terms and conditions'
        }
      ]
    }
  })
;
  

});


