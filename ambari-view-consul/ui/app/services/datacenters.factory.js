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
