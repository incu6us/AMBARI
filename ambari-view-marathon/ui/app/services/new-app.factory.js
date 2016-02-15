(function () {
    'use strict';

  	angular
	    .module('MarathonApp')
	    .factory('NewAppFactory', NewAppFactory);

        NewAppFactory.$inject = ['$http'];

        function NewAppFactory ($http) {
            return {
                post: post
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
                                return response;
                            }

                            function errorDataNewApp (err) {
                                console.log(err);
                            }
              	        }
        }

}());