(function () {
  'use strict';

    angular
    	.module('MarathonApp')
    	.controller('appsTableController', appsTableController); 
	        
    	appsTableController.$inject = ['$timeout', '$q', 'getDataForAppsTableFactory', 'getHostNameFactory']
	    
    	function appsTableController ($timeout, $q, getDataForAppsTableFactory, getHostNameFactory) {
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