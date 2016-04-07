/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:graphFactory
 * @requires $http
 * @requires appSettings
 * @param {object} $http $http
 * @param {object} appSettings appSettings
 * @returns {object} graphFactory
 * @description
 * # Graph Factory
 * Factory of the javascriptGraphLibrariesApp. Generate Network Graph Data.
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('graphFactory', ['$http', 'appSettings', function($http, appSettings) {

          var dataFactory = {};

          function getBaseUrl() {
            return appSettings.performance.url;
          }

          dataFactory.getGraphs = function() {
            return $http.get(getBaseUrl());
          };

          dataFactory.getGraph = function(id) {
            return $http.get(getBaseUrl() + '/' + id);
          };

          dataFactory.insertGraph = function(cust) {
            return $http.post(getBaseUrl(), cust);
          };

          dataFactory.updateGraph = function(cust) {
            return $http.put(getBaseUrl() + '/' + cust.ID, cust);
          };

          dataFactory.deleteGraph = function(id) {
            return $http.delete(getBaseUrl() + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(getBaseUrl() + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
