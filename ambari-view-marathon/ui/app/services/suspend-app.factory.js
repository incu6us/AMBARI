(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .factory('SuspendAppFactory', SuspendAppFactory);

  SuspendAppFactory.$inject = ['$http'];

  function SuspendAppFactory($http) {
    return {
      put: put,
      version: version,
      get: get
    };

    ///////////////////

    function put(hostName, appID, data) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.put('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?force=true', data, config)
        .then(successSuspendApp, errorSuspendApp);

      function successSuspendApp(response) {
        console.log(response);
      }

      function errorSuspendApp(err) {
        console.log(err);
      }
    }

    function version(hostName, appID) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions', config)
        .then(successSuspendApp, errorSuspendApp);

      function successSuspendApp(response) {
        return response.data.versions[0];
      }

      function errorSuspendApp(err) {
        console.log(err);
      }
    }

    function get(hostName, appID, appVersion) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '/versions/' + appVersion, config)
        .then(successSuspendApp, errorSuspendApp);

      function successSuspendApp(response) {
        return response.data;
      }

      function errorSuspendApp(err) {
        console.log(err);
      }
    }

  }

}());
