(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('tableDebug', tableDebug);

		function tableDebug() {
			return {
				restrict: 'E',
				templateUrl: 'app/components/app-info/table-debug.tpl.html'
			};
		}
		
}());