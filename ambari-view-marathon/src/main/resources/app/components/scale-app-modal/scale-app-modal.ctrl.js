(function () {
  'use strict';

  angular
  	.module('MarathonApp')
  	.controller('ScaleAppCtrl', ScaleAppCtrl);

  	ScaleAppCtrl.$inject = ['$mdDialog'];

  	function ScaleAppCtrl ($mdDialog) {
        var vm = this;

        vm.numberOfInst = 0;

	    vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.submit = function() {
            
        };
    }
}());
