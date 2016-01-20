(function () {
    'use strict';

    angular
      	.module('MarathonApp')
      	.controller('RestartAppCtrl', RestartAppCtrl);

      	RestartAppCtrl.$inject = ['$mdDialog', '$routeParams', '$location', 'HostNameFactory', 'RestartAppFactory'];

      	function RestartAppCtrl ($mdDialog, $routeParams, $location, HostNameFactory, RestartAppFactory) {
            var vm = this;

            vm.appID = decodeURIComponent($routeParams.id);
            vm.hostName = '';

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
                        RestartAppFactory.post(vm.hostName, vm.appID)
                            .then( function(response) {
                                $mdDialog.cancel();
                                $location.path('/apps');
                            });
                    }); 
            }
        }
}());
