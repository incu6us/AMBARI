var VERSION = "0.1.0";
var DEBUG = false;


var spinOpts = {
    lines: 11, // The number of lines to draw
    length: 5, // The length of each line
    width: 6, // The line thickness
    radius: 11, // The radius of the inner circle
    corners: 0.4, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: 'black', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 10, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
};

var app = angular.module('MesosMetricsApp', ['nvd3', 'ngMaterial', 'angularSpinner', 'ui.bootstrap', 'ngVis']).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('green');
    //.accentPalette('green');
    //.dark();
});

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults(spinOpts);
}]);

app.filter('toGb', function () {
    return function (input) {
        return (input / 1024).toFixed(2);
    }
});

app.filter('toHPath', function () {
    return function (input) {
        if (input == '..') {
            return input;
        }
        return input.replace(new RegExp("(.*)/(.*)"), "$2");
    }
});

app.filter('truncateMesosID', function () {
    return function (id) {
        if (id) {
            var truncatedIdParts = id.split('-');

            if (truncatedIdParts.length > 3) {
                return '...' + truncatedIdParts.splice(3, 3).join('-');
            } else {
                return id;
            }
        } else {
            return '';
        }
    };
});

app.filter('toFixed', function () {
    return function (input) {
        return input.toFixed(2);
    }
});

app.controller('MetricsController', ['$scope', '$http', '$interval', '$q', '$mdDialog', '$uibModal', 'VisDataSet', function ($scope, $http, $interval, $q, $mdDialog, $uibModal, VisDataSet) {
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

    $scope.updatedMesosSlave = true;
    $scope.executorsStat = [];

    $scope.frameworks = [];
    $scope.completedFrameworks = [];

    $scope.frameworkTasks = [];
    $scope.frameworkTasksSlaves = undefined;

    $scope.detailsForTask = false;
    $scope.detailsForExecutors = false;
    $scope.detailsForSandbox = false;

    $scope.tasks = [];
    $scope.executors = [];
    $scope.directories = [];

    $scope.executorUrl = null;
    $scope.executorDir = null;
    $scope.executorLastDir = null;

    // Network Map variables
    $scope.nodes;
    $scope.edges;
    $scope.network_data;
    $scope.events = {};

    $scope.events.click = function (data) {
        if(DEBUG){
            console.log.apply(console, arguments);
        }

        $scope.slaveList = [];
        $scope.slaveData = [];
        $scope.slaveDataCpu = [];
        $scope.slaveDataMem = [];
        $scope.slaveDataDisk = [];

        angular.forEach($scope.nodes, function (value, key) {
            if(data.nodes[0] == value.id){
                $scope.getMetricsForSlave(value.label)
            }
        })
    };

    $scope.options = {
        autoResize: true,
        height: '1000',
        width: '100%'
    };

    //
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
        }

        if (DEBUG) {
            console.log("detailsForTask: " + $scope.detailsForTask);
        }
        //else if ($scope.dataSelector == 'executors') {
        // $scope.getExecutors();
        //}
    };

    $scope.setDetailsForTask = function (val) {
        $scope.detailsForTask = val;
    }

    $scope.setDetailsForExecutors = function (val) {
        $scope.detailsForExecutors = val;
    }

    $scope.setDetailsForSandbox = function (val) {
        $scope.detailsForSandbox = val;
    }

    $scope.setUpdatedMesosSlave = function (val) {
        console.log("setUpdatedMesosSlave -> " + val)
        if (val == true) {
            var frameworks = document.querySelectorAll('li[id^="agentFrameworks-"] > div');
            var executors = document.querySelectorAll('li[id^="agentExecutors-"] > div');

            Array.prototype.forEach.call(frameworks, function (node) {
                node.parentNode.removeChild(node);
            });

            Array.prototype.forEach.call(executors, function (node) {
                node.parentNode.removeChild(node);
            });

        }
        $scope.updatedMesosSlave = val;
    }

    // Get metrics for elected master host
    $scope.getMetricsForMaster = function (clusterName, masterHost) {
        // http://128.107.34.126:8080/api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://ambari-master-01.cisco.com:5050/metrics/snapshot
        $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot', {cache: true})
            .success(function (data) {
                //items = JSON.parse(data);
                items = data;

                if (DEBUG) {
                    console.log("masterMetrics -> " + JSON.stringify(data));
                }

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
        $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + slaveHost + ':5051/metrics/snapshot', {cache: true})
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

                if (DEBUG) {
                    console.log("$scope.slaveData -> " + JSON.stringify($scope.slaveData));
                    console.log("$scope.slaveDataCpu -> " + JSON.stringify($scope.slaveDataCpu));
                }
            })
            .error(function (data) {
                console.log('Error: ' + JSON.stringify(data));
            })


    }


    // showMetricExecutorsRunning - get info about executors
    $scope.showMetricExecutorsRunning = function (hostname) {
        var executors = '';

        if ($scope.activeMaster != null) {

            $scope.loading = true;
            $scope.setUpdatedMesosSlave(false);

            try {
                $q.all({
                    state: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/master/state.json")
                }).then(function (values) {
                    var allData = values.state.data;
                    angular.forEach(allData.slaves, function (value, key) {
                        if (value.hostname == hostname) {
                            //slave(1)@10.0.5.202:5051
                            var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
                            var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
                            var stateUrl = "http://" + host + "/" + prefix + "/state.json";
                            console.log("stateUrl -> " + stateUrl)
                            //$scope.detailsForTask = true;
                            //$scope.taskLoading = true;
                            $q.all({
                                frameworks: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=" + stateUrl)
                            }).then(function (frameworkValues) {
                                angular.forEach(frameworkValues.frameworks.data.frameworks, function (framework, keyFrameworks) {
                                    angular.forEach(framework.executors, function (executor, keyExecutor) {
                                        executors = executors + "Name: " + executor.name + "<br>" +
                                            "CPU: " + executor.resources.cpus.toFixed(2) + "<br>" +
                                            "Mem: " + (executor.resources.mem / 1024).toFixed(2) + "<br>" +
                                            "DISK: " + (executor.resources.disk / 1024).toFixed(2) + "<br><br>";
                                    });
                                })
                                document.getElementById('agentExecutors-' + hostname).innerHTML = '<div style="border: solid 1px #ccc; margin: 10px; padding: 10px;"><div style="text-align: right;"><i style="cursor: pointer;" class="glyphicon glyphicon-eye-close"></i></div>' + executors + '</div>';
                            });

                        }
                    });
                    $scope.loading = false;
                });
            } catch (err) {
                $scope.loading = false;
            }
        } else {
            alert("Please wait for leading master...");
        }
    }

    // get info about frameworks
    $scope.showMetricFrameworksRunning = function (hostname) {

        var frameworks = '';

        if ($scope.activeMaster != null) {

            try {
                $scope.loading = true;
                $scope.setUpdatedMesosSlave(false);

                $q.all({
                    state: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/master/state.json")
                }).then(function (values) {
                    var allData = values.state.data;
                    angular.forEach(allData.slaves, function (value, key) {
                        if (value.hostname == hostname) {
                            //slave(1)@10.0.5.202:5051
                            var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
                            var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
                            var stateUrl = "http://" + host + "/" + prefix + "/state.json";
                            console.log("stateUrl -> " + stateUrl)
                            //$scope.detailsForTask = true;
                            //$scope.taskLoading = true;
                            $q.all({
                                frameworks: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=" + stateUrl)
                            }).then(function (frameworkValues) {
                                angular.forEach(frameworkValues.frameworks.data.frameworks, function (framework, keyFrameworks) {
                                    frameworks = frameworks + "Name: " + framework.name + "<br>";
                                })
                                document.getElementById('agentFrameworks-' + hostname).innerHTML = '<div style="border: solid 1px #ccc; margin: 10px; padding: 10px;"><div style="text-align: right;"><i style="cursor: pointer;" class="glyphicon glyphicon-eye-close"></i></div>' + frameworks + '</div>';
                            });

                        }
                    });
                    $scope.loading = false;
                });
            } catch (err) {
                $scope.loading = false;
            }
        } else {
            alert("Please wait for leading master...");
        }
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

                if (DEBUG) {
                    console.log("mesosMasterData -> " + JSON.stringify(mesosMasterData))
                }

                var masterItems = mesosMasterData.mesosMaster.data.host_components;
                $scope.masterList = [];

                for (var i = 0; i < masterItems.length; i++) {
                    $scope.masterList.push(masterItems[i].HostRoles.host_name);
                    // Call draw function for masters
                    $scope.getMetricsForMaster($scope.clusterName, masterItems[i].HostRoles.host_name)
                }

                if (DEBUG) {
                    console.log("masterList -> " + $scope.masterList);
                }
            });

            /*
             * Get mesos slave hosts
             */
            if ($scope.updatedMesosSlave) {
                $q.all({
                    mesosSlave: $http.get('/api/v1/clusters/' + $scope.clusterName + '/services/MESOS/components/MESOS_SLAVE')
                }).then(function (mesosSlaveData) {

                    var slaveItems = mesosSlaveData.mesosSlave.data.host_components;
                    //$scope.slaveList = [];
                    //$scope.slaveData = [];
                    //$scope.slaveDataCpu = [];
                    //$scope.slaveDataMem = [];
                    //$scope.slaveDataDisk = [];

                    // Network map drawing
                    var tmpNodeArr = [];
                    var tmpEdgeArr = [];

                    var nodesIdCounter = 1;

                    var notUsedMasterHosts;

                    edgeIdCounter = 1;
                    for (var i = 0; i < slaveItems.length; i++) {
                        $scope.slaveList.push(slaveItems[i].HostRoles.host_name);
                        // Call draw function for slaves
                        //$scope.getMetricsForSlave(slaveItems[i].HostRoles.host_name)

                        // draw map canvas with relations for hosts
                        if($scope.activeMaster != null || $scope.activeMaster != undefined) {
                            if (slaveItems[i].HostRoles.host_name == $scope.activeMaster) {
                                tmpNodeArr.push(
                                        {id: 1, label: $scope.activeMaster, "size":4, "color":"#5cb85c", "shape":"circle"}
                                    );
                            } else if (slaveItems[i].HostRoles.host_name != $scope.activeMaster && slaveItems[i].HostRoles.host_name.indexOf("master") > -1) {
                                tmpNodeArr.push(
                                    {
                                        id: ++nodesIdCounter,
                                        label: slaveItems[i].HostRoles.host_name,
                                        "size": 7,
                                        "color": "#337ab7",
                                        "shape": "circle"
                                    }
                                );
                                notUsedMasterHosts = nodesIdCounter
                            } else {
                                tmpNodeArr.push(
                                    {
                                        id: ++nodesIdCounter,
                                        label: slaveItems[i].HostRoles.host_name,
                                        "size": 5,
                                        "color": "#b3b3ff",
                                        "shape": "square"
                                    }
                                );
                            }
                        }
                        if(notUsedMasterHosts != nodesIdCounter){
                            tmpEdgeArr.push(
                                {id: edgeIdCounter++, from: 1, to: nodesIdCounter}
                            );
                        }
                    }

                    if($scope.nodes == undefined || $scope.edges == undefined || $scope.nodes.length != tmpNodeArr.length || $scope.edges.length != tmpEdgeArr.length){
                        $scope.nodes = tmpNodeArr;
                        $scope.edges = tmpEdgeArr;

                        $scope.network_data = {
                            nodes: $scope.nodes,
                            edges: $scope.edges
                        };
                    }

                    if (DEBUG) {
                        console.log("slaveList: " + $scope.slaveList);
                    }
                });
            }
        });
    }

    /*
     * GET EXECUTORS
     */

    // Get details from master about slaves
    function getSlaves() {
        if ($scope.frameworkTasksSlaves == undefined) {
            $q.all({
                slaveData: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/slaves", {cache: true})
            }).then(function (vals) {
                $scope.frameworkTasksSlaves = vals.slaveData.data;
            })
        }
    }

    // Draw Executors
    $scope.getExecutors = function () {
        if ($scope.activeMaster != null) {

            $scope.frameworkTasksSlaves = undefined;
            getSlaves();
            $scope.loading = true;
            $q.all({
                ///api/v1/views/MESOS/versions/0.1.0/instances/mesos/resources/proxy/json?url=http://ambari-master-01.cisco.com:5050/master/state.json
                executorsInfo: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/master/state.json")
            }).then(function (values) {

                if (DEBUG) {
                    console.log("executorsInfoJson -> " + JSON.stringify(values.executorsInfo.data));
                    console.log("executorsInfoFrameworksLength -> " + values.executorsInfo.data.frameworks.length);
                }

                $scope.frameworkTasks = [];

                for (var executorsInt = 0; executorsInt < values.executorsInfo.data.frameworks.length; executorsInt++) {
                    for (var tasksInt = 0; tasksInt < values.executorsInfo.data.frameworks[executorsInt].tasks.length; tasksInt++) {
                        $scope.frameworkTasks.push(values.executorsInfo.data.frameworks[executorsInt].tasks[tasksInt]);
                        //console.log("executorsInfoTasks -> " + values.executorsInfo.data.frameworks[executorsInt].tasks[tasksInt]);
                    }
                }
                $scope.loading = false;
            })
        }
    }

    // Draw Executor info (tasks)
    $scope.getExecutor = function (slave_id, framework_id, executor_id) {
        $scope.tasks = [];

        angular.forEach($scope.frameworkTasksSlaves.slaves, function (value, key) {
            if (value.id == slave_id) {
                //slave(1)@10.0.5.202:5051
                var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
                var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
                var stateUrl = "http://" + host + "/" + prefix + "/state.json";

                $scope.detailsForTask = true;
                $scope.taskLoading = true;
                $q.all({
                    frameworks: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=" + stateUrl)
                }).then(function (values) {
                    angular.forEach(values.frameworks.data.frameworks, function (v, k) {
                        if (v.id == framework_id) {

                            if (DEBUG) {
                                console.log("executors: " + JSON.stringify(v.executors));
                            }

                            angular.forEach(v.executors, function (v1, k2) {
                                angular.forEach(v1.tasks, function (v2, k2) {
                                    if (v2.executor_id == executor_id) {

                                        if (DEBUG) {
                                            console.log("v2: " + JSON.stringify(v2));
                                        }

                                        $scope.tasks.push(v2);
                                    }
                                })
                            })
                        }
                    })
                    $scope.taskLoading = false;
                });
            }
        });

        if (DEBUG) {
            console.log("$scope.tasks: " + $scope.tasks);
        }
    }

    // Go to the Sandbox
    $scope.getSandbox = function (slave_id, framework_id, executor_id) {
        $scope.directories = [];

        $scope.loading = true;

        angular.forEach($scope.frameworkTasksSlaves.slaves, function (value, key) {
            if (value.id == slave_id) {
                //slave(1)@10.0.5.202:5051
                var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
                //var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");


                var port = '5051';
                //if (value.hostname.indexOf("master") > -1) {
                //    port = '5050';
                //}
                var stateUrl = "http://" + value.hostname + ":" + port + "/" + prefix + "/state.json";


                try {
                    $q.all({
                        frameworks: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=" + stateUrl)
                    }).then(function (values) {
                        angular.forEach(values.frameworks.data.frameworks, function (v, k) {
                            if (v.id == framework_id) {

                                if (DEBUG) {
                                    console.log("executors: " + JSON.stringify(v.executors));
                                }

                                angular.forEach(v.executors, function (v1, k2) {

                                    if (DEBUG) {
                                        console.log("executor_id: " + executor_id + " - " + v1.id)
                                    }

                                    if (v1.id == executor_id) {
                                        var port = '5051';
                                        //if (v.hostname.indexOf("master") > -1) {
                                        //    port = '5050';
                                        //}

                                        if (DEBUG) {
                                            console.log("Dir url -> /api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + value.hostname + ":" + port + "/files/browse.json?path=" + v1.directory)
                                        }

                                        $scope.executorUrl = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + value.hostname + ":" + port + "/files/browse.json?path=";
                                        $scope.executorUrlForDownloadFile = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/object?url=http://" + value.hostname + ":" + port + "/files/download.json?path=";
                                        $scope.executorDir = v1.directory;
                                        $scope.executorLastDir = $scope.executorDir;
                                        try {
                                            $q.all({
                                                dirs: $http.get($scope.executorUrl + $scope.executorDir)
                                            }).then(function (val) {

                                                if (DEBUG) {
                                                    console.log("val.dirs.data.array -> " + JSON.stringify(val.dirs.data.array));
                                                }

                                                if (val.dirs.data.array != undefined) {
                                                    $scope.directories = val.dirs.data.array;
                                                }
                                                $scope.loading = false;
                                                $scope.detailsForSandbox = true;
                                            })
                                        } catch (err) {
                                            $scope.loading = false;
                                            $scope.detailsForSandbox = true;
                                            alert(err);
                                        }
                                    }
                                })
                            }
                        })
                        $scope.loading = false;
                        $scope.detailsForSandbox = true;
                    });
                } catch (err) {
                    $scope.loading = false;
                    $scope.detailsForSandbox = true;
                    alert(err);
                }
            }
        });
    }

    // Called by clicking on path in Sandbox
    $scope.getSandboxByPath = function (filemode, path) {
        $scope.loading = true;
        if (path == '..') {
            $scope.executorLastDir = $scope.executorLastDir.replace(new RegExp("(.*)/(.*)"), "$1");
        } else {
            if (filemode == 'd')
                $scope.executorLastDir = path;
        }

        // if FILEMODE == '-' (is a file) then download it
        if (filemode == '-') {
            $scope.loading = false;
            window.open($scope.executorUrlForDownloadFile + path, '_blank', '');
        }
        // Go ot the directory
        else {
            try {
                $q.all({
                    datas: $http.get($scope.executorUrl + $scope.executorLastDir)
                }).then(function (val) {
                        $scope.directories = val.datas.data.array;
                        if ($scope.executorDir != $scope.executorLastDir) {
                            $scope.directories.unshift({
                                "mode": "up",
                                "path": "..",
                                "uid": "",
                                "gid": "",
                                "size": "",
                                "nlink": "",
                                "mtime": ""
                            });
                        }
                        $scope.loading = false;

                        if (DEBUG) {
                            console.log("$scope.directories -> " + JSON.stringify($scope.directories));
                        }
                    }
                )
            } catch (err) {
                $scope.loading = false;
            }
        }
    }


    /*
     * Frameworks draw
     */
    $scope.getFrameworks = function () {
        if ($scope.activeMaster != null) {

            $scope.loading = true;
            getSlaves();

            $q.all({
                frameworksData: $http.get("/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + $scope.activeMaster + ":5050/master/state.json")
            }).then(function (values) {

                if (DEBUG) {
                    console.log("frameworksDataJson -> " + JSON.stringify(values.frameworksData.data));
                    console.log("frameworksLength -> " + values.frameworksData.data.frameworks.length);
                }

                for (var frameworksInt = 0; frameworksInt < values.frameworksData.data.frameworks.length; frameworksInt++) {
                    $scope.frameworks = values.frameworksData.data.frameworks;
                    $scope.completedFrameworks = values.frameworksData.data.completed_frameworks;
                }

                if (DEBUG) {
                    console.log("$scope.frameworks -> " + JSON.stringify($scope.frameworks));
                }

                $scope.loading = false;
            })
        }
    }

    $scope.getFrameworkTasks = function (frameworkId) {

        $scope.detailsForExecutors = true;
        $scope.executorsInFrameworks = [];

        angular.forEach($scope.frameworks, function (val, key) {
            if (val.id == frameworkId) {
                //console.log(JSON.stringify(val))
                angular.forEach(val.tasks, function (valTasks, keyTasks) {
                    $scope.executorsInFrameworks.push(valTasks);
                })
            }
        });

    }

    $interval(function () {
        $scope.callAtInterval();
    }, 10000);

}]);

// $scope.executorsStat.push({name: exec.name, cpu: exec.resources.cpus.toFixed(2), mem: (exec.resources.mem / 1024), disk: (exec.resources.disk / 1024)})
app.run(['$http', '$templateCache', function ($http, $templateCache) {
    $templateCache.put('executors-template.html',
        "<md-dialog ng-controller=\"MetricsController\" aria-label=\"Details\">\n" +
        "<md-dialog-content>\n" +
        "<center><md-toolbar><h3>Executors</h3></md-toolbar></center>\n" +
        "<br>\n" +
        "<div class=\"container\">\n" +
        "<div ng-repeat=\"stat in executorsStat\">\n" +
        "<label>Name:</label>{{stat.name}}\n" +
        "<label>CPUs:</label>{{stat.cpu}}\n" +
        "<label>Memory:</label>{{stat.mem}}\n" +
        "<label>Disk</label>{{stat.disk}}\n" +
        "<hr>\n" +
        "</div>\n" +
        "</div>\n" +
        "<div class=\"md-actions\" layout=\"row\">\n" +
        "<md-button class=\"md-primary\" ng-click=\"cancel()\"> Close </md-button>\n" +
        "</div>\n" +
        "</md-dialog-content>\n" +
        "</md-dialog>\n");
}]);