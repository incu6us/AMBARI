(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('FrameworkExecutorsCtrl', FrameworkExecutorsCtrl);

  FrameworkExecutorsCtrl.$inject = [
    '$scope',
    '$q',
    '$timeout',
    '$location',
    '$routeParams',
    'visualisationConfigs',
    'ClusterName',
    'ActiveMasterData'
  ];

  function FrameworkExecutorsCtrl($scope, $q, $timeout, $location, $routeParams, visualisationConfigs, ClusterName, ActiveMasterData) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;

    $scope.frameworksExecutors = [];

    $scope.frameworkId = decodeURIComponent($routeParams.frameworkId);

    runApp();

    ///////////////////////

    $scope.goToFrameworksTable = goToFrameworksTable;
    $scope.goToExecutorTasks = goToExecutorTasks;
    $scope.goToExecutorSandbox = goToExecutorSandbox;

    //////////////////////

    function goToFrameworksTable() {
      $location.path('/mesos/frameworks/');
    }

    function goToExecutorTasks(slaveId, executorId) {
      $location.path($location.path() + '/' + slaveId + '/' + executorId);
    }

    function goToExecutorSandbox() {
      $location.path($location.path() + '/' + taskId);
    }

    function runApp() {
      ClusterName.get()
        // .then(function(response) {
        //   return response.data.items[0].Clusters.cluster_name;
        // })
        // .then(function(clusterName) {
        //   return Components.getMasters();
        // })
        // .then(function(mastersData) {
        //   var masterItems = mastersData.data.host_components;
        //   var promises = [];
        //
        //   for (var i = 0; i < masterItems.length; i++) {
        //     promises.push(getActiveMaster(masterItems[i].HostRoles.host_name));
        //   }
        //   return $q.all(promises);
        // })
        .then(function() {
          return ActiveMasterData.getState(VERSION, activeMaster);
        })
        .then(function(response) {
          $scope.frameworks = response.data.frameworks;

          angular.forEach($scope.frameworks, function(value, key) {
            if (value.id == $scope.frameworkId) {
              $scope.frameworksExecutors = value.executors;
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
