app.controller('getHostNameController', ['getHostNameFactory', '$scope', '$q', function (getHostNameFactory, $scope, $q) {
    $scope.hostName = '';
    
    $q.all([ getHostNameFactory ]).then(function(values){
        $scope.hostName = values[0];
    });
}]);