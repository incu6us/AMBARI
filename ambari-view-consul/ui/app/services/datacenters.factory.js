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
