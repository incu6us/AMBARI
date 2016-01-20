(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('DataForAppsTableFactory', DataForAppsTableFactory);

        DataForAppsTableFactory.$inject = ['$http'];

        function DataForAppsTableFactory ($http) {
            return {
                get: get,
                post: post,
                getDeploys: getDeploys,
                stopDeploy: stopDeploy,
                rollbackDeploy: rollbackDeploy
            };

            ///////////////////
            // /api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps
            // http://nikke1.github.io/dataforapps.json
            function get (hostName) {
                return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps')
                    .then(successDataForAppsTable, errorDataForAppsTable);

                function successDataForAppsTable(response) {
                    return response.data.apps;
                }

                function errorDataForAppsTable (err) {
                    console.log(err);
                }
  	        }

  	        function post (hostName, data) {
      	        var config = {
                    headers: {
                       'X-Requested-By': hostName,
                       'X-Requested-With': 'XMLHttpRequest'
                     }
                };

                return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps', data, config)
                    .then(successDataNewApp, errorDataNewApp);

                function successDataNewApp(response) {
                    return response;
                }

                function errorDataNewApp (err) {
                    console.log(err);
                }
  	        }

  	        function getDeploys (hostName) {
                            return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments')
                                .then(successDataForAppsTable, errorDataForAppsTable);

                            function successDataForAppsTable(response) {
                                return response;
                            }

                            function errorDataForAppsTable (err) {
                                console.log(err);
                            }
              	        }

            function stopDeploy (hostName, deployId) {
                                        return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId)
                                            .then(successDataForAppsTable, errorDataForAppsTable);

                                        function successDataForAppsTable(response) {
                                            return response;
                                        }

                                        function errorDataForAppsTable (err) {
                                            console.log(err);
                                        }
                          	        }

            function rollbackDeploy (hostName, deployId) {
                                                    return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId + '?force=true')
                                                        .then(successDataForAppsTable, errorDataForAppsTable);

                                                    function successDataForAppsTable(response) {
                                                        return response;
                                                    }

                                                    function errorDataForAppsTable (err) {
                                                        console.log(err);
                                                    }
                                      	        }

 		}
     		
}());