(function() {
  'use strict';

  angular
    .module('MesosMetricsApp')
    .constant('visualisationConfigs', function() {
      // recursive function to clone an object. If a non object parameter
      // is passed in, that parameter is returned and no recursion occurs.
      function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
          temp[key] = clone(obj[key]);
        }

        return temp;
      }

      // pieCharts configs to clone
      var pieChartOptionsNoColorMaster = {
        chart: {
          type: 'pieChart',
          height: 150,
          donut: true,
          x: function(d) {
            return d.name;
          },
          y: function(d) {
            return d.size;
          },
          showLabels: false,
          transitionDuration: 500
        }
      };
      var pieChartOptionsNoColorSlave = {
        chart: {
          type: 'pieChart',
          height: 150,
          x: function(d) {
            return d.name;
          },
          y: function(d) {
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

      // Network configs to clone
      var networkNodeConfig = {
        id: 0,
        label: '',
        borderWidth: 0,
        borderWidthSelected: 0,
        shadow: true,
        font: {
          size: 11
        },
        shape: "circle"
      };
      var networkEdgeConfig = {
        length: 150,
        shadow: true,
        color: "#b3b3ff",
        id: 0,
        from: 1,
        to: 0
      };

      // Network Main config
      var options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        interaction: {
          navigationButtons: true,
          keyboard: true,
          hover: true
        }
      };

      // D3 Main config
      var d3Config = {
        extended: true,
        autorefresh: true,
        debounce: 10
      };

      // Clone object without reference(!)
      var pieChartOptionsMasterCpu = clone(pieChartOptionsNoColorMaster);
      // Add color
      pieChartOptionsMasterCpu.chart.color = ["#512DA8", "#A98CEF"];

      var pieChartOptionsMasterMem = clone(pieChartOptionsNoColorMaster);
      pieChartOptionsMasterMem.chart.color = ["#9C27B0", "#E691F5"];

      var pieChartOptionsMasterDisk = clone(pieChartOptionsNoColorMaster);
      pieChartOptionsMasterDisk.chart.color = ["#00BCD4", "#A8ECF5"];

      var pieChartOptionsSlaveCpu = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsSlaveCpu.chart.color = ["#512DA8", "#A98CEF"];

      var pieChartOptionsSlaveMem = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsSlaveMem.chart.color = ["#9C27B0", "#E691F5"];

      var pieChartOptionsSlaveDisk = clone(pieChartOptionsNoColorSlave);
      pieChartOptionsSlaveDisk.chart.color = ["#00BCD4", "#A8ECF5"];


      var networkNodeMaster = clone(networkNodeConfig);
      networkNodeMaster.color = "#87b6de";
      networkNodeMaster.font = {size: 9};

      var networkNodeSlave = clone(networkNodeConfig);
      networkNodeSlave.color = "#b3b3ff";
      networkNodeSlave.group = 2;

      var networkEdgeSlave = clone(networkEdgeConfig);

      var networkNodesService = [{
        id: 10000,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "CPU",
        shape: "dot",
        shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#512DA8"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10001,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "Memory",
        shape: "dot",
        shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#9C27B0"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10002,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "Disk",
        shape: "dot",
        shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#00BCD4"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }, {
        id: 10003,
        borderWidth: 0,
        borderWidthSelected: 0,
        label: "All",
        shape: "dot",
        shadow: true,
        color: {
          background: "#5cb85c",
          hover: "#304FFE"
        },
        group: 5,
        size: 10,
        font: {
          size: 11
        },
        hidden: true
      }];
      var networkEdgesService = [{
          id: 10000,
          from: 10000,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10001,
          from: 10001,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10002,
          from: 10002,
          to: 1,
          length: 1,
          hidden: true
        }, {
          id: 10003,
          from: 10003,
          to: 1,
          length: 1,
          hidden: true
        }];

      return {
        options: options,
        d3Config: d3Config,

        pieChartOptionsMasterCpu: pieChartOptionsMasterCpu,
        pieChartOptionsMasterMem: pieChartOptionsMasterMem,
        pieChartOptionsMasterDisk: pieChartOptionsMasterDisk,
        pieChartOptionsSlaveCpu: pieChartOptionsSlaveCpu,
        pieChartOptionsSlaveMem: pieChartOptionsSlaveMem,
        pieChartOptionsSlaveDisk: pieChartOptionsSlaveDisk,

        networkNodeMaster: networkNodeMaster,

        networkNodeSlave: networkNodeSlave,
        networkEdgeSlave: networkEdgeSlave,

        networkNodesService: networkNodesService,
        networkEdgesService: networkEdgesService
      };

    });
}());
