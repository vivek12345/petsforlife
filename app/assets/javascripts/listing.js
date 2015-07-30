$(document).ready(function()
{
  $('.title_search').val('');
  $('.dimmer').removeClass('active');
  $('.new_listing').removeClass('disabled');
  var listing_id=0;
	Dropzone.options.mediaDropzone=false;


  if ($('div#media-dropzone').length)
  {
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
      listing_id=responseText.listing_id;
      console.log(responseText);
    });
    mediaDropzone.on("queuecomplete", function (file) {
      alert("All files have uploaded ");
      $('.dimmer').removeClass('active');
      window.location.replace('/listings/'+listing_id);
    });
  }

    $('.filter.menu .item').tab({
      
    });
    $('.ui.rating').rating();

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
          type  : 'regExp[/^[0-9]*([.][0-9]+)?$/]',
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

$(document).ready(function(){
  if($(window).width() < 550){
    $('.small_cards').removeClass('ui four doubling link cards');
    $('.small_cards').addClass('ui one doubling link cards');
    $('.new_creation').removeClass('ui eight wide column');
    $('.new_creation').addClass('ui sixteen wide column');
    $('.listing_show').removeClass('ui six wide column');
    $('.listing_show').removeClass('ui ten wide column');
    $('.listing_show').addClass('ui sixteen wide column');
    $('.home_page_grid').removeClass('ui grid');
    $('.home_page_grid').addClass('ui page grid');
    $('.user_show').removeClass('ui four wide column');
    $('.user_show').removeClass('ui twelve wide column');
    $('.user_show').addClass('ui sixteen wide column');
    $('.user_profile_cards').removeClass('ui four doubling link cards').addClass('ui one doubling link cards');
  }
  $('.show_image:first-child').addClass('active_show_image');
  var numImgs = $('.show_image').length;
  var imageClicked=$('.imageDisplay .active_show_image');
  if(numImgs==1){
    $('.next').hide();
  }

  $(".thumb").click(function(){
        imageClicked = $(this);
        imageClicked.addClass('active_show_image');
  });

  $('.next').click(function(){
      imageClicked.removeClass('active_show_image');
      imageClicked.next('a').trigger('click');
      var prevImages = imageClicked.prevAll().length;
      if(prevImages > 0){
          $('.prev').show();
      }else{
          $('.prev').hide();
      }
      if(prevImages == (numImgs - 1)){
          $('.next').hide();
      }else{
          $('.next').show();
      }

  });

  $('.prev').click(function(){
      imageClicked.removeClass('active_show_image');
      imageClicked.prev('a').trigger('click');
      var prevImages = imageClicked.prevAll().length;
      if(prevImages > 0){
          $('.prev').show();
      }else{
          $('.prev').hide();
      }
      if(prevImages == (numImgs - 1)){
          $('.next').hide();
      }else{
          $('.next').show();
      }
  });
  $('.user_profile').accordion();
  $('.user_profile').click(function(e){
    e.stopPropagation();
  });
  $('.ui.dropdown').dropdown();
  $('.new_listing').on('click',function(e){
    e.preventDefault();
    if($('.dropzone').find('.dz-preview').length<=0)
    {
      swal({  
        title: "Creating without images?",  
        text: "Are you sure you want to create this listing without any images.Images increase your chances of getting a buyer!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, Create It!",   
        closeOnConfirm: false,
        closeOnCancel:false
      }, function(isConfirm){
          if(isConfirm)
          {
            swal("Alright!", "Your listing will be created without images", "success");
            $("#new_listing_form").trigger("submit.rails");
          }
          else
          {
            swal("Good Decision", "Please upload some nice images to attract the buyers :)", "error");
            return false;
          }
      });
    }
    else
    {
      $('.dimmer').addClass('active');
      $('.new_listing').addClass('disabled');
      $("#new_listing_form").trigger("submit.rails");
    }
  });

  $('.imageDisplay').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
  
  $('.foster_willing').checkbox();
  $('.checkbox').checkbox({
    onChange: function() {
      if($("input[type='radio']:checked").length>0){
        $('.price_field').addClass('disabled');
        $('.price_box').val(0.0);
        $('.price_box').attr('readonly',true);
      }
      else
      {
        $('.price_field').removeClass('disabled');
        $('.price_box').attr('readonly',false);
      }
    }
  });
});






