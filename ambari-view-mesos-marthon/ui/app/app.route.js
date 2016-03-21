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
      .otherwise({
        redirectTo: '/'
      });
  }

}());
