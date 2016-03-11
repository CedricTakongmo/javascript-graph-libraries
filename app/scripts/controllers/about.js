/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
  .controller('AboutCtrl', ['$scope', 'graphFactory', function() {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
