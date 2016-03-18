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
