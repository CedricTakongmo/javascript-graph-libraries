/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:languageFactory
 * @requires $http
 * @requires appSettings
 * @description
 * # Language Factory
 * Factory of the javascriptGraphLibrariesApp - Generate Language data
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
