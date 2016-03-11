'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
  .controller('MainCtrl', ['$scope', 'graphFactory','cfpLoadingBar','$timeout', function($scope, graphFactory, cfpLoadingBar, $timeout) {
    cfpLoadingBar.start();
    $timeout(function() {
      cfpLoadingBar.complete();
    }, 5000);
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
