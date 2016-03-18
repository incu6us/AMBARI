(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('AppsTableCtrl', AppsTableCtrl);

  AppsTableCtrl.$inject = [
    '$scope',
    '$timeout',
    '$location',
    'AppsTableInfo',
    'HostName'
  ];

  function AppsTableCtrl($scope, $timeout, $location, AppsTableInfo, HostName) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    $scope.appsList = [];

    getAppsList();

    ///////////////////

    $scope.showAppInfo = showAppInfo;

    //////////////////

    function showAppInfo(app) {
      $location.path('/marathon/apps/' + encodeURIComponent(app.id));
    }

    function getAppsList() {
      HostName.get()
        .then(function(hostName) {
          return AppsTableInfo.get(hostName);
        })
        .then(function(response) {
          $scope.appsList = response;
          promise = $timeout(getAppsList, 10 * 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());
