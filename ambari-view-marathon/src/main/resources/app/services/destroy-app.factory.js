(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('DestroyAppFactory', DestroyAppFactory);

        DestroyAppFactory.$inject = ['$http'];

        function DestroyAppFactory ($http) {
            return {
                del: del
            };

            ///////////////////

            function del (hostName, appID) {
                return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID)
                    .then(successDataForAppInfo, errorDataForAppInfo);

                function successDataForAppInfo(response) {
                    console.log(response);
                }

                function errorDataForAppInfo (err) {
                    console.log(err);
                }
  	        }

 		}
     		
}());