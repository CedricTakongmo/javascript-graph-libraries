/*globals $, angular, joint*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:jointJSCtrl
 * @description
 * # jointJSCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
    .controller('jointjsCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {

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
        var graph = new joint.dia.Graph(),
                currentNodes = {};
        new joint.dia.Paper({
                  el: $('#jointjs-main'),
                  width: 1100,
                  height: 800,
                  gridSize: 1,
                  model: graph
                });
        datain.graph.nodes.forEach(function(node) {
          var cell = new joint.shapes.fsa.State({
            position: {
              x: Math.random() * 1100,
              y:  Math.random() * 800
            },
            size: {
              width: 40,
              height: 40
            },
            attrs: {
              text: {
                text: node.id,
                fill: '#000000',
                'font-weight': 'normal'
              },
              circle: {
                fill: '#f6f6f6',
                stroke: '#000000',
                'stroke-width': 2
              }
            }
          });
          graph.addCell(cell);
          currentNodes[node.id] = cell;

        });
        datain.graph.edges.forEach(function(edge) {
          var cell = new joint.shapes.fsa.Arrow({
            source: {
              id: currentNodes[edge.source]
            },
            target: {
              id: currentNodes[edge.target]
            },
            labels: [{
              position: 0.5,
              attrs: {
                text: {
                  text: '',
                  'font-weight': 'bold'
                }
              }
            }],
            vertices:   []
          });
          graph.addCell(cell);
          return cell;
        });
      }
      initializate();
    }]);
