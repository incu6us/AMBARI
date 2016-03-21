(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('NewAppCtrl', NewAppCtrl);

  NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'AppActions', 'HostName'];

  function NewAppCtrl($scope, $mdDialog, $mdMedia, AppActions, HostName) {
    $scope.status = '  ';

    $scope.docker_networks = [{ netid: 'HOST', value: 'Host' }, { netid: 'BRIDGE', value: 'Bridged' }];
    $scope.docker_protocols = [{ netid: 'tcp', value: 'tcp' }, { netid: 'udp', value: 'udp' }];
    $scope.docker_volume_modes = [{ netid: 'RO', value: 'Read Only' }, { netid: 'RW', value: 'Read and Write' }];

    $scope.cancel = function() {
      console.log('hihihi');
      $mdDialog.cancel();
    };

    $scope.submit = function() {

      if ($scope.newapp.container) {
        if ($scope.newapp.container.docker) {
          if ($scope.newapp.container.docker.portMappings) {
            var ports_array = [];
            var ports = $scope.newapp.container.docker.portMappings;
            angular.forEach(ports, function(element) {
              ports_array.push(element);
            });
            $scope.newapp.container.docker.portMappings = ports_array;
          }

          if ($scope.newapp.container.docker.parameters) {
            var docker_params = [];
            var params_array = $scope.newapp.container.docker.parameters;
            angular.forEach(params_array, function(element) {
              docker_params.push(element);
            });
            $scope.newapp.container.docker.parameters = docker_params;
          }
        }


        if ($scope.newapp.container.volumes) {
          var docker_volumes = [];
          var volumes_array = $scope.newapp.container.volumes;
          angular.forEach(volumes_array, function(element) {
            docker_volumes.push(element);
          });
          $scope.newapp.container.volumes = docker_volumes;
        }
      }

      if ($scope.newapp.env) {
        var newapp_env_array = {};
        var newapp_env = $scope.newapp.env;
        angular.forEach(newapp_env, function(element) {
          newapp_env_array[element['key']] = element['value'];
        });
        $scope.newapp.env = newapp_env_array;
      }

      if ($scope.newapp.constraints.length > 0) {
        $scope.newapp.constraints = [$scope.newapp.constraints];
      }


      var data = $scope.newapp;

      HostName.get()
        .then(function(response) {
          $scope.hostName = response;
          postNewApp(data);
        });

      function postNewApp(data) {
        AppActions.create($scope.hostName, data)
          .then(function(response) {
            if (response.data.httpStatusCode === 201) {
              $mdDialog.cancel();
              $scope.responseMessage = "";
            } else if (response.data.httpStatusCode === 422) {
              $scope.responseMessage = response.data.errors[0].error;
            } else {
              $scope.responseMessage = response.data.message;
            }
          });
      }
    };

    $scope.portMappings = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addPortMappings = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.portMappings.push(itemToClone);
    };

    $scope.removePortMappings = function(itemIndex) {
      $scope.portMappings.splice(itemIndex, 1);
    };

    $scope.dockerParameters = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addDockerParameter = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.dockerParameters.push(itemToClone);
    };

    $scope.removeDockerParameter = function(itemIndex) {
      $scope.dockerParameters.splice(itemIndex, 1);
    };


    $scope.dockerVolumes = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addDockerVolume = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.dockerVolumes.push(itemToClone);
    };

    $scope.removeDockerVolume = function(itemIndex) {
      $scope.dockerVolumes.splice(itemIndex, 1);
    };

    $scope.newappEnv = [{
      "Selection": "",
      "Text": ""
    }];

    $scope.addNewAppEnv = function() {
      var itemToClone = {
        "Selection": "",
        "Text": ""
      };
      $scope.newappEnv.push(itemToClone);
    };

    $scope.removeNewAppEnv = function(itemIndex) {
      $scope.newappEnv.splice(itemIndex, 1);
    };

  }

}());
