(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .directive('tableTasks', tableTasks);

  function tableTasks() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/apps/app-info/table-tasks.tpl.html'
    };
  }

}());
