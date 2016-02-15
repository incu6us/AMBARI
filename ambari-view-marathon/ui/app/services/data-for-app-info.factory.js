(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('DataForAppInfoFactory', DataForAppInfoFactory);

        DataForAppInfoFactory.$inject = ['$http'];

        function DataForAppInfoFactory ($http) {
            return {
                get: get
            };

            ///////////////////
            // /api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats

            // for Brunch server
            // http://nikke1.github.io/hard-data/mesos.json
            function get (hostName, appID) {
                return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats')
                    .then(successDataForAppInfo, errorDataForAppInfo);

                function successDataForAppInfo(response) {
                    return response.data;
                }

                function errorDataForAppInfo (err) {
                    console.log(err);
                }
  	        }

 		}
     		
}());