(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('ClusterNameFactory', ClusterNameFactory);

        ClusterNameFactory.$inject = ['$http'];

        function ClusterNameFactory ($http) {
            return {
                get: get
            };

            ///////////////////

            // http://nikke1.github.io/hard-data/clusters-mesos.json
            // /api/v1/clusters

            function get () {
                return $http.get('/api/v1/clusters')
                    .then(successClusterName, errorClusterName);

                function successClusterName(response) {
                    return response;
                }

                function errorClusterName (err) {
                    console.log(err);
                }
            }
        }

}());