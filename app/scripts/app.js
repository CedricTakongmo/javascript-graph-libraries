/*globals angular, jglGetTranslations*/
'use strict';

/**
 * @ngdoc overview
 * @name javascriptGraphLibrariesApp
 * @description
 * # javascriptGraphLibrariesApp
 *
 * Main module of the application.
 */
angular.module('javascriptGraphLibrariesApp', [
    'angular-loading-bar',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLoadingSpinner',
    'pascalprecht.translate'
]).value('appSettings', {
  performance: {
    name: 'Middle',
    url: 'data/middle.json',
    options:{
      url: 'data/performance.json'
    }
  },
  language:{
    url: 'data/language.json'
  },
  d3GanttChart:{
    url: 'data/d3CangttChart.json'  
  }
}).config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
  $translateProvider.translations('de_DE', jglGetTranslations().DE_DE);
  $translateProvider.translations('en_US', jglGetTranslations().EN_US);
  $translateProvider.preferredLanguage('de_DE');
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
                .when('/about', {
                  templateUrl: 'views/about.html',
                  controller: 'AboutCtrl',
                  controllerAs: 'about'
                })
                .when('/jointjs', {
                  templateUrl: 'views/jointjs.html',
                  controller: 'jointjsCtrl',
                  controllerAs: 'jointjs'
                })
                .when('/fabric', {
                  templateUrl: 'views/fabric.html',
                  controller: 'fabricCtrl',
                  controllerAs: 'fabric'
                })
                .when('/raphaeldracula', {
                  templateUrl: 'views/raphaeldracula.html',
                  controller: 'raphaeldraculaCtrl',
                  controllerAs: 'raphaeldracula'
                })
                .when('/cytoscape', {
                  templateUrl: 'views/cytoscape.html',
                  controller: 'cytoscapeCtrl',
                  controllerAs: 'cytoscape'
                })
                .when('/jsplumb', {
                  templateUrl: 'views/jsplumb.html',
                  controller: 'jsplumbCtrl',
                  controllerAs: 'jsplumb'
                })
                .when('/vis', {
                  templateUrl: 'views/vis.html',
                  controller: 'visCtrl',
                  controllerAs: 'vis'
                })
                .when('/d3', {
                  templateUrl: 'views/d3.html',
                  controller: 'd3Ctrl',
                  controllerAs: 'd3'
                })
                .when('/config', {
                  templateUrl: 'views/config.html',
                  controller: 'ConfigCtrl'
                })
                .when('/ganttcharthyperlibrary', {
                  templateUrl: 'views/ganttcharthyperlibrary.html',
                  controller: 'ganttcharthyperlibraryCtrl'
                })
                .otherwise({
                  redirectTo: '/'
                });
}]);

