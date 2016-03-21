(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('StopAppDeployCtrl', StopAppDeployCtrl);

  StopAppDeployCtrl.$inject = ['$scope', '$mdDialog', 'AppsDeployments', 'deployId', 'hostName'];

  function StopAppDeployCtrl($scope, $mdDialog, AppsDeployments, deployId, hostName) {

    $scope.submitStop = submitStop;
    $scope.cancelStop = cancelStop;

    ////////////////////

    function submitStop() {
      AppsDeployments.stop(hostName, deployId)
        .then(function(response) {
          $mdDialog.cancel();
        });
    }

    function cancelStop() {
      $mdDialog.cancel();
    }

  }
}());
