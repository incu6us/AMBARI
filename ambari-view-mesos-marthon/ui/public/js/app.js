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
        redirectTo: '/services'
      })
      .when('/marathon/apps', {
        templateUrl: 'app/components/apps-table/apps-table.tpl.html',
        controller: 'AppsTableCtrl'
      })
      .when('/marathon/apps/:id', {
        templateUrl: 'app/components/app-info/app-info.tpl.html',
        controller: 'AppInfoCtrl'
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

(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableConfig', tableConfig);

  function tableConfig() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/app-info/table-config.tpl.html'
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
      templateUrl: 'app/components/app-info/table-debug.tpl.html'
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
      templateUrl: 'app/components/app-info/table-tasks.tpl.html'
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
    'AppsTableInfo',
    'HostName'
  ];

  function AppsTableCtrl($scope, $timeout, $location, AppsTableInfo, HostName) {
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
    });
    var promise;

    $scope.appsList = [];

    getAppsList();

    ///////////////////

    $scope.showAppInfo = showAppInfo;

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

  }
}());

(function() {
  angular
    .module('MesosMarathonApp')
    .controller('ServicesCtrl', ServicesCtrl);

  ServicesCtrl.$inject = ['$scope', '$window', 'Services', 'ServiceDetails'];

  function ServicesCtrl($scope, $window, Services, ServiceDetails) {

    $scope.statusesFilterList = ['all', 'passing', 'walling', 'critical'];
    $scope.statusesFilter = null;

    $scope.serviceSelected = null;

    $scope.serviceSelectedTags = [];

    $scope.$watch('$parent.datacenterSelected', getServices);

    ///////////////

    // Fix crash of 'md-virtual-repeat-container' in Chrome
    $scope.listStyle = {
      height: ($window.innerHeight - 150) + 'px'
    };

    $scope.setServiceChoosen = setServiceChoosen;

    ///////////////

    function getServices(newVal, oldVal) {
      // This 'if' prevents to run $watch on app initialization
      if (newVal === oldVal) {
        return;
      }

      Services.get($scope.datacenterSelected)
        .then(function(response) {
          $scope.servicesArr = response.data.array;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function setServiceChoosen(service) {
        ServiceDetails.get(service.Name, $scope.datacenterSelected)
          .then(function(response) {
            $scope.serviceSelected = service;
            $scope.serviceSelected.ServiceDetails = response.data.array;

            $scope.serviceSelectedTags = [];
            angular.forEach($scope.serviceSelected.ServiceDetails, function(value) {
              angular.forEach(value.Service.Tags, function(value) {
                if($scope.serviceSelectedTags.indexOf(value) === -1){
                  $scope.serviceSelectedTags.push(value);
                }
              });
            });
          })
          .catch(function(err) {
            console.log(err);
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
      return $http.get('http://nikke1.github.io/hard-data/mesos.json')
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
      return $http.get('http://nikke1.github.io/hard-data/dataforapps.json')
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
    .factory('HostName', HostNameFactory);

  HostNameFactory.$inject = ['$http'];

  function HostNameFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return $http.get('/api/v1/clusters')
        .then(function(response) {
          return response.data.items[0].Clusters.cluster_name;
        })
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


//# sourceMappingURL=app.js.map