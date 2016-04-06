/*globals $, angular, joint*/
'use strict';

/**
 * @ngdoc function
 * @requires Factory.Factory:jointjsNetworkFactory
 * @requires Factory.Factory:jointjsOrganizationalFactory
 * @requires Factory.Factory:jointjsPetrinetsFactory
 * @name Controller.Controller:jointjsCtrl
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
