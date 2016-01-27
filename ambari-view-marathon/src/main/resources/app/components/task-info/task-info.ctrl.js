(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('TaskInfoCtrl', TaskInfoCtrl); 
	        
    	TaskInfoCtrl.$inject = [ 
    		'$location', 
    		'$routeParams',
    		'DataForAppInfoFactory', 
    		'HostNameFactory',
    	];
	    
    	function TaskInfoCtrl ($location, $routeParams, DataForAppInfoFactory, HostNameFactory) {
	        var vm = this;
	        
	        vm.appID = decodeURIComponent($routeParams.id);
	        vm.taskID = $routeParams.taskId;

	        vm.hostName = '';
	        vm.appData = {};
	        vm.taskData = {};

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppInfo();
        		});
			// getAppInfo();

			vm.goToApp = goToApp;
			vm.goToAllApps = goToAllApps;
	        
		    ///////////////////

		    function goToApp () {
		    	$location.path('/apps/' + encodeURIComponent(vm.appID));
		    }

		    function goToAllApps () {
		    	$location.path('#/apps/');
		    }

	        function getAppInfo () {
	            DataForAppInfoFactory.get(vm.hostName, vm.appID)
	            	.then( function(response) {
		                vm.appData = response.app;
		                getTaskInfo();
		            });	
	        }

	        function getTaskInfo () {
	        	for (var i = 0, length = vm.appData.tasks.length; i < length; i++) {
	        		if (vm.taskID === vm.appData.tasks[i].id) {
	        			vm.taskData = vm.appData.tasks[i];
	        		}
	        	}
	        }
	    }
}());