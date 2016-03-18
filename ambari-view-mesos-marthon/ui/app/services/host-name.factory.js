(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('HostName', HostNameFactory);

  HostNameFactory.$inject = ['$http'];

  function HostNameFactory($http) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return $http.get('/api/v1/clusters')
        .then(function(response) {
          return response.data.items[0].Clusters.cluster_name;
        })
        .then(function(clusterName) {
          return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON');
        })
        .then(function(response) {
          return response.data.host_components[0].HostRoles.host_name;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}());
