var VERSION = "0.1.0"

var app = angular.module('MesosConfiguratorApp');

$scope.getClusters= null;

// get  "cluster_name" & "version"
$scope.clustersInfo = [];

app.filter('toGb', function () {
    return function (input) {
        return (input / 1024).toFixed(2);
    }
});

app.controller('ConfiguratorController', function ($scope, $http, $interval, $q) {

    $scope.getClusters = function(){
        $q.all({
            clustersInfo: $http.get('/api/v1/clusters')
        }).then(function(info){
            $scope.clustersInfo = info.clustersInfo.data.items.Clusters;
            console.log(JSON.stringify($scope.clustersInfo))
        })
    }

    $interval(function () {
        console.log('some log')
    }, 10000);

});