(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Metrics', MetricsFactory);

  MetricsFactory.$inject = ['$http'];

  function MetricsFactory($http) {
    return {
      getForMaster: getForMaster,
      getForHost: getForHost
    };

    ///////////////////

    // Brunch http://nikke1.github.io/hard-data/1snapshot.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot

    function getForMaster(VERSION, masterHost) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getForHost(VERSION, host) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + host + ':5051/metrics/snapshot')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());
