(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('appTable', appTable);

		function appTable() {
			return {
				restrict: 'E',
				templateUrl: 'partials/apps-table.tpl.html',
				controller: 'AppsTableCtrl',
				controllerAs:  'appsTable'
			};
		};
		
}());