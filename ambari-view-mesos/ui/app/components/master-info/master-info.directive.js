(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .directive('masterInfo', masterInfo);

  function masterInfo() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/master-info/master-info.tpl.html'
    };
  }

}());
