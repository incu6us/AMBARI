(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .factory('MesosSlaveFactory', MesosSlaveFactory);

  MesosSlaveFactory.$inject = ['$http'];

  function MesosSlaveFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // Brunch http://nikke1.github.io/hard-data/mesos-slave.json
    //  /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE

    function get(clusterName) {
      return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE')
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
