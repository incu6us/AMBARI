var VERSION = "0.1.0"

var app = angular.module('MesosMetricsApp', ['nvd3']);

app.filter('toGb', function () {
    return function (input) {
        return (input / 1024).toFixed(2);
    }
});

app.controller('MetricsController', function ($scope, $http, $interval, $q) {
    $scope.dataSelector = 'metrics';
    $scope.errors = null;
    $scope.masterList = [];
    $scope.slaveList = [];

    $scope.slaveMetrics = [];
    $scope.masterStates = [];
    $scope.masterDataCpu = [];
    $scope.masterDataMem = [];
    $scope.masterDataDisk = [];
    $scope.masteterDataCpuAbsolute = [];
    $scope.masterDataMemAbsolute = [];
    $scope.masterDataDiskAbsolute = [];

    $scope.slaveDataCpu = [];
    $scope.slaveDataMem = [];
    $scope.slaveDataDisk = [];
    $scope.slaveData = [];

    $scope.activeMaster = null;
    $scope.clusterName = null;

    $scope.d3Config = {
        extended: true,
        autorefresh: true,
        debounce: 10
    }

    $scope.optionsMaster = {
        chart: {
            type: 'pieChart',
            height: 150,
            donut: true,
            x: function (d) {
                return d.name;
            },
            y: function (d) {
                return d.size;
            },
            showLabels: false,
            transitionDuration: 500,
        }
    };

    $scope.optionsSlave = {
        chart: {
            type: 'pieChart',
            height: 150,
            x: function (d) {
                return d.name;
            },
            y: function (d) {
                return d.size;
            },
            showLegend: false,
            showLabels: false,

            transitionDuration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 140,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    $scope.callAtInterval = function () {
        if ($scope.dataSelector == 'metrics') {
            $scope.getMesosMetrics();
        } else if ($scope.dataSelector == 'executors') {
            $scope.getExecutorMetrics();
        }
    };

    // Get metrics for elected master host
    $scope.getMetricsForMaster = function (clusterName, masterHost) {
        // http://128.107.34.126:8080/api/v1/views/MESOSMETRICS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://ambari-master-01.cisco.com:5050/metrics/snapshot
        $http.get('/api/v1/views/MESOSMETRICS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot', {cache: true})
            .success(function (data) {
                //items = JSON.parse(data);
                items = data;
                console.log("masterMetrics -> " + JSON.stringify(data));

                if (items["master/elected"] == 1.0) {
                    $scope.activeMaster = masterHost;
                    var usedCpu = (items["master/cpus_percent"] * 100).toFixed(1);
                    var freeCpu = 100 - usedCpu;
                    //var usedCpu = 100-20
                    //var freeCpu = 100 - 80;
                    $scope.masterDataCpu =
                        [
                            {
                                name: "Used(" + usedCpu + "%)",
                                size: usedCpu
                            },
                            {
                                name: "Free(" + freeCpu + "%)",
                                size: freeCpu
                            }
                        ];
                    $scope.masterDataCpuAbsolute = [
                        {
                            name: "Total",
                            size: items["master/cpus_total"]
                        },
                        {
                            name: "Used",
                            size: items["master/cpus_used"]
                        },
                        {
                            name: "Free",
                            size: items["master/cpus_total"] - items["master/cpus_used"]
                        }
                    ]
                    var usedMem = (items["master/mem_percent"] * 100).toFixed(1);
                    var freeMem = 100 - usedMem;
                    //var usedMem = 40;
                    //var freeMem = 60;
                    $scope.masterDataMem = [
                        {
                            "name": "Used(" + usedMem + "%)",
                            "size": usedMem,
                        },
                        {
                            "name": "Free(" + (freeMem) + "%)",
                            "size": freeMem,
                        }
                    ];
                    $scope.masterDataMemAbsolute = [
                        {
                            name: "Total",
                            size: (items["master/mem_total"] / 1024).toFixed(2)
                        },
                        {
                            name: "Used",
                            size: (items["master/mem_used"] / 1024).toFixed(2)
                        },
                        {
                            name: "Free",
                            size: ((items["master/mem_total"] - items["master/mem_used"]) / 1024).toFixed(2)
                        }
                    ];
                    var usedDisk = (items["master/disk_percent"] * 100).toFixed(1);
                    var freeDisk = 100 - usedDisk;
                    //var usedDisk = 15;
                    //var freeDisk = 85;
                    $scope.masterDataDisk = [
                        {
                            "name": "Used(" + usedDisk + "%)",
                            "size": usedDisk,
                        },
                        {
                            "name": "Free(" + freeDisk + "%)",
                            "size": freeDisk,
                        }
                    ];
                    $scope.masterDataDiskAbsolute = [
                        {
                            name: "Total",
                            size: (items["master/disk_total"] / 1024).toFixed(2)
                        },
                        {
                            name: "Used",
                            size: (items["master/disk_used"] / 1024).toFixed(2)
                        },
                        {
                            name: "Free",
                            size: ((items["master/disk_total"] - items["master/disk_used"]) / 1024).toFixed(2)
                        }
                    ];
                }
            })
            .error(function (data) {
                console.log('Error: ' + JSON.stringify(data));
            })
    }

    // Get metrics for slave host
    $scope.getMetricsForSlave = function (slaveHost) {
        $http.get('/api/v1/views/MESOSMETRICS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot', {cache: true})
            .success(function (data) {
                items = data;

                $scope.slaveData.push({id: slaveHost, metrics: items});

                $scope.slaveDataCpu.push({
                    id: slaveHost,
                    "metrics": [
                        {
                            name: "Used",
                            size: items["slave/cpus_used"]
                        },
                        {
                            name: "Free",
                            size: items["slave/cpus_total"] - items["slave/cpus_used"]
                        }
                    ]
                });

                $scope.slaveDataMem.push({
                    id: slaveHost,
                    "metrics": [
                        {
                            name: "Used",
                            size: (items["slave/mem_used"] / 1024).toFixed(2)
                        },
                        {
                            name: "Free",
                            size: ((items["slave/mem_total"] - items["slave/mem_used"]) / 1024).toFixed(2)
                        }
                    ]
                });

                $scope.slaveDataDisk.push({
                    id: slaveHost,
                    "metrics": [
                        {
                            name: "Used",
                            size: (items["slave/disk_used"] / 1024).toFixed(2)
                        },
                        {
                            name: "Free",
                            size: ((items["slave/disk_total"] - items["slave/disk_used"]) / 1024).toFixed(2)
                        }
                    ]
                });
                console.log("$scope.slaveData -> " + JSON.stringify($scope.slaveData));
                console.log("$scope.slaveDataCpu -> " + JSON.stringify($scope.slaveDataCpu));
            })
            .error(function (data) {
                console.log('Error: ' + JSON.stringify(data));
            })
    }


    /*
     * GET METRICS
     */
    $scope.getMesosMetrics = function () {

        /*
         * Get clusterName from master
         */
        $q.all({
            master: $http.get('/api/v1/clusters')
        }).then(function (masterData) {
            $scope.clusterName = masterData.master.data.items[0].Clusters.cluster_name;

            /*
             * Get mesos master hosts
             */
            $q.all({
                mesosMaster: $http.get('/api/v1/clusters/' + $scope.clusterName + '/services/MESOS/components/MESOS_MASTER')
            }).then(function (mesosMasterData) {

                console.log("mesosMasterData -> " + JSON.stringify(mesosMasterData))

                var masterItems = mesosMasterData.mesosMaster.data.host_components;
                $scope.masterList = [];

                for (var i = 0; i < masterItems.length; i++) {
                    $scope.masterList.push(masterItems[i].HostRoles.host_name);
                    // Call draw function for masters
                    $scope.getMetricsForMaster($scope.clusterName, masterItems[i].HostRoles.host_name)
                }

                console.log("masterList -> " + $scope.masterList);
            })

            /*
             * Get mesos slave hosts
             */
            $q.all({
                mesosSlave: $http.get('/api/v1/clusters/' + $scope.clusterName + '/services/MESOS/components/MESOS_SLAVE')
            }).then(function (mesosSlaveData) {

                var slaveItems = mesosSlaveData.mesosSlave.data.host_components;
                $scope.slaveList = [];
                $scope.slaveData = [];
                $scope.slaveDataCpu = [];
                $scope.slaveDataMem = [];
                $scope.slaveDataDisk = [];
                for (var i = 0; i < slaveItems.length; i++) {
                    $scope.slaveList.push(slaveItems[i].HostRoles.host_name);
                    // Call draw function for slaves
                    $scope.getMetricsForSlave(slaveItems[i].HostRoles.host_name)
                }

                console.log("slaveList: " + $scope.slaveList);
            })
        })
    }

    /*
     * GET EXECUTORS
     */
    $scope.getExecutorMetrics = function () {
        if ($scope.activeMaster != null) {
            $q.all({
                ///api/v1/views/MESOSMETRICS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://ambari-master-01.cisco.com:5050/master/state.json
                executorsInfo: $http.get("/api/v1/views/MESOSMETRICS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/master/state.json")
            }).then(function (values) {
                for (var executorsInt = 0; executorsInt < values.executorsInfo.data.frameworks.length; executorsInt++) {
                    for (var tasksInt = 0; tasksInt < values.executorsInfo.data.frameworks[executorsInt].length; tasksInt++) {
                        console.log(values.executorsInfo.data.frameworks[executorsInt].tasks[tasksInt].name)
                    }
                }
            })
        }
    }

    $interval(function () {
        $scope.callAtInterval();
    }, 10000);

});