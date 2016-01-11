(function () {
	'use strict';

  	app.factory('getDataForAppsTableFactory', ['$resource', function($resource) {
        return function (hostName) {
        	return $resource('http://128.107.17.60:8080/api/v1/views/MARATHON/versions/0.1.0/instances/marathon/resources/proxy/json?url=http://' + hostName + ':8080/v2/apps');
        };
    }]);
}());

// http://nikke1.github.io/dataFull.json