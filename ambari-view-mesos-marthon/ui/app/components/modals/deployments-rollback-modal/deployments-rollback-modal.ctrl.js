(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('RollbackAppDeployCtrl', RollbackAppDeployCtrl);

  RollbackAppDeployCtrl.$inject = ['$scope', '$mdDialog', 'AppsDeployments', 'deployId', 'hostName'];

  function RollbackAppDeployCtrl($scope, $mdDialog, AppsDeployments, deployId, hostName) {

    $scope.submitDestory = submitDestory;
    $scope.cancelDestory = cancelDestory;

    /////////////////////

    function submitDestory() {
      AppsDeployments.rollback(hostName, deployId)
        .then(function(response) {
          $mdDialog.cancel();
          console.log(response);
        });
    }

    function cancelDestory() {
      $mdDialog.cancel();
    }

  }
}());
