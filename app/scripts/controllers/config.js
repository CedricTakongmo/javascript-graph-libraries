/*globals angular, $*/
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
        ['$scope', 'appSettings', '$translate', 'performanceFactory', 'languageFactory', function($scope, appSettings, $translate, performanceFactory, languageFactory) {
          $scope.onLanguageChanged = function(ddslickData) {
                $translate.use(ddslickData.selectedData.value).then(function(key) {
				  console.log('Sprache zu ' + key + ' gewechselt.');
				}, function() {
				  console.log('Irgendwas lief schief.');
				});
          };
          $scope.perfSetDataSource = function(opt) {
            $scope.perfSetting = appSettings.performance = opt;
          };
          $scope.perfIsActive = function(opt) {
            return opt.name === $scope.perfSetting.name;
          };
          $scope.perfSetting = appSettings.performance;
          performanceFactory.getperformances().then(function(response) {
            $scope.perfSetOptions = response.data;
          });
          languageFactory.getlanguages().then(function(response) {
            $('#config-main .jgl-language-picker').ddslick({
              data: response.data,
              selectText: 'Select your language',
              defaultSelectedIndex: response.data.findIndex(function(element) {
                return element.value === $translate.use();
              }),
              onSelected:function(ddslickData) {
                $scope.onLanguageChanged(ddslickData);
              }
            });
          });

        }]);
