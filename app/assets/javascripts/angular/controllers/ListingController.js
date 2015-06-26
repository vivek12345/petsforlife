app.controller('ListingController', ['$rootScope','$scope', '$resource','$filter','$http',function($rootScope,$scope, $resource,$filter,$http) {
	$scope.post = "Angular Rocks!"
	$scope.favListings=[]
	$scope.user_listing=[]
	$scope.layout = 'grid'
	$scope.extra_class=''

	$scope.genListings=[]


	

	$scope.init = function(listings,favourites,user_listing,type,extra_class)
	{
		$scope.listings = angular.fromJson(listings);	
		$scope.favListings=angular.fromJson(favourites);
		$scope.user_listing=angular.fromJson(user_listing);
		$scope.genListings=angular.fromJson(listings);
		$scope.layout=type
		$scope.extra_class=extra_class
	}

	$scope.clear = function()
	{
        delete $scope.listing1.breed_type;
	}
	$scope.clearAll = function()
	{
        delete $scope.listing1;
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
	      link: 'http://localhost:3000/listings/'+listing.id,
	      picture: share_image,
	      caption: listing.title,
	      description: listing.love_for_pets,
	      message: ''
    	});
	}

	$scope.changeTab=function(tab_no,clicked_tab)
	{
		switch(tab_no){
			case 1: $scope.genListings = $scope.listings;
			break;
			case 2: $scope.genListings = $scope.favListings;		
			break;
			case 3: $scope.genListings = $scope.user_listing;
			break;
		}
		$('.active.tab').attr('data-tab',clicked_tab);

	}

}]);
