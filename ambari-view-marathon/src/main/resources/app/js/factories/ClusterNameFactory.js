(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .factory('ClusterNameFactory', ClusterNameFactory);

        ClusterNameFactory.$inject = ['$http'];

        function ClusterNameFactory ($http) {
            return {
                get: get
            };

            //////////////////////////////////

            function get () {
                return $http.get('/api/v1/clusters');
            }
        };

}());