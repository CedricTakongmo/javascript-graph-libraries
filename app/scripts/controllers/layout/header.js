'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:headerCtrl
 * @description
 * # headerCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('headerCtrl', ['$scope', '$location', function HeaderController($scope, $location) {
          $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
          };
        }]);
