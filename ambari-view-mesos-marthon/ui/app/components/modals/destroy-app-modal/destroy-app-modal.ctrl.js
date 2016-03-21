(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('DestroyAppCtrl', DestroyAppCtrl);

  DestroyAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', '$location', 'AppActions', 'HostName'];

  function DestroyAppCtrl($scope, $mdDialog, $routeParams, $location, AppActions, HostName) {
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
          AppActions.destroy(hostName, $scope.appID)
            .then(function(response) {
              $mdDialog.cancel();
              $location.path('/apps');
            });
        });
    }
  }
}());
