(function () {
  'use strict';

    app.controller('appsTableController', ['$scope', '$timeout', 'getDataForAppsTable', function ($scope, $timeout, getDataForAppsTable) {
        $scope.dataTable = [];

        (function tick() {
            $scope.dataTable = getDataForAppsTable.get(function(){
                $timeout(tick, 10*1000);
            });
        })();
    }]);
}());