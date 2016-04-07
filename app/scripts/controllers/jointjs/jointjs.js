/*globals $, angular, joint*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:jointjsCtrl
 * @requires $
 * @requires angular
 * @requires joint
 * @param {type} Factory.Factory:jointjsNetworkFactory jointjsNetworkFactory
 * @param {type} Factory.Factory:jointjsOrganizationalFactory jointjsOrganizationalFactory
 * @param {type} Factory.Factory:jointjsPetrinetsFactory jointjsPetrinetsFactory
 * @returns {undefined} void
 * @description
 * # jointJSCtrl
 * <p>
 * Build
 * <strong>advanced visual tools</strong>
 *  in a fraction of a time.
 * A set of ready-to-use UI and other components that significantly
 * <strong>speed up development</strong>
 * of diagramming applications.
 * </p>
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('jointjsCtrl', ['jointjsNetworkFactory', 'jointjsOrganizationalFactory', 'jointjsPetrinetsFactory', function(jointjsNetworkFactory, jointjsOrganizationalFactory, jointjsPetrinetsFactory) {
          jointjsNetworkFactory.initializate().success(jointjsNetworkFactory.draw).error(function(error) {
            alert(error);
          });
          jointjsOrganizationalFactory.draw();
          jointjsPetrinetsFactory.draw();
        }]);
