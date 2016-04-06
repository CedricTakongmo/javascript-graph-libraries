'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:headerCtrl
 * @requires $scope
 * @requires $location
 * @description
 * # Header - Controller
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('headerCtrl', ['$scope', '$location', function HeaderController($scope, $location) {
          $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
          };
        }]);
