(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableConfig', tableConfig);

  function tableConfig() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-config.tpl.html'
    };
  }

}());
