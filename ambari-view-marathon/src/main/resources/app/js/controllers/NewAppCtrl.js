(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('NewAppCtrl', NewAppCtrl);

  	NewAppCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'ControlButtonsCtrl'];

  	function NewAppCtrl ($scope, $mdDialog, $mdMedia, ControlButtonsCtrl) {
	    $scope.status = '  ';
	    $scope.cancel = function() {
	        $mdDialog.cancel();
	    };
	    $scope.submit = function() {
	        alert('go johnny go');
	        $mdDialog.cancel();
	    };
	};

}());