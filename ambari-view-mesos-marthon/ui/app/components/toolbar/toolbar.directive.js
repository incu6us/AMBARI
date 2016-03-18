(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/toolbar/toolbar.tpl.html',
      controller: 'ToolbarCtrl'
    };
  }

}());
