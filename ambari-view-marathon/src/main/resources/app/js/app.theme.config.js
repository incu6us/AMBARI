(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .config(themeConfig);

        themeConfig.$inject = ['$mdThemingProvider'];

        function themeConfig ($mdThemingProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('green', {
                    'default': '600'
                })
                .accentPalette('light-green')
                .warnPalette('red')
                .backgroundPalette('green', {
                    'default': '50'
                });
        };
}());