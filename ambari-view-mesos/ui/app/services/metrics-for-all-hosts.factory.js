(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .factory('MetricsForAllHostsFactory', MetricsForAllHostsFactory);

  MetricsForAllHostsFactory.$inject = ['$http'];

  function MetricsForAllHostsFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot

    function get(VERSION, slaveHost) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot')
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
