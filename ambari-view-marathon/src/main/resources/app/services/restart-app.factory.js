(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('RestartAppFactory', RestartAppFactory);

        RestartAppFactory.$inject = ['$http'];

        function RestartAppFactory ($http) {
            return {
                post: post
            };

            ///////////////////

            function post (hostName, appID) {
                var config = {
                    headers: {
                       'X-Requested-By': hostName,
                       'X-Requested-With': 'XMLHttpRequest'
                     }
                };

                return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/restart', config)
                    .then(successRestartApp, errorRestartApp);

                function successRestartApp (response) {
                    console.log(response);
                }

                function errorRestartApp (err) {
                    console.log(err);
                }
  	        }

 		}
     		
}());