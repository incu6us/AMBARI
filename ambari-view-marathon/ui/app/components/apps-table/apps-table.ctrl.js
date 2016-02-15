(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsTableCtrl', AppsTableCtrl); 
	        
    	AppsTableCtrl.$inject = [
    		'$timeout', 
    		'$location',
    		'$scope', 
    		'DataForAppsTableFactory', 
    		'HostNameFactory'
    	];
	    
    	function AppsTableCtrl ($timeout, $location, $scope, DataForAppsTableFactory, HostNameFactory) {
    		$scope.$on('$locationChangeStart', function(){
			    $timeout.cancel(promise);
			});

	        var vm = this;

	        var promise;
	        
	        vm.hostName = '';
	        vm.appsList = [];
	        
	        vm.showAppInfo = showAppInfo;

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppsList();
        		});
			// getAppsList();
			// for Brunch server
	        
	        ///////////////////

	        function showAppInfo (app) {
	        	$location.path('/apps/' + encodeURIComponent(app.id));
	        }

	        function getAppsList () {
	            DataForAppsTableFactory.get(vm.hostName)
	            	.then( function(response) {
		                vm.appsList = response;
		                promise = $timeout(getAppsList, 10*1000);
		            });	
	        }
    	}
}());