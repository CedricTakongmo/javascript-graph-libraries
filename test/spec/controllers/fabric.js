/*globals window, angular, fabric*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:fabricCtrl
 * @description
 * # fabricCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('fabricCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {

          function initializate() {

            graphFactory.getGraphs()
                    .success(draw)
                            .error(function(error) {
                              $scope.status = 'Unable to load customer data: ' + error.message;
                            });
          }

          function draw(data) {
            cfpLoadingBar.start();
            $timeout(function() {
              cfpLoadingBar.complete();
            }, 5000);
            var canvas = window.__canvas = new fabric.Canvas('fabric-main', {
              selection: false
            }), nodeEdge = {};

            fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

            function makeCircle(left, top, nodes) {
              var c = new fabric.Circle({
                left: left,
                top: top,
                strokeWidth: 5,
                radius: 12,
                fill: '#fff',
                stroke: '#666'
              });
              c.hasControls = c.hasBorders = false;
              nodes.forEach(function(elem, index) {
                var ind = index + 1;
                c['line' + ind] = elem;
              });
              return c;
            }

            function makeLine(coords) {
              return new fabric.Line(coords, {
                fill: 'red',
                stroke: 'red',
                strokeWidth: 5,
                selectable: false
              });
            }

            canvas.setHeight(800);
            canvas.setWidth(1100);

            data.graph.nodes.forEach(function(elem) {
              nodeEdge[elem.id] = [];
            });
            data.graph.edges.forEach(function(elem) {
              var cell = makeLine([Math.random() * 1100, Math.random() * 800, Math.random() * 1100, Math.random() * 800]);
              if (nodeEdge[elem.source].indexOf(elem.source) === -1) {
                nodeEdge[elem.source].push(cell);
              }
              if (nodeEdge[elem.target].indexOf(elem.target) === -1) {
                nodeEdge[elem.target].push(cell);
              }
              canvas.add(cell);
            });
            data.graph.nodes.forEach(function(elem) {
              console.log(nodeEdge[elem.id]);
              canvas.add(makeCircle(nodeEdge[elem.id].get('x1'), nodeEdge[elem.id].get('y1'), nodeEdge[elem.id]));
            });

            canvas.on('object:moving', function(e) {
              var p = e.target;
              if (p.line1) {p.line1.set({
                x2: p.left,
                y2: p.top
              });
              }
              if (p.line2) {p.line2.set({
                x1: p.left,
                y1: p.top
              });
              }
              if (p.line3) {p.line3.set({
                x1: p.left,
                y1: p.top
              });
              }
              if (p.line4) {p.line4.set({
                x1: p.left,
                y1: p.top
              });}
              canvas.renderAll();
            });
          }
          initializate();
        }]);
