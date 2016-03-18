(function() {
  'use strict';

  angular
    .module('ConsulApp')
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
      .when('/services', {
        templateUrl: 'app/components/services/services.tpl.html',
        controller: 'ServicesCtrl',
        controllerAs: 'ctrl'
      })
      .when('/nodes', {
        templateUrl: 'app/components/nodes/nodes.tpl.html',
        controller: 'NodesCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
