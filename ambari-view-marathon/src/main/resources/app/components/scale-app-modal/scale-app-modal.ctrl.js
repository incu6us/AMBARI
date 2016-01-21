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
                instances: "Loading..."
            };

            HostNameFactory.get()
                            .then( function(response) {
                                vm.hostName = response;
                                ScaleAppFactory.version(vm.hostName, vm.appID)
                                    .then( function(response) {
                                        var appVersion = response;
                                        ScaleAppFactory.get(vm.hostName, vm.appID, appVersion)
                                            .then( function(response) {
                                                vm.appConfig = response;
                                                vm.parametrs.instances = vm.appConfig.instances;
                                            });
                                    });
                            });

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
                        vm.appConfig.instances = vm.parametrs.instances;
                        delete vm.appConfig.httpStatusCode;
                        delete vm.appConfig.version;
                        delete vm.appConfig.versionInfo;
                        ScaleAppFactory.put(vm.hostName, vm.appID, vm.appConfig)
                            .then( function(response) {
                                $mdDialog.cancel();
                            });
                    });  
            }
        }
}());
