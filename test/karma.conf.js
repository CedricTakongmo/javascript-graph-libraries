// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-03-03 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/spin.js/spin.js',
      'bower_components/angular-spinner/angular-spinner.js',
      'bower_components/angular-loading-spinner/angular-loading-spinner.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/lodash/lodash.js',
      'bower_components/backbone/backbone.js',
      'bower_components/graphlib/dist/graphlib.core.js',
      'bower_components/dagre/dist/dagre.core.js',
      'bower_components/dagre/dist/dagre.core.min.js',
      'bower_components/jointjs/dist/joint.js',
      'bower_components/d3/d3.js',
      'bower_components/fabric/dist/fabric.min.js',
      'bower_components/vis/dist/vis.js',
      'bower_components/cytoscape/dist/cytoscape.js',
      'bower_components/cytoscape-dagre/cytoscape-dagre.js',
      'bower_components/jsPlumb/dist/js/jsPlumb-2.0.7.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine/lib/jasmine-core/jasmine.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // endbower
      'bower_components/graphdracula/js/raphael-min.js',
      'bower_components/graphdracula/js/dracula_graffle.js',
      'bower_components/graphdracula/js/dracula_graph.js',
      'bower_components/graphdracula/js/dracula_algorithms.js',
      'bower_components/ddslick/jquery.ddslick.min.js',
      'bower_components/GanttChartHyperLibrary/DlhSoft.ProjectData.GanttChart.HTML.Controls.js',
      'bower_components/GanttChartHyperLibrary/DlhSoft.Data.HTML.Controls.js',
      'bower_components/GanttChartHyperLibrary/DlhSoft.ProjectData.GanttChart.HTML.Controls.Extras.js',
      'bower_components/GanttChartHyperLibrary/DlhSoft.ProjectData.PertChart.HTML.Controls.js',
      'bower_components/gantt-chart-d3/gantt-chart-d3.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
