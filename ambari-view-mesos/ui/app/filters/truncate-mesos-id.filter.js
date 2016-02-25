(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .filter('truncateMesosID', truncateMesosID);

  function truncateMesosID() {
    return function(id) {
      if (id) {
        var truncatedIdParts = id.split('-');

        if (truncatedIdParts.length > 3) {
          return '...' + truncatedIdParts.splice(3, 3).join('-');
        } else {
          return id;
        }
      } else {
        return '';
      }
    };
  }
}());
