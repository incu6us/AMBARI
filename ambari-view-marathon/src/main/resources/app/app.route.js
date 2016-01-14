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
                    templateUrl: 'app/components/apps-table/apps-table.tpl.html',
                    controller: 'AppsTableCtrl',
                    controllerAs:  'appsTable'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }

}());