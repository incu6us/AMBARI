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
    'visualisationConfigs',
    'ClusterName',
    'ActiveMasterData'
  ];

  function FrameworksTableCtrl($scope, $q, $timeout, $location, visualisationConfigs, ClusterName, ActiveMasterData) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;

    $scope.frameworksActive = null;
    $scope.frameworksCompleted = null;
    $scope.executorsInFrameworks = [];

    runApp();

    ///////////////////////

    $scope.goToFrameworkExecutors = goToFrameworkExecutors;

    //////////////////////

    function goToFrameworkExecutors(frameworkId) {
      $location.path('/mesos/frameworks/' + encodeURIComponent(frameworkId));
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
          $scope.frameworksActive = response.data.frameworks;
          $scope.frameworksCompleted = response.data.completed_frameworks;
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
