/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptlanguageLibrariesApp.factory:languageFactory
 * @description
 * # languageFactory
 * Factory of the javascriptlanguageLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('languageFactory', ['$http', 'appSettings', function($http, appSettings) {

          var dataFactory = {};

          function getBaseUrl() {
            return appSettings.language.url;
          }

          dataFactory.getlanguages = function() {
            return $http.get(getBaseUrl());
          };

          dataFactory.getlanguage = function(id) {
            return $http.get(getBaseUrl() + '/' + id);
          };

          dataFactory.insertlanguage = function(cust) {
            return $http.post(getBaseUrl(), cust);
          };

          dataFactory.updatelanguage = function(cust) {
            return $http.put(getBaseUrl() + '/' + cust.ID, cust);
          };

          dataFactory.deletelanguage = function(id) {
            return $http.delete(getBaseUrl() + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(getBaseUrl() + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
