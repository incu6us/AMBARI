(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('ActiveMasterStateFactory', ActiveMasterStateFactory);

        ActiveMasterStateFactory.$inject = ['$http'];

        function ActiveMasterStateFactory ($http) {
            return {
                get: get
            };

            ///////////////////

	        // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + $scope.activeMaster + ':5050/master/state.json

            function get (VERSION, activeMaster) {
                return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/master/state.json')
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