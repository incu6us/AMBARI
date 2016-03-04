(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .controller('MetricsCtrl', MetricsCtrl);

  MetricsCtrl.$inject = [
    'visualisationConfigs',
    '$scope',
    '$q',
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
    'FrameworksFactory',
    '$http',
    '$mdSidenav'
  ];

  function MetricsCtrl(visualisationConfigs, $scope, $q, $timeout, $mdDialog, $uibModal, VisDataSet, ClusterNameFactory, MesosMasterFactory, MesosSlaveFactory, MetricsForMasterFactory, MetricsForSlaveFactory, ActiveMasterStateFactory, FrameworksFactory, $http, $mdSidenav) {
    //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!
    // 1. MetricsCtrl is parent $scope for vis-network directive. So $scope.infoPanel === true/false not work correct. Why it became 'false' when hover on 'close' Executors running? I dont know.
    // 2. $scope.allSlaves created, BUT $scope problem ^ appeard
    // 3. rename drawPieChartForSlave to getMasters
    // 4. Finish drawing on nodes (merging with kubernetis)
    $scope.allMasters = [];
    $scope.allSlaves = [];

    var VERSION = "0.1.0";
    var DEBUG = false;

    $scope.$on('$locationChangeStart', function() {
      console.log('canceled');
      $timeout.cancel(promise);
    });
    var promise;

    $scope.infoPanel = false;

    $scope.clusterName = '';
    $scope.activeMaster = '';

    $scope.executorsRunning = null;

    // Network data to draw
    $scope.nodes = [];
    $scope.edges = [];
    $scope.network_data = {
      nodes: $scope.nodes,
      edges: $scope.edges
    };
    // Network events
    $scope.events = {};
    // Network main config
    $scope.options = visualisationConfigs().options;

    // D3 Main config
    $scope.d3Config = visualisationConfigs().d3Config;
    // pieCharts metrics for Master
    $scope.masterDataCpu = [];
    $scope.masterDataCpuAbsolute = [];
    $scope.masterDataMem = [];
    $scope.masterDataMemAbsolute = [];
    $scope.masterDataDisk = [];
    $scope.masterDataDiskAbsolute = [];
    // pieCharts metrics for Slave
    $scope.slaveData = [];
    $scope.slaveDataCpu = [];
    $scope.slaveDataMem = [];
    $scope.slaveDataDisk = [];
    // pieCharts configs
    $scope.optionsMasterCpu = visualisationConfigs().pieChartOptionsMasterCpu;
    $scope.optionsMasterMem = visualisationConfigs().pieChartOptionsMasterMem;
    $scope.optionsMasterDisk = visualisationConfigs().pieChartOptionsMasterDisk;
    $scope.optionsSlaveCpu = visualisationConfigs().pieChartOptionsSlaveCpu;
    $scope.optionsSlaveMem = visualisationConfigs().pieChartOptionsSlaveMem;
    $scope.optionsSlaveDisk = visualisationConfigs().pieChartOptionsSlaveDisk;

    ClusterNameFactory.get()
      .then(function(response) {
        $scope.clusterName = response.data.items[0].Clusters.cluster_name;
      })
      .then(function() {
        return MesosMasterFactory.get($scope.clusterName);
      })
      .then(function(mesosMasterData) {
        var masterItems = mesosMasterData.data.host_components;
        var promises = [];

        for (var i = 0; i < masterItems.length; i++) {
          promises.push(drawPieChartForMaster(masterItems[i].HostRoles.host_name));
        }

        return $q.all(promises);
      })
      .then(function() {
        return MesosSlaveFactory.get($scope.clusterName);
      })
      .then(function(mesosSlaveData) {
        var slaveItems = mesosSlaveData.data.host_components;
        var promises = [];

        for (var k = 0; k < slaveItems.length; k++) {
          promises.push(drawPieChartForSlave(slaveItems[k].HostRoles.host_name));
        }

        return $q.all(promises);
      })
      .then(function() {
        drawNetwork($scope.allSlaves);
      })
      .catch(function(err) {
        console.log(err);
      });

    ///////////////////////

    $scope.frameworksActive = [{
      name: 'mesos'
    }];
    $scope.executorsRunning = [{
      name: 'lol'
    }];

    // On Network event
    $scope.events.click = onNetworkClick;
    $scope.events.hoverNode = showServiceNodes;

    // On InfoPanel click
    $scope.showExecutorsRunning = showExecutorsRunning;
    $scope.showFrameworksActive = showFrameworksActive;

    // Toggle right Toolbar
    $scope.toggleRightToolbar = toggleRightToolbar;

    //////////////////////

    function drawPieChartForMaster(masterHost) {
      return MetricsForMasterFactory.get(VERSION, masterHost)
        .then(function(response) {
          var items = response.data;

          // if(items["master/elected"] === 1.0) {
          if (masterHost.indexOf('02') > -1) {
            $scope.activeMaster = masterHost;

            // Get CPU
            var usedCpu = (items["master/cpus_percent"] * 100).toFixed(1);
            var freeCpu = 100 - usedCpu;

            $scope.masterDataCpu = [{
              name: "Used(" + usedCpu + "%)",
              size: usedCpu
            }, {
              name: "Free(" + freeCpu + "%)",
              size: freeCpu
            }];
            $scope.masterDataCpuAbsolute = [{
              name: "Total",
              size: items["master/cpus_total"]
            }, {
              name: "Used",
              size: items["master/cpus_used"]
            }, {
              name: "Free",
              size: items["master/cpus_total"] - items["master/cpus_used"]
            }];

            // Get Memory
            var usedMem = (items["master/mem_percent"] * 100).toFixed(1);
            var freeMem = 100 - usedMem;

            $scope.masterDataMem = [{
              "name": "Used(" + usedMem + "%)",
              "size": usedMem,
            }, {
              "name": "Free(" + (freeMem) + "%)",
              "size": freeMem,
            }];
            $scope.masterDataMemAbsolute = [{
              name: "Total",
              size: (items["master/mem_total"] / 1024).toFixed(2)
            }, {
              name: "Used",
              size: (items["master/mem_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["master/mem_total"] - items["master/mem_used"]) / 1024).toFixed(2)
            }];

            // Get Disk
            var usedDisk = (items["master/disk_percent"] * 100).toFixed(1);
            var freeDisk = 100 - usedDisk;

            $scope.masterDataDisk = [{
              "name": "Used(" + usedDisk + "%)",
              "size": usedDisk,
            }, {
              "name": "Free(" + freeDisk + "%)",
              "size": freeDisk,
            }];
            $scope.masterDataDiskAbsolute = [{
              name: "Total",
              size: (items["master/disk_total"] / 1024).toFixed(2)
            }, {
              name: "Used",
              size: (items["master/disk_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["master/disk_total"] - items["master/disk_used"]) / 1024).toFixed(2)
            }];
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function drawPieChartForSlave(slaveHost) {
      return MetricsForSlaveFactory.get(VERSION, slaveHost)
        .then(function(response) {
          var items = response.data;

          var slaveData = items;
          var slaveDataId = slaveHost;

          var slaveDataCpu = [{
              name: "Used",
              size: items["slave/cpus_used"]
            }, {
              name: "Free",
              size: items["slave/cpus_total"] - items["slave/cpus_used"]
            }
          ];

          var slaveDataMem = [{
              name: "Used",
              size: (items["slave/mem_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["slave/mem_total"] - items["slave/mem_used"]) / 1024).toFixed(2)
            }
          ];

          var slaveDataDisk = [{
              name: "Used",
              size: (items["slave/disk_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["slave/disk_total"] - items["slave/disk_used"]) / 1024).toFixed(2)
            }
          ];

          var slaveSumData = {
            id: slaveDataId,
            slaveData: slaveData,
            slaveDataCpu: slaveDataCpu,
            slaveDataMem: slaveDataMem,
            slaveDataDisk: slaveDataDisk
          };

          $scope.allSlaves.push(slaveSumData);
        });
    }


    function drawNetwork(slaveItems) {
      var tmpNodeArr = [];
      var tmpEdgeArr = [];

      var nodesIdCounter = 1;
      var edgeIdCounter = 1;

      var notUsedMasterHost = 0;

      for (var i = 0; i < slaveItems.length; i++) {
        var itemHostName = slaveItems[i].id;

        if (itemHostName === $scope.activeMaster) {
          var activeMasterNode = visualisationConfigs().networkNodeMaster;
          activeMasterNode.id = 1;
          activeMasterNode.label = $scope.activeMaster;
          tmpNodeArr.push(activeMasterNode);

        } else if (itemHostName !== $scope.activeMaster && itemHostName.indexOf("master") > -1) {
          var notActiveMasterNode = visualisationConfigs().networkNodeMaster;
          notActiveMasterNode.id = ++nodesIdCounter;
          notActiveMasterNode.label = itemHostName;
          tmpNodeArr.push(notActiveMasterNode);

          notUsedMasterHost = nodesIdCounter;
        } else {
          var slaveNode = visualisationConfigs().networkNodeSlave;
          slaveNode.id = ++nodesIdCounter;
          slaveNode.label = itemHostName;
          tmpNodeArr.push(slaveNode);
        }

        if (notUsedMasterHost !== nodesIdCounter) {
          var slaveEdge = visualisationConfigs().networkEdgeSlave;
          slaveEdge.id = edgeIdCounter++;
          slaveEdge.to = nodesIdCounter;
          tmpEdgeArr.push(slaveEdge);
        }
      }

      var networkNodesService = visualisationConfigs().networkNodesService;
      var networkEdgesService = visualisationConfigs().networkEdgesService;

      for (var j = 0; j < networkNodesService.length; j++){
        tmpNodeArr.push(networkNodesService[j]);
      }
      for (var k = 0; k < networkEdgesService.length; k++){
        tmpEdgeArr.push(networkEdgesService[k]);
      }

      if ($scope.nodes.length !== tmpNodeArr.length || $scope.edges.length !== tmpEdgeArr.length) {
        $scope.nodes = tmpNodeArr;
        $scope.edges = tmpEdgeArr;

        $scope.network_data = {
          nodes: new vis.DataSet($scope.nodes),
          edges: new vis.DataSet($scope.edges)
        };
      }
    }


    function onNetworkClick(data) {
      var nodeId = data.nodes[0];

      if (nodeId === 10000) {
        generateCpuChart();
      } else if (nodeId === 10001 || nodeId === 10002 || nodeId === 10003) {
        console.log('raw');
      } else {
        showInfoPanel(data);
      }
    }


    function showInfoPanel(data) {
      if ($scope.infoPanel === false) {
        $scope.infoPanel = true;
      }
      if (data.nodes[0] === undefined) {
        $scope.infoPanel = false;
      }

      angular.forEach($scope.nodes, function(value, key) {
        if (data.nodes[0] === value.id) {
          // drawPieChartForSlave(value.label);
          for (var i = 0; i < $scope.allSlaves.length; i++){

            if($scope.allSlaves[i].id === value.label) {
              $scope.slaveData = $scope.allSlaves[i].slaveData;
              $scope.slaveDataCpu = $scope.allSlaves[i].slaveDataCpu;
              console.log($scope.allSlaves[i].slaveDataCpu)
              $scope.slaveDataMem = $scope.allSlaves[i].slaveDataMem;
              $scope.slaveDataDisk = $scope.allSlaves[i].slaveDataDisk;
            }
          }
        }
      });
    }

    function showServiceNodes(data) {
      var nodeId = data.node;
      if (nodeId === 1) {
        $scope.network_data.nodes.update([{
          id: 10000,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10001,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10002,
          hidden: false
        }]);
        $scope.network_data.nodes.update([{
          id: 10003,
          hidden: false
        }]);
      } else if (nodeId != 10000 && nodeId != 10001 && nodeId != 10002 && nodeId != 10003 && nodeId != 10004) {
        $scope.network_data.nodes.update([{
          id: 10000,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10001,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10002,
          hidden: true
        }]);
        $scope.network_data.nodes.update([{
          id: 10003,
          hidden: true
        }]);
      }
    }

    function showExecutorsRunning(hostName) {
      ActiveMasterStateFactory.get(VERSION, $scope.activeMaster)
        .then(function(response) {
          var allData = response.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostName) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = 'http://' + host + '/' + prefix + '/state.json';

              FrameworksFactory.get(VERSION, stateUrl)
                .then(function(frameworkValues) {
                  $scope.executorsRunning = [];

                  angular.forEach(frameworkValues.data.frameworks, function(framework, keyFrameworks) {
                    angular.forEach(framework.executors, function(executor, keyExecutor) {
                      var executorTemp = {
                        name: executor.name,
                        cpu: executor.resources.cpus.toFixed(2),
                        mem: (executor.resources.mem / 1024).toFixed(2),
                        disk: (executor.resources.disk / 1024).toFixed(2)
                      };
                      $scope.executorsRunning.push(executorTemp);
                    });
                  });
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function showFrameworksActive(hostName) {
      ActiveMasterStateFactory.get(VERSION, $scope.activeMaster)
        .then(function(resource) {
          var allData = resource.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostname) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = "http://" + host + "/" + prefix + "/state.json";

              FrameworksFactory.get(VERSION, stateUrl)
                .then(function(frameworkValues) {
                  $scope.frameworksActive = [];

                  angular.forEach(frameworkValues.data.frameworks, function(framework, keyFrameworks) {
                    var frameworkTemp = {
                      name: framework.name
                    };
                    $scope.frameworksActive.push(frameworkTemp);
                  });
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function toggleRightToolbar() {
      $mdSidenav('right').toggle();
    }


    function generateCpuChart() {
      // angular.forEach($scope.nodes, function(value) {
      //   if (value.label === $scope.activeMaster || value.group === 2) {
      //     var hostName = value.label;
      //
      //     var canvas = document.getElementById("canPrep");
      //     var ctx = canvas.getContext("2d");
      //     var lastend = 0;
      //     var colorCPU = ["#512DA8", "#A98CEF"];
      //
      //     var data = [];
      //     var dataTotal = 100;
      //
      //     if (value.label === $scope.activeMaster){
      //       data = [$scope.masterDataCpuAbsolute[0].size / 100 * $scope.masterDataCpuAbsolute[1].size, 100 - ($scope.masterDataCpuAbsolute[0].size / 100 * $scope.masterDataCpuAbsolute[1].size)];
      //     } else {
      //       drawPieChartForSlave(hostName);
      //       $timeout(function() {
      //         data = [$scope.slaveDataCpu[0].size / 100 * ($scope.slaveDataCpu[0].size + $scope.slaveDataCpu[1].size), 100 - ($scope.slaveDataCpu[0].size / 100 * ($scope.slaveDataCpu[0].size + $scope.slaveDataCpu[1].size))];
      //       }, 2*1000);
      //     }
      //     console.log(data);
      //
      //     for (var i = 0; i < data.length; i++) {
      //       ctx.fillStyle = colorCPU[i];
      //       ctx.beginPath();
      //       ctx.moveTo(canvas.width / 2, canvas.height / 2);
      //       ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / dataTotal)), false);
      //       ctx.lineTo(canvas.width / 2, canvas.height / 2);
      //       ctx.fill();
      //       lastend += Math.PI * 2 * (data[i] / dataTotal);
      //     }
      //
      //     var dataUrl = canvas.toDataURL();
      //     var nodeId = value.id;
      //
      //     $scope.network_data.nodes.update([{
      //       id: nodeId,
      //       shape: 'circularImage',
      //       label: '',
      //       title: hostName,
      //       image: dataUrl
      //     }]);
      //
      //   }
      // });
    }
  }
}());
