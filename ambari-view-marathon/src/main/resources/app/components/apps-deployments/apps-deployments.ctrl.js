(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

    	AppsDeploymentsCtrl.$inject = ['$timeout', '$location', '$mdDialog', 'AppDeploymentFactory', 'HostNameFactory'];

    	function AppsDeploymentsCtrl ($timeout, $location, $mdDialog, AppDeploymentFactory, HostNameFactory) {
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

	        vm.showAppInfo = showAppInfo;
	        vm.stopDeploy = stopDeploy;
	        vm.rollbackDeploy = rollbackDeploy;

	        function showAppInfo (appId) {
	            $location.path('/apps/' + encodeURIComponent(appId));
	        }

	        function stopDeploy (deployId) {
	            vm.deployId = deployId;
                $mdDialog.show({
                		            templateUrl: 'app/components/apps-deployments/apps-deployments-stop.tpl.html',
                		            controller: 'AppsDeploymentsCtrl',
                		            controllerAs: 'appDeploys',
                		            parent: angular.element(document.querySelector('#content')),
                		            targetEvent: ev,
                		            clickOutsideToClose:true
                		        });
	        }

	        vm.submitStop = function submit () {
	            var deployId = vm.deployId;
	            AppDeploymentFactory.stop(vm.hostName, deployId)
            	            	.then( function(response) {
            	            	    $mdDialog.cancel();
            		                console.log(response);
            		            });
	        }

	        vm.cancelStop = function cancel () {
                            $mdDialog.cancel();
                        }

	        function rollbackDeploy (deployId) {
	            vm.deployId = deployId;
	            $mdDialog.show({
                                		            templateUrl: 'app/components/apps-deployments/apps-deployments-rollback.tpl.html',
                                		            controller: 'AppsDeploymentsCtrl',
                                		            controllerAs: 'appDeploys',
                                		            parent: angular.element(document.querySelector('#content')),
                                		            targetEvent: ev,
                                		            clickOutsideToClose:true
                                		        });
            	        }

            vm.submitDestory = function () {
                var deployId = vm.deployId;
                AppDeploymentFactory.rollback(vm.hostName, deployId)
                            	            	.then( function(response) {
                            	            	    $mdDialog.cancel();
                            		                console.log(response);
                            		            });
            }

            vm.cancelDestory = function () {
                $mdDialog.cancel();
            }
    	}
}());