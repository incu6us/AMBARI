(function() {
  angular
    .module('MesosMetricsApp')
    .controller('ToolbarCtrl', ToolbarCtrl);

  ToolbarCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia'];

  function ToolbarCtrl($scope, $mdDialog, $mdMedia) {
    var vm = this;
    vm.status = '  ';

    vm.goToAllApps = goToAllApps;

    ///////////////

    function goToAllApps() {
      $timeout.cancel(promise);
      $location.path('#/apps/');
    }
  }
}());
