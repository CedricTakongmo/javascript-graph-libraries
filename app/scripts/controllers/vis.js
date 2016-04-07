/*globals document, alert, angular, vis*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.controller:VisCtrl
 * @requires document
 * @requires alert
 * @requires angular
 * @requires vis
 * @param {type} $scope $scope
 * @param {type} Factory.Factory:graphFactory graphFactory
 * @param {type} cfpLoadingBar cfpLoadingBar
 * @param {type} $timeout $timeout
 * @returns {undefined} void
 * @description
 * # vis - Controller
 * vis.js
 * A dynamic, browser based visualization library. The library is designed to
 * be easy to use, to handle large amounts of dynamic data, and to enable
 * manipulation of and interaction with the data. The library consists of the
 * components DataSet, Timeline, Network, Graph2d and Graph3d.
 */
angular.module('javascriptGraphLibrariesApp')
    .controller('visCtrl',  ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {
      function initializate() {

        graphFactory.getGraphs()
            .success(draw)
                .error(function(error) {
                  $scope.status = 'Unable to load customer data: ' + error.message;
                });
      }
      var nodes, edges, network;

      // convenience method to stringify a JSON object
      $scope.toJSON = function(obj) {
        return JSON.stringify(obj, null, 4);
      };

      $scope.addNode = function() {
        try {
          nodes.add({
            id: document.getElementById('node-id').value,
            label: document.getElementById('node-label').value
          });
        } catch (err) {
          alert(err);
        }
      };

      $scope.updateNode = function() {
        try {
          nodes.update({
            id: document.getElementById('node-id').value,
            label: document.getElementById('node-label').value
          });
        } catch (err) {
          alert(err);
        }
      };
      $scope.removeNode = function() {
        try {
          nodes.remove({
            id: document.getElementById('node-id').value
          });
        } catch (err) {
          alert(err);
        }
      };

      $scope.addEdge = function() {
        try {
          edges.add({
            id: document.getElementById('edge-id').value,
            from: document.getElementById('edge-from').value,
            to: document.getElementById('edge-to').value,
            arrows: 'to'
          });
        } catch (err) {
          alert(err);
        }
      };
      $scope.updateEdge = function() {
        try {
          edges.update({
            id: document.getElementById('edge-id').value,
            from: document.getElementById('edge-from').value,
            to: document.getElementById('edge-to').value,
            arrows: 'to'
          });
        } catch (err) {
          alert(err);
        }
      };
      $scope.removeEdge = function() {
        try {
          edges.remove({
            id: document.getElementById('edge-id').value
          });
        } catch (err) {
          alert(err);
        }
      };

      function draw(datain) {
        cfpLoadingBar.start();
        $timeout(function() {
          cfpLoadingBar.complete();
        }, 5000);
        var graph = parseGraph(datain),
            container = document.getElementById('network');
        // create an array with nodes
        nodes = new vis.DataSet();
        nodes.on('*', function() {
          document.getElementById('nodes').innerHTML = JSON.stringify(nodes.get(), null, 4);
        });
        nodes.add(graph.nodes);

        // create an array with edges
        edges = new vis.DataSet();
        edges.on('*', function() {
          document.getElementById('edges').innerHTML = JSON.stringify(edges.get(), null, 4);
        });
        edges.add(graph.edges);

        // create a network
        network = new vis.Network(container, {
          nodes: nodes,
          edges: edges
        }, {});

      }

      function parseGraph(graph) {
        var graphClone = angular.copy(graph);
        graphClone.graph.edges = graph.graph.edges.map(function(element, index) {
          return {
            id: index + '',
            from: element.source,
            to: element.target,
            arrows: 'to'
          };
        });
        graphClone.graph.nodes = graph.graph.nodes.map(function(element) {
          return {
            id: element.id,
            label: element.label
          };
        });

        return graphClone.graph;
      }
      initializate();
    }]);
