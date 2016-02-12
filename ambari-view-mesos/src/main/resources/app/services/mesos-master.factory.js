(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('MesosMasterFactory', MesosMasterFactory);

        MesosMasterFactory.$inject = ['$http'];

        function MesosMasterFactory ($http) {
            return {
                get: get
            };

            ///////////////////

            // Brunch http://nikke1.github.io/hard-data/mesos-master.json
            // /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER

            function get (clusterName) {
                return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER')
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