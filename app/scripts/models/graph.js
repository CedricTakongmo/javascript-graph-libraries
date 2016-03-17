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
