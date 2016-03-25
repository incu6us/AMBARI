(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('FrameworkTasksCtrl', FrameworkTasksCtrl);

  FrameworkTasksCtrl.$inject = [
    '$scope',
    '$q',
    '$timeout',
    '$location',
    '$routeParams',
    'ClusterName',
    'ActiveMasterData',
    'Components',
    'Metrics'
  ];

  function FrameworkTasksCtrl($scope, $q, $timeout, $location, $routeParams, ClusterName, ActiveMasterData, Components, Metrics) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;

    $scope.frameworkTasks = [];
    $scope.frameworkTasksCompleted = [];

    $scope.frameworkId = decodeURIComponent($routeParams.frameworkId);

    $scope.currentDate = new Date();

    runApp();

    ///////////////////////

    $scope.goToFrameworksTable = goToFrameworksTable;
    $scope.goToExecutorTasks = goToExecutorTasks;
    $scope.goToExecutorTasks = goToExecutorTasks;

    //////////////////////

    function goToFrameworksTable() {
      $location.path('/mesos/frameworks/');
    }

    function goToExecutorTasks(slaveId, executorId, taskId) {
      if (executorId === '') {
        executorId = taskId;
      }
      $location.path('mesos/slaves/' + slaveId + '/frameworks/' + $scope.frameworkId  + '/executors/' + executorId);
    }

    function goToTaskSandbox() {
      $location.path($location.path() + '/' + taskId);
    }

    function runApp() {
      ClusterName.get()
        .then(function(response) {
          return response.data.items[0].Clusters.cluster_name;
        })
        .then(function(clusterName) {
          return Components.getMasters(clusterName);
        })
        .then(function(mastersData) {
          var masterItems = mastersData.data.host_components;
          var promises = [];

          for (var i = 0; i < masterItems.length; i++) {
            promises.push(getActiveMaster(masterItems[i].HostRoles.host_name));
          }
          return $q.all(promises);
        })
        .then(function() {
          return ActiveMasterData.getState(VERSION, activeMaster);
        })
        .then(function(response) {
          $scope.frameworks = response.data.frameworks;

          angular.forEach($scope.frameworks, function(val, key) {
            if (val.id === $scope.frameworkId) {
              $scope.frameworkTasks = val.tasks;
              $scope.frameworkTasksCompleted = val.completed_tasks;
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getActiveMaster(masterHost) {
      return Metrics.getForMaster(VERSION, masterHost)
        .then(function(response) {
          var items = response.data;

          if(items["master/elected"] === 1.0) {
            activeMaster = masterHost;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());
