(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('MetricsForMasterFactory', MetricsForMasterFactory);

        MetricsForMasterFactory.$inject = ['$http'];

        function MetricsForMasterFactory ($http) {
            return {
                get: get
            };

            ///////////////////

            
	        // http://128.107.34.126:8080/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://ambari-master-01.cisco.com:5050/metrics/snapshot

	        // Brunch http://nikke1.github.io/hard-data/1snapshot.json
	        // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot


            function get (VERSION, masterHost) {
                return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot', {cache: true})
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