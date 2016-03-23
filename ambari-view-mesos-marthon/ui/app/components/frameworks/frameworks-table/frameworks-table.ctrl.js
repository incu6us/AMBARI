(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('FrameworksTableCtrl', FrameworksTableCtrl);

  FrameworksTableCtrl.$inject = [
    '$scope',
    '$q',
    '$timeout',
    '$location',
    'ClusterName',
    'ActiveMasterData',
    'Components',
    'Metrics'
  ];

  function FrameworksTableCtrl($scope, $q, $timeout, $location, ClusterName, ActiveMasterData, Components, Metrics) {
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

    $scope.frameworksActive = null;
    $scope.frameworksTerminated = null;
    $scope.executorsInFrameworks = [];

    $scope.currentDate = new Date();

    runApp();

    ///////////////////////

    $scope.goToFrameworkTasks = goToFrameworkTasks;

    //////////////////////

    function goToFrameworkTasks(frameworkId) {
      $location.path('/mesos/frameworks/' + encodeURIComponent(frameworkId));
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
          $scope.frameworksActive = response.data.frameworks;
          $scope.frameworksTerminated = response.data.completed_frameworks;
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
