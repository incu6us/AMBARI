(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('masterInfo', masterInfo);

  function masterInfo() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/metrics/active-master-sidebar/active-master-sidebar.tpl.html'
    };
  }

}());
