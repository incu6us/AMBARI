(function () {
	'use strict';
	
	angular
		.module('MesosMetricsApp')
		.controller('FrameworksCtrl', FrameworksCtrl);

		FrameworksCtrl.$inject = [
			'$scope', 
			'$timeout', 
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

		function FrameworksCtrl ($scope, $timeout, $mdDialog, $uibModal, VisDataSet, ClusterNameFactory, MesosMasterFactory, MesosSlaveFactory, MetricsForMasterFactory, MetricsForSlaveFactory, ActiveMasterStateFactory, ActiveMasterSlavesFactory, FrameworksFactory, DirsFactory, DatasFactory, $http, $mdSidenav) {
			var VERSION = "0.1.0";

			$scope.$on('$locationChangeStart', function(){
				console.log('canceled');
			    $timeout.cancel(promise);
			});

			var promise;

			$scope.detailsForTask = false;
		    $scope.detailsForExecutors = false;
		    $scope.detailsForSandbox = false;

			$scope.activeMaster = '';

			/////////////////////

			$scope.getActiveMaster = getActiveMaster;

			$scope.getFrameworks = getFrameworks;
		    $scope.getFrameworkTasks = getFrameworkTasks;

		    $scope.getMesosMastersForFrameworks = getMesosMastersForFrameworks;

		    $scope.getSlaves = getSlaves;

		    $scope.getExecutor = getExecutor;

		    $scope.getSandbox = getSandbox;
		    $scope.getSandboxByPath = getSandboxByPath;

		    $scope.setDetailsForTask = setDetailsForTask;
		    $scope.setDetailsForExecutors = setDetailsForExecutors;
		    $scope.setDetailsForSandbox = setDetailsForSandbox;

			/*
		     * Frameworks draw
		     */

		    function getMesosMastersForFrameworks () {
		    	promise = $timeout(getMesosMastersForFrameworks, 10*1000);

		        ClusterNameFactory.get()
		        	.then(function (masterData) {
			            $scope.clusterName = masterData.data.items[0].Clusters.cluster_name;

						MesosMasterFactory.get($scope.clusterName)
							.then(function (mesosMasterData) {

				                var masterItems = mesosMasterData.data.host_components;
				                $scope.masterList = [];

				                for (var i = 0; i < masterItems.length; i++) {
				                    $scope.masterList.push(masterItems[i].HostRoles.host_name);
				                    // Call draw function for masters
				                    $scope.getActiveMaster($scope.clusterName, masterItems[i].HostRoles.host_name);
				                }

				                
				            });
				    });
			}

			function getActiveMaster (clusterName, masterHost) {
				// http://nikke1.github.io/1snapshot.json
				// /api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot
				// !!! Tried to use MetricsForMasterFactory.get(VERSION, masterHost).then(...) but it fails.
				$http.get('/api/v1/views/MESOS/versions/' + VERSION + '/instances/mesos/resources/proxy/json?url=http://' + masterHost + ':5050/metrics/snapshot', {cache: true})
				    .success(function (data) {
				        //items = JSON.parse(data);
				        var items = data;

				        if (items["master/elected"] == 1.0) {
				            $scope.activeMaster = masterHost;

				            $scope.getFrameworks();
				        }
				    });
			}

		    function getFrameworks () {

		        if ($scope.activeMaster != null) {

		            $scope.loading = true;
		            $scope.getSlaves();

		            ActiveMasterStateFactory.get(VERSION, $scope.activeMaster)
		            	.then(function (values) {
		            		
			                for (var frameworksInt = 0; frameworksInt < values.data.frameworks.length; frameworksInt++) {
			                    $scope.frameworks = values.data.frameworks;
			                    $scope.completedFrameworks = values.data.completed_frameworks;
			                }

			                $scope.loading = false;
			            });
			    }
		    }

		    function getFrameworkTasks (frameworkId) {

		        $scope.detailsForExecutors = true;
		        $scope.executorsInFrameworks = [];

		        angular.forEach($scope.frameworks, function (val, key) {
		            if (val.id == frameworkId) {
		                //console.log(JSON.stringify(val))
		                angular.forEach(val.tasks, function (valTasks, keyTasks) {
		                    $scope.executorsInFrameworks.push(valTasks);
		                });

		            }
		        });
		    }

		    // Get details from master about slaves
		    function getSlaves () {
		        if ($scope.frameworkTasksSlaves === undefined) {
		            
		        	ActiveMasterSlavesFactory.get(VERSION, $scope.activeMaster)
			            .then(function (vals) {
			                $scope.frameworkTasksSlaves = vals.data;
			            });
		        }
		    }

		    // Draw Executor info (tasks)
		    function getExecutor (slave_id, framework_id, executor_id) {
		        $scope.tasks = [];

		        angular.forEach($scope.frameworkTasksSlaves.slaves, function (value, key) {
		            if (value.id == slave_id) {
		                //slave(1)@10.0.5.202:5051
		                var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
		                var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
		                var stateUrl = "http://" + host + "/" + prefix + "/state.json";

		                $scope.detailsForTask = true;
		                $scope.taskLoading = true;
		                
						FrameworksFactory.get(VERSION, stateUrl)
			                .then(function (values) {
			                    angular.forEach(values.data.frameworks, function (v, k) {
			                        if (v.id == framework_id) {

			                            angular.forEach(v.executors, function (v1, k2) {
			                                angular.forEach(v1.tasks, function (v2, k2) {
			                                    if (v2.executor_id == executor_id) {

			                                        $scope.tasks.push(v2);
			                                    }
			                                });
			                            });
			                        }
			                    });
			                    $scope.taskLoading = false;
			                });
		            }
		        });

		    }

		    // Go to the Sandbox
		    function getSandbox (slave_id, framework_id, executor_id) {
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
		                    FrameworksFactory.get(VERSION, stateUrl)
			                    .then(function (values) {
			                        angular.forEach(values.data.frameworks, function (v, k) {
			                            if (v.id === framework_id) {

			                                angular.forEach(v.executors, function (v1, k2) {

			                                    if (v1.id == executor_id) {
			                                        var port = '5051';
			                                        //if (v.hostname.indexOf("master") > -1) {
			                                        //    port = '5050';
			                                        //}

			                                        $scope.executorUrl = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/json?url=http://" + value.hostname + ":" + port + "/files/browse.json?path=";
			                                        $scope.executorUrlForDownloadFile = "/api/v1/views/MESOS/versions/" + VERSION + "/instances/mesos/resources/proxy/object?url=http://" + value.hostname + ":" + port + "/files/download.json?path=";
			                                        $scope.executorDir = v1.directory;
			                                        $scope.executorLastDir = $scope.executorDir;
			                                        try {
			                                        	DirsFactory.get($scope.executorUrl + $scope.executorDir)
															.then(function (val) {

				                                                if (val.data.array !== undefined) {
				                                                    $scope.directories = val.data.array;
				                                                }
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
			                        });
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
		    function getSandboxByPath (filemode, path) {
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
		                DatasFactory.get($scope.executorUrl + $scope.executorLastDir)
		                	.then(function (val) {
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

		                    });
		            } catch (err) {
		                $scope.loading = false;
		            }
		        }
		    }

		    function setDetailsForTask (val) {
		        $scope.detailsForTask = val;
		    }

		    function setDetailsForExecutors (val) {
		        $scope.detailsForExecutors = val;
		    }

		    function setDetailsForSandbox (val) {
		        $scope.detailsForSandbox = val;
		    }

		}
})();