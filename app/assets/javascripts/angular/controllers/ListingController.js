app.controller('ListingController', ['$scope', '$resource', function($scope, $resource) {
$scope.message = "Angular Rocks!"
  
  $scope.init = (listings)
  {
    $scope.listings = angular.fromJson(listings)
  }
  
}]);