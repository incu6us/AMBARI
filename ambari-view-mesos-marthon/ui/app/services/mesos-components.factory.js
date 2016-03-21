(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Components', ComponentsFactory);

  ComponentsFactory.$inject = ['$http'];

  function ComponentsFactory($http) {
    return {
      getMasters: getMasters,
      getSlaves: getSlaves
    };

    ///////////////////

    // Brunch http://nikke1.github.io/hard-data/mesos-master.json
    // /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER

    function getMasters(clusterName) {
      return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_MASTER')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    // Brunch http://nikke1.github.io/hard-data/mesos-slave.json
    //  /api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE

    function getSlaves(clusterName) {
      return $http.get('/api/v1/clusters/' + clusterName + '/services/MESOS/components/MESOS_SLAVE')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

}());
