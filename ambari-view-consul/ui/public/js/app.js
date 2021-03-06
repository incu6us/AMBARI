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
      .backgroundPalette('grey', {
        'default': '200'
      });
  }

}());

(function() {
  angular
    .module('ConsulApp')
    .controller('HeadCtrl', HeadCtrl);

  HeadCtrl.$inject = ['$scope', 'Datacenters'];

  function HeadCtrl($scope, Datacenters) {

    $scope.datacentersArr = [];
    $scope.datacenterSelected = null;

    runApp();

    ///////////////

    function runApp() {
      Datacenters.get()
        .then(function(response) {
          $scope.datacentersArr = response.data.array;
          $scope.datacenterSelected = $scope.datacentersArr[0];
          // $scope.datacenterSelected = 'lol';
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
    .controller('NodesCtrl', NodesCtrl);

  NodesCtrl.$inject = ['$scope'];

  function NodesCtrl($scope) {
    $scope.statusesFilterList = ['All', 'Passing', 'Falling'];

    $scope.$watch('$scope.datacenterSelected', getServices);

    $scope.statusesFilter = null;

    // $scope.$on('$locationChangeStart', function() {
    //   $timeout.cancel(promise);
    // });
    //
    // promise = $timeout(getAppsList, 10 * 1000);

    ///////////////

    function getServices() {
      console.log('nod');
    }

  }
}());

(function() {
  angular
    .module('ConsulApp')
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
      return $http.get('/api/v1/views/CONSUL/versions/0.1.0/instances/consul/resources/proxy/json?url=http://localhost:8500/v1/catalog/datacenters')
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
    .module('ConsulApp')
    .factory('ServiceDetails', ServiceDetailsFactory);

  ServiceDetailsFactory.$inject = ['$http'];

  function ServiceDetailsFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get(serviceName, datacenter) {
      return $http.get('/api/v1/views/CONSUL/versions/0.1.0/instances/consul/resources/proxy/json?url=http://localhost:8500/v1/health/service/' + serviceName + '?dc=' + datacenter + '&token=')
        .then(function(response) {
          // return {data:{array:[{"Node":{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","Address":"10.0.5.61","CreateIndex":132,"ModifyIndex":140400},"Service":{"ID":"mesos-consul:mesos:10.0.5.61:5050","Service":"mesos","Tags":["leader","master"],"Address":"10.0.5.61","Port":5050,"EnableTagOverride":false,"CreateIndex":239,"ModifyIndex":1066},"Checks":[{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":132,"ModifyIndex":132},{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","CheckID":"service:mesos-consul:mesos:10.0.5.61:5050","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.61:5050/master/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:10.0.5.61:5050","ServiceName":"mesos","CreateIndex":239,"ModifyIndex":1066}]},{"Node":{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","Address":"10.0.5.61","CreateIndex":132,"ModifyIndex":140400},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S5:master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.61","Port":5051,"EnableTagOverride":false,"CreateIndex":1059,"ModifyIndex":1127},"Checks":[{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":132,"ModifyIndex":132},{"Node":"master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S5:master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.61:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S5:master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","ServiceName":"mesos","CreateIndex":1059,"ModifyIndex":1127}]},{"Node":{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","Address":"10.0.5.60","CreateIndex":130,"ModifyIndex":167871},"Service":{"ID":"mesos-consul:mesos:10.0.5.60:5050","Service":"mesos","Tags":["master"],"Address":"10.0.5.60","Port":5050,"EnableTagOverride":false,"CreateIndex":238,"ModifyIndex":241},"Checks":[{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":130,"ModifyIndex":130},{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","CheckID":"service:mesos-consul:mesos:10.0.5.60:5050","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.60:5050/master/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:10.0.5.60:5050","ServiceName":"mesos","CreateIndex":238,"ModifyIndex":241}]},{"Node":{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","Address":"10.0.5.60","CreateIndex":130,"ModifyIndex":167871},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S6:master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.60","Port":5051,"EnableTagOverride":false,"CreateIndex":1060,"ModifyIndex":1130},"Checks":[{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":130,"ModifyIndex":130},{"Node":"master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S6:master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.60:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S6:master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","ServiceName":"mesos","CreateIndex":1060,"ModifyIndex":1130}]},{"Node":{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","Address":"10.0.5.62","CreateIndex":154,"ModifyIndex":140411},"Service":{"ID":"mesos-consul:mesos:10.0.5.62:5050","Service":"mesos","Tags":["master"],"Address":"10.0.5.62","Port":5050,"EnableTagOverride":false,"CreateIndex":240,"ModifyIndex":1065},"Checks":[{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":154,"ModifyIndex":154},{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","CheckID":"service:mesos-consul:mesos:10.0.5.62:5050","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.62:5050/master/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:10.0.5.62:5050","ServiceName":"mesos","CreateIndex":240,"ModifyIndex":1065}]},{"Node":{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","Address":"10.0.5.62","CreateIndex":154,"ModifyIndex":140411},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S4:master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.62","Port":5051,"EnableTagOverride":false,"CreateIndex":1064,"ModifyIndex":1133},"Checks":[{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":154,"ModifyIndex":154},{"Node":"master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S4:master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.62:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S4:master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","ServiceName":"mesos","CreateIndex":1064,"ModifyIndex":1133}]},{"Node":{"Node":"worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","Address":"10.0.5.63","CreateIndex":145,"ModifyIndex":140321},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S3:worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.63","Port":5051,"EnableTagOverride":false,"CreateIndex":1056,"ModifyIndex":1132},"Checks":[{"Node":"worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":145,"ModifyIndex":145},{"Node":"worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S3:worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.63:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S3:worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","ServiceName":"mesos","CreateIndex":1056,"ModifyIndex":1132}]},{"Node":{"Node":"worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","Address":"10.0.5.67","CreateIndex":141,"ModifyIndex":140437},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S2:worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.67","Port":5051,"EnableTagOverride":false,"CreateIndex":1062,"ModifyIndex":1135},"Checks":[{"Node":"worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":141,"ModifyIndex":141},{"Node":"worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S2:worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.67:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S2:worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","ServiceName":"mesos","CreateIndex":1062,"ModifyIndex":1135}]},{"Node":{"Node":"worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","Address":"10.0.5.69","CreateIndex":134,"ModifyIndex":140348},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S7:worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.69","Port":5051,"EnableTagOverride":false,"CreateIndex":1061,"ModifyIndex":1138},"Checks":[{"Node":"worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":134,"ModifyIndex":134},{"Node":"worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S7:worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.69:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S7:worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","ServiceName":"mesos","CreateIndex":1061,"ModifyIndex":1138}]},{"Node":{"Node":"worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","Address":"10.0.5.66","CreateIndex":137,"ModifyIndex":140387},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S9:worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.66","Port":5051,"EnableTagOverride":false,"CreateIndex":1057,"ModifyIndex":1129},"Checks":[{"Node":"worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":137,"ModifyIndex":137},{"Node":"worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S9:worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.66:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S9:worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","ServiceName":"mesos","CreateIndex":1057,"ModifyIndex":1129}]},{"Node":{"Node":"worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","Address":"10.0.5.68","CreateIndex":128,"ModifyIndex":144137},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S0:worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.68","Port":5051,"EnableTagOverride":false,"CreateIndex":1058,"ModifyIndex":1136},"Checks":[{"Node":"worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":128,"ModifyIndex":128},{"Node":"worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S0:worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.68:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S0:worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","ServiceName":"mesos","CreateIndex":1058,"ModifyIndex":1136}]},{"Node":{"Node":"worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","Address":"10.0.5.65","CreateIndex":143,"ModifyIndex":1128},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S1:worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.65","Port":5051,"EnableTagOverride":false,"CreateIndex":1055,"ModifyIndex":1128},"Checks":[{"Node":"worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":143,"ModifyIndex":143},{"Node":"worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S1:worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.65:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S1:worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","ServiceName":"mesos","CreateIndex":1055,"ModifyIndex":1128}]},{"Node":{"Node":"worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","Address":"10.0.5.64","CreateIndex":139,"ModifyIndex":144134},"Service":{"ID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S8:worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","Service":"mesos","Tags":["agent","follower"],"Address":"10.0.5.64","Port":5051,"EnableTagOverride":false,"CreateIndex":1063,"ModifyIndex":1139},"Checks":[{"Node":"worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","CheckID":"serfHealth","Name":"Serf Health Status","Status":"passing","Notes":"","Output":"Agent alive and reachable","ServiceID":"","ServiceName":"","CreateIndex":139,"ModifyIndex":139},{"Node":"worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","CheckID":"service:mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S8:worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","Name":"Service 'mesos' check","Status":"passing","Notes":"","Output":"HTTP GET http://10.0.5.64:5051/slave(1)/health: 200 OK Output: ","ServiceID":"mesos-consul:mesos:2111d2f4-9b98-4f5b-a524-554bc9f3f34b-S8:worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","ServiceName":"mesos","CreateIndex":1063,"ModifyIndex":1139}]}]}};
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
    .module('ConsulApp')
    .factory('Services', ServicesFactory);

  ServicesFactory.$inject = ['$http'];

  function ServicesFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get(datacenter) {
      return $http.get('/api/v1/views/CONSUL/versions/0.1.0/instances/consul/resources/proxy/json?url=http://localhost:8500/v1/internal/ui/services?dc=' + datacenter + '&token=')
        .then(function(response) {
          // return {data:{"array":[{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com"],"Name":"broker-1"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":5,"Nodes":["worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com"],"Name":"cassandra-cassandra-mesos-node"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com"],"Name":"cassandra-cassandra-mesos-node-0-executor"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":11,"Nodes":["control.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"consul"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":2,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"consul-cron"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":7,"Nodes":["master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"datanode"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"edge"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com"],"Name":"elasticsearch"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":12,"Nodes":["master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com"],"Name":"es-executor"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"hdfs-mesos"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com"],"Name":"journalnode1"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com"],"Name":"journalnode2"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"journalnode3"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com"],"Name":"kafka"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com"],"Name":"kafka-manager"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"kibana"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com"],"Name":"logstash"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":18,"Nodes":["master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com","worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"logstash-task"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com"],"Name":"mantl-cassandra"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":26,"Nodes":["master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com","worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com","worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com","worker-7f552da9-bea4-48d5-aea9-c70784f62f00.cisco.com","worker-8fde9c91-a961-458e-af58-1dab4a99fe4c.cisco.com","worker-9bb7d02d-c1e4-4ef1-a4ab-1d88ee568a73.cisco.com","worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com","worker-c5e95dd7-9c95-4cab-b048-437d6ee8b680.cisco.com"],"Name":"mesos"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"mesos-consul"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-26302699-e23d-4138-b1fa-2add7a00d0ed.cisco.com"],"Name":"mesos-scheduler-zoomdata"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["control.cisco.com"],"Name":"mongo-zoom"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"namenode"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"namenode1"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com"],"Name":"namenode2"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":2,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com"],"Name":"spark"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":1,"Nodes":["worker-bb6808a9-c3b2-4a6d-a967-475fe5713707.cisco.com"],"Name":"streamsets"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":2,"Nodes":["master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","worker-1a560e39-977b-4b02-9058-014b4cd9bb0e.cisco.com"],"Name":"zkfc"},{"ChecksWarning":0,"ChecksCritical":0,"ChecksPassing":3,"Nodes":["master-43ef9b8e-10bb-4a77-8a18-f27fa0f14da2.cisco.com","master-5dd93a32-be82-4873-8af3-f00239d30c7f.cisco.com","master-e51fbb75-2c78-48e8-bee1-5ca324838529.cisco.com"],"Name":"zookeeper"}]}};
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

}());


//# sourceMappingURL=app.js.map