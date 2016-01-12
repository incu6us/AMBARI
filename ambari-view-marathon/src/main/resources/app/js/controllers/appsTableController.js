(function () {
  'use strict';

    angular
    	.module('MarathonApp')
    	.controller('appsTableController', ['$scope', '$timeout', '$q', 'getDataForAppsTableFactory', 'getHostNameFactory', function ($scope, $timeout, $q, getDataForAppsTableFactory, getHostNameFactory) {
	        
	        $scope.hostName = '';
	        $scope.dataTable = [];

	        function tick() {
	            $scope.dataTable = getDataForAppsTableFactory($scope.hostName).get(function(){
	                $timeout(tick, 10*1000);
	            });
	        }

	        $q.all([ getHostNameFactory ]).then(function(values){
		        $scope.hostName = values[0];
		        tick();
		    });

    	}]);
}());