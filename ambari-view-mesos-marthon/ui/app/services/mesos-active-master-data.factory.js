(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('ActiveMasterData', ActiveMasterDataFactory);

  ActiveMasterDataFactory.$inject = ['$http'];

  function ActiveMasterDataFactory($http) {
    return {
      getState: getState,
      getSlaves: getSlaves
    };

    ///////////////////

    // http://nikke1.github.io/hard-data/active-master-state.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/master/state.json
    function getState(VERSION, activeMaster) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/master/state.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    // http://nikke1.github.io/hard-data/active-master-slaves.json
    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/slaves
    function getSlaves(VERSION, activeMaster) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/slaves')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());
