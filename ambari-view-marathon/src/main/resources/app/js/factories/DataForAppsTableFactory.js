(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('DataForAppsTableFactory', DataForAppsTableFactory);

        DataForAppsTableFactory.$inject = ['$http'];

        function DataForAppsTableFactory ($http) {
            return {
                get: get,
                post: post
            };

            ///////////////////
            
            function get (hostName) {
                return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps')
                    .then(successDataForAppsTable, errorDataForAppsTable);

                function successDataForAppsTable(response) {
                    return response.data.apps;
                }

                function errorDataForAppsTable (err) {
                    console.log(err);
                }
  	        };

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
                                var resp = 'ok';
                                return resp;
                            }

                            function errorDataNewApp (err) {
                                console.log(err);
                            }
              	        };

 		};
     		
}());