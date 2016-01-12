(function () {
  'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsTableCtrl', AppsTableCtrl); 
	        
    	AppsTableCtrl.$inject = ['$timeout', '$q', 'getDataForAppsTableFactory', 'getHostNameFactory']
	    
    	function AppsTableCtrl ($timeout, $q, getDataForAppsTableFactory, getHostNameFactory) {
	        var vm = this;
	        
	        vm.hostName = '';
	        vm.dataTable = [];

	        var tick = function () {
	            $q.all([ getDataForAppsTableFactory(vm.hostName) ]).then(function(values){
	                vm.dataTable = values[0];
	                $timeout(tick, 10*1000);
	            });
	        }

	        $q.all([ getHostNameFactory ]).then(function(values){
		        vm.hostName = values[0];
		        tick();
		    });

    	};
}());