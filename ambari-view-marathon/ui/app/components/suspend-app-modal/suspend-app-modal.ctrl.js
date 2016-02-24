(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .controller('SuspendAppCtrl', SuspendAppCtrl);

  SuspendAppCtrl.$inject = ['$mdDialog', '$routeParams', 'SuspendAppFactory', 'HostNameFactory'];

  function SuspendAppCtrl($mdDialog, $routeParams, SuspendAppFactory, HostNameFactory) {
    var vm = this;

    vm.appID = decodeURIComponent($routeParams.id);
    vm.hostName = '';

    HostNameFactory.get()
      .then(function(response) {
        vm.hostName = response;
        SuspendAppFactory.version(vm.hostName, vm.appID)
          .then(function(response) {
            var appVersion = response;
            SuspendAppFactory.get(vm.hostName, vm.appID, appVersion)
              .then(function(response) {
                vm.appConfig = response;
              });
          });
      });

    vm.cancel = cancel;
    vm.submit = submit;

    ///////////////

    function cancel() {
      $mdDialog.cancel();
    }

    function submit() {
      HostNameFactory.get()
        .then(function(response) {
          vm.hostName = response;
          vm.appConfig.instances = 0;

          delete vm.appConfig.httpStatusCode;
          delete vm.appConfig.version;
          delete vm.appConfig.versionInfo;

          SuspendAppFactory.put(vm.hostName, vm.appID, vm.appConfig)
            .then(function(response) {
              $mdDialog.cancel();
            });
        });
    }
  }
}());
