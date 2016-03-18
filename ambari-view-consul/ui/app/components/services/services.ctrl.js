(function() {
  angular
    .module('ConsulApp')
    .controller('ServicesCtrl', ServicesCtrl);

  ServicesCtrl.$inject = ['$scope', '$window', 'Services', 'ServiceDetails'];

  function ServicesCtrl($scope, $window, Services, ServiceDetails) {

    $scope.statusesFilterList = ['all', 'passing', 'walling', 'critical'];
    $scope.statusesFilter = null;

    $scope.serviceSelected = null;

    $scope.serviceSelectedTags = [];

    $scope.$watch('$parent.datacenterSelected', getServices);

    ///////////////

    // Fix crash of 'md-virtual-repeat-container' in Chrome
    $scope.listStyle = {
      height: ($window.innerHeight - 150) + 'px'
    };

    $scope.setServiceChoosen = setServiceChoosen;

    ///////////////

    function getServices(newVal, oldVal) {
      // This 'if' prevents to run $watch on app initialization
      if (newVal === oldVal) {
        return;
      }

      Services.get($scope.datacenterSelected)
        .then(function(response) {
          $scope.servicesArr = response.data.array;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function setServiceChoosen(service) {
        ServiceDetails.get(service.Name, $scope.datacenterSelected)
          .then(function(response) {
            $scope.serviceSelected = service;
            $scope.serviceSelected.ServiceDetails = response.data.array;

            $scope.serviceSelectedTags = [];
            angular.forEach($scope.serviceSelected.ServiceDetails, function(value) {
              angular.forEach(value.Service.Tags, function(value) {
                if($scope.serviceSelectedTags.indexOf(value) === -1){
                  $scope.serviceSelectedTags.push(value);
                }
              });
            });
          })
          .catch(function(err) {
            console.log(err);
          });
    }

  }
}());
