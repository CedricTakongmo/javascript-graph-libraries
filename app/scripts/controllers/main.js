/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
  .controller('MainCtrl', ['cfpLoadingBar','$timeout', function(cfpLoadingBar, $timeout) {
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
