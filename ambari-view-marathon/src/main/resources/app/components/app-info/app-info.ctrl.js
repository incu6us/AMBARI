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
	        vm.appInfo = {};

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppInfo();
        		});
	        
	        ///////////////////

	        function getAppInfo () {
	            DataForAppInfoFactory.get(vm.hostName, vm.appID)
	            	.then( function(response) {
		                vm.appInfo = response.app;
		                $timeout(getAppInfo, 10*1000);
		            });	
	        }

	        // http://128.107.17.60:8081/v2/apps//cassandra/mantl?embed=app.taskStats
	    }
}());