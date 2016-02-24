(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .controller('DestroyAppCtrl', DestroyAppCtrl);

  DestroyAppCtrl.$inject = ['$mdDialog', '$routeParams', '$location', 'DestroyAppFactory', 'HostNameFactory'];

  function DestroyAppCtrl($mdDialog, $routeParams, $location, DestroyAppFactory, HostNameFactory) {
    var vm = this;

    vm.appID = decodeURIComponent($routeParams.id);
    vm.hostName = '';

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
          DestroyAppFactory.del(vm.hostName, vm.appID)
            .then(function(response) {
              $mdDialog.cancel();
              $location.path('/apps');
            });
        });
    }
  }
}());
