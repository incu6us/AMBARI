(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsTableCtrl', AppsTableCtrl); 
	        
    	AppsTableCtrl.$inject = ['$timeout', 'DataForAppsTableFactory', 'HostNameFactory']
	    
    	function AppsTableCtrl ($timeout, DataForAppsTableFactory, HostNameFactory) {
	        var vm = this;
	        
	        vm.hostName = '';
	        vm.appsList = [];

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppsList();
        		});
	        
	        ///////////////////

	        function getAppsList () {
	            DataForAppsTableFactory.get(vm.hostName)
	            	.then( function(response) {
		                vm.appsList = response;
		                $timeout(getAppsList, 10*1000);
		            });	
	        };
    	};
}());