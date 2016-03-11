(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .factory('ActiveMasterSlavesFactory', ActiveMasterSlavesFactory);

  ActiveMasterSlavesFactory.$inject = ['$http'];

  function ActiveMasterSlavesFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/slaves', {cache: true}

    function get(VERSION, activeMaster) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/slaves')
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
