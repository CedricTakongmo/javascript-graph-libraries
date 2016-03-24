/*globals $, angular, joint*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:jointJSCtrl
 * @description
 * # jointJSCtrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('jointjsCtrl', ['jointjsNetwork', 'jointjsOrganizational', 'jointjsPetrinets', function (jointjsNetwork, jointjsOrganizational, jointjsPetrinets) {
                jointjsNetwork.initializate().success(jointjsNetwork.draw).error(function (error) {
                    alert(error);
                });
                jointjsOrganizational.draw();
                jointjsPetrinets.draw();
            }]);
