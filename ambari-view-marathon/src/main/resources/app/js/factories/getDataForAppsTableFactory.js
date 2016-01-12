(function () {
	'use strict';

  	angular
  		.module('MarathonApp')
  		.factory('getDataForAppsTableFactory', ['$resource', function($resource) {
	        return function (hostName) {
	        	return $resource('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps');
	        };
   		}]);
   		
}());