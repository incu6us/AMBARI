(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .config(routeConfig);

        routeConfig.$inject = ['$routeProvider'];

        function routeConfig ($routeProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: '/apps'
                })
                .when('/apps', {
                    templateUrl: 'partials/apps-table.tpl.html',
                    controller: 'AppsTableCtrl',
                    controllerAs:  'appsTable'
                })
                .otherwise({
                    redirectTo: '/'
                });
        };

}());