(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .factory('DirsFactory', DirsFactory);

        DirsFactory.$inject = ['$http'];

        function DirsFactory ($http) {
            return {
                get: get
            };

            ///////////////////

	        // executorUrl + executorDir

            function get (executorUrl, executorDir) {
                return $http.get(executorUrl + executorDir)
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