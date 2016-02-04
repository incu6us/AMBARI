(function () {
    'use strict';

    angular
        .module('MesosMetricsApp')
        .config(routeConfig);

        routeConfig.$inject = ['$routeProvider'];

        function routeConfig ($routeProvider) {
//          to prevent '#', but including '<base hreg="/">' not working
//          maybe because of Ember
//          $locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    redirectTo: '/metrics'
                })
                .when('/metrics', {
                    templateUrl: 'app/components/metrics/metrics.tpl.html'
                })
                .when('/frameworks', {
                    templateUrl: 'app/components/frameworks/frameworks.tpl.html'
                })
                .when('/lattency', {
                    templateUrl: 'app/components/lattency/lattency.tpl.html'
                })
                // .when('/apps/:id', {
                //     templateUrl: 'app/components/app-info/app-info.tpl.html',
                //     controller: 'AppInfoCtrl',
                //     controllerAs: 'appInfo'
                // })
                // .when('/apps/:id/:taskId', {
                //     templateUrl: 'app/components/task-info/task-info.tpl.html',
                //     controller: 'TaskInfoCtrl',
                //     controllerAs: 'taskInfo'
                // })
                // .when('/deployments', {
                //     templateUrl: 'app/components/apps-deployments/apps-deployments.tpl.html',
                //     controller: 'AppsDeploymentsCtrl',
                //     controllerAs: 'appsDeploys'
                // })
                .otherwise({
                    redirectTo: '/'
                });
        }

}());