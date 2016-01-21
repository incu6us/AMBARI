(function () {
    'use strict';

    angular
      	.module('MarathonApp')
      	.controller('StopAppDeployCtrl', StopAppDeployCtrl);

      	StopAppDeployCtrl.$inject = ['$mdDialog', 'HostNameFactory', 'AppDeploymentFactory', 'deployId', 'hostName'];

      	function StopAppDeployCtrl ($mdDialog, HostNameFactory, AppDeploymentFactory, deployId, hostName) {
            var vm = this;

            vm.submitStop = function submit () {
            	            AppDeploymentFactory.stop(hostName, deployId)
                        	            	.then( function(response) {
                        	            	    $mdDialog.cancel();
                        		                console.log(response);
                        		            });
            	        }

            vm.cancelStop = function cancel () {
                $mdDialog.cancel();
            }

        }
}());

       modified:   ambari-view-marathon/src/main/resources/app/components/apps-deployments-rollback/apps-deployments-rollback.tpl.html
#       modified:   ambari-view-marathon/src/main/resources/app/components/apps-deployments-stop/apps-deployments-stop.tpl.html
#       modified:   ambari-view-marathon/src/main/resources/app/components/apps-deployments/apps-deployments.ctrl.js
#       modified:   ambari-view-marathon/src/main/resources/app/components/apps-deployments/apps-deployments.tpl.html