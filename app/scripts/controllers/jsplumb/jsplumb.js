/*globals window, angular, jsplumb*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:jsplumbCtrl
 * @requires window
 * @requires angular
 * @requires jsplumb
 * @param {object} jsplumbSourcesTargetsFactory jsplumb Sources Targets Factory.
 * @param {object} jsplumbFlowChartFactory jsplumb FlowChart Factory.
 * @param {object} jsplumbStateMachineFactory jsplumb State Machine Factory.
 * @param {object} jsplumbDragAndDropFactory jsplumb Drag and Drop Factory.
 * @description
 * # JsPlumb Controller
 * jsPlumb provides a means for a developer to visually connect elements on their web pages.
 * It uses SVG and runs on all browsers from IE9 and later.
 * The final version of jsPlumb to support IE8 was 1.7.10. You can still get
 * 1.7.10 from a tag, if you need it.
 * If you're new to jsPlumb, please do take the time to read the documentation.
 * There are a few integration issues that you should be aware of: z-index needs
 * special attention, for example.
 * This project is the 'Community Edition' of jsPlumb. The 'Toolkit Edition'
 * is a commercially licenses wrapper around this.
 * This project is not the correct place to report issues for the Toolkit edition.
 * The Toolkit is not a public project.
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('jsplumbCtrl', ['$scope', 'jsplumbSourcesTargetsFactory', 'jsplumbFlowChartFactory','jsplumbStateMachineFactory','jsplumbDragAndDropFactory', function($scope, jsplumbSourcesTargetsFactory, jsplumbFlowChartFactory, jsplumbStateMachineFactory, jsplumbDragAndDropFactory) {
          jsplumbSourcesTargetsFactory.initializate().success(jsplumbSourcesTargetsFactory.draw).error(function(error) {
            alert(error);
          });
          jsplumbFlowChartFactory.draw();
          jsplumbStateMachineFactory.draw();
          jsplumbDragAndDropFactory.draw();
        }]);
