'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:cytoscapeCtrl
 * @description
 * # cytoscapeCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('cytoscapeCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {

          initializate();
          function initializate() {

            graphFactory.getGraphs()
                    .success(draw)
                            .error(function(error) {
                              $scope.status = 'Unable to load customer data: ' + error.message;
                            });
          }
          function draw(graph) {
            cfpLoadingBar.start();
            $timeout(function() {
              cfpLoadingBar.complete();
            }, 5000);
            var graphClone = parseGraph(graph),
                     cy = window.cy = cytoscape({
                       container: document.getElementById('cytoscape-main'),
                       boxSelectionEnabled: false,
                       autounselectify: true,
                       layout: {
                         name: 'dagre'
                       },
                       style: [
                            {
                              selector: 'node',
                              style: {
                                content: 'data(id)',
                                'text-opacity': 0.5,
                                'text-valign': 'center',
                                'text-halign': 'right',
                                'background-color': '#11479e'
                              }
                            },
                            {
                              selector: 'edge',
                              style: {
                                width: 4,
                                'target-arrow-shape': 'triangle',
                                'line-color': '#9dbaea',
                                'target-arrow-color': '#9dbaea'
                              }
                            }
                        ],
                       elements: graphClone.graph
                     });

          }
          function parseGraph(graph) {
            var graphClone = angular.copy(graph);
            graphClone.graph.edges = graph.graph.edges.map(function(element) {
              return {
                data: {
                  source: element.source,
                  target: element.target
                }
              }
            });
            graphClone.graph.nodes = graph.graph.nodes.map(function(element) {
              return {
                data: {
                  id: element.id
                }
              }
            });
            return graphClone;
          }

        }]);