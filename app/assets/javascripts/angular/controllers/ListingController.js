app.controller('ListingController', ['$rootScope','$scope', '$resource','$filter','$http',function($rootScope,$scope, $resource,$filter,$http) {
	$scope.post = "Angular Rocks!"
	$scope.favListings=[]
	$scope.user_listing=[]
	$scope.layout = 'grid'
	$scope.extra_class=''

	$scope.genListings=[]
	$scope.areas=[]
	$scope.isDisabled=true


	

	$scope.init = function(listings,favourites,user_listing,type,extra_class)
	{
		$scope.listings = angular.fromJson(listings);	
		$scope.favListings=angular.fromJson(favourites);
		$scope.user_listing=angular.fromJson(user_listing);
		$scope.genListings=angular.fromJson(listings);
		$scope.layout=type;
		$scope.extra_class=extra_class;
	}

	$scope.clear = function()
	{
        delete $scope.listing1.breed_type;
	}
	$scope.clearAll = function()
	{
        $scope.listing1={};
	}

	$scope.toggleFav = function(value,listing_id)
	{
		var req = {
	 		url: '/listings/favourite',
			method: "POST",
			data: {listing_id:listing_id},
			headers: {'Content-Type': 'application/json','X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
		}
		var req1 = {
	 		url: '/listings/removeFavourite',
			method: "POST",
			data: {listing_id:listing_id},
			headers: {'Content-Type': 'application/json','X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
		}
		var found = $filter('filter')($scope.favListings, {id: listing_id}, true);
		if(found==null || !found.length)
		{
			$http(req).
		  	success(function(data){
		      	$scope.favListings=data;
		      	if($('.active.tab').attr('data-tab')=="favorite")
		      		$scope.genListings=data;

		      	console.log($scope.favListings);
		      	$('.icon_'+listing_id).addClass('active');
	      	  }).
	      	  error(function(){
	      	  	console.log('error');
	      	  });

		}
		else
		{
			$http(req1).
		      success(function(data){
		      	$scope.favListings=data;
		      	if($('.active.tab').attr('data-tab')=="favorite")
		      		$scope.genListings=data;
		      	$('.icon_'+listing_id).removeClass('active');
	      	  }).
	      	  error(function(){
	      	  	console.log('error');
	      	  });
    	
		}

		

	}

	$scope.shareFb=function(listing){
		if(listing.photos[0])
			share_image=listing.photos[0].file_name.url
		else
			share_image='http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png'
		FB.ui(
    	{
	      method: 'feed',
	      name: listing.title,
	      link: 'http://www.petzoned.com/listings/'+listing.uuid,
	      picture: share_image,
	      caption: listing.title,
	      description: listing.love_for_pets,
	      message: ''
    	});
	}

	$scope.changeTab=function(tab_no,clicked_tab)
	{
		switch(clicked_tab){
			case "all": $scope.genListings = angular.fromJson($scope.listings);
			break;
			case "favorite": $scope.genListings = angular.fromJson($scope.favListings);		
			break;
			case "user_listing": $scope.genListings = angular.fromJson($scope.user_listing);
			break;
		}
		if(tab_no!==undefined)
			$('.active.tab').attr('data-tab',clicked_tab);

	}

	$scope.removeListing=function(listing_id)
	{
		var req = {
	 		url: '/listings/destroy',
			method: "DELETE",
			data: {listing_id:listing_id},
			headers: {'Content-Type': 'application/json','X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
		}
		swal({  
			title: "Are you sure?",  
			text: "This Listing will be deleted and you can not recover it!",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Yes, delete it!",   
			closeOnConfirm: false 
		}, function()
		{   
			swal("Deleted!", "Your Listing has been deleted.", "success"); 
			$http(req).
			success(function(data){
				var found = $filter('filter')($scope.favListings, {id: listing_id}, true);
				
				if(found!==null && found.length){
					$scope.favListings=data.favListings;
				}
				found = $filter('filter')($scope.user_listing, {id: listing_id}, true);
				if(found!==null && found.length){
					$scope.user_listing=data.user_listing;
				}
				
				$scope.listings=data.listings;
				
				$scope.changeTab(undefined,$('.active.tab').attr('data-tab'));
			}).
			error(function(){
				console.log('error');
			});
		});
	}

	$scope.selectArea=function(line){
		switch(line){
			case 'Western Line':$scope.areas=myareas[line];$scope.isDisabled=false;break;
			case 'Central Line':$scope.areas=myareas[line];$scope.isDisabled=false;break;
			
		}
	}

	$scope.isUndefinedOrNull = function(val) {
    	return angular.isUndefined(val) || val === null || val==[] || val==""
	}

	var myareas={
    "Central Line": [
        "thane",
        "mulund"
    ],
    "Western Line": [
        "malad",
        "borivali"
    ]
};

}]);
