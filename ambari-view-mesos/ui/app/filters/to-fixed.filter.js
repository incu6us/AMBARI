(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .filter('toFixed', toFixed);

  function toFixed() {
    return function(input) {
      return input.toFixed(2);
    };
  }
}());
