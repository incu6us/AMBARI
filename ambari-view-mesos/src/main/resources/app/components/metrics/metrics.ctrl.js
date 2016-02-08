(function () {
	'use strict';
	
	angular
		.module('MesosMetricsApp')
		.controller('MetricsCtrl', MetricsCtrl);

		MetricsCtrl.$inject = [
			'$scope', 
			'$interval', 
			'$mdDialog', 
			'$uibModal', 
			'VisDataSet',
			'ClusterNameFactory',
			'MesosMasterFactory',
			'MesosSlaveFactory',
			'MetricsForMasterFactory',
			'MetricsForSlaveFactory',
			'ActiveMasterStateFactory',
			'ActiveMasterSlavesFactory', 
			'FrameworksFactory',
			'DirsFactory',
			'DatasFactory',
			'$http',
			'$mdSidenav'
		];

		function MetricsCtrl ($scope, $interval, $mdDialog, $uibModal, VisDataSet, ClusterNameFactory, MesosMasterFactory, MesosSlaveFactory, MetricsForMasterFactory, MetricsForSlaveFactory, ActiveMasterStateFactory, ActiveMasterSlavesFactory, FrameworksFactory, DirsFactory, DatasFactory, $http, $mdSidenav) {
			var VERSION = "0.1.0";
			var DEBUG = false;

		    $scope.dataSelector = 'metrics';
		    $scope.errors = null;
		    $scope.masterList = [];
		    $scope.slaveList = [];

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

		    // Network Map variables
		    $scope.nodes = [];
		    $scope.edges = [];
		    $scope.network_data = {};
		    $scope.events = {};

		    // Configs
		    $scope.options = {
		        autoResize: true,
		        height: '100%',
		        width: '100%',
		        interaction: {
		            navigationButtons: true,
		            keyboard: true
		        }
		    };

		    $scope.d3Config = {
		        extended: true,
		        autorefresh: true,
		        debounce: 10
		    };

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

		    /////////////////

		    $scope.getMesosMetrics = getMesosMetrics;

		    $scope.events.click = click;
		    $scope.callAtInterval = callAtInterval;

		    $scope.setUpdatedMesosSlave = setUpdatedMesosSlave;

		    $scope.getMetricsForMaster = getMetricsForMaster;
		    $scope.getMetricsForSlave = getMetricsForSlave;

		    $scope.showMetricExecutorsRunning = showMetricExecutorsRunning;
		    $scope.showMetricFrameworksRunning = showMetricFrameworksRunning;

		    $scope.toggleRight = toggleRight;

		    ////////////////

		    /*
		     * GET METRICS
		     */
		    function getMesosMetrics () {
		        /*
		         * Get clusterName from master
		         */
		        ClusterNameFactory.get()
		        	.then(function (masterData) {
			            $scope.clusterName = masterData.data.items[0].Clusters.cluster_name;

			            /*
			             * Get mesos master hosts
			             */
						MesosMasterFactory.get($scope.clusterName)
							.then(function (mesosMasterData) {

				                if (DEBUG) {
				                    console.log("mesosMasterData -> " + JSON.stringify(mesosMasterData));
				                }

				                var masterItems = mesosMasterData.data.host_components;
				                $scope.masterList = [];

				                for (var i = 0; i < masterItems.length; i++) {
				                    $scope.masterList.push(masterItems[i].HostRoles.host_name);
				                    // Call draw function for masters
				                    $scope.getMetricsForMaster($scope.clusterName, masterItems[i].HostRoles.host_name);
				                }

				                if (DEBUG) {
				                    console.log("masterList -> " + $scope.masterList);
				                }
				            });

			            /*
			             * Get mesos slave hosts
			             */
			            if ($scope.updatedMesosSlave) {
			                MesosSlaveFactory.get($scope.clusterName)
			                	.then(function (mesosSlaveData) {

				                    var slaveItems = mesosSlaveData.data.host_components;
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

				                    var edgeIdCounter = 1;

				                    for (var i = 0; i < slaveItems.length; i++) {
				                        $scope.slaveList.push(slaveItems[i].HostRoles.host_name);
				                        // Call draw function for slaves
				                        //$scope.getMetricsForSlave(slaveItems[i].HostRoles.host_name)

				                        // draw map canvas with relations for hosts
				                        // !!! Fixing != to !== breaks this condition
				                        if ($scope.activeMaster != null || $scope.activeMaster != undefined) {
				                            if (slaveItems[i].HostRoles.host_name == $scope.activeMaster) {
				                                tmpNodeArr.push({
		                                        	id: 1, 
		                                        	label: $scope.activeMaster, 
		                                        	"size":4, 
		                                        	"color":"#5cb85c", 
		                                        	"shape":"circle"
		                                        });
				                            } else if (slaveItems[i].HostRoles.host_name != $scope.activeMaster && slaveItems[i].HostRoles.host_name.indexOf("master") > -1) {
				                                tmpNodeArr.push({
			                                        id: ++nodesIdCounter,
			                                        label: slaveItems[i].HostRoles.host_name,
			                                        "size": 4,
			                                        "color": "#87b6de",
			                                        "shape": "circle"
			                                    });
				                                notUsedMasterHosts = nodesIdCounter;
				                            } else {
				                                tmpNodeArr.push({
			                                        id: ++nodesIdCounter,
			                                        label: slaveItems[i].HostRoles.host_name,
			                                        "size": 7,
			                                        "color": "#b3b3ff",
			                                        "shape": "square"
			                                    });
				                            }
				                        }

				                        if(notUsedMasterHosts !== nodesIdCounter){
				                            tmpEdgeArr.push({
			                                	id: edgeIdCounter++, 
			                                	from: 1, 
			                                	to: nodesIdCounter
			                                });
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

		    function click (data) {
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
		                $scope.getMetricsForSlave(value.label);
		            }
		        });
		    }

			function callAtInterval () {
		        if ($scope.dataSelector == 'metrics') {
		            $scope.getMesosMetrics();
		        }

		        if (DEBUG) {
		            console.log("detailsForTask: " + $scope.detailsForTask);
		        }
		        //else if ($scope.dataSelector == 'executors') {
		        // $scope.getExecutors();
		        //}
		    }

		    function setUpdatedMesosSlave (val) {
		        // console.log("setUpdatedMesosSlave -> " + val);
		        if (val === true) {
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

		    function getMetricsForMaster (clusterName, masterHost) {
		    	// http://nikke1.github.io/hard-data/1snapshot.json
		    	// /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot
		    	
		    	// !!! Tried to use MetricsForMasterFactory.get(VERSION, masterHost).then(...) but it fails.
		        $http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot', {cache: true})
		            .success(function (data) {
		                //items = JSON.parse(data);
		                var items = data;

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
		                    ];
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
		            });
		    }

		    // Get metrics for slave host
		    function getMetricsForSlave (slaveHost) {
		        MetricsForSlaveFactory.get(VERSION, slaveHost)
		            .then(function (data) {
		                var items = data.data;

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
		            });
		    }

		    // showMetricExecutorsRunning - get info about executors
		    function showMetricExecutorsRunning (hostname) {
		        var executors = '';

		        if ($scope.activeMaster != null) {

		            $scope.loading = true;
		            $scope.setUpdatedMesosSlave(false);

		            try {
		                ActiveMasterStateFactory.get(VERSION, $scope.activeMaster)
		                	.then(function (values) {
			                    var allData = values.data;
			                    
			                    angular.forEach(allData.slaves, function (value, key) {
			                        if (value.hostname == hostname) {
			                            //slave(1)@10.0.5.202:5051
			                            var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
			                            var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
			                            var stateUrl = "http://" + host + "/" + prefix + "/state.json";
			                            // console.log("stateUrl -> " + stateUrl);
			                            //$scope.detailsForTask = true;
			                            //$scope.taskLoading = true;
			                           
			                            FrameworksFactory.get(VERSION, stateUrl)	
				                           	.then(function (frameworkValues) {
				                                angular.forEach(frameworkValues.data.frameworks, function (framework, keyFrameworks) {
				                                    angular.forEach(framework.executors, function (executor, keyExecutor) {
				                                        executors = executors + "Name: " + executor.name + "<br>" +
				                                            "CPU: " + executor.resources.cpus.toFixed(2) + "<br>" +
				                                            "Mem: " + (executor.resources.mem / 1024).toFixed(2) + "<br>" +
				                                            "DISK: " + (executor.resources.disk / 1024).toFixed(2) + "<br><br>";
				                                    });
				                                });
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
		    function showMetricFrameworksRunning (hostname) {
		        var frameworks = '';

		        if ($scope.activeMaster !== null) {
		            try {
		                $scope.loading = true;
		                $scope.setUpdatedMesosSlave(false);

		                ActiveMasterStateFactory.get(VERSION, $scope.activeMaster)
		                	.then(function (values) {
			                    var allData = values.data;
			                    angular.forEach(allData.slaves, function (value, key) {
			                        if (value.hostname == hostname) {
			                            //slave(1)@10.0.5.202:5051
			                            var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
			                            var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
			                            var stateUrl = "http://" + host + "/" + prefix + "/state.json";
			                            // console.log("stateUrl -> " + stateUrl);
			                            //$scope.detailsForTask = true;
			                            //$scope.taskLoading = true;
			                            
			                            FrameworksFactory.get(VERSION, stateUrl)
				                            .then(function (frameworkValues) {
				                                angular.forEach(frameworkValues.data.frameworks, function (framework, keyFrameworks) {
				                                    frameworks = frameworks + "Name: " + framework.name + "<br>";
				                                });
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

		    function toggleRight() {
			    $mdSidenav('right').toggle();
			};

		    $interval(function () {
		        $scope.callAtInterval();
		    }, 10000);

		    // $scope.executorsStat.push({name: exec.name, cpu: exec.resources.cpus.toFixed(2), mem: (exec.resources.mem / 1024), disk: (exec.resources.disk / 1024)});
		}
}());