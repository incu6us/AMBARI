(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('DataForAppsTableFactory', DataForAppsTableFactory);

        DataForAppsTableFactory.$inject = ['$http'];

        function DataForAppsTableFactory ($http) {
            return {
                get: get
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

 		}
     		
}());