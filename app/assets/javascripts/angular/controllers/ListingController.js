app.controller('ListingController', ['$scope', '$resource','$filter', function($scope, $resource,$filter) {
	$scope.post = "Angular Rocks!"
	$scope.favListings=[];
	$scope.init = function(listings)
	{
		$scope.listings = angular.fromJson(listings)	
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
		var found = $filter('filter')($scope.listings, {id: listing_id}, true);
		if(value && found.length)
		{
			$scope.favListings.push(found[0]);
		}
		else
		{
			index=$scope.favListings.indexOf(found[0]);
			$scope.favListings.splice(index, 1);
		}
	}


}]);
