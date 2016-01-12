(function () {
    'use strict';

    angular
    	.module('MarathonApp')
    	.filter('toGb', toGb);

    	function toGb () {
		    return function (input) {
		        return (input / 1024).toFixed(2);
		    };
		};

}());