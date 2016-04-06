/*globals angular, Graph*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:raphaeldraculaCtrl
 * @requires $scope
 * @requires Factory.Factory:graphFactory
 * @requires cfpLoadingBar
 * @requires $timeout
 * @description
 * # raphaeldracula - Controller
 * Dracula.js is a set of tools to display and layout interactive connected
 * graphs and networks, along with various related algorithms from the field of graph theory.
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('raphaeldraculaCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {

          function initializate() {

            graphFactory.getGraphs()
                    .success(draw)
                            .error(function(error) {
                              $scope.status = 'Unable to load customer data: ' + error.message;
                            });
          }

          function draw(datain) {
            cfpLoadingBar.start();
            $timeout(function() {
              cfpLoadingBar.complete();
            }, 5000);
            var g = new Graph(),
                    parentId = 'raphaeldracula-main',
                    parentWidth = 1100,
                    parentHeight = 800,
                    layouter = new Graph.Layout.Spring(g),
                    renderer = new Graph.Renderer.Raphael(parentId, g, parentWidth, parentHeight);

            datain.graph.nodes.forEach(function(node) {
              g.addNode(node.id, {
                label: node.label
              });
            });
            datain.graph.edges.forEach(function(edge) {
              g.addEdge(edge.source, edge.target, {
                directed: true,
                stroke: '#bfa',
                fill: '#56f',
                label: ''
              });
            });

            layouter.layout();

            renderer.draw();
          }
          initializate();

        }]);
