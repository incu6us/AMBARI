angular.module('MarathonApp').controller('ctrlButtonsController', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';

    $scope.newAppModal = function(ev) {
        $mdDialog.show({
            templateUrl: 'partials/newAppModal.tpl.html',
            parent: angular.element(document.querySelector('#content')),
            targetEvent: ev,
            clickOutsideToClose:true
        })
    }
});