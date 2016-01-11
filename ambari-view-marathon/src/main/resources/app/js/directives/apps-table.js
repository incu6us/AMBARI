app.directive('appTable', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/apps-table.tpl.html',
		controller: 'appsTableController'
	};
});