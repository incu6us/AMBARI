(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .factory('KillTasksFactory', KillTasksFactory);

  KillTasksFactory.$inject = ['$http'];

  function KillTasksFactory($http) {
    return {
      post: post
    };

    ///////////////////

    function post(hostName, tasksToKill, shouldScale) {
      var config = {
        headers: {
          'X-Requested-By': hostName,
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      return $http.post('/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/tasks/delete?scale=' + shouldScale, tasksToKill, config)
        .then(successKillTasks, errorKillTasks);

      function successKillTasks(response) {
        console.log(response);
      }

      function errorKillTasks(err) {
        console.error(err);
      }
    }

  }

}());
