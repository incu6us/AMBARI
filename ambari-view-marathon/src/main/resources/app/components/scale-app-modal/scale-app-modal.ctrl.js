(function () {
    'use strict';

    angular
      	.module('MarathonApp')
      	.controller('ScaleAppCtrl', ScaleAppCtrl);

      	ScaleAppCtrl.$inject = ['$mdDialog', '$routeParams', 'ScaleAppFactory', 'HostNameFactory'];

      	function ScaleAppCtrl ($mdDialog, $routeParams, ScaleAppFactory, HostNameFactory) {
            var vm = this;

            vm.appID = decodeURIComponent($routeParams.id);
            vm.hostName = '';

            vm.parametrs = {
                instances: 0
            };

            vm.cancel = cancel;
            vm.submit = submit;

            ///////////////

    	    function cancel () {
                $mdDialog.cancel();
            }

            function submit () {
                HostNameFactory.get()
                    .then( function(response) {
                        vm.hostName = response;
                        ScaleAppFactory.put(vm.hostName, vm.appID, vm.parametrs)
                            .then( function(response) {
                                $mdDialog.cancel();
                            });
                    });  
            }
        }
}());
