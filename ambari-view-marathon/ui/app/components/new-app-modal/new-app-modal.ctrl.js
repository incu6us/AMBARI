(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('NewAppCtrl', NewAppCtrl);

  	NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'NewAppFactory', 'HostNameFactory'];

  	function NewAppCtrl ($scope, $mdDialog, $mdMedia, NewAppFactory, HostNameFactory) {
  	var vm = this;

	    vm.status = '  ';
	    vm.docker_networks = [{ netid: 'HOST', value: 'Host' }, { netid: 'BRIDGE', value: 'Bridged' }];
	    vm.docker_protocols = [{ netid: 'tcp', value: 'tcp' }, { netid: 'udp', value: 'udp' }];
	    vm.docker_volume_modes = [{ netid: 'RO', value: 'Read Only' }, { netid: 'RW', value: 'Read and Write' }];
	            vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.submit = function() {

        if (vm.newapp.container) {
            if (vm.newapp.container.docker) {
                if (vm.newapp.container.docker.portMappings) {
                    var ports_array = [];
                    var ports = vm.newapp.container.docker.portMappings;
                    angular.forEach(ports, function(element) {
                      ports_array.push(element);
                    });
                    vm.newapp.container.docker.portMappings = ports_array;
                }

                if (vm.newapp.container.docker.parameters) {
                    var docker_params = [];
                    var params_array = vm.newapp.container.docker.parameters;
                    angular.forEach(params_array, function(element) {
                        docker_params.push(element);
                    });
                    vm.newapp.container.docker.parameters = docker_params;
                }
            }


            if (vm.newapp.container.volumes) {
                var docker_volumes = [];
                var volumes_array = vm.newapp.container.volumes;
                angular.forEach(volumes_array, function(element) {
                    docker_volumes.push(element);
                });
                vm.newapp.container.volumes = docker_volumes;
            }
        }

        if (vm.newapp.env) {
            var newapp_env_array = {};
            var newapp_env = vm.newapp.env;
            angular.forEach(newapp_env, function(element) {
                newapp_env_array[element['key']] = element['value'];
            });
            vm.newapp.env = newapp_env_array;
        }

        if (vm.newapp.constraints.length > 0) {
            vm.newapp.constraints = [vm.newapp.constraints];
        }


            var data=vm.newapp;

            HostNameFactory.get()
                            .then( function(response) {
                                vm.hostName = response;
                                postNewApp(data);
                            });

            function postNewApp(data) {
                NewAppFactory.post(vm.hostName, data)
                                    .then( function(response) {
                                        if (response.data.httpStatusCode === 201) {
                                            $mdDialog.cancel();
                                            vm.responseMessage = "";
                                        } else if (response.data.httpStatusCode === 422) {
                                            vm.responseMessage = response.data.errors[0].error;
                                        } else {
                                            vm.responseMessage = response.data.message;
                                        }
                                    });
            }
        };

	    vm.portMappings = [
            {
                "Selection": "",
                "Text": ""
                }
            ];

        vm.addPortMappings = function() {
            var itemToClone = { "Selection": "", "Text": "" };
            vm.portMappings.push(itemToClone);
        }

        vm.removePortMappings = function(itemIndex) {
            vm.portMappings.splice(itemIndex, 1);
        }

        vm.dockerParameters = [
                    {
                        "Selection": "",
                        "Text": ""
                        }
                    ];

        vm.addDockerParameter = function() {
                var itemToClone = { "Selection": "", "Text": "" };
                vm.dockerParameters.push(itemToClone);
        }

        vm.removeDockerParameter = function(itemIndex) {
                    vm.dockerParameters.splice(itemIndex, 1);
                }
	

	vm.dockerVolumes = [
                        {
                            "Selection": "",
                            "Text": ""
                            }
                        ];

    vm.addDockerVolume = function() {
        var itemToClone = { "Selection": "", "Text": "" };
        vm.dockerVolumes.push(itemToClone);
    }

    vm.removeDockerVolume = function(itemIndex) {
        vm.dockerVolumes.splice(itemIndex, 1);
    }

    vm.newappEnv = [
                                        {
                                            "Selection": "",
                                            "Text": ""
                                            }
                                        ];

        vm.addNewAppEnv = function() {
            var itemToClone = { "Selection": "", "Text": "" };
            vm.newappEnv.push(itemToClone);
        }

        vm.removeNewAppEnv = function(itemIndex) {
            vm.newappEnv.splice(itemIndex, 1);
        }

	};

}());
