(function () {
    'use strict';

    angular
        .module('MarathonApp')
        .factory('HostNameFactory', HostNameFactory);

        HostNameFactory.$inject = ['$http', 'ClusterNameFactory'];

        function HostNameFactory ($http, ClusterNameFactory) {
            return {
                get: get
            };

            ///////////////////

            function get () {
                return ClusterNameFactory.get()
                    .then(getHostName);

                function getHostName (response) {
                    var clusterName = response;
                    
                    return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON')
                        .then(successHostName, errorHostName);

                    function successHostName(response) {
                        return response.data.host_components[0].HostRoles.host_name;
                    }

                    function errorHostName (err) {
                        console.log(err);
                    }
                }

                
            }
        }

}());