(function() {
  angular
    .module('ConsulApp')
    .controller('ServicesCtrl', ServicesCtrl);

  ServicesCtrl.$inject = ['$scope'];

  function ServicesCtrl($scope) {
    $scope.statusesFilterList = ['All', 'Passing', 'Falling'];

    $scope.statusesFilter = null;

    ///////////////

  }
}());
