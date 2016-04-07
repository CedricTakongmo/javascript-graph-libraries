/*globals $, angular, Math, jsPlumb*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:jsplumbSourcesTargetsFactory
 * @requires window
 * @requires angular
 * @requires jsplumb
 * @requires Math
 * @param {object} Factory.Factory:graphFactory graphFactory
 * @param {object} cfpLoadingBar cfpLoadingBar
 * @param {object} $timeout $timeout
 * @returns {object} jsplumbSourcesTargetsFactory
 * @description
 * # JsPlumb Sources - Targets Factory
 * An example of using elements as drag sources and targets.
 */
angular.module('javascriptGraphLibrariesApp').factory('jsplumbSourcesTargetsFactory', ['graphFactory', 'cfpLoadingBar', '$timeout', function(graphFactory, cfpLoadingBar, $timeout) {

      function initializate() {

        return graphFactory.getGraphs();
      }

      function draw(data) {
        cfpLoadingBar.start();
        $timeout(function() {
          cfpLoadingBar.complete();
        }, 5000);
        $('#jsplumb-sources-targets').height(800);
        var $parent = $('.jsplumb-sources-targets #canvas-sources-targets').empty(),
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
                  Container: '.jsplumb-sources-targets canvas-sources-targets'
                });

          // suspend drawing and initialise.
          instance.batch(function() {

            var endpoints = {},
                    divsWithWindowClass = jsPlumb.getSelector('.jsplumb-sources-targets .dynamic-demo .window');
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
      return {
        initializate: initializate,
        draw: draw
      };
    }]);
