(function () {
 	'use strict';

	angular
		.module('MarathonApp')
		.directive('tableTasks', tableTasks);

		function tableTasks() {
			return {
				restrict: 'E',
				templateUrl: 'app/components/app-info/table-tasks.tpl.html'
			};
		}
		
}());