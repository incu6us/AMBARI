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

	        function stopDeploy (ev, deployId) {
	            vm.deployId = deployId;
                $mdDialog.show({
                		            templateUrl: 'app/components/apps-deployments-stop/apps-deployments-stop.tpl.html',
                		            controller: 'StopAppDeployCtrl',
                		            controllerAs: 'stopAppDeploy',
                		            parent: angular.element(document.querySelector('#content')),
                		            targetEvent: ev,
                		            clickOutsideToClose:true,
                		            locals: {
                		                deployId: vm.deployId,
                		                hostName: vm.hostName
                		            }
                		        });
	        }


	        vm.submitStop = function submit () {
	            var deployId = vm.deployId;
	            AppDeploymentFactory.stop(vm.hostName, deployId)
            	            	.then( function(response) {
            	            	    $mdDialog.cancel();
            		                console.log(response);
            		            });
	        };

	        vm.cancelStop = function cancel () {
                $mdDialog.cancel();
            };

	        function rollbackDeploy (ev, deployId) {
	            vm.deployId = deployId;
	            $mdDialog.show({
                                	templateUrl: 'app/components/apps-deployments-rollback/apps-deployments-rollback.tpl.html',
                                	controller: 'RollbackAppDeployCtrl',
                                	controllerAs: 'rollbackAppDeploy',
                                	parent: angular.element(document.querySelector('#content')),
                                	targetEvent: ev,
                                	clickOutsideToClose:true,
                                	locals: {
                                        deployId: vm.deployId,
                                        hostName: vm.hostName
                                    }
                              });
            }
    	}
}());