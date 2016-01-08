// var VERSION = '0.1.0';
// var DEBUG = false;


// var spinOpts = {
//     lines: 11, // The number of lines to draw
//     length: 5, // The length of each line
//     width: 6, // The line thickness
//     radius: 11, // The radius of the inner circle
//     corners: 0.4, // Corner roundness (0..1)
//     rotate: 0, // The rotation offset
//     direction: 1, // 1: clockwise, -1: counterclockwise
//     color: 'black', // #rgb or #rrggbb or array of colors
//     speed: 1, // Rounds per second
//     trail: 10, // Afterglow percentage
//     shadow: false, // Whether to render a shadow
//     hwaccel: false, // Whether to use hardware acceleration
//     className: 'spinner', // The CSS class to assign to the spinner
//     zIndex: 2e9, // The z-index (defaults to 2000000000)
// };

// var app = angular.module('MarathonApp', ['nvd3', 'ngMaterial', 'angularSpinner', 'ui.bootstrap']).config(function ($mdThemingProvider) {
//     $mdThemingProvider.theme('default')
//         .primaryPalette('green');
//     //.accentPalette('green');
//     //.dark();
// });

// app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
//     usSpinnerConfigProvider.setDefaults(spinOpts);
// }]);

// app.filter('toGb', function () {
//     return function (input) {
//         return (input / 1024).toFixed(2);
//     };
// });

// app.controller('marathonController', ['$scope', '$http', '$interval', '$q', '$mdDialog', '$uibModal', function ($scope, $http, $interval, $q, $mdDialog, $uibModal) {

// }]);

// app.controller('getHostNameController', ['getHostName', '$scope', '$q', function (getHostName, $scope, $q) {
//     $scope.hostName = '';
//     alert('lol')
//     $q.all([ getHostName ]).then(function(values){
//         $scope.hostName = values[0];
//     });

// }]);

// app.factory('getHostName', ['$http', function ($http) {
//     return $http.get('/api/v1/clusters')
//         .then(function successCallback(response) {
//             var clusterName = response.data.items[0].Clusters.cluster_name;
            
//             return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON')    
//                 .then(function successCallback(response) {
//                     var hostName = response.data.host_components[0].HostRoles.host_name;
//                     return hostName;
//                 }, function errorCallbacj(err) {
//                     console.log(err);
//                     return err;
//                 });

//         }, function errorCallbacj(err) {
//             console.log(err);
//             return err;
//         }); 
// }]);
