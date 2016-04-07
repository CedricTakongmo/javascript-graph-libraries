/*globals window, angular, d3*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:d3NetworkFactory
 * @requires window
 * @requires angular
 * @requires d3
 * @param {type} Factory.Factory:d3CangttChartFactory graphFactory
 * @param {type} cfpLoadingBar cfpLoadingBar
 * @param {type} $timeout $timeout
 * @returns {network_L20.networkAnonym$14} network_L20.networkAnonym$14
 * @description
 * # d3NetworkFactory - Factory
 * This simple force-directed graph. A physical simulation of charged particles
 * and springs places related elements in closer proximity, while unrelated elements
 *  are farther apart. Layout algorithm inspired by Tim Dwyer and Thomas Jakobsen.
 */
angular.module('javascriptGraphLibrariesApp').factory('d3NetworkFactory', ['graphFactory', 'cfpLoadingBar', '$timeout',
    function(graphFactory, cfpLoadingBar, $timeout) {
      var hasViewChanged = false;

      function initializate() {
        return graphFactory.getGraphs();
      }

      function draw(graph) {
        cfpLoadingBar.start();
        $timeout(function() {
          cfpLoadingBar.complete();
        }, 5000);
        var w = (window.innerWidth > 1000) ? 1000 : window.innerWidth - 50,
                h = (window.innerHeight > 600) ? 600 : window.innerHeight - 50,
                linkDistance = 200,
                colors = d3.scale.category10(),
                dataset = parseGraph(graph),
                    svg = d3.select('#d3-network').append('svg').attr({
                      width: w,
                      height: h
                    }),
                            force = d3.layout.force()
                            .nodes(dataset.nodes)
                            .links(dataset.edges)
                            .size([w, h])
                            .linkDistance([linkDistance])
                            .charge([-500])
                            .theta(0.1)
                            .gravity(0.05)
                            .start(),
                            edges = svg.selectAll('line')
                            .data(dataset.edges)
                            .enter()
                            .append('line')
                    .attr('id', function(d, i) {
                      return 'edge' + i;
                    })
                    .attr('marker-end', 'url(#arrowhead)')
                    .style('stroke', '#ccc')
                    .style('pointer-events', 'none'),
                    nodes = svg.selectAll('circle')
                    .data(dataset.nodes)
                    .enter()
                    .append('circle')
                    .attr({
                      r: 5
                    })
                    .style('fill', function(d, i) {
                      return colors(i);
                    })
                    .call(force.drag),
                    nodelabels = svg.selectAll('.nodelabel')
                    .data(dataset.nodes)
                    .enter()
                    .append('text')
                    .attr({
                      x: function(d) {
                        return d.x;
                      },
                      y: function(d) {
                        return d.y;
                      },
                      class: 'nodelabel',
                      stroke: 'black'
                    })
                    .text(function(d) {
                      return d.name;
                    }),
                    edgepaths = svg.selectAll('.edgepath')
                    .data(dataset.edges)
                    .enter()
                    .append('path')
                    .attr({
                      d: function(d) {
                        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                      },
                      class: 'edgepath',
                      'fill-opacity': 0,
                      'stroke-opacity': 0,
                      fill: 'blue',
                      stroke: 'red',
                      id: function(d, i) {
                        return 'edgepath' + i;
                      }
                    })
                    .style('pointer-events', 'none'),
                    edgelabels = svg.selectAll('.edgelabel')
                    .data(dataset.edges)
                    .enter()
                    .append('text')
                    .style('pointer-events', 'none')
                    .attr({
                      class: 'edgelabel',
                      id: function(d, i) {
                        return 'edgelabel' + i;
                      },
                      dx: 80,
                      dy: 0,
                      'font-size': 10,
                      fill: '#aaa'
                    });

        edgelabels.append('textPath')
                    .attr('xlink:href', function(d, i) {
                      return '#edgepath' + i;
                    })
                    .style('pointer-events', 'none')
                    .text(function(d) {
                      return d.source.name + '/' + d.target.name;
                    });

        svg.append('defs').append('marker')
                    .attr({
                      id: 'arrowhead',
                      viewBox: '-0 -5 10 10',
                      refX: 25,
                      refY: 0,
                      //'markerUnits':'strokeWidth',
                      orient: 'auto',
                      markerWidth: 10,
                      markerHeight: 10,
                      xoverflow: 'visible'
                    })
                    .append('svg:path')
                    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
                    .attr('fill', '#ccc')
                    .attr('stroke', '#ccc');

        force.on('tick', function() {

          edges.attr({
            x1: function(d) {
              return d.source.x;
            },
            y1: function(d) {
              return d.source.y;
            },
            x2: function(d) {
              return d.target.x;
            },
            y2: function(d) {
              return d.target.y;
            }
          });

          nodes.attr({
            cx: function(d) {
              return d.x;
            },
            cy: function(d) {
              return d.y;
            }
          });

          nodelabels.attr('x', function(d) {
            return d.x;
          })
                        .attr('y', function(d) {
                          return d.y;
                        });

          edgepaths.attr('d', function(d) {
            var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            return path;
          });

          edgelabels.attr('transform', function(d) {
            if ((d.target.x < d.source.x) && !hasViewChanged) {
              var bbox = this.getBBox(),
                      rx = bbox.x + bbox.width / 2,
                      ry = bbox.y + bbox.height / 2;
              return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
              return 'rotate(0)';
            }
          });
        });
      }

      function parseGraph(graph) {
        var graphClone = angular.copy(graph);
        graphClone.graph.edges = graph.graph.edges.map(function(element) {
          return {
            source: arrayObjectIndexOf(graph.graph.nodes, element.source, 'id'),
            target: arrayObjectIndexOf(graph.graph.nodes, element.target, 'id')
          };
        });
        graphClone.graph.nodes = graph.graph.nodes.map(function(element) {
          return {
            name: element.id
          };
        });

        return graphClone.graph;
      }

      function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i][property] === searchTerm) {
            return i;
          }
        }
        return -1;
      }
      function setHasViewChanged(value) {
        hasViewChanged = value;
      }
      return {
        initializate: initializate,
        draw: draw,
        setHasViewChanged: setHasViewChanged
      };
    }]);
