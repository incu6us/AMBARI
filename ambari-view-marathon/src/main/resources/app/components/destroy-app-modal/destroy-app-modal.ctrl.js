(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('DestroyAppCtrl', DestroyAppCtrl);

  	DestroyAppCtrl.$inject = ['$mdDialog', '$routeParams'];

  	function DestroyAppCtrl ($mdDialog, $routeParams) {
        var vm = this;

        vm.appID = decodeURIComponent($routeParams.id);

	    vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.submit = function() {
            
        };
    }
}());
