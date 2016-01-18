(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsTableCtrl', AppsTableCtrl); 
	        
    	AppsTableCtrl.$inject = ['$timeout', '$location', 'DataForAppsTableFactory', 'HostNameFactory'];
	    
    	function AppsTableCtrl ($timeout, $location, DataForAppsTableFactory, HostNameFactory) {
	        var vm = this;
	        
	        vm.hostName = '';
	        vm.appsList = [];

	        vm.showAppInfo = showAppInfo;

	        // HostNameFactory.get()
        	// 	.then( function(response) {
        	// 		vm.hostName = response;
        	// 		getAppsList();
        	// 	});
			getAppsList();
	        
	        ///////////////////

	        function showAppInfo (app) {
	        	$location.path('/apps/' + encodeURIComponent(app.id));
	        }

	        function getAppsList () {
	            DataForAppsTableFactory.get(vm.hostName)
	            	.then( function(response) {
		                vm.appsList = response;
		                $timeout(getAppsList, 10*1000);
		            });	
	        }
    	}
}());