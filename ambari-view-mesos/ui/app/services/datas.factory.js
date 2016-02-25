(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .factory('DatasFactory', DatasFactory);

  DatasFactory.$inject = ['$http'];

  function DatasFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // executorUrl + executorLastDir

    function get(executorUrl, executorLastDir) {
      return $http.get(executorUrl + executorLastDir)
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
