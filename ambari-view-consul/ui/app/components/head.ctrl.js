(function() {
  angular
    .module('ConsulApp')
    .controller('HeadCtrl', HeadCtrl);

  HeadCtrl.$inject = ['$scope', 'Datacenters'];

  function HeadCtrl($scope, Datacenters) {

    $scope.datacentersList = [];

    runApp();

    ///////////////

    function runApp() {
      Datacenters.get()
        .then(function(response) {
          $scope.datacentersList = response;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }
}());
