(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .controller('StopAppDeployCtrl', StopAppDeployCtrl);

  StopAppDeployCtrl.$inject = ['$mdDialog', 'HostNameFactory', 'AppDeploymentFactory', 'deployId', 'hostName'];

  function StopAppDeployCtrl($mdDialog, HostNameFactory, AppDeploymentFactory, deployId, hostName) {
    var vm = this;

    vm.submitStop = function submit() {
      AppDeploymentFactory.stop(hostName, deployId)
        .then(function(response) {
          $mdDialog.cancel();
          console.log(response);
        });
    };

    vm.cancelStop = function cancel() {
      $mdDialog.cancel();
    };

  }
}());
