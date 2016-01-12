(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('newAppController', newAppController);

  	newAppController.$inject = [$scope, $mdDialog, $mdMedia, ctrlButtonsController];

  	function newAppController ($scope, $mdDialog, $mdMedia, ctrlButtonsController) {
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