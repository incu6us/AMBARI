(function() {
  'use strict';

  angular
    .module('MarathonApp')
    .directive('tableConfig', tableConfig);

  function tableConfig() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/app-info/table-config.tpl.html'
    };
  }

}());
