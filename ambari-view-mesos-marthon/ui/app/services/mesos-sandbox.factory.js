(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('Sandbox', SandboxFactory);

  SandboxFactory.$inject = ['$http'];

  function SandboxFactory($http) {
    return {
      getData: getData,
      getDirs: getDirs
    };

    ///////////////////

    function getData(executorUrl, executorLastDir) {
      return $http.get(executorUrl + executorLastDir)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function getDirs(executorUrl, executorDir) {
      return $http.get(executorUrl + executorDir)
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());
