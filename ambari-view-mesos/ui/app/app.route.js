(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    //          to prevent '#', but including '<base hreg="/">' not working
    //          maybe because of Ember
    //          $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        redirectTo: '/metrics'
      })
      .when('/metrics', {
        templateUrl: 'app/components/metrics/metrics.tpl.html'
      })
      .when('/frameworks', {
        templateUrl: 'app/components/frameworks/frameworks.tpl.html'
      })
      .when('/lattency', {
        templateUrl: 'app/components/lattency/lattency.tpl.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
