(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('AppDeploymentFactory', AppDeploymentFactory);

        AppDeploymentFactory.$inject = ['$http'];

        function AppDeploymentFactory ($http) {
            return {
                get: get,
                stop: stop,
                rollback: rollback
            };

            function get (hostName) {
                                        return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments')
                                            .then(successDataForAppsTable, errorDataForAppsTable);

                                        function successDataForAppsTable(response) {
                                            return response;
                                        }

                                        function errorDataForAppsTable (err) {
                                            console.log(err);
                                        }
            }

            function stop (hostName, deployId) {
                        var config = {
                                            headers: {
                                               'X-Requested-By': hostName,
                                               'X-Requested-With': 'XMLHttpRequest'
                                             }
                                        };
                                                    return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId, config)
                                                        .then(successDataForAppsTable, errorDataForAppsTable);

                                                    function successDataForAppsTable(response) {
                                                        return response;
                                                    }

                                                    function errorDataForAppsTable (err) {
                                                        console.log(err);
                                                    }
            }

            function rollback (hostName, deployId) {
                        var config = {
                                            headers: {
                                               'X-Requested-By': hostName,
                                               'X-Requested-With': 'XMLHttpRequest'
                                             }
                                        };
                                                                return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId + '?force=true', config)
                                                                    .then(successDataForAppsTable, errorDataForAppsTable);

                                                                function successDataForAppsTable(response) {
                                                                    return response;
                                                                }

                                                                function errorDataForAppsTable (err) {
                                                                    console.log(err);
                                                                }
            }
        }
});