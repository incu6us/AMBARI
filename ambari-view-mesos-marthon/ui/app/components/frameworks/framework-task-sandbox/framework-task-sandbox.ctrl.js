(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('FrameworkTaskSandboxCtrl', FrameworkTaskSandboxCtrl);

  FrameworkTaskSandboxCtrl.$inject = [
    '$scope',
    '$q',
    '$timeout',
    '$location',
    '$routeParams',
    'ClusterName',
    'ActiveMasterData',
    'SlaveFrameworks',
    'Sandbox',
    'Components',
    'Metrics'
  ];

  function FrameworkTaskSandboxCtrl($scope, $q, $timeout, $location, $routeParams, ClusterName, ActiveMasterData, SlaveFrameworks, Sandbox, Components, Metrics) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });

    var activeMaster = null;
    var slaveHostName = null;

    var executorUrl = null;
    var executorUrlForDownloadFile = null;
    var executorDir = null;
    var executorLastDir = null;

    $scope.directories = [];

    $scope.frameworkId = decodeURIComponent($routeParams.frameworkId);
    $scope.slaveId = decodeURIComponent($routeParams.slaveId);
    $scope.executorId = decodeURIComponent($routeParams.executorId);
    $scope.taskId = decodeURIComponent($routeParams.taskId);

    runApp();

    ///////////////////////

    $scope.goToFrameworksTable = goToFrameworksTable;
    $scope.goToFrameworkTasks = goToFrameworkTasks;
    $scope.goToFrameworkExecutorTasks = goToFrameworkExecutorTasks;
    $scope.goToSandboxDir = goToSandboxDir;
    $scope.downloadSandboxFile = downloadSandboxFile;

    //////////////////////

    function goToFrameworksTable() {
      $location.path('/mesos/frameworks/');
    }

    function goToFrameworkTasks() {
      $location.path('/mesos/frameworks/' + $scope.frameworkId);
    }

    function goToFrameworkExecutorTasks() {
      $location.path('mesos/slaves/' + $scope.slaveId + '/frameworks/' + $scope.frameworkId  + '/executors/' + $scope.executorId);
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
              slaveHostName = activeMasterSlaves[i].hostname;
              var prefix = activeMasterSlaves[i].pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var port = '5051';
              var stateUrl = "http://" + slaveHostName + ":" + port + "/" + prefix + "/state.json";
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
                  var port = '5051';
                  executorUrl = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + slaveHostName + ":" + port + "/files/browse.json?path=";
                  executorUrlForDownloadFile = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/object?url=http://" + slaveHostName + ":" + port + "/files/download.json?path=";
                  executorDir = executors[k].directory;
                  executorLastDir = executorDir;
                  return Sandbox.getDirs(executorUrl, executorDir);
                }
              }
            }
          }
        })
        .then(function(response) {

          $scope.directories = response.data.array;
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

    function goToSandboxDir(filemode, path) {
      if (path === '..') {
        executorLastDir = executorLastDir.replace(new RegExp("(.*)/(.*)"), "$1");
      } else {
        if (filemode === 'd') {
          executorLastDir = path;
        }
      }

      if (filemode === '-') {
        return;
      }
      Sandbox.getData(executorUrl, executorLastDir)
        .then(function(response) {
          $scope.directories = response.data.array;
          if (executorDir !== executorLastDir) {
            $scope.directories.unshift({
              "mode": "up",
              "path": "..",
              "uid": "",
              "gid": "",
              "size": "",
              "nlink": "",
              "mtime": ""
            });
          }
        });
    }

    function downloadSandboxFile(filemode, path) {
      if (filemode === '-') {
        window.open(executorUrlForDownloadFile + path, '_blank', '');
      }
    }

  }
}());
