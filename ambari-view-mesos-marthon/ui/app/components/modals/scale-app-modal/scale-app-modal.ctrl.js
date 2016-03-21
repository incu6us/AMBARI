(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('ScaleAppCtrl', ScaleAppCtrl);

  ScaleAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', 'AppActions', 'HostName'];

  function ScaleAppCtrl($scope, $mdDialog, $routeParams, AppActions, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);
    var hostName = null;

    $scope.parametrs = {
      instances: "Loading..."
    };

    HostName.get()
      .then(function(response) {
        hostName = response;
        AppActions.getVersion(hostName, $scope.appID)
          .then(function(response) {
            var appVersion = response;
            AppActions.get(hostName, $scope.appID, appVersion)
              .then(function(response) {
                $scope.appConfig = response;
                $scope.parametrs.instances = $scope.appConfig.instances;
              });
          });
      });

    $scope.cancel = cancel;
    $scope.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          $scope.appConfig.instances = $scope.parametrs.instances;

          delete $scope.appConfig.httpStatusCode;
          delete $scope.appConfig.version;
          delete $scope.appConfig.versionInfo;

          AppActions.scale(hostName, $scope.appID, $scope.appConfig)
            .then(function(response) {
              $mdDialog.cancel();
            });
        });
    }
  }
}());
