angular.module('MarathonApp').controller('newAppController', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.submit = function() {
        alert('go johnny go');
        $mdDialog.cancel();
    };
});