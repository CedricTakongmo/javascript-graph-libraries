/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:d3GanttChartFactory
 * @requires $http
 * @requires appSettings
 * @param {type} $http $http
 * @param {type} appSettings appSettings
 * @returns {d3GanttChart_L18.dataFactory} Factory.Factory:d3GanttChartFactory
 * @description
 * # d3GanttChartFactory
 * Factory of the graph data for d3 Gantt Chart.
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('d3GanttChartFactory', ['$http', 'appSettings', function($http, appSettings) {

          var dataFactory = {};

          function getBaseUrl() {
            return appSettings.d3GanttChartFactory.url;
          }

          dataFactory.getd3GanttChartFactorys = function() {
            return $http.get(getBaseUrl());
          };

          dataFactory.getd3GanttChartFactory = function(id) {
            return $http.get(getBaseUrl() + '/' + id);
          };

          dataFactory.insertd3GanttChartFactory = function(cust) {
            return $http.post(getBaseUrl(), cust);
          };

          dataFactory.updated3GanttChartFactory = function(cust) {
            return $http.put(getBaseUrl() + '/' + cust.ID, cust);
          };

          dataFactory.deleted3GanttChartFactory = function(id) {
            return $http.delete(getBaseUrl() + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(getBaseUrl() + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
