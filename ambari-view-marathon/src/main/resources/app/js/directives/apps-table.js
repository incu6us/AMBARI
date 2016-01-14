(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('appsTable', appsTable);

		function appsTable() {
			return {
				restrict: 'E',
				templateUrl: 'partials/apps-table.tpl.html',
				controller: 'AppsTableCtrl',
				controllerAs:  'appsTable'
			};
		};
		
}());