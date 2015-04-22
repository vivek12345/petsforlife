$(document).ready(function()
{	

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
      console.log(responseText);
    });
  

});


