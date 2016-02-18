(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .factory('ClusterNameFactory', ClusterNameFactory);

  ClusterNameFactory.$inject = ['$http'];

  function ClusterNameFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return $http.get('/api/v1/clusters')
        .then(successClusterName, errorClusterName);

      function successClusterName(response) {
        return response.data.items[0].Clusters.cluster_name;
      }

      function errorClusterName(err) {
        console.log(err);
      }
    }
  }

}());
