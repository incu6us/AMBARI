(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableDebug', tableDebug);

  function tableDebug() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-debug.tpl.html'
    };
  }

}());
