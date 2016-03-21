(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('ClusterName', ClusterNameFactory);

  ClusterNameFactory.$inject = ['$http'];

  function ClusterNameFactory($http) {
    return {
      get: get
    };

    ///////////////////

    // http://nikke1.github.io/hard-data/clusters-mesos.json
    // /api/v1/clusters

    function get() {
      return $http.get('/api/v1/clusters')
        .then(function successClusterName(response) {
          return response.data.items[0].Clusters.cluster_name;
        })
        .catch(function(err) {
          console.log(err);
        });

    }
  }

}());
