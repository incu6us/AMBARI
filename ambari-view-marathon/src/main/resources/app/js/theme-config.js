(function () {
    'use strict';
    // You have to 'brunch build' 'theme-config.js' in order right after 'app.js'. 
    // Define it in 'brunch-config.coffee'.

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