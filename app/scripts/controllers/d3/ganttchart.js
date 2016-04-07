/*globals window, angular, d3*/
'use strict';

/**
 * @ngdoc function
 * @name Factory.Factory:d3GanttChartControllFactory
 * @requires window
 * @requires angular
 * @requires d3
 * @param {type} d3CangttChartFactory Factory.Factory:d3CangttChartFactory
 * @param {type} cfpLoadingBar cfpLoadingBar
 * @param {type} $timeout $timeout
 * @returns {ganttchart_L19.ganttchartAnonym$8} ganttchart_L19.ganttchartAnonym$8
 * @description
 * # d3 Gantt Chart
 * A factory for a basic implementation of a Gantt Chart using D3.js.
 */
angular.module('javascriptGraphLibrariesApp').factory('d3GanttChartControllFactory', ['d3GanttChartFactory', 'cfpLoadingBar', '$timeout',
    function(d3CangttChartFactory, cfpLoadingBar, $timeout) {

      function initializate() {
        return d3CangttChartFactory.getd3GanttChartFactorys();
      }

      function draw(data) {
        cfpLoadingBar.start();
        $timeout(function() {
          cfpLoadingBar.complete();
        }, 5000);
        var tasks = data.map(function(el) {
          el.startDate = new Date(el.startDate);
          el.endDate = new Date(el.endDate);
          return el;
        });
        var taskStatus = {
          SUCCEEDED: 'bar',
          FAILED: 'bar-failed',
          RUNNING: 'bar-running',
          KILLED: 'bar-killed'
        };

        var taskNames = ['D Job', 'P Job', 'E Job', 'A Job', 'N Job'];

        tasks.sort(function(a, b) {
          return a.endDate - b.endDate;
        });
        tasks.sort(function(a, b) {
          return a.startDate - b.startDate;
        });
        var format = '%H:%M';
        var timeDomainString = '1day';
        var margin = {
          top: 20,
          right: 40,
          bottom: 20,
          left: 80
        };

        function changeTimeDomain(timeDomainString) {
          window.timeDomainString = timeDomainString;
          switch (timeDomainString) {
            case '1hr':
              format = '%H:%M:%S';
              gantt.timeDomain([d3.time.hour.offset(getEndDate(), -1), getEndDate()]);
              break;
            case '3hr':
              format = '%H:%M';
              gantt.timeDomain([d3.time.hour.offset(getEndDate(), -3), getEndDate()]);
              break;

            case '6hr':
              format = '%H:%M';
              gantt.timeDomain([d3.time.hour.offset(getEndDate(), -6), getEndDate()]);
              break;

            case '1day':
              format = '%H:%M';
              gantt.timeDomain([d3.time.day.offset(getEndDate(), -1), getEndDate()]);
              break;

            case '1week':
              format = '%a %H:%M';
              gantt.timeDomain([d3.time.day.offset(getEndDate(), -7), getEndDate()]);
              break;
            default:
              format = '%H:%M'

          }
          gantt.tickFormat(format);
          gantt.redraw(tasks);
        }
        function getEndDate() {
          var lastEndDate = Date.now();
          if (tasks.length > 0) {
            lastEndDate = tasks[tasks.length - 1].endDate;
          }
          return lastEndDate;
        }
        function addTask() {
          var lastEndDate = getEndDate();
          var taskStatusKeys = Object.keys(taskStatus);
          var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
          var taskName = taskNames[Math.floor(Math.random() * taskNames.length)];

          tasks.push({
            startDate: d3.time.hour.offset(lastEndDate, Math.ceil(1 * Math.random())),
            endDate: d3.time.hour.offset(lastEndDate, (Math.ceil(Math.random() * 3)) + 1),
            taskName: taskName,
            status: taskStatusName
          });

          changeTimeDomain(timeDomainString);
          gantt.redraw(tasks);
        }
        function removeTask() {
          tasks.pop();
          changeTimeDomain(timeDomainString);
          gantt.redraw(tasks);
        }

        var gantt = d3.gantt()
                .selector('#d3-gantt-chart')
                .taskTypes(taskNames)
                .taskStatus(taskStatus)
                .tickFormat(format)
                .height(700)
                .width(800)
                .margin(margin)
                .timeDomainMode('fixed');
        changeTimeDomain(timeDomainString);
        gantt(tasks);

        return {
          addTask: addTask,
          removeTask: removeTask,
          changeTimeDomain: changeTimeDomain
        }
      }
      return {
        initializate: initializate,
        draw: draw
      };
    }]);
