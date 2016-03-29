/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.factory:graphFactory
 * @description
 * # graphFactory
 * Factory of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('d3CangttChartFactory', ['$http', 'appSettings', function($http, appSettings) {

          var dataFactory = {};

          function getBaseUrl() {
            return appSettings.d3GanttChart.url;
          }

          dataFactory.getD3GanttCharts = function() {
            return $http.get(getBaseUrl());
          };

          dataFactory.getD3GanttChart = function(id) {
            return $http.get(getBaseUrl() + '/' + id);
          };

          dataFactory.insertD3GanttChart = function(cust) {
            return $http.post(getBaseUrl(), cust);
          };

          dataFactory.updateD3GanttChart = function(cust) {
            return $http.put(getBaseUrl() + '/' + cust.ID, cust);
          };

          dataFactory.deleteD3GanttChart = function(id) {
            return $http.delete(getBaseUrl() + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(getBaseUrl() + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
