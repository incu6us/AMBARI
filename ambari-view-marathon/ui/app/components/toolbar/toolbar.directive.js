(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/toolbar/toolbar.tpl.html',
      controller: 'ToolbarCtrl',
      controllerAs: 'toolbar'
    };
  }

}());
