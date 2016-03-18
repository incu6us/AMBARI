(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppsDeployments', AppsDeploymentsFactory);

  AppsDeploymentsFactory.$inject = ['$http'];

  function AppsDeploymentsFactory($http) {
    return {
      get: get,
      stop: stop,
      rollback: rollback
    };

    ////////////////////

    function get(hostName) {
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments')
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function stop(hostName, deployId) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId, config)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function rollback(hostName, deployId) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/deployments/' + deployId + '?force=true', config)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
})();
