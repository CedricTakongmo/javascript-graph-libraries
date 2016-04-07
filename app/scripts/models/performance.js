/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:performanceFactory
 * @requires $http
 * @requires appSettings
 * @param {object} $http $http
 * @param {object} appSettings appSettings
 * @returns {object} performanceFactory
 * @description
 * # Performance Factory
 * Factory of the javascriptGraphLibrariesApp. Generate data for Performance test
 */
angular.module('javascriptGraphLibrariesApp')
        .factory('performanceFactory', ['$http', 'appSettings', function ($http, appSettings) {

                var dataFactory = {};

                function getBaseUrl() {
                    return appSettings.performance.options.url;
                }

                dataFactory.getperformances = function () {
                    return $http.get(getBaseUrl());
                };

                dataFactory.getperformance = function (id) {
                    return $http.get(getBaseUrl() + '/' + id);
                };

                dataFactory.insertperformance = function (cust) {
                    return $http.post(getBaseUrl(), cust);
                };

                dataFactory.updateperformance = function (cust) {
                    return $http.put(getBaseUrl() + '/' + cust.ID, cust);
                };

                dataFactory.deleteperformance = function (id) {
                    return $http.delete(getBaseUrl() + '/' + id);
                };

                dataFactory.getOrders = function (id) {
                    return $http.get(getBaseUrl() + '/' + id + '/orders');
                };

                return dataFactory;
            }]);
