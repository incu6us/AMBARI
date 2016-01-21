(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .controller('SuspendAppCtrl', SuspendAppCtrl);

        SuspendAppCtrl.$inject = ['$mdDialog', '$routeParams', 'SuspendAppFactory', 'HostNameFactory'];

        function SuspendAppCtrl ($mdDialog, $routeParams, SuspendAppFactory, HostNameFactory) {
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
                        SuspendAppFactory.put(vm.hostName, vm.appID, vm.parametrs)
                            .then( function(response) {
                                $mdDialog.cancel();
                            });
                    });  
            }
        }
}());
