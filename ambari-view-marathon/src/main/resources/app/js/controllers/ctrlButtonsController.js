(function () {
	angular
		.module('MarathonApp')
		.controller('ctrlButtonsController', ctrlButtonsController);

		ctrlButtonsController.$inject = ['$scope', '$mdDialog', '$mdMedia'];

		function ctrlButtonsController ($scope, $mdDialog, $mdMedia) {
		    $scope.status = '  ';

		    $scope.newAppModal = function(ev) {
		        $mdDialog.show({
		            templateUrl: 'partials/newAppModal.tpl.html',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        })
		    };
		};
}());