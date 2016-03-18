(function() {
  angular
    .module('ConsulApp')
    .controller('HeadCtrl', HeadCtrl);

  HeadCtrl.$inject = ['$scope', 'Datacenters'];

  function HeadCtrl($scope, Datacenters) {

    $scope.datacentersArr = [];
    $scope.datacenterSelected = null;

    runApp();

    ///////////////

    function runApp() {
      Datacenters.get()
        .then(function(response) {
          $scope.datacentersArr = response.data.array;
          $scope.datacenterSelected = $scope.datacentersArr[0];
          // $scope.datacenterSelected = 'lol';
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());
