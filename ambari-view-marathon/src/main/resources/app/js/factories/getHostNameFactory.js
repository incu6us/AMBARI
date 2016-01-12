(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .factory('getHostNameFactory', ['$http', function ($http) {
            return $http.get('/api/v1/clusters')
                .then(function successCallback(response) {
                    var clusterName = response.data.items[0].Clusters.cluster_name;
                    
                    return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON')    
                        .then(function successCallback(response) {
                            var hostName = response.data.host_components[0].HostRoles.host_name;
                            return hostName;
                        }, function errorCallbacj(err) {
                            console.log(err);
                            return err;
                        });

                }, function errorCallbacj(err) {
                    console.log(err);
                    return err;
                }); 
        }]);

}());