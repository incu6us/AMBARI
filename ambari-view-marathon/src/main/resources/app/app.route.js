(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .config(routeConfig);

        routeConfig.$inject = ['$routeProvider'];

        function routeConfig ($routeProvider) {
//          to prevent '#', but including '<base hreg="/">' not working
//          maybe because of Ember
//          $locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    redirectTo: '/apps'
                })
                .when('/apps', {
                    templateUrl: 'app/components/apps-table/apps-table.tpl.html',
                    controller: 'AppsTableCtrl',
                    controllerAs:  'appsTable'
                })
                .when('/apps/:id', {
                    templateUrl: 'app/components/app-info/app-info.tpl.html',
                    controller: 'AppInfoCtrl',
                    controllerAs: 'appInfo'
                })
                .when('/apps/:id/:taskId', {
                    templateUrl: 'app/components/task-info/task-info.tpl.html',
                    controller: 'TaskInfoCtrl',
                    controllerAs: 'taskInfo'
                })
                .when('/deployments', {
                    templateUrl: 'app/components/apps-deployments/apps-deployments.tpl.html',
                    controller: 'AppsDeploymentsCtrl',
                    controllerAs: 'appsDeploys'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }

}());