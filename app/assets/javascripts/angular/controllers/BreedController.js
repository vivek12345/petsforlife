app.controller('BreedController', ['$scope', '$resource','$filter',function($scope, $resource,$filter) {
    $scope.post = "Angular Rocks!"
    $scope.breeds=[]

    $scope.init=function(breeds){
        $scope.breeds=breeds
    }
}]);