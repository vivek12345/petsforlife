app.controller('ListingController', ['$rootScope','$scope', '$resource','$filter','$http',function($rootScope,$scope, $resource,$filter,$http) {
	$scope.user_listing=[]
	$scope.layout = 'grid'
	$scope.extra_class=''

	$scope.genListings=[]
	$scope.areas=[]
	$scope.isDisabled=true
	
	$scope.init = function(listings,user_listing,type,extra_class)
	{
		$scope.listings = angular.fromJson(listings);	
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

	$scope.shareFb=function(listing){
		if(listing.photos[0])
			share_image=listing.photos[0].file_name.url;
		else
			share_image='http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png';
		link = 'http://www.petzoned.com/listings/'+listing.id;
		FB.ui(
    	{
	      method: 'feed',
	      name: listing.title,
	      link: link,
	      picture: share_image,
	      caption: listing.title,
	      description: listing.description,
	      message: ''
    	});
	}

	$scope.changeTab=function(tab_no,clicked_tab)
	{
		switch(clicked_tab){
			case "all": $scope.genListings = angular.fromJson($scope.listings);
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
			
			$http(req).
			success(function(data){
				$scope.user_listing=data.user_listing;
				$scope.listings=data.listings;
				swal("Deleted!", "Your Listing has been deleted.", "success"); 
				$scope.changeTab(undefined,$('.active.tab').attr('data-tab'));
			}).
			error(function(){
				console.log('error');
				swal("Error!", "This listing cannot be deleted.", "error"); 
			});
		});
	}

	$scope.isUndefinedOrNull = function(val) {
    	return angular.isUndefined(val) || val === null || val==[] || val==""
	}

}]);
