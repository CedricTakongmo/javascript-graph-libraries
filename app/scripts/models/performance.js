/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptperformanceLibrariesApp.factory:performanceFactory
 * @description
 * # performanceFactory
 * Factory of the javascriptperformanceLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('performanceFactory', ['$http', 'appSettings', function($http, appSettings) {

          var dataFactory = {};

          function getBaseUrl() {
            return appSettings.performance.options.url;
          }

          dataFactory.getperformances = function() {
            return $http.get(getBaseUrl());
          };

          dataFactory.getperformance = function(id) {
            return $http.get(getBaseUrl() + '/' + id);
          };

          dataFactory.insertperformance = function(cust) {
            return $http.post(getBaseUrl(), cust);
          };

          dataFactory.updateperformance = function(cust) {
            return $http.put(getBaseUrl() + '/' + cust.ID, cust);
          };

          dataFactory.deleteperformance = function(id) {
            return $http.delete(getBaseUrl() + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(getBaseUrl() + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
