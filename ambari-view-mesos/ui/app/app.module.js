(function () {
    'use strict';

    var VERSION = '0.1.0';
    var DEBUG = false;

    var spinOpts = {
        lines: 11, // The number of lines to draw
        length: 5, // The length of each line
        width: 6, // The line thickness
        radius: 11, // The radius of the inner circle
        corners: 0.4, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: 'black', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 10, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9 // The z-index (defaults to 2000000000)
    };

    angular
        .module('MesosMetricsApp', [
            'nvd3', 
            'angularSpinner', 
            'ui.bootstrap', 
            'ngVis', 
            'ngMaterial', 
            'ngRoute', 
            'templates'
        ])
        .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
            usSpinnerConfigProvider.setDefaults(spinOpts);
        }])
        .run(['$http', '$templateCache', function ($http, $templateCache) {
            $templateCache.put('executors-template.html',
                "<md-dialog ng-controller=\"MetricsCtrl\" aria-label=\"Details\">\n" +
                "<md-dialog-content>\n" +
                "<center><md-toolbar><h3>Executors</h3></md-toolbar></center>\n" +
                "<br>\n" +
                "<div class=\"container\">\n" +
                "<div ng-repeat=\"stat in executorsStat\">\n" +
                "<label>Name:</label>{{stat.name}}\n" +
                "<label>CPUs:</label>{{stat.cpu}}\n" +
                "<label>Memory:</label>{{stat.mem}}\n" +
                "<label>Disk</label>{{stat.disk}}\n" +
                "<hr>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"md-actions\" layout=\"row\">\n" +
                "<md-button class=\"md-primary\" ng-click=\"cancel()\"> Close </md-button>\n" +
                "</div>\n" +
                "</md-dialog-content>\n" +
                "</md-dialog>\n");
        }]);

    // app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    //     usSpinnerConfigProvider.setDefaults(spinOpts);
    // }]);

}());