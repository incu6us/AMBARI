(function () {
	'use strict';

	angular
		.module('MesosMetricsApp')
		.filter('toHPath', toHPath);

		function toHPath () {
		    return function (input) {
		        if (input == '..') {
		            return input;
		        }
		        return input.replace(new RegExp("(.*)/(.*)"), "$2");
    		};
		}
}());