/*globals window, document, $, angular, cytoscape*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:cytoscapeCtrl
 * @requires window
 * @requires document
 * @requires $
 * @requires angular
 * @requires cytoscape
 * @param {type} $scope $scope
 * @param {type} Factory.Factory:graphFactory graphFactory
 * @param {type} cfpLoadingBar cfpLoadingBar
 * @param {type} $timeout $timeout
 * @returns {undefined} void
 * @description
 * # Cytoscape - Controller
 * Graph theory (a.k.a. network) library for analysis and visualisation.
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('cytoscapeCtrl', ['$scope', 'graphFactory', 'cfpLoadingBar', '$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {
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
            var graphClone = parseGraph(graph);
            window.cy = cytoscape({
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
              };
            });
            graphClone.graph.nodes = graph.graph.nodes.map(function(element) {
              return {
                data: {
                  id: element.id
                }
              };
            });
            return graphClone;
          }
          $('#cytoscape-main').height(800);
          initializate();
        }]);
