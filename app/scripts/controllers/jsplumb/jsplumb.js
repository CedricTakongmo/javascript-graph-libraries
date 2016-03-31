/*globals window, angular, jsplumb*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:jsplumbCtrl
 * @description
 * # jsplumbCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('jsplumbCtrl', ['$scope', 'jsplumbSourcesTargets', 'jsplumbFlowChart','jsplumbStateMachine','jsplumbDragAndDrop', function($scope, jsplumbSourcesTargets, jsplumbFlowChart, jsplumbStateMachine, jsplumbDragAndDrop) {
          jsplumbSourcesTargets.initializate().success(jsplumbSourcesTargets.draw).error(function(error) {
            alert(error);
          });
          jsplumbFlowChart.draw();
          jsplumbStateMachine.draw();
          jsplumbDragAndDrop.draw();
        }]);
