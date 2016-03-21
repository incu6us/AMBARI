(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('SuspendAppCtrl', SuspendAppCtrl);

  SuspendAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', 'AppActions', 'HostName'];

  function SuspendAppCtrl($scope, $mdDialog, $routeParams, AppActions, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);

    var hostName = null;

    $scope.cancel = cancel;
    $scope.submit = submit;

    HostName.get()
      .then(function(response) {
        hostName = response;
        return AppActions.getVersion(hostName, $scope.appID);
      })
      .then(function(appVersion) {
        return AppActions.get(hostName, $scope.appID, appVersion);
      })
      .then(function(response) {
        $scope.appConfig = response;
      })
      .catch(function(err) {
        console.log(err);
      });

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          $scope.appConfig.instances = 0;

          delete $scope.appConfig.httpStatusCode;
          delete $scope.appConfig.version;
          delete $scope.appConfig.versionInfo;

          AppActions.suspend(hostName, $scope.appID, $scope.appConfig)
            .then(function(response) {
              $mdDialog.cancel();
            });
        });
    }
  }
}());
