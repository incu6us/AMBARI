(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

    	AppsDeploymentsCtrl.$inject = ['$timeout', '$location', 'DataForAppsTableFactory', 'HostNameFactory'];

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
		                console.log(response);
		            });
	        }
    	}
}());