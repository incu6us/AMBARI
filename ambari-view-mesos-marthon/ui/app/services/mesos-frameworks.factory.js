(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Frameworks', FrameworksFactory);

  FrameworksFactory.$inject = ['$http'];

  function FrameworksFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=' + stateUrl
    // http://nikke1.github.io/hard-data/mesos-framework-stateurl.json

    function get(VERSION, stateUrl) {
      return $http.get('http://nikke1.github.io/hard-data/mesos-framework-stateurl.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());
