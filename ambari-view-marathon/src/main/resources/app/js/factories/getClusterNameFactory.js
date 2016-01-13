(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .factory('getClusterNameFactory', getClusterNameFactory);

        getClusterNameFactory.$inject = ['$http'];

        function getClusterNameFactory ($http) {
            return $http.get('/api/v1/clusters')
                .then(successCallback, errorCallback);
            
            //////////////////

            var successCallback = function (response) {
                alert('1');
                var clusterName = response.data.items[0].Clusters.cluster_name;               
                return clusterName;
            }

            var errorCallback = function (err) {
                alert('1error');
                console.log(err);
                return err;
            }
        };

}());