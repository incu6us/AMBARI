(function () {
	angular
		.module('MarathonApp')
		.controller('ToolbarCtrl', ToolbarCtrl);

		ToolbarCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

		function ToolbarCtrl ($scope, $mdDialog, $mdMedia) {
		var vm = this;
		    vm.status = '  ';

		    vm.goToAllApps = goToAllApps;
		    vm.newAppModal = newAppModal;

		    ///////////////

		    function newAppModal (ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/new-app-modal/new-app-modal.tpl.html',
		            controller: 'NewAppCtrl',
		            controllerAs: 'newapp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
		    }

		    function goToAllApps () {
		    	$timeout.cancel(promise);
		    	$location.path('#/apps/');
		    }


		}
}());