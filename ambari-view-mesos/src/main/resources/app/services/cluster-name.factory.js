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

            // http://nikke1.github.io/clusters-mesos.json
            // /api/v1/clusters

            function get () {
                return $http.get('http://nikke1.github.io/clusters-mesos.json')
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