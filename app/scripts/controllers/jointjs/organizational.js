/*globals $, angular, joint*/
'use strict';
/**
 * @ngdoc function
 * @name Factory.Factory:jointjsOrganizationalFactory
 * @requires window
 * @requires $
 * @requires angular
 * @requires joint
 * @param {object} cfpLoadingBar cfpLoadingBar
 * @param {object} $timeout $timeout
 * @returns {object} jointjsOrganizationalFactory
 * @description
 * # jointjsOrganizationalFactory
 * Factory for generating JointJS Organizational Chart
 */
angular.module('javascriptGraphLibrariesApp').factory('jointjsOrganizationalFactory', ['cfpLoadingBar', '$timeout',
    function(cfpLoadingBar, $timeout) {
      function initializate() {
        }

      function draw() {
        cfpLoadingBar.start();
        $timeout(function() {
          cfpLoadingBar.complete();
        }, 5000);
        var graph = new joint.dia.Graph();
        var paper = new joint.dia.Paper({
          el: $('#jointjs-organizational'),
          width: 1100,
          height: 800,
          gridSize: 1,
          model: graph,
          perpendicularLinks: true,
          restrictTranslate: true
        });
        var member = function(x, y, rank, name, image, background, textColor) {
          textColor = textColor || '#000';
          var cell = new joint.shapes.org.Member({
            position: {
              x: x,
              y: y
            },
            attrs: {
              '.card': {
                fill: background,
                stroke: 'none'
              },
              image: {
                'xlink:href': window.location.origin + window.location.pathname + 'images/' + image,
                opacity: 0.7
              },
              '.rank': {
                text: rank,
                fill: textColor,
                'word-spacing': '-5px',
                'letter-spacing': 0
              },
              '.name': {
                text: name,
                fill: textColor,
                'font-size': 13,
                'font-family': 'Arial',
                'letter-spacing': 0
              }
            }
          });
          graph.addCell(cell);
          return cell;
        };

        function link(source, target, breakpoints) {
          var cell = new joint.shapes.org.Arrow({
            source: {
              id: source.id
            },
            target: {
              id: target.id
            },
            vertices: breakpoints,
            attrs: {
              '.connection': {
                fill: 'none',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                stroke: '#4b4a67'
              }
            }
          });
          graph.addCell(cell);
          return cell;
        }
        var bart = member(300, 70, 'CEO', 'Bart Simpson', 'male.png', '#30d0c6');
        var homer = member(90, 200, 'VP Marketing', 'Homer Simpson', 'male.png', '#7c68fd', '#f1f1f1');
        var marge = member(300, 200, 'VP Sales', 'Marge Simpson', 'female.png', '#7c68fd', '#f1f1f1');
        var lisa = member(500, 200, 'VP Production', 'Lisa Simpson', 'female.png', '#7c68fd', '#f1f1f1');
        var maggie = member(400, 350, 'Manager', 'Maggie Simpson', 'female.png', '#feb563');
        var lenny = member(190, 350, 'Manager', 'Lenny Leonard', 'male.png', '#feb563');
        var carl = member(190, 500, 'Manager', 'Carl Carlson', 'male.png', '#feb563');
        link(bart, marge, [{
          x: 385,
          y: 180
        }]);
        link(bart, homer, [{
          x: 385,
          y: 180
        }, {
          x: 175,
          y: 180
        }]);
        link(bart, lisa, [{
          x: 385,
          y: 180
        }, {
          x: 585,
          y: 180
        }]);
        link(homer, lenny, [{
          x: 175,
          y: 380
        }]);
        link(homer, carl, [{
          x: 175,
          y: 530
        }]);
        link(marge, maggie, [{
          x: 385,
          y: 380
        }]);
      }
      return {
        initializate: initializate,
        draw: draw
      };
    }
]);
