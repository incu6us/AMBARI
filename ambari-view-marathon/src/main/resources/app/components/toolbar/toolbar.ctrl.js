(function () {
	angular
		.module('MarathonApp')
		.controller('ToolbarCtrl', ToolbarCtrl);

		ToolbarCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

		function ToolbarCtrl ($scope, $mdDialog, $mdMedia) {
		var vm = this;
		    vm.status = '  ';

		    vm.newAppModal = function(ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/new-app-modal/new-app-modal.tpl.html',
		            controller: 'NewAppCtrl',
		            controllerAs: 'newapp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
		    };
		}
}());