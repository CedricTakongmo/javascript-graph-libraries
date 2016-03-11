/*globals $, angular, jsPlumb*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:jsplumbCtrl
 * @description
 * # jsplumbCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
    .controller('jsplumbCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {

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
        var $parent = $('.jsplumb-main #canvas').empty(),
         connections = {};
        data.graph.nodes.forEach(function(node) {
          var left = Math.random() * 77,
           top = Math.random() * 54,
           html = '<div style=" left: ' + left + 'em; top: ' + top + 'em;"' +
              'class="window" ' +
              'id="' + node.id + '"' +
              '<strong>' + node.id + '</strong>' +
              '</div>';
          connections[node.id] = [node.id];
          $parent.append(html);
        });
        jsPlumb.ready(function() {

          var sourceAnchors = [
                  [0.2, 0, 0, -1, 0, 0, 'foo'],
                  [1, 0.2, 1, 0, 0, 0, 'bar'],
                  [0.8, 1, 0, 1, 0, 0, 'baz'],
                  [0, 0.8, -1, 0, 0, 0, 'qux']
              ],
              exampleColor = '#00f',
                    connector = ['Bezier', {
                      cssClass: 'connectorClass',
                      hoverClass: 'connectorHoverClass'
                    }],
                    connectorStyle = {
                      gradient: {
                        stops: [
                            [0, exampleColor],
                            [0.5, '#09098e'],
                            [1, exampleColor]
                        ]
                      },
                      lineWidth: 5,
                      strokeStyle: exampleColor
                    },
                    hoverStyle = {
                      strokeStyle: '#449999'
                    },
                    overlays = [
                        ['Diamond', {
                          fillStyle: '#09098e',
                          width: 15,
                          length: 15
                        }]
                    ],
                    endpoint = ['Dot', {
                      cssClass: 'endpointClass',
                      radius: 10,
                      hoverClass: 'endpointHoverClass'
                    }],
                    endpointStyle = {
                      fillStyle: exampleColor
                    },
                    anEndpoint = {
                      endpoint: endpoint,
                      paintStyle: endpointStyle,
                      hoverPaintStyle: {
                        fillStyle: '#449999'
                      },
                      isSource: true,
                      isTarget: true,
                      maxConnections: -1,
                      connector: connector,
                      connectorStyle: connectorStyle,
                      connectorHoverStyle: hoverStyle,
                      connectorOverlays: overlays
                    },

           instance = jsPlumb.getInstance({
            DragOptions: {
              cursor: 'pointer',
              zIndex: 2000
            },
            Container: '.jsplumb-main canvas'
          });

          // suspend drawing and initialise.
          instance.batch(function() {

            var endpoints = {},
                divsWithWindowClass = jsPlumb.getSelector('.jsplumb-main .dynamic-demo .window');

            data.graph.nodes.forEach(function(node) {
              endpoints[node.id] = [
                            instance.addEndpoint(node.id, anEndpoint, {
                              anchor: sourceAnchors
                            })

                        ];
            });
            data.graph.edges.forEach(function(edge) {
              instance.connect({
                source: endpoints[edge.source][0],
                target: endpoints[edge.target][0]
              });
            });

            instance.bind('click', function(conn) {
              instance.detach(conn);
            });

            instance.draggable(divsWithWindowClass);

            jsPlumb.fire('jsPlumbDemoLoaded', instance);
          });
        });

      }
      initializate();
    }]);
