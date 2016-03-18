(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('AppInfoCtrl', AppInfoCtrl);

  AppInfoCtrl.$inject = [
    '$scope',
    '$location',
    '$routeParams',
    '$mdDialog',
    '$timeout',
    'AppInfo',
    'HostName',
    'AppActions'
  ];

  function AppInfoCtrl($scope, $location, $routeParams, $mdDialog, $timeout, AppInfo, HostName, AppActions) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    $scope.appID = decodeURIComponent($routeParams.id);

    $scope.appData = {};

    $scope.tasksToKill = { ids: [] };

    $scope.checkedTasks = {};
    $scope.checkTask = checkTask;
    $scope.checkAllTasks = checkAllTasks;
    $scope.checkAllTaskBool = false;

    getAppInfo();

    ///////////////////

    $scope.showTaskInfo = showTaskInfo;
    $scope.goToAllApps = goToAllApps;

    $scope.suspendApp = suspendApp;
    $scope.scaleApp = scaleApp;
    $scope.restartApp = restartApp;
    $scope.destroyApp = destroyApp;
    $scope.killTask = killTask;

    //////////////////

    function showTaskInfo(taskId) {
      $location.path($location.path() + '/' + taskId);
    }

    function goToAllApps() {
      $location.path('/marathon/apps');
    }

    function getAppInfo() {
      HostName.get()
        .then(function(hostName) {
          return AppInfo.get(hostName, $scope.appID);
        })
        .then(function(response) {
          $scope.appData = response.app;
          promise = $timeout(getAppInfo, 10 * 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function suspendApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/suspend-app-modal/suspend-app-modal.tpl.html',
        controller: 'SuspendAppCtrl',
        controllerAs: 'suspendApp',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function scaleApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/scale-app-modal/scale-app-modal.tpl.html',
        controller: 'ScaleAppCtrl',
        controllerAs: 'scaleApp',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function restartApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/restart-app-modal/restart-app-modal.tpl.html',
        controller: 'RestartAppCtrl',
        controllerAs: 'restartApp',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function destroyApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/destroy-app-modal/destroy-app-modal.tpl.html',
        controller: 'DestroyAppCtrl',
        controllerAs: 'destroyApp',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function killTask(shouldScale) {
      HostName.get()
        .then(function(response) {
          $scope.hostName = response;
          AppActions.killTask($scope.hostName, $scope.tasksToKill, shouldScale)
            .then(function(response) {
              getAppInfo();
              $scope.checkAllTaskBool = false;
              $scope.checkedTasks = {};
              $scope.tasksToKill.ids = [];
            });
        });
    }

    function checkTask(taskId) {
      var indexOfTask = $scope.tasksToKill.ids.indexOf(taskId);

      if (indexOfTask === -1) {
        $scope.tasksToKill.ids.push(taskId);
      } else {
        $scope.tasksToKill.ids.splice(indexOfTask, 1);
      }
    }

    function checkAllTasks() {
      $scope.tasksToKill.ids = [];

      if ($scope.allCheckedState === true) {
        $scope.allCheckedState = false;
        for (var i = 0; i < $scope.appData.tasks.length; i++) {
          var task1 = $scope.appData.tasks[i];
          $scope.checkedTasks[task1.id] = false;
        }
      } else {
        $scope.allCheckedState = true;
        for (var k = 0; k < $scope.appData.tasks.length; k++) {
          var task2 = $scope.appData.tasks[k];
          $scope.checkedTasks[task2.id] = true;
          $scope.checkTask(task2.id);
        }
      }
    }
  }
}());
