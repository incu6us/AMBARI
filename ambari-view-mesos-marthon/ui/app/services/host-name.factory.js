(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('HostName', HostNameFactory);

  HostNameFactory.$inject = ['$http', 'ClusterName'];

  function HostNameFactory($http, ClusterName) {
    return {
      get: get
    };

    ///////////////////

    function get() {
      return ClusterName.get()
        .then(function(response) {
          var clusterName = response.data.items[0].Clusters.cluster_name;
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
