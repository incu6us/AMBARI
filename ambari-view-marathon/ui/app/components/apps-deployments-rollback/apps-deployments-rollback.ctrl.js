(function () {
    'use strict';

    angular
      	.module('MarathonApp')
      	.controller('RollbackAppDeployCtrl', RollbackAppDeployCtrl);

      	RollbackAppDeployCtrl.$inject = ['$mdDialog', 'HostNameFactory', 'AppDeploymentFactory', 'deployId', 'hostName'];

      	function RollbackAppDeployCtrl ($mdDialog, HostNameFactory, AppDeploymentFactory, deployId, hostName) {
            var vm = this;

            vm.submitDestory = function () {
                            AppDeploymentFactory.rollback(hostName, deployId)
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
