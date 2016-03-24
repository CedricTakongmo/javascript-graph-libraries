/*globals window, angular, d3*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:d3Ctrl
 * @description
 * # d3Ctrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('d3Ctrl', ['$scope', 'd3Network', function ($scope, d3Network) {
                d3Network.initializate().success(d3Network.draw).error(function (error) {
                    alert(error);
                });
                $scope.$on('$routeChangeStart', function () {
                    d3Network.setHasViewChanged(true);
                });
            }]);
