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
    'visualisationConfigs',
    'ClusterName',
    'ActiveMasterData',
    'Frameworks'
  ];

  function FrameworkExecutorTasksCtrl($scope, $q, $timeout, $location, $routeParams, visualisationConfigs, ClusterName, ActiveMasterData, Frameworks) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    // @TODO think about place of SlaveID in 'route' and 'breadcrumb'. Maybe -> #/mesos/:slaveId/:frameworkId and #/mesos/:slaveId/:frameworkId/:executorId

    // When we are on 'Frameworks Table' - we get info about Frameworks from ActiveMaster.
    // When we are on 'Framework Executors' - we get info about Executors from ActiveMaster. BUT ActiveMaster do not containt(!) info abou tasks.
    // So we get from Executor - ID of Slave(1), on which it runned.
    // Then we get list of Slaves of ActiveMaster. Then we compair (1) with every SlaveID from List and found slave with our executor.
    // Then we get info from that slave. This info containt Frameworks, Executors and Tasks(!) wich are runned on slave.

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;

    $scope.frameworkExecutorTasks = [];

    $scope.frameworkId = decodeURIComponent($routeParams.frameworkId);
    $scope.slaveId = decodeURIComponent($routeParams.slaveId);
    $scope.executorId = decodeURIComponent($routeParams.executorId);

    runApp();

    ///////////////////////

    $scope.goToFrameworksTable = goToFrameworksTable;
    $scope.goToFrameworkExecutors = goToFrameworkExecutors;

    //////////////////////

    function goToFrameworksTable() {
      $location.path('/mesos/frameworks/');
    }

    function goToFrameworkExecutors(executorId) {
      $location.path('/mesos/frameworks/' + executorId);
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
              return Frameworks.get(VERSION, stateUrl);
            }
          }
        })
        .then(function(response) {
          angular.forEach(response.data.frameworks, function(value, key) {
            if (value.id === $scope.frameworkId) {
              angular.forEach(value.executors, function(value1, key1) {
                if (value1.id === $scope.executorId) {
                  $scope.tasks = value1.tasks;
                }
              });
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
