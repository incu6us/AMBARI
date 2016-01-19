(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('RestartAppCtrl', RestartAppCtrl);

  	RestartAppCtrl.$inject = ['$mdDialog', '$routeParams'];

  	function RestartAppCtrl ($mdDialog, $routeParams) {
        var vm = this;

        vm.appID = decodeURIComponent($routeParams.id);

	    vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.submit = function() {
            
        };
    }
}());
