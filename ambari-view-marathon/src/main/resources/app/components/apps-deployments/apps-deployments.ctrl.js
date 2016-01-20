(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

    	AppsDeploymentsCtrl.$inject = ['$timeout', '$location', 'AppDeploymentFactory', 'HostNameFactory'];

    	function AppsDeploymentsCtrl ($timeout, $location, AppDeploymentFactory, HostNameFactory) {
	        var vm = this;

	        vm.hostName = '';
	        vm.deployList = [];

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getDeploysList();
        		});

	        function getDeploysList () {
	            AppDeploymentFactory.get(vm.hostName)
	            	.then( function(response) {
		                vm.deployList = response.data.array;
		                $timeout(getDeploysList, 10*1000);
		            });
	        }

	        function showAppInfo (appId) {
	            $location.path('/apps/' + encodeURIComponent(appId));
	        }

	        function stopDeploy (deployId) {
                AppDeploymentFactory.stop(vm.hostName, deployId)
	            	.then( function(response) {
		                console.log(response);
		            });
	        }

	        function rollbackDeploy (deployId) {
                            AppDeploymentFactory.rollback(vm.hostName, deployId)
            	            	.then( function(response) {
            		                console.log(response);
            		            });
            	        }
    	}
}());