'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:headerCtrl
 * @requires $scope
 * @requires $location
 * @param {object} $scope $scope
 * @param {object} $location $location
 * @returns {undefined} void
 * @description
 * # Header - Controller
 * Controller for the navigation interactions.
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('headerCtrl', ['$scope', '$location', function HeaderController($scope, $location) {
          $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
          };
          $scope.originPathname = window.location.origin + window.location.pathname;
        }]);
