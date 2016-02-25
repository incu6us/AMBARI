(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .factory('FrameworksFactory', FrameworksFactory);

  FrameworksFactory.$inject = ['$http'];

  function FrameworksFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=' + stateUrl

    function get(VERSION, stateUrl) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=' + stateUrl)
        .then(successClusterName, errorClusterName);

      function successClusterName(response) {
        return response;
      }

      function errorClusterName(err) {
        console.log(err);
      }
    }
  }
}());
