(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('FrameworkExecutorTasksCtrl', FrameworkExecutorTasksCtrl);

  FrameworkExecutorTasksCtrl.$inject = [
    '$scope',
    '$q',
    '$timeout',
    '$location',
    '$routeParams',
    'ClusterName',
    'ActiveMasterData',
    'SlaveFrameworks',
    'Components',
    'Metrics'
  ];

  function FrameworkExecutorTasksCtrl($scope, $q, $timeout, $location, $routeParams, ClusterName, ActiveMasterData, SlaveFrameworks, Components, Metrics) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;

    $scope.frameworkExecutorTasksQueued = [];
    $scope.frameworkExecutorTasks = [];
    $scope.frameworkExecutorTasksCompleted = [];

    $scope.frameworkId = decodeURIComponent($routeParams.frameworkId);
    $scope.slaveId = decodeURIComponent($routeParams.slaveId);
    $scope.executorId = decodeURIComponent($routeParams.executorId);

    runApp();

    ///////////////////////

    $scope.goToFrameworksTable = goToFrameworksTable;
    $scope.goToFrameworkExecutors = goToFrameworkExecutors;
    $scope.goToFrameworkTaskSandbox = goToFrameworkTaskSandbox;

    //////////////////////

    function goToFrameworksTable() {
      $location.path('/mesos/frameworks/');
    }

    function goToFrameworkExecutors() {
      $location.path('/mesos/frameworks/' + $scope.frameworkId);
    }

    function goToFrameworkTaskSandbox(taskId) {
      $location.path($location.path() + '/tasks/' + taskId);
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
          return ActiveMasterData.getSlaves(VERSION, activeMaster);
        })
        .then(function(response) {
          return response.data.slaves;
        })
        .then(function(activeMasterSlaves) {
          for (var i = 0; i < activeMasterSlaves.length; i++) {
            if (activeMasterSlaves[i].id === $scope.slaveId) {
              var prefix = activeMasterSlaves[i].pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = activeMasterSlaves[i].pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = "http://" + host + "/" + prefix + "/state.json";
              return SlaveFrameworks.get(VERSION, stateUrl);
            }
          }
        })
        .then(function(response) {
          var frameworks = response.data.frameworks;
          for (var i = 0; i < frameworks.length; i++) {
            if (frameworks[i].id === $scope.frameworkId) {
              var executors = frameworks[i].executors;
              for (var k = 0; k < executors.length; k++) {
                if (executors[k].id === $scope.executorId) {
                  $scope.frameworkExecutorTasksQueued = executors[k].queued_tasks;
                  $scope.frameworkExecutorTasks = executors[k].tasks;
                  $scope.frameworkExecutorTasksCompleted = executors[k].completed_tasks;
                }
              }
            }
          }
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
