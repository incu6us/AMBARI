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
