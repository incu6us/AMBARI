(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

  AppsDeploymentsCtrl.$inject = [
    '$scope',
    '$timeout',
    '$location',
    '$mdDialog',
    '$scope',
    'AppsDeployments',
    'HostName'
  ];

  function AppsDeploymentsCtrl($scope, $timeout, $location, $mdDialog, AppsDeployments, HostName) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    var hostName = null;

    $scope.deployList = [];

    /////////////////////

    $scope.showAppInfo = showAppInfo;
    $scope.stopDeploy = stopDeploy;
    $scope.rollbackDeploy = rollbackDeploy;

    /////////////////////

    function showAppInfo(appId) {
      $location.path('/marathon/apps/' + encodeURIComponent(appId));
    }

    function getDeploysList() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          return AppsDeployments.get(hostName);
        })
        .then(function(response) {
          $scope.deployList = response.data.array;
          promise = $timeout(getDeploysList, 10 * 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function stopDeploy(ev, deployId) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/deployments-stop-modal/deployments-stop-modal.tpl.html',
        controller: 'StopAppDeployCtrl',
        controllerAs: 'stopAppDeploy',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          deployId: deployId,
          hostName: hostName
        }
      });
    }

    function rollbackDeploy(ev, deployId) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/deployments-rollback-modal/deployments-rollback-modal.tpl.html',
        controller: 'RollbackAppDeployCtrl',
        controllerAs: 'rollbackAppDeploy',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          deployId: deployId,
          hostName: hostName
        }
      });
    }
  }
}());
