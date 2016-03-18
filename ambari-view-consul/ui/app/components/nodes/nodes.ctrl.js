(function() {
  angular
    .module('ConsulApp')
    .controller('NodesCtrl', NodesCtrl);

  NodesCtrl.$inject = ['$scope'];

  function NodesCtrl($scope) {
    $scope.statusesFilterList = ['All', 'Passing', 'Falling'];

    $scope.$watch('$scope.datacenterSelected', getServices);

    $scope.statusesFilter = null;

    // $scope.$on('$locationChangeStart', function() {
    //   $timeout.cancel(promise);
    // });
    //
    // promise = $timeout(getAppsList, 10 * 1000);

    ///////////////

    function getServices() {
      console.log('nod');
    }

  }
}());
