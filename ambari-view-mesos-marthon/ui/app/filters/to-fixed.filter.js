(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .filter('toFixed', toFixed);

  function toFixed() {
    return function(input) {
      return input.toFixed(2);
    };
  }
}());
