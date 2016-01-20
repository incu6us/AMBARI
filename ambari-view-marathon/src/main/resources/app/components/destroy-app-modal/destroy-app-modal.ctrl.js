(function () {
    'use strict';

    angular
      	.module('MarathonApp')
      	.controller('DestroyAppCtrl', DestroyAppCtrl);

      	DestroyAppCtrl.$inject = ['$mdDialog', '$routeParams', 'DestroyAppFactory', 'HostNameFactory'];

      	function DestroyAppCtrl ($mdDialog, $routeParams, DestroyAppFactory, HostNameFactory) {
            var vm = this;

            vm.appID = decodeURIComponent($routeParams.id);
            vm.hostName = '';

    	    vm.cancel = cancel;
            vm.submit = submit;

            HostNameFactory.get()
                .then( function(response) {
                    vm.hostName = response;
                });

            ///////////////

            function cancel () {
                $mdDialog.cancel();
            }

            function submit () {    
                DestroyAppFactory.del(hostName, appID)
                    .then( function(response) {
                        $location.path('/apps');
                    });
            }
        }
}());
