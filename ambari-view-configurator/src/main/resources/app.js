var VERSION = "0.1.0"

var app = angular.module('configuratorApp', ['ngMaterial']);


app.filter('serviceName', function () {
    return function (input) {
        return input.replace(new RegExp("(.*service_name=)(.*)(&.*)"), "$2");;
    }
});

app.filter('serviceVersion', function () {
    return function (input) {
        return input.replace(new RegExp("(.*service_config_version=)(.*)"), "$2");;
    }
});


app.controller('ConfiguratorController', function ($scope, $http, $interval, $q) {

    // get  "Clusters"."cluster_name" &  "Clusters"."version"
    $scope.clustersInfo = [];
    $scope.serviceConfig = null;
    $scope.serviceConfigJson = null;
    $scope.clusterDataType = "param";

    /*
     *
     */
    $scope.getClusters = function () {
        $scope.clustersInfo = [];
        $scope.serviceConfig = null;
        $scope.serviceConfigJson = null;

        $q.all({
            clustersInfo: $http.get('/api/v1/clusters')
        }).then(function (info) {
            $scope.clustersInfo = info.clustersInfo.data.items;
            console.log(JSON.stringify("$scope.clustersInfo -> " + JSON.stringify($scope.clustersInfo)))
        })
    }

    // Dialog box for Config info
    $scope.showPropertiesConfig = function (clusterName) {
        $scope.clusterConfig = [];
        if (clusterName != undefined) {
            $http.get('/api/v1/clusters/' + clusterName + '/configurations/service_config_versions')
                .success(function (data) {
                    //console.log("showPropertiesConfig -> " + JSON.stringify(data))
                    $scope.serviceConfig = data;
                    $scope.serviceConfigJson = JSON.stringify(JSON.parse(JSON.stringify(data).replace("<pre>")), undefined, 4);
                })
                .error(function (data) {
                console.log('Error: ' + JSON.stringify(data));
            })
        }
        console.log("$scope.clusterConfig -> " + JSON.stringify($scope.clusterConfig))
    }


    $interval(function () {
        console.log('some log')
    }, 10000);

});
