(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('toolbar', toolbar);

		function toolbar() {
			return {
				restrict: 'E',
				templateUrl: 'partials/toolbar.tpl.html',
				controller: 'ControlButtonsCtrl',
				controllerAs:  'ctrlbtns'
			};
		};
		
}());