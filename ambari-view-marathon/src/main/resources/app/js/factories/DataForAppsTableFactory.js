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

            //////////////////////////////////
            
            function get (hostName) {
                return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps');
  	        };
     		};
     		
}());