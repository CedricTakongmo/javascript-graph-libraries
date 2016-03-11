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
        .factory('graphFactory', ['$http', function($http) {

          var urlBase = '../data/les_miserables.json',
          //var urlBase = '../data/points.json',

          dataFactory = {};

          dataFactory.getGraphs = function() {
            return $http.get(urlBase);
          };

          dataFactory.getGraph = function(id) {
            return $http.get(urlBase + '/' + id);
          };

          dataFactory.insertGraph = function(cust) {
            return $http.post(urlBase, cust);
          };

          dataFactory.updateGraph = function(cust) {
            return $http.put(urlBase + '/' + cust.ID, cust);
          };

          dataFactory.deleteGraph = function(id) {
            return $http.delete(urlBase + '/' + id);
          };

          dataFactory.getOrders = function(id) {
            return $http.get(urlBase + '/' + id + '/orders');
          };

          return dataFactory;
        }]);
