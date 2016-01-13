(function () {
	angular
		.module('MarathonApp')
		.controller('ControlButtonsCtrl', ControlButtonsCtrl);

		ControlButtonsCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

		function ControlButtonsCtrl ($scope, $mdDialog, $mdMedia) {
		var vm = this;
		    vm.status = '  ';

		    vm.newAppModal = function(ev) {
		        $mdDialog.show({
		            templateUrl: 'partials/newAppModal.tpl.html',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        })
		    };
		};
}());