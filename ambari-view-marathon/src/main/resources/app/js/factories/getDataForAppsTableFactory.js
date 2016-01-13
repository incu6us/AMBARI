(function () {
    'use strict';

  	angular
  		  .module('MarathonApp')
  		  .factory('getDataForAppsTableFactory', getDataForAppsTableFactory);

        getDataForAppsTableFactory.$inject = ['$http'];

        function getDataForAppsTableFactory ($http) {
            return function (hostName) {
                return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps')    
            		    .then(successCallback, errorCallback);

                //////////////////

                var successCallback = function (response) {
                    return response.data;
                };

                var errorCallback = function (err) {
                    console.log(err);
                    return err;
                };
  	        };
     		};
     		
}());