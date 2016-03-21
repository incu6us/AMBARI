(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .factory('AppInfo', AppInfoFactory);

  AppInfoFactory.$inject = ['$http'];

  function AppInfoFactory($http) {
    return {
      get: get
    };

    ///////////////////
    // /api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats

    // for Brunch server
    // http://nikke1.github.io/hard-data/mesos.json
    function get(hostName, appID) {
      return $http.get('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps/' + appID + '?embed=app.taskStats')
        .then(function(response) {
          return response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

}());
