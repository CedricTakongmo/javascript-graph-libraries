'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:raphaeldraculaCtrl
 * @description
 * # raphaeldraculaCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('raphaeldraculaCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {
          initializate();

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

        }]);
