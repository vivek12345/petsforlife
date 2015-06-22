app.controller('ListingController', ['$scope', '$resource','$filter','$http',function($scope, $resource,$filter,$http) {
	$scope.post = "Angular Rocks!"
	$scope.favListings=[]
	$scope.user_listing=[]
	$scope.layout = 'grid'
	$scope.i=0
	$scope.j=4

	

	$scope.init = function(listings,favourites,user_listing)
	{
		$scope.listings = angular.fromJson(listings);	
		$scope.favListings=angular.fromJson(favourites);
		$scope.user_listing=angular.fromJson(user_listing);
	}

	$scope.clear = function()
	{
        delete $scope.listing1.breed_type;
	}
	$scope.clearAll = function()
	{
        delete $scope.listing1;
	}

	/*$scope.$watch($scope.favListings,function(){
		$scope.$digest();
	});*/

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
	      	  }).
	      	  error(function(){
	      	  	console.log('error');
	      	  });
    	
		}
		

	}

}]);
