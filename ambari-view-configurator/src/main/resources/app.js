var VERSION = "0.1.0"

var app = angular.module('MesosConfiguratorApp', ['nvd3']);

app.filter('toGb', function () {
    return function (input) {
        return (input / 1024).toFixed(2);
    }
});

app.controller('ConfiguratorController', function ($scope, $http, $interval, $q) {


    $interval(function () {
        console.log('some log')
    }, 10000);

});