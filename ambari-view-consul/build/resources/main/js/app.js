(function() {
  'use strict';

  angular
    .module('ConsulApp', [
      'ngMaterial',
      'ngRoute',
      'templates'
    ]);

}());

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
      .otherwise({
        redirectTo: '/'
      });
  }

}());

(function() {
  'use strict';

  angular
    .module('ConsulApp')
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
      .backgroundPalette('brown', {
        'default': '50'
      });
  }

}());

(function() {
  angular
    .module('ConsulApp')
    .controller('HeadCtrl', HeadCtrl);

  HeadCtrl.$inject = ['$scope', 'Datacenters'];

  function HeadCtrl($scope, Datacenters) {

    $scope.datacentersList = [];

    runApp();

    ///////////////

    function runApp() {
      Datacenters.get()
        .then(function(response) {
          $scope.datacentersList = response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());

(function() {
  angular
    .module('ConsulApp')
    .controller('ServicesCtrl', ServicesCtrl);

  ServicesCtrl.$inject = ['$scope'];

  function ServicesCtrl($scope) {
    $scope.statusesFilterList = ['All', 'Passing', 'Falling'];

    $scope.statusesFilter = null;

    ///////////////

  }
}());

(function() {
  angular
    .module('ConsulApp')
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
    .module('ConsulApp')
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
    .module('ConsulApp')
    .factory('Datacenters', DatacentersFactory);

  DatacentersFactory.$inject = ['$http'];

  function DatacentersFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return $http.get('/v1/catalog/datacenters')
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