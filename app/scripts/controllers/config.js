/*globals angular*/
'use strict';
/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module(
        'javascriptGraphLibrariesApp').controller(
        'ConfigCtrl',
        ['$scope', 'appSettings', function($scope, appSettings) {
          $scope.perfSetOptions = [{
            name: 'Low',
            url: '../data/low.json'
          }, {
            name: 'Middle',
            url: '../data/middle.json'
          }, {
            name: 'High',
            url: '../data/high.json'
          }];
          $scope.perfSetDataSource = function(opt) {
            $scope.perfSetting = appSettings.performance = opt;
          };
          $scope.perfIsActive = function(opt) {
            return opt.name === $scope.perfSetting.name;
          };
          $scope.perfSetting = appSettings.performance;
        }]);
