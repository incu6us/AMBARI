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
	    vm.cancel = function() {
	        $mdDialog.cancel();
	    };
	    vm.submit = function() {
	        alert('go johnny go');
	        $mdDialog.cancel();
	    };
	};

}());