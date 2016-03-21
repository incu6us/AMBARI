(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('ActiveMasterState', ActiveMasterStateFactory);

  ActiveMasterStateFactory.$inject = ['$http'];

  function ActiveMasterStateFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + $scope.activeMaster + ':5050/master/state.json

    function get(VERSION, activeMaster) {
      return $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + activeMaster + ':5050/master/state.json')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());
