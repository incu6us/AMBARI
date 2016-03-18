(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppActions', AppActionsFactory);

  AppActionsFactory.$inject = ['$http'];

  function AppActionsFactory($http) {
    var config = {
      headers: {
        'X-Requested-By': null,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    return {
      destroy: destroy,
      killTask: killTask,
      create: create,
      restart: restart,
      getVersion: getVersion,
      get: get,
      scale: scale,
      suspend: suspend
    };

    ///////////////////

    function destroy(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function killTask(hostName, tasksToKill, shouldScale) {
      config.headers['X-Requested-By'] = hostName;
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/tasks/delete?scale=' + shouldScale, tasksToKill, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function create(hostName, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps', data, config)
        .then(function(response) {
          console.log(response);
          return response;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function restart(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      var data = {};
      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/restart', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getVersion(hostName, appID) {
      config.headers['X-Requested-By'] = hostName;
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions', config)
        .then(function(response) {
          return response.data.versions[0];
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function get(hostName, appID, appVersion) {
      config.headers['X-Requested-By'] = hostName;
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions/' + appVersion, config)
        .then(function (response) {
          return response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function scale(hostName, appID, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function suspend(hostName, appID, data) {
      config.headers['X-Requested-By'] = hostName;
      return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
        .then(function(response) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

}());
