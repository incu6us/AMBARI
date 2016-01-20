(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('SuspendAppFactory', SuspendAppFactory);

        SuspendAppFactory.$inject = ['$http'];

        function SuspendAppFactory ($http) {
            return {
                put: put
            };

            ///////////////////

            function put (hostName, appID, data) {
                var config = {
                    headers: {
                       'X-Requested-By': hostName,
                       'X-Requested-With': 'XMLHttpRequest'
                     }
                };

                return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
                    .then(successSuspendApp, errorSuspendApp);

                function successSuspendApp(response) {
                    console.log(response);
                }

                function errorSuspendApp (err) {
                    console.log(err);
                }
  	        }

 		}
     		
}());