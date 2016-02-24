(function() {
  angular
    .module('MarathonApp')
    .controller('ToolbarCtrl', ToolbarCtrl);

  ToolbarCtrl.$inject = ['$mdDialog', '$mdMedia'];

  function ToolbarCtrl($mdDialog, $mdMedia) {
    var vm = this;
    vm.status = '  ';

    vm.newAppModal = newAppModal;

    ///////////////

    function newAppModal(ev) {
      $mdDialog.show({
        templateUrl: 'app/components/new-app-modal/new-app-modal.tpl.html',
        controller: 'NewAppCtrl',
        controllerAs: 'newapp',
        parent: angular.element(document.querySelector('#content')),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }

  }
}());
