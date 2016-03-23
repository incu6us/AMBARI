(function() {
  'use strict';

  angular
    .module('MesosMarathonApp', [
      'ngMaterial',
      'ngRoute',
      'templates'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    //          to prevent '#', but including '<base hreg="/">' not working
    //          maybe because of Ember
    //          $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        redirectTo: '/mesos/metrics'
      })
      .when('/marathon/apps', {
        templateUrl: 'app/components/apps/apps-table/apps-table.tpl.html',
        controller: 'AppsTableCtrl'
      })
      .when('/marathon/apps/:id', {
        templateUrl: 'app/components/apps/app-info/app-info.tpl.html',
        controller: 'AppInfoCtrl'
      })
      .when('/marathon/apps/:id/:taskId', {
        templateUrl: 'app/components/apps/task-info/task-info.tpl.html',
        controller: 'TaskInfoCtrl'
      })
      .when('/marathon/deployments', {
        templateUrl: 'app/components/deployments/deployments.tpl.html',
        controller: 'AppsDeploymentsCtrl'
      })
      .when('/mesos/metrics', {
        templateUrl: 'app/components/metrics/metrics.tpl.html',
        controller: 'MetricsCtrl'
      })
      .when('/mesos/frameworks', {
        templateUrl: 'app/components/frameworks/frameworks-table/frameworks-table.tpl.html',
        controller: 'FrameworksTableCtrl'
      })
      .when('/mesos/frameworks/:frameworkId', {
        templateUrl: 'app/components/frameworks/framework-executors/framework-executors.tpl.html',
        controller: 'FrameworkExecutorsCtrl'
      })
      .when('/mesos/frameworks/:frameworkId/:slaveId/:executorId', {
        templateUrl: 'app/components/frameworks/framework-executor-tasks/framework-executor-tasks.tpl.html',
        controller: 'FrameworkExecutorTasksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .config(themeConfig);

  themeConfig.$inject = ['$mdThemingProvider'];

  function themeConfig($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('brown', {
        'default': '900'
      })
      .accentPalette('orange', {
        'hue-1': '400'
      })
      .warnPalette('red')
      .backgroundPalette('grey', {
        'default': '200'
      });
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .constant('visualisationConfigs', function() {
      // recursive function to clone an object. If a non object parameter
      // is passed in, that parameter is returned and no recursion occurs.
      function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
          temp[key] = clone(obj[key]);
        }

        return temp;
      }

      // pieCharts configs to clone
      var pieChartOptionsNoColorMaster = {
        chart: {
          type: 'pieChart',
          height: 150,
          donut: true,
          x: function(d) {
            return d.name;
          },
          y: function(d) {
            return d.size;
          },
          showLegend: false,
          showLabels: false,
          transitionDuration: 500
        }
      };
      var pieChartOptionsNoColorSlave = {
        chart: {
          type: 'pieChart',
          height: 150,
          x: function(d) {
            return d.name;
          },
          y: function(d) {
            return d.size;
          },
          showLegend: false,
          showLabels: false,

          transitionDuration: 500,
          legend: {
            margin: {
              top: 5,
              right: 140,
              bottom: 5,
              left: 0
            }
          }
        }
      };

      // Network configs to clone
      var networkNodeConfig = {
        id: 0,
        label: '',
        borderWidth: 0,
        borderWidthSelected: 0,
        // shadow: true,
        font: {
          size: 11
        },
        shape: "circle"
      };
      var networkEdgeConfig = {
        length: 150,
        // shadow: true,
        color: "#b3b3ff",
        id: 0,
        from: 1,
        to: 0
      };

      // Network Main config
      var options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        interaction: {
          navigationButtons: true,
          keyboard: true,
          hover: true
        }
      };

      // D3 Main config
      var d3Config = {
        extended: true,
        autorefresh: true,
        debounce: 10
      };

      // Clone object without reference(!)
      var pieChartOptionsActiveMasterCpu = clone(pieChartOptionsNoColorMaster);
      // Add color
      pieChartOptionsActiveMasterCpu.chart.color = ["#512DA8", "#A98CEF"];

      var pieChartOptionsActiveMasterMem = clone(pieChartOptionsNoColorMaster);
      pieChartOptionsActiveMasterMem.chart.color = ["#9C27B0", "#E691F5"];

      var pieChartOptionsActiveMasterDisk = clone(pieChartOptionsNoColorMaster);
      pieChartOptionsActiveMasterDisk.chart.color = ["#00BCD4", "#A8ECF5"];

      var pieChartOptionsHostCpu = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsHostCpu.chart.color = ["#512DA8", "#A98CEF"];

      var pieChartOptionsHostMem = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsHostMem.chart.color = ["#9C27B0", "#E691F5"];

      var pieChartOptionsHostDisk = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsHostDisk.chart.color = ["#00BCD4", "#A8ECF5"];


      var networkNodeMaster = clone(networkNodeConfig);
      networkNodeMaster.color = "#87b6de";
      // networkNodeMaster.font = {size: 9};

      var networkNodeSlave = clone(networkNodeConfig);
      networkNodeSlave.color = "#b3b3ff";
      networkNodeSlave.group = 2;

      var networkEdgeSlave = clone(networkEdgeConfig);

      var networkNodesService = [{
        id: 10000,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "CPU",
        shape: "dot",
        // shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#512DA8"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10001,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "Memory",
        shape: "dot",
        // shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#9C27B0"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10002,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "Disk",
        shape: "dot",
        // shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#00BCD4"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10003,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "All",
        shape: "dot",
        // shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#304FFE"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }];
      var networkEdgesService = [{
          id: 10000,
          from: 10000,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10001,
          from: 10001,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10002,
          from: 10002,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10003,
          from: 10003,
          to: 1,
          length: 1,
          hidden: true
        }];

      return {
        options: options,
        d3Config: d3Config,

        pieChartOptionsActiveMasterCpu: pieChartOptionsActiveMasterCpu,
        pieChartOptionsActiveMasterMem: pieChartOptionsActiveMasterMem,
        pieChartOptionsActiveMasterDisk: pieChartOptionsActiveMasterDisk,
        pieChartOptionsHostCpu: pieChartOptionsHostCpu,
        pieChartOptionsHostMem: pieChartOptionsHostMem,
        pieChartOptionsHostDisk: pieChartOptionsHostDisk,

        networkNodeMaster: networkNodeMaster,

        networkNodeSlave: networkNodeSlave,
        networkEdgeSlave: networkEdgeSlave,

        networkNodesService: networkNodesService,
        networkEdgesService: networkEdgesService
      };

    });
}());

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
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function scaleApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/scale-app-modal/scale-app-modal.tpl.html',
        controller: 'ScaleAppCtrl',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function restartApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/restart-app-modal/restart-app-modal.tpl.html',
        controller: 'RestartAppCtrl',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

    function destroyApp(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/destroy-app-modal/destroy-app-modal.tpl.html',
        controller: 'DestroyAppCtrl',
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

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableConfig', tableConfig);

  function tableConfig() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-config.tpl.html'
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableDebug', tableDebug);

  function tableDebug() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-debug.tpl.html'
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableTasks', tableTasks);

  function tableTasks() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-tasks.tpl.html'
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('AppsTableCtrl', AppsTableCtrl);

  AppsTableCtrl.$inject = [
    '$scope',
    '$timeout',
    '$location',
    '$mdDialog',
    'AppsTableInfo',
    'HostName'
  ];

  function AppsTableCtrl($scope, $timeout, $location, $mdDialog, AppsTableInfo, HostName) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    $scope.appsList = [];

    getAppsList();

    ///////////////////

    $scope.showAppInfo = showAppInfo;
    $scope.newAppModal = newAppModal;

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

    function newAppModal(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/new-app-modal/new-app-modal.tpl.html',
        controller: 'NewAppCtrl',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

  }
}());

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

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('AppsDeploymentsCtrl', AppsDeploymentsCtrl);

  AppsDeploymentsCtrl.$inject = [
    '$scope',
    '$timeout',
    '$location',
    '$mdDialog',
    '$scope',
    'AppsDeployments',
    'HostName'
  ];

  function AppsDeploymentsCtrl($scope, $timeout, $location, $mdDialog, AppsDeployments, HostName) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    var hostName = null;

    $scope.deployList = [];

    /////////////////////

    $scope.showAppInfo = showAppInfo;
    $scope.stopDeploy = stopDeploy;
    $scope.rollbackDeploy = rollbackDeploy;

    /////////////////////

    function showAppInfo(appId) {
      $location.path('/marathon/apps/' + encodeURIComponent(appId));
    }

    function getDeploysList() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          return AppsDeployments.get(hostName);
        })
        .then(function(response) {
          $scope.deployList = response.data.array;
          promise = $timeout(getDeploysList, 10 * 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function stopDeploy(ev, deployId) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/deployments-stop-modal/deployments-stop-modal.tpl.html',
        controller: 'StopAppDeployCtrl',
        controllerAs: 'stopAppDeploy',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          deployId: deployId,
          hostName: hostName
        }
      });
    }

    function rollbackDeploy(ev, deployId) {
      $mdDialog.show({
        templateUrl: 'app/components/modals/deployments-rollback-modal/deployments-rollback-modal.tpl.html',
        controller: 'RollbackAppDeployCtrl',
        controllerAs: 'rollbackAppDeploy',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          deployId: deployId,
          hostName: hostName
        }
      });
    }
  }
}());

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

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('masterInfo', masterInfo);

  function masterInfo() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/metrics/active-master-sidebar/active-master-sidebar.tpl.html'
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('MetricsCtrl', MetricsCtrl);

  MetricsCtrl.$inject = [
    '$scope',
    '$q',
    '$interval',
    '$timeout',
    '$mdSidenav',
    'visualisationConfigs',
    'ClusterName',
    'Components',
    'Metrics',
    'ActiveMasterData',
    'Frameworks'
  ];

  function MetricsCtrl($scope, $q, $interval, $timeout, $mdSidenav, visualisationConfigs, ClusterName, Components, Metrics, ActiveMasterData, Frameworks) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    // PROBLEM MetricsCtrl is parent $scope for vis-network directive. So $scope.infoPanel === true/false not work correct, because of different scopes.
    // SOLUTION: $interval solves it ^, but don't know how.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // try use $scope.$digest(); or $watch;
    var intervalPromise =  $interval(function() {
    }, 1*1000);

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
      $interval.cancel(intervalPromise);
    });

    $scope.infoPanel = false;

    $scope.clusterName = null;
    $scope.activeMaster = null;

    $scope.mastersList = [];
    $scope.allHostsList = [];

    // Additional Info in HostInfoPanel
    $scope.executorsRunning = null;
    $scope.frameworksActive = null;

    // Network data to draw
    $scope.nodes = [];
    $scope.edges = [];
    $scope.network_data = {
      nodes: $scope.nodes,
      edges: $scope.edges
    };
    // Network events
    $scope.events = {};
    // Network main config
    $scope.options = visualisationConfigs().options;

    // D3 Main config
    $scope.d3Config = visualisationConfigs().d3Config;
    // pieCharts metrics for activeMaster
    $scope.activeMaster = {
      cpu: [{}],
      mem: [{}],
      disk: [{}]
    };
    // Temp activeMaster Storage - fixing bug when pieChart showed small: https://github.com/krispo/angular-nvd3/issues/85
    var activeMasterDataTemp = {
      cpu: null,
      mem: null,
      disk: null
    };
    // pieCharts metrics for Hosts
    $scope.hostData = {
      general: [],
      cpu: [{}],
      mem: [{}],
      disk: [{}]
    };
    // pieCharts configs
    $scope.optionsActiveMasterCpu = visualisationConfigs().pieChartOptionsActiveMasterCpu;
    $scope.optionsActiveMasterMem = visualisationConfigs().pieChartOptionsActiveMasterMem;
    $scope.optionsActiveMasterDisk = visualisationConfigs().pieChartOptionsActiveMasterDisk;
    $scope.optionsHostCpu = visualisationConfigs().pieChartOptionsHostCpu;
    $scope.optionsHostMem = visualisationConfigs().pieChartOptionsHostMem;
    $scope.optionsHostDisk = visualisationConfigs().pieChartOptionsHostDisk;

    runApp();

    ///////////////////////

    $scope.parseFloat = parseFloat;

    // On Network event
    $scope.events.click = onNetworkClick;
    $scope.events.hoverNode = showServiceNodes;

    // On InfoPanel click
    $scope.showExecutorsRunning = showExecutorsRunning;
    $scope.showFrameworksActive = showFrameworksActive;

    // Show right Toolbar
    $scope.showRightToolbar = showRightToolbar;

    //////////////////////

    function runApp() {
      ClusterName.get()
        .then(function(response) {
          $scope.clusterName = response.data.items[0].Clusters.cluster_name;
        })
        .then(function() {
          return Components.getMasters($scope.clusterName);
        })
        .then(function(mastersData) {
          var masterItems = mastersData.data.host_components;
          var promises = [];
          $scope.mastersList = [];
          for (var i = 0; i < masterItems.length; i++) {
            promises.push(getMetricsForActiveMasterInfoSidebar(masterItems[i].HostRoles.host_name));
          }
          return $q.all(promises);
        })
        .then(function() {
          return Components.getSlaves($scope.clusterName);
        })
        .then(function(slavesData) {
          var hostItems = slavesData.data.host_components;
          var promises = [];
          $scope.allHostsList = [];
          for (var k = 0; k < hostItems.length; k++) {
            promises.push(getMetricsForHostsInfoPanel(hostItems[k].HostRoles.host_name));
          }
          return $q.all(promises);
        })
        .then(function() {
          drawNetwork($scope.allHostsList);
        })
        // Refresh data every 10 seconds. WARNING! Causes Network rerender
        // .then(function() {
        //   promise = $timeout(runApp, 10 * 1000);
        // })
        .catch(function(err) {
          console.log(err);
        });
    }


    function getMetricsForActiveMasterInfoSidebar(masterHost) {
      $scope.mastersList.push(masterHost);
      return Metrics.getForMaster(VERSION, masterHost)
        .then(function(response) {
          var items = response.data;

          if(items["master/elected"] === 1.0) {
            $scope.activeMaster = masterHost;

            activeMasterDataTemp.cpu = [{
              name: "Used",
              size: items["master/cpus_used"]
            }, {
              name: "Free",
              size: items["master/cpus_total"] - items["master/cpus_used"]
            }];

            activeMasterDataTemp.mem = [{
              name: "Used",
              size: (items["master/mem_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["master/mem_total"] - items["master/mem_used"]) / 1024).toFixed(2)
            }];

            activeMasterDataTemp.disk = [{
              name: "Used",
              size: (items["master/disk_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["master/disk_total"] - items["master/disk_used"]) / 1024).toFixed(2)
            }];
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getMetricsForHostsInfoPanel(host) {
      return Metrics.getForHost(VERSION, host)
        .then(function(response) {
          var items = response.data;

          var hostData = {};

          hostData.id = host;
          hostData.general = items;

          hostData.cpu = [{
            name: 'Used',
            size: items['slave/cpus_used']
          }, {
            name: 'Free',
            size: items['slave/cpus_total'] - items['slave/cpus_used']
          }];

          hostData.mem = [{
            name: 'Used',
            size: (items['slave/mem_used'] / 1024).toFixed(2)
          }, {
            name: 'Free',
            size: ((items['slave/mem_total'] - items['slave/mem_used']) / 1024).toFixed(2)
          }];

          hostData.disk = [{
            name: 'Used',
            size: (items['slave/disk_used'] / 1024).toFixed(2)
          }, {
            name: 'Free',
            size: ((items['slave/disk_total'] - items['slave/disk_used']) / 1024).toFixed(2)
          }];

          $scope.allHostsList.push(hostData);
        });
    }


    function drawNetwork(hostItems) {
      var tmpNodeArr = [];
      var tmpEdgeArr = [];

      var nodesIdCounter = 1;
      var edgeIdCounter = 1;

      var notUsedMasterHost = 0;

      for (var i = 0; i < hostItems.length; i++) {
        var itemHostName = hostItems[i].id;

        if (itemHostName === $scope.activeMaster) {
          // Active Master
          var activeMasterNode = visualisationConfigs().networkNodeMaster;
          activeMasterNode.id = 1;
          activeMasterNode.label = $scope.activeMaster;
          tmpNodeArr.push(activeMasterNode);

        } else if (itemHostName !== $scope.activeMaster && itemHostName.indexOf("master") > -1) {
          // Not Active Master
          var notActiveMasterNode = visualisationConfigs().networkNodeMaster;
          notActiveMasterNode.id = ++nodesIdCounter;
          notActiveMasterNode.label = itemHostName;
          tmpNodeArr.push(notActiveMasterNode);

          notUsedMasterHost = nodesIdCounter;
        } else {
          // Slaves
          var hostNode = visualisationConfigs().networkNodeSlave;
          hostNode.id = ++nodesIdCounter;
          hostNode.label = itemHostName;
          tmpNodeArr.push(hostNode);

          var hostEdge = visualisationConfigs().networkEdgeSlave;
          hostEdge.id = edgeIdCounter++;
          hostEdge.to = nodesIdCounter;
          tmpEdgeArr.push(hostEdge);
        }
      }

      var networkNodesService = visualisationConfigs().networkNodesService;
      var networkEdgesService = visualisationConfigs().networkEdgesService;

      for (var j = 0; j < networkNodesService.length; j++){
        tmpNodeArr.push(networkNodesService[j]);
      }
      for (var k = 0; k < networkEdgesService.length; k++){
        tmpEdgeArr.push(networkEdgesService[k]);
      }

      if ($scope.nodes.length !== tmpNodeArr.length || $scope.edges.length !== tmpEdgeArr.length) {
        $scope.nodes = tmpNodeArr;
        $scope.edges = tmpEdgeArr;

        $scope.network_data = {
          nodes: new vis.DataSet($scope.nodes),
          edges: new vis.DataSet($scope.edges)
        };
      }
    }


    function onNetworkClick(data) {
      var nodeId = data.nodes[0];

      switch (nodeId) {
        case 10000:
          generateChart('cpu');
          break;
        case 10001:
          generateChart('mem');
          break;
        case 10002:
          generateChart('disk');
          break;
        case 10003:
          generateAllChart();
          break;
        default:
          angular.forEach($scope.network_data.nodes, function(node) {
            if(node.id !== 10000 && node.id !== 10001 && node.id !== 10002 && node.id !== 10003) {
              if (node.title !== undefined) {
                $scope.network_data.nodes.update([{
                  id: node.id,
                  shape: 'circle',
                  label: node.title,
                  title: undefined
                }]);
              }
            }
          });
          showHostInfoPanel(data);
      }
    }


    function showHostInfoPanel(data) {
      if ($scope.infoPanel === false) {
        $scope.infoPanel = true;
      }
      if (data.nodes[0] === undefined) {
        $scope.infoPanel = false;
      }

      angular.forEach($scope.nodes, function(value, key) {
        if (data.nodes[0] === value.id) {
          for (var i = 0; i < $scope.allHostsList.length; i++){
            if($scope.allHostsList[i].id === value.label) {
              $scope.hostData.id = $scope.allHostsList[i].id;
              $scope.hostData.general = $scope.allHostsList[i].general;
              $scope.hostData.cpu = $scope.allHostsList[i].cpu;
              $scope.hostData.mem = $scope.allHostsList[i].mem;
              $scope.hostData.disk = $scope.allHostsList[i].disk;
            }
          }
        }
      });
    }

    function showServiceNodes(data) {
      var nodeId = data.node;
      if (nodeId === 1) {
        $scope.network_data.nodes.update([{
          id: 10000,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10001,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10002,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10003,
          hidden: false
        }]);
      } else if (nodeId != 10000 && nodeId != 10001 && nodeId != 10002 && nodeId != 10003 && nodeId != 10004) {
        $scope.network_data.nodes.update([{
          id: 10000,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10001,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10002,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10003,
          hidden: true
        }]);
      }
    }

    function showExecutorsRunning(hostName) {
      ActiveMasterData.getState(VERSION, $scope.activeMaster)
        .then(function(response) {
          var allData = response.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostName) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = 'http://' + host + '/' + prefix + '/state.json';

              Frameworks.get(VERSION, stateUrl)
                .then(function(frameworkValues) {
                  $scope.executorsRunning = [];

                  angular.forEach(frameworkValues.data.frameworks, function(framework, keyFrameworks) {
                    angular.forEach(framework.executors, function(executor, keyExecutor) {
                      var executorTemp = {
                        name: executor.name,
                        cpu: executor.resources.cpus.toFixed(2),
                        mem: (executor.resources.mem / 1024).toFixed(2),
                        disk: (executor.resources.disk / 1024).toFixed(2)
                      };
                      $scope.executorsRunning.push(executorTemp);
                    });
                  });
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function showFrameworksActive(hostName) {
      ActiveMasterData.getState(VERSION, $scope.activeMaster)
        .then(function(resource) {
          var allData = resource.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostName) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = "http://" + host + "/" + prefix + "/state.json";

              Frameworks.get(VERSION, stateUrl)
                .then(function(frameworkValues) {
                  $scope.frameworksActive = [];

                  angular.forEach(frameworkValues.data.frameworks, function(framework, keyFrameworks) {
                    var frameworkTemp = {
                      name: framework.name
                    };
                    $scope.frameworksActive.push(frameworkTemp);
                  });
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function showRightToolbar() {
      $mdSidenav('right').toggle();

      // Reasigning need because of bug: https://github.com/krispo/angular-nvd3/issues/85
      $timeout(function () {
        $scope.activeMaster.cpu = activeMasterDataTemp.cpu;
        $scope.activeMaster.mem = activeMasterDataTemp.mem;
        $scope.activeMaster.disk = activeMasterDataTemp.disk;
      }, 500);
    }


    function generateChart(metric) {
      angular.forEach($scope.nodes, function(value) {
        if (value.label === $scope.activeMaster || value.group === 2) {
          var hostName = value.label;

          var canvas = document.getElementById("canPrep");
          var ctx = canvas.getContext("2d");
          var lastend = 0;

          var data = [];
          var dataTotal = 100;

          var color = [];

          var used = null;
          var free = null;
          var total = null;

          var i = null;
          var length = null;

          switch (metric) {
            case 'cpu':
              color = ["#A98CEF", "#512DA8"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].cpu[0].size);
                  free = parseFloat($scope.allHostsList[i].cpu[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            case 'mem':
              color = ["#9C27B0", "#E691F5"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].mem[0].size);
                  free = parseFloat($scope.allHostsList[i].mem[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            case 'disk':
              color = ["#A8ECF5", "#00BCD4"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].disk[0].size);
                  free = parseFloat($scope.allHostsList[i].disk[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            default:
              console.log('unknown "metric" parametr');
          }

          for (i = 0; i < data.length; i++) {
            ctx.fillStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / dataTotal)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (data[i] / dataTotal);
          }

          var dataUrl = canvas.toDataURL();
          var nodeId = value.id;

          $scope.network_data.nodes.update([{
            id: nodeId,
            shape: 'circularImage',
            label: '',
            title: hostName,
            image: dataUrl
          }]);
        }
      });
    }

    function generateAllChart() {
      document.getElementById('chartNodeUsage').innerHTML = '';
      var k = 0;
      angular.forEach($scope.nodes, function(value) {
        if (value.label === $scope.activeMaster || value.group === 2) {
          // Creating scope for each circle
          drawCircleChart(k, value);
          k++;
        }
      });
    }

    function drawCircleChart(k, value) {
      var hostName = value.label;

      var graphSettings = {
        series: [{
          value: null,
          color: {
            solid: '#512DA8',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }, {
          value: null,
          color: {
            solid: '#9C27B0',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }, {
          value: null,
          color: {
            solid: '#00BCD4',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }],
        shadow: {
          width: 0
        },
        animation: {
          duration: 1,
          delay: 1
        },
        diameter: 135
      };

      for (var i = 0, length = $scope.allHostsList.length; i < length; i++) {
        if(value.label === $scope.allHostsList[i].id) {
          graphSettings.series[0].value = parseFloat($scope.allHostsList[i].cpu[0].size) / (parseFloat($scope.allHostsList[i].cpu[0].size) + parseFloat($scope.allHostsList[i].cpu[1].size)) * 100;
          graphSettings.series[1].value = parseFloat($scope.allHostsList[i].mem[0].size) / (parseFloat($scope.allHostsList[i].mem[0].size) + parseFloat($scope.allHostsList[i].mem[1].size)) * 100;
          graphSettings.series[2].value = parseFloat($scope.allHostsList[i].disk[0].size) / (parseFloat($scope.allHostsList[i].disk[0].size) + parseFloat($scope.allHostsList[i].disk[1].size)) * 100;
        }
      }

      var cont = document.createElement('div');
      cont.setAttribute("id", "child" + k);
      document.getElementById('chartNodeUsage').appendChild(cont);

      new RadialProgressChart("#child" + k, graphSettings);

      $timeout(function () {
        document.getElementById('canPrep').width = 400;
        document.getElementById('canPrep').height = 400;
        var nodeId = value.id;
        var svgString = new XMLSerializer().serializeToString(document.getElementById('child' + k).querySelector('svg'));
        var canvas = document.getElementById("canPrep");
        var ctx = canvas.getContext("2d");
        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8"
        });
        var url = DOMURL.createObjectURL(svg);

        img.onload = function() {
          ctx.fillStyle = '#B3CCDD';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          var dataUrl = canvas.toDataURL();
          $scope.network_data.nodes.update([{
            id: nodeId,
            shape: 'circularImage',
            label: '',
            title: hostName,
            image: dataUrl
          }]);
          DOMURL.revokeObjectURL(dataUrl);
        };

        img.src = url;
      }, 100);
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('RollbackAppDeployCtrl', RollbackAppDeployCtrl);

  RollbackAppDeployCtrl.$inject = ['$scope', '$mdDialog', 'AppsDeployments', 'deployId', 'hostName'];

  function RollbackAppDeployCtrl($scope, $mdDialog, AppsDeployments, deployId, hostName) {

    $scope.submitDestory = submitDestory;
    $scope.cancelDestory = cancelDestory;

    /////////////////////

    function submitDestory() {
      AppsDeployments.rollback(hostName, deployId)
        .then(function(response) {
          $mdDialog.cancel();
          console.log(response);
        });
    }

    function cancelDestory() {
      $mdDialog.cancel();
    }

  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('StopAppDeployCtrl', StopAppDeployCtrl);

  StopAppDeployCtrl.$inject = ['$scope', '$mdDialog', 'AppsDeployments', 'deployId', 'hostName'];

  function StopAppDeployCtrl($scope, $mdDialog, AppsDeployments, deployId, hostName) {

    $scope.submitStop = submitStop;
    $scope.cancelStop = cancelStop;

    ////////////////////

    function submitStop() {
      AppsDeployments.stop(hostName, deployId)
        .then(function(response) {
          $mdDialog.cancel();
        });
    }

    function cancelStop() {
      $mdDialog.cancel();
    }

  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('DestroyAppCtrl', DestroyAppCtrl);

  DestroyAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', '$location', 'AppActions', 'HostName'];

  function DestroyAppCtrl($scope, $mdDialog, $routeParams, $location, AppActions, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);

    $scope.cancel = cancel;
    $scope.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(hostName) {
          AppActions.destroy(hostName, $scope.appID)
            .then(function(response) {
              $mdDialog.cancel();
              $location.path('/apps');
            });
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('NewAppCtrl', NewAppCtrl);

  NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'AppActions', 'HostName'];

  function NewAppCtrl($scope, $mdDialog, $mdMedia, AppActions, HostName) {
    $scope.status = '  ';

    $scope.docker_networks = [{ netid: 'HOST', value: 'Host' }, { netid: 'BRIDGE', value: 'Bridged' }];
    $scope.docker_protocols = [{ netid: 'tcp', value: 'tcp' }, { netid: 'udp', value: 'udp' }];
    $scope.docker_volume_modes = [{ netid: 'RO', value: 'Read Only' }, { netid: 'RW', value: 'Read and Write' }];

    $scope.cancel = function() {
      console.log('hihihi');
      $mdDialog.cancel();
    };

    $scope.submit = function() {

      if ($scope.newapp.container) {
        if ($scope.newapp.container.docker) {
          if ($scope.newapp.container.docker.portMappings) {
            var ports_array = [];
            var ports = $scope.newapp.container.docker.portMappings;
            angular.forEach(ports, function(element) {
              ports_array.push(element);
            });
            $scope.newapp.container.docker.portMappings = ports_array;
          }

          if ($scope.newapp.container.docker.parameters) {
            var docker_params = [];
            var params_array = $scope.newapp.container.docker.parameters;
            angular.forEach(params_array, function(element) {
              docker_params.push(element);
            });
            $scope.newapp.container.docker.parameters = docker_params;
          }
        }


        if ($scope.newapp.container.volumes) {
          var docker_volumes = [];
          var volumes_array = $scope.newapp.container.volumes;
          angular.forEach(volumes_array, function(element) {
            docker_volumes.push(element);
          });
          $scope.newapp.container.volumes = docker_volumes;
        }
      }

      if ($scope.newapp.env) {
        var newapp_env_array = {};
        var newapp_env = $scope.newapp.env;
        angular.forEach(newapp_env, function(element) {
          newapp_env_array[element['key']] = element['value'];
        });
        $scope.newapp.env = newapp_env_array;
      }

      if ($scope.newapp.constraints.length > 0) {
        $scope.newapp.constraints = [$scope.newapp.constraints];
      }


      var data = $scope.newapp;

      HostName.get()
        .then(function(response) {
          $scope.hostName = response;
          postNewApp(data);
        });

      function postNewApp(data) {
        AppActions.create($scope.hostName, data)
          .then(function(response) {
            if (response.data.httpStatusCode === 201) {
              $mdDialog.cancel();
              $scope.responseMessage = "";
            } else if (response.data.httpStatusCode === 422) {
              $scope.responseMessage = response.data.errors[0].error;
            } else {
              $scope.responseMessage = response.data.message;
            }
          });
      }
    };

    $scope.portMappings = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addPortMappings = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.portMappings.push(itemToClone);
    };

    $scope.removePortMappings = function(itemIndex) {
      $scope.portMappings.splice(itemIndex, 1);
    };

    $scope.dockerParameters = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addDockerParameter = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.dockerParameters.push(itemToClone);
    };

    $scope.removeDockerParameter = function(itemIndex) {
      $scope.dockerParameters.splice(itemIndex, 1);
    };


    $scope.dockerVolumes = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addDockerVolume = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.dockerVolumes.push(itemToClone);
    };

    $scope.removeDockerVolume = function(itemIndex) {
      $scope.dockerVolumes.splice(itemIndex, 1);
    };

    $scope.newappEnv = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addNewAppEnv = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.newappEnv.push(itemToClone);
    };

    $scope.removeNewAppEnv = function(itemIndex) {
      $scope.newappEnv.splice(itemIndex, 1);
    };

  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('RestartAppCtrl', RestartAppCtrl);

  RestartAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', '$location', 'HostName', 'AppActions'];

  function RestartAppCtrl($scope, $mdDialog, $routeParams, $location, HostName, AppActions) {
    $scope.appID = decodeURIComponent($routeParams.id);

    $scope.cancel = cancel;
    $scope.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(hostName) {
          AppActions.restart(hostName, $scope.appID)
            .then(function(response) {
              $mdDialog.cancel();
              $location.path('/apps');
            });
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('ScaleAppCtrl', ScaleAppCtrl);

  ScaleAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', 'AppActions', 'HostName'];

  function ScaleAppCtrl($scope, $mdDialog, $routeParams, AppActions, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);
    var hostName = null;

    $scope.parametrs = {
      instances: "Loading..."
    };

    HostName.get()
      .then(function(response) {
        hostName = response;
        AppActions.getVersion(hostName, $scope.appID)
          .then(function(response) {
            var appVersion = response;
            AppActions.get(hostName, $scope.appID, appVersion)
              .then(function(response) {
                $scope.appConfig = response;
                $scope.parametrs.instances = $scope.appConfig.instances;
              });
          });
      });

    $scope.cancel = cancel;
    $scope.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          $scope.appConfig.instances = $scope.parametrs.instances;

          delete $scope.appConfig.httpStatusCode;
          delete $scope.appConfig.version;
          delete $scope.appConfig.versionInfo;

          AppActions.scale(hostName, $scope.appID, $scope.appConfig)
            .then(function(response) {
              $mdDialog.cancel();
            });
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('SuspendAppCtrl', SuspendAppCtrl);

  SuspendAppCtrl.$inject = ['$scope', '$mdDialog', '$routeParams', 'AppActions', 'HostName'];

  function SuspendAppCtrl($scope, $mdDialog, $routeParams, AppActions, HostName) {
    $scope.appID = decodeURIComponent($routeParams.id);

    var hostName = null;

    $scope.cancel = cancel;
    $scope.submit = submit;

    HostName.get()
      .then(function(response) {
        hostName = response;
        return AppActions.getVersion(hostName, $scope.appID);
      })
      .then(function(appVersion) {
        return AppActions.get(hostName, $scope.appID, appVersion);
      })
      .then(function(response) {
        $scope.appConfig = response;
      })
      .catch(function(err) {
        console.log(err);
      });

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostName.get()
        .then(function(response) {
          hostName = response;
          $scope.appConfig.instances = 0;

          delete $scope.appConfig.httpStatusCode;
          delete $scope.appConfig.version;
          delete $scope.appConfig.versionInfo;

          AppActions.suspend(hostName, $scope.appID, $scope.appConfig)
            .then(function(response) {
              $mdDialog.cancel();
            });
        });
    }
  }
}());

(function() {
  angular
    .module('MesosMarathonApp')
    .controller('ToolbarCtrl', ToolbarCtrl);

  ToolbarCtrl.$inject = [];

  function ToolbarCtrl() {
    var vm = this;

    ///////////////

  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/toolbar/toolbar.tpl.html',
      controller: 'ToolbarCtrl'
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .filter('toFixed', toFixed);

  function toFixed() {
    return function(input) {
      return input.toFixed(2);
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .filter('toGb', toGb);

  function toGb() {
    return function(input) {
      return (input / 1024).toFixed(2);
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .filter('toHPath', toHPath);

  function toHPath() {
    return function(input) {
      if (input == '..') {
        return input;
      }
      return input.replace(new RegExp("(.*)/(.*)"), "$2");
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .filter('truncateMesosID', truncateMesosID);

  function truncateMesosID() {
    return function(id) {
      if (id) {
        var truncatedIdParts = id.split('-');

        if (truncatedIdParts.length > 3) {
          return '...' + truncatedIdParts.splice(3, 3).join('-');
        } else {
          return id;
        }
      } else {
        return '';
      }
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('ClusterName', ClusterNameFactory);

  ClusterNameFactory.$inject = ['$http'];

  function ClusterNameFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // http://nikke1.github.io/hard-data/clusters-mesos.json
    // /api/v1/clusters

    function get() {
      return $http.get('/api/v1/clusters')
        .then(function successClusterName(response) {
          return response.data.items[0].Clusters.cluster_name;
        })
        .catch(function(err) {
          console.log(err);
        });

    }
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('HostName', HostNameFactory);

  HostNameFactory.$inject = ['$http', 'ClusterName'];

  function HostNameFactory($http, ClusterName) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return ClusterName.get()
        .then(function(clusterName) {
          return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON');
        })
        .then(function(response) {
          return response.data.host_components[0].HostRoles.host_name;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppActions', AppActionsFactory);

  AppActionsFactory.$inject = ['$http'];

  function AppActionsFactory($http) {
    var config = {
      headers: {
        'X-Requested-By': null,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    return {
      destroy: destroy,
      killTask: killTask,
      create: create,
      restart: restart,
      getVersion: getVersion,
      get: get,
      scale: scale,
      suspend: suspend
    };

    ///////////////////

    function destroy(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function killTask(hostName, tasksToKill, shouldScale) {
      config.headers['X-Requested-By'] = hostName;
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/tasks/delete?scale=' + shouldScale, tasksToKill, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function create(hostName, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps', data, config)
        .then(function(response) {
          console.log(response);
          return response;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function restart(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      var data = {};
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/restart', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getVersion(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions', config)
        .then(function(response) {
          return response.data.versions[0];
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function get(hostName, appID, appVersion) {
      config.headers['X-Requested-By'] = hostName;
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions/' + appVersion, config)
        .then(function (response) {
          return response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function scale(hostName, appID, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function suspend(hostName, appID, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppInfo', AppInfoFactory);

  AppInfoFactory.$inject = ['$http'];

  function AppInfoFactory($http) {
    return {
      get: get
    };

    ///////////////////
    // /api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats

    // for Brunch server
    // http://nikke1.github.io/hard-data/mesos.json
    function get(hostName, appID) {
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats')
        .then(function(response) {
          return response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppsDeployments', AppsDeploymentsFactory);

  AppsDeploymentsFactory.$inject = ['$http'];

  function AppsDeploymentsFactory($http) {
    return {
      get: get,
      stop: stop,
      rollback: rollback
    };

    ////////////////////

    function get(hostName) {
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function stop(hostName, deployId) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId, config)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function rollback(hostName, deployId) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId + '?force=true', config)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppsTableInfo', AppsTableInfoFactory);

  AppsTableInfoFactory.$inject = ['$http'];

  function AppsTableInfoFactory($http) {
    return {
      get: get
    };

    ///////////////////
    // /api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps

    // for Brunch server
    // http://nikke1.github.io/hard-data/dataforapps.json
    function get(hostName) {
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps')
        .then(function(response) {
          return response.data.apps;
        })
        .catch(function(err) {
          console.log(err);
      });
    }

  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('ActiveMasterData', ActiveMasterDataFactory);

  ActiveMasterDataFactory.$inject = ['$http'];

  function ActiveMasterDataFactory($http) {
    return {
      getState: getState,
      getSlaves: getSlaves
    };

    ///////////////////

    // http://nikke1.github.io/hard-data/active-master-state.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/master/state.json
    function getState(VERSION, activeMaster) {
      return $http.get('http://nikke1.github.io/hard-data/active-master-state.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    // http://nikke1.github.io/hard-data/active-master-slaves.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/slaves
    function getSlaves(VERSION, activeMaster) {
      return $http.get('http://nikke1.github.io/hard-data/active-master-slaves.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Components', ComponentsFactory);

  ComponentsFactory.$inject = ['$http'];

  function ComponentsFactory($http) {
    return {
      getMasters: getMasters,
      getSlaves: getSlaves
    };

    ///////////////////

    // Brunch http://nikke1.github.io/hard-data/mesos-master.json
    // /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER

    function getMasters(clusterName) {
      return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    // Brunch http://nikke1.github.io/hard-data/mesos-slave.json
    //  /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE

    function getSlaves(clusterName) {
      return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Frameworks', FrameworksFactory);

  FrameworksFactory.$inject = ['$http'];

  function FrameworksFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=' + stateUrl
    // http://nikke1.github.io/hard-data/mesos-framework-stateurl.json

    function get(VERSION, stateUrl) {
      return $http.get('http://nikke1.github.io/hard-data/mesos-framework-stateurl.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Metrics', MetricsFactory);

  MetricsFactory.$inject = ['$http'];

  function MetricsFactory($http) {
    return {
      getForMaster: getForMaster,
      getForHost: getForHost
    };

    ///////////////////

    // Brunch http://nikke1.github.io/hard-data/1snapshot.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot

    function getForMaster(VERSION, masterHost) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getForHost(VERSION, host) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + host + ':5051/metrics/snapshot')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());


//# sourceMappingURL=app.js.map