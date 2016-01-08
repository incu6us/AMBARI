app.directive('appTable', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/templates/apps-table.tpl.html',
		controller: 'appsTableController'
	};
});