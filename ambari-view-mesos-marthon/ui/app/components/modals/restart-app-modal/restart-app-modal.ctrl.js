(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('RestartAppCtrl', RestartAppCtrl);

  RestartAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', '$location', 'HostName', 'AppActions'];

  function RestartAppCtrl($scope, $mdDialog, $routeParams, $location, HostName, AppActions) {
    $scope.appID = decodeURIComponent($routeParams.id);

    $scope.cancel = cancel;
    $scope.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(hostName) {
          AppActions.restart(hostName, $scope.appID)
            .then(function(response) {
              $mdDialog.cancel();
              $location.path('/apps');
            });
        });
    }
  }
}());
