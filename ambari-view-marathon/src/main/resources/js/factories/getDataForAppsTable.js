(function () {
	'use strict';

  	app.factory('getDataForAppsTable', function($resource) {
        return $resource('http://nikke1.github.io/dataFull.json');
    });
}());