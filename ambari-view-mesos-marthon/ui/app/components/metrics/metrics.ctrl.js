(function() {
  'use strict';

  angular
    .module('MesosMarathonApp')
    .controller('MetricsCtrl', MetricsCtrl);

  MetricsCtrl.$inject = [
    '$scope',
    '$q',
    '$interval',
    '$timeout',
    '$mdSidenav',
    'visualisationConfigs',
    'ClusterName',
    'Components',
    'Metrics',
    'ActiveMasterState',
    'Frameworks'
  ];

  function MetricsCtrl($scope, $q, $interval, $timeout, $mdSidenav, visualisationConfigs, ClusterName, Components, Metrics, ActiveMasterState, Frameworks) {
    var VERSION = "0.1.0";
    var DEBUG = false;

    // PROBLEM MetricsCtrl is parent $scope for vis-network directive. So $scope.infoPanel === true/false not work correct, because of different scopes.
    // SOLUTION: $interval solves it ^, but don't know how.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // try use $scope.$digest(); or $watch;
    var intervalPromise =  $interval(function() {
    }, 1*1000);

    var promise;
    $scope.$on('$locationChangeStart', function() {
      $timeout.cancel(promise);
      $interval.cancel(intervalPromise);
    });

    $scope.infoPanel = false;

    $scope.clusterName = null;
    $scope.activeMaster = null;

    $scope.mastersList = [];
    $scope.allHostsList = [];

    // Additional Info in HostInfoPanel
    $scope.executorsRunning = null;
    $scope.frameworksActive = null;

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
    // pieCharts metrics for activeMaster
    $scope.activeMaster = {
      cpu: [{}],
      mem: [{}],
      disk: [{}]
    };
    // Temp activeMaster Storage - fixing bug when pieChart showed small: https://github.com/krispo/angular-nvd3/issues/85
    var activeMasterDataTemp = {
      cpu: null,
      mem: null,
      disk: null
    };
    // pieCharts metrics for Hosts
    $scope.hostData = {
      general: [],
      cpu: [{}],
      mem: [{}],
      disk: [{}]
    };
    // pieCharts configs
    $scope.optionsActiveMasterCpu = visualisationConfigs().pieChartOptionsActiveMasterCpu;
    $scope.optionsActiveMasterMem = visualisationConfigs().pieChartOptionsActiveMasterMem;
    $scope.optionsActiveMasterDisk = visualisationConfigs().pieChartOptionsActiveMasterDisk;
    $scope.optionsHostCpu = visualisationConfigs().pieChartOptionsHostCpu;
    $scope.optionsHostMem = visualisationConfigs().pieChartOptionsHostMem;
    $scope.optionsHostDisk = visualisationConfigs().pieChartOptionsHostDisk;

    runApp();

    ///////////////////////

    $scope.parseFloat = parseFloat;

    // On Network event
    $scope.events.click = onNetworkClick;
    $scope.events.hoverNode = showServiceNodes;

    // On InfoPanel click
    $scope.showExecutorsRunning = showExecutorsRunning;
    $scope.showFrameworksActive = showFrameworksActive;

    // Show right Toolbar
    $scope.showRightToolbar = showRightToolbar;

    //////////////////////

    function runApp() {
      ClusterName.get()
        .then(function(response) {
          $scope.clusterName = response.data.items[0].Clusters.cluster_name;
        })
        .then(function() {
          return Components.getMasters($scope.clusterName);
        })
        .then(function(mastersData) {
          var masterItems = mastersData.data.host_components;
          var promises = [];
          $scope.mastersList = [];
          for (var i = 0; i < masterItems.length; i++) {
            promises.push(getMetricsForActiveMasterInfoSidebar(masterItems[i].HostRoles.host_name));
          }
          return $q.all(promises);
        })
        .then(function() {
          return Components.getSlaves($scope.clusterName);
        })
        .then(function(slavesData) {
          var hostItems = slavesData.data.host_components;
          var promises = [];
          $scope.allHostsList = [];
          for (var k = 0; k < hostItems.length; k++) {
            promises.push(getMetricsForHostsInfoPanel(hostItems[k].HostRoles.host_name));
          }
          return $q.all(promises);
        })
        .then(function() {
          drawNetwork($scope.allHostsList);
        })
        // Refresh data every 10 seconds. WARNING! Causes Network rerender
        // .then(function() {
        //   promise = $timeout(runApp, 10 * 1000);
        // })
        .catch(function(err) {
          console.log(err);
        });
    }


    function getMetricsForActiveMasterInfoSidebar(masterHost) {
      $scope.mastersList.push(masterHost);
      return Metrics.getForMaster(VERSION, masterHost)
        .then(function(response) {
          var items = response.data;

          if(items["master/elected"] === 1.0) {
            $scope.activeMaster = masterHost;

            activeMasterDataTemp.cpu = [{
              name: "Used",
              size: items["master/cpus_used"]
            }, {
              name: "Free",
              size: items["master/cpus_total"] - items["master/cpus_used"]
            }];

            activeMasterDataTemp.mem = [{
              name: "Used",
              size: (items["master/mem_used"] / 1024).toFixed(2)
            }, {
              name: "Free",
              size: ((items["master/mem_total"] - items["master/mem_used"]) / 1024).toFixed(2)
            }];

            activeMasterDataTemp.disk = [{
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

    function getMetricsForHostsInfoPanel(host) {
      return Metrics.getForHost(VERSION, host)
        .then(function(response) {
          var items = response.data;

          var hostData = {};

          hostData.id = host;
          hostData.general = items;

          hostData.cpu = [{
            name: 'Used',
            size: items['slave/cpus_used']
          }, {
            name: 'Free',
            size: items['slave/cpus_total'] - items['slave/cpus_used']
          }];

          hostData.mem = [{
            name: 'Used',
            size: (items['slave/mem_used'] / 1024).toFixed(2)
          }, {
            name: 'Free',
            size: ((items['slave/mem_total'] - items['slave/mem_used']) / 1024).toFixed(2)
          }];

          hostData.disk = [{
            name: 'Used',
            size: (items['slave/disk_used'] / 1024).toFixed(2)
          }, {
            name: 'Free',
            size: ((items['slave/disk_total'] - items['slave/disk_used']) / 1024).toFixed(2)
          }];

          $scope.allHostsList.push(hostData);
        });
    }


    function drawNetwork(hostItems) {
      var tmpNodeArr = [];
      var tmpEdgeArr = [];

      var nodesIdCounter = 1;
      var edgeIdCounter = 1;

      var notUsedMasterHost = 0;

      for (var i = 0; i < hostItems.length; i++) {
        var itemHostName = hostItems[i].id;

        if (itemHostName === $scope.activeMaster) {
          // Active Master
          var activeMasterNode = visualisationConfigs().networkNodeMaster;
          activeMasterNode.id = 1;
          activeMasterNode.label = $scope.activeMaster;
          tmpNodeArr.push(activeMasterNode);

        } else if (itemHostName !== $scope.activeMaster && itemHostName.indexOf("master") > -1) {
          // Not Active Master
          var notActiveMasterNode = visualisationConfigs().networkNodeMaster;
          notActiveMasterNode.id = ++nodesIdCounter;
          notActiveMasterNode.label = itemHostName;
          tmpNodeArr.push(notActiveMasterNode);

          notUsedMasterHost = nodesIdCounter;
        } else {
          // Slaves
          var hostNode = visualisationConfigs().networkNodeSlave;
          hostNode.id = ++nodesIdCounter;
          hostNode.label = itemHostName;
          tmpNodeArr.push(hostNode);

          var hostEdge = visualisationConfigs().networkEdgeSlave;
          hostEdge.id = edgeIdCounter++;
          hostEdge.to = nodesIdCounter;
          tmpEdgeArr.push(hostEdge);
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

      switch (nodeId) {
        case 10000:
          generateChart('cpu');
          break;
        case 10001:
          generateChart('mem');
          break;
        case 10002:
          generateChart('disk');
          break;
        case 10003:
          generateAllChart();
          break;
        default:
          angular.forEach($scope.network_data.nodes, function(node) {
            if(node.id !== 10000 && node.id !== 10001 && node.id !== 10002 && node.id !== 10003) {
              if (node.title !== undefined) {
                $scope.network_data.nodes.update([{
                  id: node.id,
                  shape: 'circle',
                  label: node.title,
                  title: undefined
                }]);
              }
            }
          });
          showHostInfoPanel(data);
      }
    }


    function showHostInfoPanel(data) {
      if ($scope.infoPanel === false) {
        $scope.infoPanel = true;
      }
      if (data.nodes[0] === undefined) {
        $scope.infoPanel = false;
      }

      angular.forEach($scope.nodes, function(value, key) {
        if (data.nodes[0] === value.id) {
          for (var i = 0; i < $scope.allHostsList.length; i++){
            if($scope.allHostsList[i].id === value.label) {
              $scope.hostData.id = $scope.allHostsList[i].id;
              $scope.hostData.general = $scope.allHostsList[i].general;
              $scope.hostData.cpu = $scope.allHostsList[i].cpu;
              $scope.hostData.mem = $scope.allHostsList[i].mem;
              $scope.hostData.disk = $scope.allHostsList[i].disk;
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
      ActiveMasterState.get(VERSION, $scope.activeMaster)
        .then(function(response) {
          var allData = response.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostName) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = 'http://' + host + '/' + prefix + '/state.json';

              Frameworks.get(VERSION, stateUrl)
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
      ActiveMasterState.get(VERSION, $scope.activeMaster)
        .then(function(resource) {
          var allData = resource.data;

          angular.forEach(allData.slaves, function(value, key) {
            if (value.hostname === hostName) {
              var prefix = value.pid.replace(new RegExp("(.*)@(.*)"), "$1");
              var host = value.pid.replace(new RegExp("(.*)@(.*)"), "$2");
              var stateUrl = "http://" + host + "/" + prefix + "/state.json";

              Frameworks.get(VERSION, stateUrl)
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

    function showRightToolbar() {
      $mdSidenav('right').toggle();

      // Reasigning need because of bug: https://github.com/krispo/angular-nvd3/issues/85
      $timeout(function () {
        $scope.activeMaster.cpu = activeMasterDataTemp.cpu;
        $scope.activeMaster.mem = activeMasterDataTemp.mem;
        $scope.activeMaster.disk = activeMasterDataTemp.disk;
      }, 500);
    }


    function generateChart(metric) {
      angular.forEach($scope.nodes, function(value) {
        if (value.label === $scope.activeMaster || value.group === 2) {
          var hostName = value.label;

          var canvas = document.getElementById("canPrep");
          var ctx = canvas.getContext("2d");
          var lastend = 0;

          var data = [];
          var dataTotal = 100;

          var color = [];

          var used = null;
          var free = null;
          var total = null;

          var i = null;
          var length = null;

          switch (metric) {
            case 'cpu':
              color = ["#A98CEF", "#512DA8"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].cpu[0].size);
                  free = parseFloat($scope.allHostsList[i].cpu[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            case 'mem':
              color = ["#9C27B0", "#E691F5"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].mem[0].size);
                  free = parseFloat($scope.allHostsList[i].mem[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            case 'disk':
              color = ["#A8ECF5", "#00BCD4"];
              for (i = 0, length = $scope.allHostsList.length; i < length; i++) {
                if(value.label === $scope.allHostsList[i].id) {
                  used = parseFloat($scope.allHostsList[i].disk[0].size);
                  free = parseFloat($scope.allHostsList[i].disk[1].size);
                  total = used + free;
                  data = [(free / total) * 100, 100 - (free / total) * 100];
                }
              }
              break;
            default:
              console.log('unknown "metric" parametr');
          }

          for (i = 0; i < data.length; i++) {
            ctx.fillStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / dataTotal)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (data[i] / dataTotal);
          }

          var dataUrl = canvas.toDataURL();
          var nodeId = value.id;

          $scope.network_data.nodes.update([{
            id: nodeId,
            shape: 'circularImage',
            label: '',
            title: hostName,
            image: dataUrl
          }]);
        }
      });
    }

    function generateAllChart() {
      document.getElementById('chartNodeUsage').innerHTML = '';
      var k = 0;
      angular.forEach($scope.nodes, function(value) {
        if (value.label === $scope.activeMaster || value.group === 2) {
          // Creating scope for each circle
          drawCircleChart(k, value);
          k++;
        }
      });
    }

    function drawCircleChart(k, value) {
      var hostName = value.label;

      var graphSettings = {
        series: [{
          value: null,
          color: {
            solid: '#512DA8',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }, {
          value: null,
          color: {
            solid: '#9C27B0',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }, {
          value: null,
          color: {
            solid: '#00BCD4',
            background: 'rgba(128, 128, 128, 0.81)'
          },
        }],
        shadow: {
          width: 0
        },
        animation: {
          duration: 1,
          delay: 1
        },
        diameter: 135
      };

      for (var i = 0, length = $scope.allHostsList.length; i < length; i++) {
        if(value.label === $scope.allHostsList[i].id) {
          graphSettings.series[0].value = parseFloat($scope.allHostsList[i].cpu[0].size) / (parseFloat($scope.allHostsList[i].cpu[0].size) + parseFloat($scope.allHostsList[i].cpu[1].size)) * 100;
          graphSettings.series[1].value = parseFloat($scope.allHostsList[i].mem[0].size) / (parseFloat($scope.allHostsList[i].mem[0].size) + parseFloat($scope.allHostsList[i].mem[1].size)) * 100;
          graphSettings.series[2].value = parseFloat($scope.allHostsList[i].disk[0].size) / (parseFloat($scope.allHostsList[i].disk[0].size) + parseFloat($scope.allHostsList[i].disk[1].size)) * 100;
        }
      }

      var cont = document.createElement('div');
      cont.setAttribute("id", "child" + k);
      document.getElementById('chartNodeUsage').appendChild(cont);

      new RadialProgressChart("#child" + k, graphSettings);

      $timeout(function () {
        document.getElementById('canPrep').width = 400;
        document.getElementById('canPrep').height = 400;
        var nodeId = value.id;
        var svgString = new XMLSerializer().serializeToString(document.getElementById('child' + k).querySelector('svg'));
        var canvas = document.getElementById("canPrep");
        var ctx = canvas.getContext("2d");
        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8"
        });
        var url = DOMURL.createObjectURL(svg);

        img.onload = function() {
          ctx.fillStyle = '#B3CCDD';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          var dataUrl = canvas.toDataURL();
          $scope.network_data.nodes.update([{
            id: nodeId,
            shape: 'circularImage',
            label: '',
            title: hostName,
            image: dataUrl
          }]);
          DOMURL.revokeObjectURL(dataUrl);
        };

        img.src = url;
      }, 100);
    }
  }
}());
