(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .config(themeConfig);

        themeConfig.$inject = ['$mdThemingProvider'];

        function themeConfig ($mdThemingProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('brown', {
                    'default': '900'
                })
                .accentPalette('orange', {
                    'hue-1': '400'
                })
                .warnPalette('red')
                .backgroundPalette('brown', {
                    'default': '50'
                });
        };
}());