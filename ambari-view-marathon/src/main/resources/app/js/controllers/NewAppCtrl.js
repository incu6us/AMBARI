(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('NewAppCtrl', NewAppCtrl);

  	NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

  	function NewAppCtrl ($scope, $mdDialog, $mdMedia) {
  	var vm = this;

	    vm.status = '  ';
	    vm.docker_networks = [{ netid: 'HOST', value: 'Host' }, { netid: 'BRIDGE', value: 'Bridged' }];
	    vm.docker_protocols = [{ netid: 'tcp', value: 'tcp' }, { netid: 'udp', value: 'udp' }];
	    vm.docker_volume_modes = [{ netid: 'RO', value: 'Read Only' }, { netid: 'RW', value: 'Read and Write' }];
	    vm.cancel = function() {
	        $mdDialog.cancel();
	    };
	    vm.submit = function() {
	        alert('go johnny go');
	        $mdDialog.cancel();
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
	};

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

}());