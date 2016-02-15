(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('MetricsForSlaveFactory', MetricsForSlaveFactory);

        MetricsForSlaveFactory.$inject = ['$http'];

        function MetricsForSlaveFactory ($http) {
            return {
                get: get
            };

            ///////////////////

	        // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot

            function get (VERSION, slaveHost) {
                return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot', {cache: true})
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