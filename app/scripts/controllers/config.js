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
        ['$scope', 'appSettings', '$translate', function($scope, appSettings, $translate) {
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
          var ddData = [
                    {
                      text: 'Deutsch',
                      value: 'de_DE',
                      description: 'Deutsche Sprache',
                      imageSrc: 'http://dl.dropbox.com/u/40036711/Images/facebook-icon-32.png'
                    },
                    {
                      text: 'english',
                      value: 'en_US',
                      description: 'English language',
                      imageSrc: 'http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png'
                    }
                ];
          $('#config-main .jgl-language-picker').ddslick({
            data: ddData,
            selectText: 'Select your language',
            defaultSelectedIndex: ddData.findIndex(function(element, index, array) {
              return element.value === $translate.use();
            }),
            onSelected: function(ddslickData) {
              $translate.use(ddslickData.selectedData.value);
            }
          });
        }]);
