(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('appTable', function () {
			return {
				restrict: 'E',
				templateUrl: 'partials/apps-table.tpl.html'
			};
		});
		
}());