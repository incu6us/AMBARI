(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('NewAppCtrl', NewAppCtrl);

  	NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

  	function NewAppCtrl ($scope, $mdDialog, $mdMedia) {
	    $scope.status = '  ';
	    $scope.docker_networks = [{ netid: 'HOST', value: 'Host' }, { netid: 'BRIDGE', value: 'Bridged' }];
	    $scope.docker_protocols = [{ netid: 'tcp', value: 'tcp' }, { netid: 'udp', value: 'udp' }];
	    $scope.cancel = function() {
	        $mdDialog.cancel();
	    };
	    $scope.submit = function() {
	        alert('go johnny go');
	        $mdDialog.cancel();
	    };
	};

}());