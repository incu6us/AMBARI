(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('TaskInfoCtrl', TaskInfoCtrl);

  TaskInfoCtrl.$inject = [
    '$scope',
    '$location',
    '$routeParams',
    'AppInfo',
    'HostName',
  ];

  function TaskInfoCtrl($scope, $location, $routeParams, AppInfo, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);
    $scope.taskID = $routeParams.taskId;

    $scope.appData = {};
    $scope.taskData = {};

    getAppInfo();

    ///////////////////

    $scope.goToApp = goToApp;
    $scope.goToAllApps = goToAllApps;

    ///////////////////

    function goToApp() {
      $location.path('/marathon/apps/' + encodeURIComponent($scope.appID));
    }

    function goToAllApps() {
      $location.path('/marathon/apps/');
    }

    function getAppInfo() {
      HostName.get()
        .then(function(hostName) {
          return AppInfo.get(hostName, $scope.appID);
        })
        .then(function(response) {
          $scope.appData = response.app;
          getTaskInfo();
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getTaskInfo() {
      for (var i = 0, length = $scope.appData.tasks.length; i < length; i++) {
        if ($scope.taskID === $scope.appData.tasks[i].id) {
          $scope.taskData = $scope.appData.tasks[i];
        }
      }
    }
  }
}());
