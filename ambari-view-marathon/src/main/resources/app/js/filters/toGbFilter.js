(function () {
    'use strict';

    angular
    	.module('MarathonApp')
    	.filter('toGb', function () {
		    return function (input) {
		        return (input / 1024).toFixed(2);
		    };
		});

}());