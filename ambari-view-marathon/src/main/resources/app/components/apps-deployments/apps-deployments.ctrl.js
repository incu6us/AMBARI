(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

    	AppsDeploymentsCtrl.$inject = ['$timeout', 'DataForAppsTableFactory', 'HostNameFactory'];

    	function AppsDeploymentsCtrl ($timeout, $location, DataForAppsTableFactory, HostNameFactory) {
	        var vm = this;

	        vm.hostName = '';
	        vm.deployList = [];

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getDeploysList();
        		});

	        function getDeploysList () {
	            DataForAppsTableFactory.getDeploys(vm.hostName)
	            	.then( function(response) {
		                vm.deployList = response.data.array;
		                $timeout(getDeploysList, 10*1000);
		            });
	        }

	        function stopDeploy (deployId) {
                DataForAppsTableFactory.stopDeploy(vm.hostName, deployId)
	            	.then( function(response) {
		                console.log(response);
		            });
	        }

	        function rollbackDeploy (deployId) {
                            DataForAppsTableFactory.rollbackDeploy(vm.hostName, deployId)
            	            	.then( function(response) {
            		                console.log(response);
            		            });
            	        }
    	}
}());