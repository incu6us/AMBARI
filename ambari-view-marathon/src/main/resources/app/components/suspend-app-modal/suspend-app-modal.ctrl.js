(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('SuspendAppCtrl', SuspendAppCtrl);

  	SuspendAppCtrl.$inject = ['$mdDialog'];

  	function SuspendAppCtrl ($mdDialog) {
        var vm = this;

	    vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.submit = function() {
            
        };
    }
}());
