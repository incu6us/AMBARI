(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppInfoCtrl', AppInfoCtrl); 
	        
    	AppInfoCtrl.$inject = ['$timeout', '$location', '$routeParams', 'DataForAppInfoFactory', 'HostNameFactory'];
	    
    	function AppInfoCtrl ($timeout, $location, $routeParams, DataForAppInfoFactory, HostNameFactory) {
	        var vm = this;
	        
	        vm.appID = decodeURIComponent($routeParams.id);
	        vm.hostName = '';
	        vm.appData = {};

	        // HostNameFactory.get()
        	// 	.then( function(response) {
        	// 		vm.hostName = response;
        	// 		getAppInfo();
        	// 	});

        	getAppInfo();
	        
	        ///////////////////

	        function getAppInfo () {
	            DataForAppInfoFactory.get(vm.hostName, vm.appID)
	            	.then( function(response) {
		                vm.appData = response.app;
		                $timeout(getAppInfo, 10*1000);
		            });	
	        }
	    }
}());