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
			        vm.hostName = response.data.host_components[0].HostRoles.host_name;
			        tick();
			    });

	        var tick = function () {
	            DataForAppsTableFactory.get(vm.hostName)
	            	.then( function(response) {
		                vm.appsList = response.data.apps;
		                $timeout(tick, 10*1000);
		            });	
	        };
    	};
}());