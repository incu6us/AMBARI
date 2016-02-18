(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .factory('DestroyAppFactory', DestroyAppFactory);

  DestroyAppFactory.$inject = ['$http'];

  function DestroyAppFactory($http) {
    return {
      del: del
    };

    ///////////////////

    function del(hostName, appID) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.delete('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID, config)
        .then(successDestroyApp, errorDestroyApp);

      function successDestroyApp(response) {
        console.log(response);
      }

      function errorDestroyApp(err) {
        console.log(err);
      }
    }
  }

}());
