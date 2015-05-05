app.controller('ListingController', ['$scope', '$resource', function($scope, $resource) {
	$scope.post = "Angular Rocks!"
	
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

}]);
