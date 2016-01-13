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

            /////////////////////
            
            function get () {
                return ClusterNameFactory.get()
                    .then(successHostName, errorHostName);

                /////////////////////

                function successHostName (values) {
                    var clusterName = values.data.items[0].Clusters.cluster_name;
                    return $http.get('/api/v1/clusters/' + clusterName + '/components/MARATHON');
                }

                function errorHostName (err) {
                    console.log(err);
                }
            }
        };

}());