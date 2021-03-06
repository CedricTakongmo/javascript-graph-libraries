/*globals document, angular, alert, DlhSoft, toggleDependencyConstraintsCommand, toggleBaselineCommand, highlightCriticalPathCommand*/
'use strict';
/**
 * @ngdoc function
 * @name Controller.Controller:ganttcharthyperlibraryCtrl
 * @requires document
 * @requires angular
 * @requires alert
 * @requires DlhSoft
 * @requires toggleDependencyConstraintsCommand
 * @requires toggleBaselineCommand
 * @requires highlightCriticalPathCommand
 * @param {object} $scope $scope
 * @returns {undefined} void
 * @description
 * # Gantt chart Hyper library Controller
 * Gantt, Schedule, Load, and PERT Chart components with multi-platform support,
 * customizable appearance and behavior, high performance, XML import/export, etc.
 */
angular.module(
        'javascriptGraphLibrariesApp').controller(
        'ganttcharthyperlibraryCtrl',
        ['$scope', function($scope) {
          // Retrieve and store the control element for reference purposes.
          var ganttChartView =
                  document.querySelector(
                          '#ganttChartView'),
                  // Prepare data items.
                  date = new Date(),
                  year = date.getFullYear(),
                  month = date.getMonth(),
                        items = [{
                          content: 'Task 1',
                          isExpanded: false
                        }, {
                          content: 'Task 1.1',
                          indentation: 1,
                          start: new Date(
                                  year,
                                  month,
                                  2, 8, 0,
                                  0),
                          finish: new Date(
                                  year,
                                  month,
                                  4, 16,
                                  0, 0)
                        }, {
                          content: 'Task 1.2',
                          indentation: 1,
                          start: new Date(
                                  year,
                                  month,
                                  3, 8, 0,
                                  0),
                          finish: new Date(
                                  year,
                                  month,
                                  5, 12,
                                  0, 0)
                        }, {
                          content: 'Task 2',
                          isExpanded: true
                        }, {
                          content: 'Task 2.1',
                          indentation: 1,
                          start: new Date(
                                  year,
                                  month,
                                  2, 8, 0,
                                  0),
                          finish: new Date(
                                  year,
                                  month,
                                  8, 16,
                                  0, 0),
                          completedFinish: new Date(
                                  year,
                                  month,
                                  5, 16,
                                  0, 0),
                          assignmentsContent: 'Resource 1, Resource 2 [50%]'
                        }, {
                          content: 'Task 2.2',
                          indentation: 1
                        }, {
                          content: 'Task 2.2.1',
                          indentation: 2,
                          start: new Date(
                                  year,
                                  month,
                                  11, 8,
                                  0, 0),
                          finish: new Date(
                                  year,
                                  month,
                                  12, 16,
                                  0, 0),
                          completedFinish: new Date(
                                  year,
                                  month,
                                  12, 16,
                                  0, 0),
                          assignmentsContent: 'Resource 2'
                        }, {
                          content: 'Task 2.2.2',
                          indentation: 2,
                          start: new Date(
                                  year,
                                  month,
                                  12, 12,
                                  0, 0),
                          finish: new Date(
                                  year,
                                  month,
                                  14, 16,
                                  0, 0),
                          assignmentsContent: 'Resource 2'
                        }, {
                          content: 'Task 3',
                          indentation: 1,
                          start: new Date(
                                  year,
                                  month,
                                  15, 16,
                                  0, 0),
                          isMilestone: true
                        }],
                    settings,
                    columns,
                    isWaitingToRefreshScheduleChartView,
                    isWaitingToRefreshScheduleChartViewDisplayedTime,
                    isWaitingToRefreshScheduleChartViewSplitterPosition,
                    isWaitingToRefreshLoadChartView,
                    isWaitingToRefreshLoadChartViewDisplayedTime,
                    isWaitingToRefreshLoadChartViewSplitterPosition,
                    isWaitingToRefreshGanttChartViewDisplayedTime,
                    isWaitingToRefreshGanttChartViewSplitterPosition,
                    originalItemPropertyChangeHandler,
                    copiedItem,
                    indexOffset,
                    i;
          items[3].predecessors = [{
            item: items[0],
            dependencyType: 'SS'
          }];
          items[7].predecessors = [{
            item: items[6],
            lag: 2 * 60 *
                    60 * 1000
          }];
          items[8].predecessors = [{
            item: items[4]
          }, {
            item: items[5]
          }];
          for (i = 4; i <= 32; i++) {
            items.push({
              content: 'Task ' +
                      i,
              start: new Date(
                      year,
                      month,
                      2, 8, 0,
                      0),
              finish: new Date(
                      year,
                      month,
                      4, 16,
                      0, 0)
            });
          }
          // Prepare control settings.
          settings = {
            // Optionally, hide data grid or set grid and chart widths, set read only settings, and/or disable virtualization.
            // isGridVisible: false,
            // gridWidth: "30%",
            // chartWidth: "70%",
            // isGridReadOnly: true,
            // isChartReadOnly: true,
            // isVirtualizing: false,
            // Optionally, preseve task effort when start value changes in the grid.
            // isTaskEffortPreservedWhenStartChangesInGrid: true,
            // Optionally, set the scrollable timeline to present.
            // timelineStart: new Date(year, month, 1),
            // timelineFinish: new Date(year + 2, month, 1),
            // Optionally, set application target, interaction mode, and theme and/or custom styles.
            // target: "Phone", // Supported values: Standard, Phone.
            // interaction: "TouchEnabled", // Supported values: Standard, TouchEnabled.
            // theme: "Aero", // Supported values: Modern, ModernBordered, Aero.
            // border: "Gray",
            // gridLines: "LightGray",
            // standardBarStyle: "stroke: Green; fill: LightGreen",
            // standardCompletedBarStyle: "stroke: DarkGreen; fill: DarkGreen",
            // dependencyLineStyle: "stroke: Green; fill: none; marker-end: url(#ArrowMarker)",
            // Optionally, display alternative row background.
            // alternativeItemStyle: "background-color: #f9f9f9", alternativeChartItemStyle: "fill: #f9f9f9",
            // Optionally, set item template used when displaying task bar tool tips in the chart area.
            // itemTemplate: function (item) {
            //     var toolTip = document.createElementNS("http://www.w3.org/2000/svg", "title");
            //     var toolTipContent = item.content + " • " + "Start: " + item.start.toLocaleString();
            //     if (!item.isMilestone)
            //         toolTipContent += " • " + "Finish: " + item.finish.toLocaleString();
            //     toolTip.appendChild(document.createTextNode(toolTipContent));
            //     return toolTip;
            // },
            // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
            currentTime: new Date(
                    year, month,
                    2, 12, 0, 0
                    )
          };
          // Optionally, set baseline properties.
          items[6].baselineStart =
                  new Date(year, month,
                          10, 8, 0, 0);
          items[6].baselineFinish =
                  new Date(year, month,
                          11, 16, 0, 0);
          items[7].baselineStart =
                  new Date(year, month, 8,
                          8, 0, 0);
          items[7].baselineFinish =
                  new Date(year, month,
                          11, 16, 0, 0);
          items[8].baselineStart =
                  new Date(year, month,
                          12, 8, 0, 0);
          // Optionally, define and assign default and specific task item schedules (working week and day intervals, and nonworking days).
          // settings.schedule = {
          //     workingWeekStart: 1, workingWeekFinish: 5, // Monday - Friday
          //     workingDayStart: 8 * 60 * 60 * 1000, workingDayFinish: 16 * 60 * 60 * 1000 // 8 AM - 4 PM
          //     // , specialNonworkingDays: [new Date(year, month, 19), new Date(year, month, 21)] // excluded
          // };
          // var specialSchedule = {
          //     workingWeekStart: 0, workingWeekFinish: 3, // Sunday - Wednesday
          //     workingDayStart: 9 * 60 * 60 * 1000, workingDayFinish: 19 * 60 * 60 * 1000 // 9 AM - 7 PM, exceeding visible 4 PM
          //     // , specialNonworkingDays: [new Date(year, month, 18), new Date(year, month, 21), new Date(year, month, 22)] // partial replacement for excluded dates
          // };
          // items[9].schedule = specialSchedule;
          // items[10].schedule = specialSchedule;
          // settings.isIndividualItemNonworkingTimeHighlighted = true;
          // Optionally, configure selection.
          // settings.selectionMode = "Extended"; // Supported values: None, Focus (default), Single, Extended, ExtendedFocus.
          // settings.selectedItemStyle = "background: LightCyan";
          // Optionally, initialize item selection.
          // items[6].isSelected = true;
          // Prepare the columns collection.
          columns = DlhSoft.Controls
                  .GanttChartView.getDefaultColumns(
                          items, settings);
          indexOffset = columns[0]
                  .isSelection ? 1 : 0;
          // Optionally, configure existing columns.
          // columns[0 + indexOffset].header = "Work items";
          // columns[0 + indexOffset].width = 240;
          // Optionally, add supplemental columns.
          columns.splice(0 +
                        indexOffset, 0, {
                          header: '',
                          width: 40,
                          cellTemplate: DlhSoft
                                  .Controls.GanttChartView
                                  .getIndexColumnTemplate()
                        });
          columns.splice(3 +
                        indexOffset, 0, {
                          header: 'Effort (h)',
                          width: 80,
                          cellTemplate: DlhSoft
                                  .Controls.GanttChartView
                                  .getTotalEffortColumnTemplate(
                                          64)
                        });
          columns.splice(4 +
                        indexOffset, 0, {
                          header: 'Duration (d)',
                          width: 80,
                          cellTemplate: DlhSoft
                                  .Controls.GanttChartView
                                  .getDurationColumnTemplate(
                                          64, 8)
                        });
          columns.splice(8 +
                        indexOffset, 0, {
                          header: '%',
                          width: 80,
                          cellTemplate: DlhSoft
                                  .Controls.GanttChartView
                                  .getCompletionColumnTemplate(
                                          64)
                        });
          columns.splice(9 +
                        indexOffset, 0, {
                          header: 'Predecessors',
                          width: 100,
                          cellTemplate: DlhSoft
                                  .Controls.GanttChartView
                                  .getPredecessorsColumnTemplate(
                                          84)
                        });
          columns.push({
            header: 'Cost ($)',
            width: 100,
            cellTemplate: DlhSoft
                    .Controls.GanttChartView
                    .getCostColumnTemplate(
                            84)
          });
          columns.push({
            header: 'Est. start',
            width: 140,
            cellTemplate: DlhSoft
                    .Controls.GanttChartView
                    .getBaselineStartColumnTemplate(
                            124,
                            true,
                            true, 8 *
                            60 * 60 *
                            1000)
          }); // 8 AM
          columns.push({
            header: 'Est. finish',
            width: 140,
            cellTemplate: DlhSoft
                    .Controls.GanttChartView
                    .getBaselineFinishColumnTemplate(
                            124,
                            true,
                            true,
                            16 * 60 *
                            60 *
                            1000)
          }); // 4 PM
          // Optionally, set custom item properties and/or append custom columns bound to their values.
          // items[7].description = "Custom description";
          // columns.push({ header: "Description", width: 200, cellTemplate: function (item) { return item.ganttChartView.ownerDocument.createTextNode(item.description); } });
          // columns[10 + indexOffset].cellTemplate = DlhSoft.Controls.GanttChartView.getAssignmentSelectorColumnTemplate(184, function (item) { return ["Resource 1", "Resource 2"] });
          // Optionally, use column template base functions inside cellTemplate functions to use built-in user interface for managing custom field values. Supported column template base functions: textColumnTemplateBase, textInputColumnTemplateBase, optionSelectColumnTemplateBase, numberInputColumnTemplateBase, percentInputColumnTemplateBase, timeSpanInputColumnTemplateBase, dateTimeInputColumnTemplateBase, datePickerInputColumnTemplateBase, dateTimePickerInputColumnTemplateBase, multiSelectorComboBoxInputColumnTemplateBase.
          // items[7].targetDate = new Date(year, month, 28, 12, 0, 0);
          // columns.push({ header: "Target date", width: 140, cellTemplate: function (item) {
          //     return DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase(item.ganttChartView.ownerDocument, 140,
          //         function () { return DlhSoft.Controls.GanttChartView.getInputDate(item.targetDate); },
          //         function (value) { item.targetDate = DlhSoft.Controls.GanttChartView.getOutputDate(value); }); } });
          // Apply the customized columns collection.
          settings.columns = columns;
          // Optionally, define assignable resources.
          settings.assignableResources = [
              'Resource 1',
              'Resource 2',
              'Resource 3',
              'Material 1',
              'Material 2'
          ];
          settings.autoAppendAssignableResources =
                  true;
          // Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
          settings.resourceQuantities = [{
            key: 'Material 1',
            value: 4
          }, {
            key: 'Material 2',
            value: Infinity
          }];
          items[10].assignmentsContent =
                  'Material 1 [250%], Material 2';
          items[11].assignmentsContent =
                  'Material 1, Material 2 [200%]';
          items[12].assignmentsContent =
                  'Material 1';
          // Optionally, define task and resource costs.
          // settings.taskInitiationCost = 5;
          items[4].executionCost = 50;
          // settings.defaultResourceUsageCost = 1;
          // settings.specificResourceUsageCosts = [{ key: "Resource 1", value: 2 }, { key: "Material 1", value: 7}];
          settings.defaultResourceHourCost =
                  10;
          settings.specificResourceHourCosts = [{
            key: 'Resource 1',
            value: 20
          }, {
            key: 'Material 2',
            value: 0.5
          }];
          // Optionally, display multiple item parts on a single chart line.
          // items[13].parts = [ { content: "Task 8 (Part 1)", start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
          //                     { content: "Task 8 (Part 2)", start: new Date(year, month, 8, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), assignmentsContent: "Resource 1" } ];
          // Optionally, customize the date and time formatting and parsing.
          // settings.dateFormatter = function (date) { return date.toDateString(); };
          // settings.dateTimeFormatter = function (dateTime) { return dateTime.toString(); };
          // settings.dateTimeParser = function (text) { return new Date(text); };
          // Optionally, handle item property change notifications.
          // settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
          //     if (isDirect && isFinal && propertyName != "isSelected" && propertyName != "isExpanded")
          //         alert(item.content + "." + propertyName + " has changed.");
          // }
          // Optionally, define custom bar templates for standard, summary, and/or milestone tasks.
          // settings.standardTaskTemplate = function (item) {
          //     var ganttChartView = item.ganttChartView;
          //     var document = ganttChartView.ownerDocument;
          //     var svgns = 'http://www.w3.org/2000/svg';
          //     var containerGroup = document.createElementNS(svgns, 'g');
          //     var rect = document.createElementNS(svgns, "rect");
          //     var itemLeft = ganttChartView.getChartPosition(item.start, settings);
          //     var itemRight = ganttChartView.getChartPosition(item.finish, settings);
          //     rect.setAttribute("x", itemLeft - 1);
          //     rect.setAttribute("y", settings.barMargin - 1);
          //     rect.setAttribute("width", itemRight - itemLeft + 1);
          //     rect.setAttribute("height", settings.barHeight + 2);
          //     rect.setAttribute("rx", 4);
          //     rect.setAttribute("style", "stroke: DarkGreen; fill: Green");
          //     containerGroup.appendChild(rect);
          //     var thumb = document.createElementNS(svgns, 'rect');
          //     thumb.setAttribute('x', itemLeft); thumb.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
          //     thumb.setAttribute('y', ganttChartView.settings.barMargin); thumb.setAttribute('height', ganttChartView.settings.barHeight);
          //     thumb.setAttribute('style', 'fill: Transparent; cursor: move');
          //     DlhSoft.Controls.GanttChartView.initializeTaskDraggingThumbs(thumb, null, null, null, item, itemLeft, itemRight, null);
          //     containerGroup.appendChild(thumb);
          //     return containerGroup;
          // };
          // Alternatively, use original template when needed.
          // var originalStandardTaskTemplate = DlhSoft.Controls.GanttChartView.getDefaultStandardTaskTemplate(items, ganttChartView, settings);
          // settings.standardTaskTemplate = function (item) {
          //     var svgGroup = originalStandardTaskTemplate(item);
          //     if (item.content.indexOf("Task 2.") == 0) {
          //         var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          //         var itemLeft = ganttChartView.getChartPosition(item.start, settings);
          //         var itemRight = ganttChartView.getChartPosition(item.finish, settings);
          //         rect.setAttribute("x", itemLeft - 1);
          //         rect.setAttribute("y", settings.barMargin - 1);
          //         rect.setAttribute("width", itemRight - itemLeft + 1);
          //         rect.setAttribute("height", settings.barHeight + 2);
          //         rect.setAttribute("style", "stroke: Red; fill: Transparent");
          //         svgGroup.insertBefore(rect, svgGroup.childNodes[0]);
          //     }
          //     return svgGroup;
          // }
          // Optionally, apply visibility filter to display only specific items in the view.
          // settings.visibilityFilter = function (item) { return item.content.indexOf("Task 2") >= 0; }
          // Optionally, set up auto-scheduling behavior for dependent tasks based on predecessor information, supplementary disallowing circular dependencies, either for all tasks or excluding started items and/or milestones.
          settings.areTaskDependencyConstraintsEnabled =
                  true;
          // settings.areDependencyConstraintsAppliedOnStartedTasks = false;
          // settings.areDependencyConstraintsAppliedOnMilestones = false;
          // Initialize the component.
          DlhSoft.Controls.GanttChartView
                  .initialize(
                          ganttChartView,
                          items, settings);
          // Optionally, update the current time line periodically, e.g. every 5 minutes.
          // setInterval(function () { ganttChartView.updateCurrentTime(); }, 5 * 60 * 1000);
          // Define user command functions.
          function addNewItem() {
            var item = {
              content: 'New task',
              start: new Date(
                      year,
                      month,
                      2, 8, 0,
                      0),
              finish: new Date(
                      year,
                      month,
                      4, 16,
                      0, 0)
            };
            ganttChartView.addItem(
                    item);
            ganttChartView.selectItem(
                    item);
            ganttChartView.scrollToItem(
                    item);
            ganttChartView.scrollToDateTime(
                    new Date(year,
                            month, 1));
            refreshOtherViews();
          }

          function insertNewItem() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var item = {
              content: 'New task',
              start: new Date(
                      year,
                      month,
                      2, 8, 0,
                      0),
              finish: new Date(
                      year,
                      month,
                      4, 16,
                      0, 0)
            };
            ganttChartView.insertItem(
                    ganttChartView.selectedItem
                    .index, item);
            ganttChartView.selectItem(
                    item);
            ganttChartView.scrollToItem(
                    item);
            ganttChartView.scrollToDateTime(
                    new Date(year,
                            month, 1));
            refreshOtherViews();
          }

          function increaseItemIndentation() {
            var item =
                    ganttChartView.selectedItem;
            if (item == null) {
              return;
            }
            ganttChartView.increaseItemIndentation(
                    item);
            ganttChartView.scrollToItem(
                    item);
            refreshOtherViews();
          }

          function decreaseItemIndentation() {
            var item =
                    ganttChartView.selectedItem;
            if (item == null) {
              return;
            }
            ganttChartView.decreaseItemIndentation(
                    item);
            ganttChartView.scrollToItem(
                    item);
            refreshOtherViews();
          }

          function deleteItem() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            ganttChartView.removeItem(
                    ganttChartView.selectedItem,
                    true); // Also remove successors' predecessor information.
            refreshOtherViews();
          }

          function setCustomBarColorToItem() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var item =
                    ganttChartView.selectedItem;
            item.barStyle =
                    'stroke: Red; fill: Yellow';
            ganttChartView.refreshChartItem(
                    item);
            refreshOtherViews();
          }

          function copyItem() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            copiedItem =
                    ganttChartView.selectedItem;
          }
          copiedItem = null;

          function pasteItem() {
            if (copiedItem == null ||
                    ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var item = {
              content: copiedItem
                      .content,
              start: copiedItem
                      .start,
              finish: copiedItem
                      .finish,
              completedFinish: copiedItem
                      .completedFinish,
              isMilestone: copiedItem
                      .isMilestone,
              assignmentsContent: copiedItem
                      .assignmentsContent,
              isRelativeToTimezone: copiedItem
                      .isRelativeToTimezone
            };
            ganttChartView.insertItem(
                    ganttChartView.selectedItem
                    .index + 1,
                    item);
            ganttChartView.selectItem(
                    item);
            ganttChartView.scrollToItem(
                    item);
            ganttChartView.scrollToDateTime(
                    item.start);
            refreshOtherViews();
          }

          function moveItemUp() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var item =
                    ganttChartView.selectedItem;
            ganttChartView.moveItemHierarchyUp(
                    item);
            ganttChartView.scrollToItem(
                    item);
            refreshOtherViews();
          }

          function moveItemDown() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var item =
                    ganttChartView.selectedItem;
            ganttChartView.moveItemHierarchyDown(
                    item);
            ganttChartView.scrollToItem(
                    item);
            refreshOtherViews();
          }

          function increaseTimelinePage() {
            ganttChartView.increaseTimelinePage(
                    4 * 7 * 24 * 60 *
                    60 * 1000); // 4 weeks
            refreshOtherViews();
          }

          function decreaseTimelinePage() {
            ganttChartView.decreaseTimelinePage(
                    4 * 7 * 24 * 60 *
                    60 * 1000); // 4 weeks
            refreshOtherViews();
          }

          function setCustomScales() {
            var settings =
                    ganttChartView.settings;
            settings.headerHeight =
                    21 * 3;
            settings.scales = [{
              scaleType: 'NonworkingTime',
              isHeaderVisible: false,
              isHighlightingVisible: true,
              highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65'
            }, {
              scaleType: 'Months',
              headerTextFormat: 'Month',
              headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White',
              isSeparatorVisible: true,
              separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px'
            }, {
              scaleType: 'Weeks',
              headerTextFormat: 'Date',
              headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White',
              isSeparatorVisible: true,
              separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px'
            }, {
              scaleType: 'Days',
              headerTextFormat: 'Day',
              headerStyle: 'padding: 2.25px; border-right: solid 1px White'
            }, {
              scaleType: 'CurrentTime',
              isHeaderVisible: false,
              isSeparatorVisible: true,
              separatorStyle: 'stroke: Red; stroke-width: 0.5px'
            }];
            settings.updateScale =
                    60 * 60 * 1000; // 1 hour
            settings.hourWidth = 5;
            settings.visibleWeekStart =
                    1; // Monday
            settings.visibleWeekFinish =
                    5; // Friday
            settings.workingWeekStart =
                    1; // Monday
            settings.workingWeekFinish =
                    4; // Thursday
            settings.visibleDayStart =
                    10 * 60 * 60 * 1000; // 10 AM
            settings.visibleDayFinish =
                    20 * 60 * 60 * 1000; // 8 PM
            settings.specialNonworkingDays = [
                new Date(year,
                        month, 24),
                new Date(year,
                        month, 25)
            ];
            ganttChartView.refresh();
            refreshOtherViews();
          }

          function zoomIn() {
            var settings =
                    ganttChartView.settings;
            ganttChartView.setHourWidth(
                    settings.hourWidth *
                    2);
            refreshOtherViews();
          }

          function toggleBaseline() {
            var settings =
                    ganttChartView.settings;
            settings.isBaselineVisible = !
                    settings.isBaselineVisible;
            toggleBaselineCommand.className =
                    settings.isBaselineVisible ?
                    'ribbonCommand toggle pressed' :
                    'ribbonCommand toggle';
            ganttChartView.refresh();
          }

          function highlightCriticalPath() {
            highlightCriticalPathCommand
                    .className =
                    'ribbonCommand toggle pressed';
            var item, i;
            for (i = 0; i <
                    ganttChartView.items
                    .length; i++) {
              item =
                      ganttChartView.items[
                              i];
              delete item.barStyle;
              if (!item.hasChildren &&
                      ganttChartView.isItemCritical(
                              item)) {
                item
                        .barStyle =
                        'stroke: Red; fill: Red';
              }
              ganttChartView.refreshChartItem(
                      item);
            }
          }

          function splitRemainingWork() {
            if (ganttChartView.selectedItem ==
                    null) {
              return;
            }
            var remainingWorkItem =
                    ganttChartView.splitRemainingWork(
                            ganttChartView.selectedItem,
                            ' (rem. work)',
                            ' (compl. work)'
                            );
            if (remainingWorkItem ==
                    null) {
              return;
            }
            ganttChartView.scrollToItem(
                    remainingWorkItem
                    );
            refreshOtherViews();
          }

          function toggleDependencyConstraints() {
            var settings =
                    ganttChartView.settings;
            settings.areTaskDependencyConstraintsEnabled = !
                    settings.areTaskDependencyConstraintsEnabled;
            toggleDependencyConstraintsCommand
                    .className =
                    settings.areTaskDependencyConstraintsEnabled ?
                    'ribbonCommand toggle pressed' :
                    'ribbonCommand toggle';
            ganttChartView.refresh();
            refreshOtherViews();
          }

          function levelResources() {
            // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
            ganttChartView.levelResources(
                    true,
                    ganttChartView.settings
                    .currentTime);
            // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
            // ganttChartView.optimizeWork(false, true, ganttChartView.settings.currentTime);
          }

          function scheduleChart() {
            var scheduleChartPanel =
                    document.querySelector(
                            '#scheduleChartPanel'
                            ), scheduleChartItems, scheduleChartSettings, scheduleChartView;
            scheduleChartPanel.style
                    .display =
                    'inherit';
            scheduleChartItems =
                    ganttChartView.getScheduleChartItems();

            scheduleChartSettings = {
              isReadOnly: true,
              selectionMode: 'None',
              isMouseWheelZoomEnabled: false
            };
            ganttChartView.copyCommonSettings(
                    scheduleChartSettings
                    );
            scheduleChartView =
                    document.querySelector(
                            '#scheduleChartView'
                            );
            DlhSoft.Controls.ScheduleChartView
                    .initialize(
                            scheduleChartView,
                            scheduleChartItems,
                            scheduleChartSettings
                            );
            scheduleChartSettings.displayedTimeChangeHandler =
                            function(
                                    displayedTime) {
                              refreshViewsDisplayedTime
                                      (
                                              'ScheduleChart',
                                              displayedTime
                                              );
                            };
            scheduleChartSettings.splitterPositionChangeHandler =
                            function(gridWidth,
                                    chartWidth) {
                              refreshViewsSplitterPosition
                                      (
                                              'ScheduleChart',
                                              gridWidth,
                                              chartWidth
                                              );
                            };
          }

          function closeScheduleChartView() {
            var scheduleChartPanel =
                    document.querySelector(
                            '#scheduleChartPanel'
                            );
            scheduleChartPanel.style
                    .display = 'none';
          }

          function loadChart() {
            var loadChartPanel =
                    document.querySelector(
                            '#loadChartPanel'
                            ), loadChartItems, loadChartSettings, loadChartView;
            loadChartPanel.style.display =
                    'inherit';
            loadChartItems =
                    ganttChartView.getLoadChartItems();
            loadChartSettings = {
              selectionMode: 'None',
              isMouseWheelZoomEnabled: false
            };
            ganttChartView.copyCommonSettings(
                    loadChartSettings
                    );
            loadChartView =
                    document.querySelector(
                            '#loadChartView'
                            );
            DlhSoft.Controls.LoadChartView
                    .initialize(
                            loadChartView,
                            loadChartItems,
                            loadChartSettings
                            );
            loadChartSettings.displayedTimeChangeHandler =
                            function(
                                    displayedTime) {
                              refreshViewsDisplayedTime
                                      (
                                              'LoadChart',
                                              displayedTime
                                              );
                            };
            loadChartSettings.splitterPositionChangeHandler =
                            function(gridWidth,
                                    chartWidth) {
                              refreshViewsSplitterPosition
                                      (
                                              'LoadChart',
                                              gridWidth,
                                              chartWidth
                                              );
                            };
            refreshLoadChartResourceSelector
                    ();
          }

          function closeLoadChartView() {
            var loadChartPanel =
                    document.querySelector(
                            '#loadChartPanel'
                            );
            loadChartPanel.style.display =
                    'none';
          }

          function pertChart() {
            var pertChartPanel =
                    document.querySelector(
                            '#pertChartPanel'
                            ),
                    pertChartItems,
                    pertChartSettings,
                    pertChartView,
                    criticalItems,
                    item, i;
            pertChartPanel.style.display =
                    'inherit';
            // Optionally, pass 0 as method parameter to generate a lighter diagram for root tasks only.
            pertChartItems =
                    ganttChartView.getPertChartItems();
            pertChartSettings = {
              chartMargin: 2,
              snapRearrangedItemsToGuidelines: false
            };
            pertChartView =
                    document.querySelector(
                            '#pertChartView'
                            );
            DlhSoft.Controls.Pert.PertChartView
                    .initialize(
                            pertChartView,
                            pertChartItems,
                            pertChartSettings
                            );
            criticalItems =
                    pertChartView.getCriticalItems();
            for (i = 0; i <
                    criticalItems.length; i++
                    ) {
              item =
                      criticalItems[i];
              item.shapeStyle =
                      'stroke: Red; fill: White';
              pertChartView.refreshItem(
                      item);
            }
            // Optionally, reposition end nodes in order to get better visualization.
            // pertChartView.repositionEnds();
          }

          function closePertChartView() {
            var pertChartPanel =
                    document.querySelector(
                            '#pertChartPanel'
                            );
            pertChartPanel.style.display =
                    'none';
          }

          function networkDiagram() {
            var networkDiagramPanel =
                    document.querySelector(
                            '#networkDiagramPanel'
                            ), networkDiagramItems,
                    networkDiagramSettings,
                    networkDiagramView,
                    criticalItems,
                    item,
                    i;
            networkDiagramPanel.style
                    .display =
                    'inherit';
            // Optionally, pass 0 as method parameter to generate a lighter diagram for root tasks only.
            networkDiagramItems =
                    ganttChartView.getNetworkDiagramItems();

            networkDiagramSettings = {
              diagramMargin: 2,
              snapRearrangedItemsToGuidelines: false
            };
            networkDiagramView =
                    document.querySelector(
                            '#networkDiagramView'
                            );
            DlhSoft.Controls.Pert.NetworkDiagramView
                    .initialize(
                            networkDiagramView,
                            networkDiagramItems,
                            networkDiagramSettings
                            );
            criticalItems =
                    networkDiagramView.getCriticalItems();
            for (i = 0; i <
                    criticalItems.length; i++
                    ) {
              item =
                      criticalItems[i];
              item.shapeStyle =
                      'stroke: Red; fill: White';
              networkDiagramView.refreshItem(
                      item);
            }
            // Optionally, reposition end nodes in order to get better visualization.
            // networkDiagramView.repositionEnds();
          }

          function closeNetworkDiagramView() {
            var networkDiagramPanel =
                    document.querySelector(
                            '#networkDiagramPanel'
                            );
            networkDiagramPanel.style
                    .display = 'none';
          }

          function projectStatistics() {
            var startOutput =
                    ganttChartView.getOutputDate(
                            ganttChartView.getProjectStart()
                            ).toDateString(), finishOutput =
                    ganttChartView.getOutputDate(
                            ganttChartView.getProjectFinish()
                            ).toDateString(), hourDuration = 60 *
                    60 * 1000, rounding = 100, effortOutput = Math
                    .round(
                            ganttChartView.getProjectTotalEffort() /
                            hourDuration *
                            rounding) /
                    rounding, completionOutput =
                    Math.round(
                            ganttChartView.getProjectCompletion() *
                            100 * rounding) /
                    rounding, costOutput = Math.round(
                            ganttChartView.getProjectCost() *
                            rounding) /
                    rounding;
            alert(
                    'Project statistics:\nStart:\t' +
                    startOutput +
                    '\nFinish:\t' +
                    finishOutput +
                    '\nEffort:\t' +
                    effortOutput +
                    'h\nCompl.:\t' +
                    completionOutput +
                    '%\nCost:\t$' +
                    costOutput);
          }

          function loadProjectXml() {
            closeSaveProjectXml();
            var loadProjectXmlPanel =
                    document.querySelector(
                            '#loadProjectXmlPanel'
                            ), loadProjectXmlInput;
            loadProjectXmlPanel.style
                    .display =
                    'inherit';
            loadProjectXmlInput =
                    document.querySelector(
                            '#loadProjectXmlInput'
                            );
            loadProjectXmlInput.focus();
            loadProjectXmlInput.select();
          }

          function loadProjectXmlContent() {
            var projectSerializer =
                    DlhSoft.Controls.GanttChartView
                    .ProjectSerializer.initialize(
                            ganttChartView),
                    loadProjectXmlInput =
                    document.querySelector(
                            '#loadProjectXmlInput'
                            );
            projectSerializer.loadXml(
                    loadProjectXmlInput
                    .value);
            closeLoadProjectXml();
          }

          function closeLoadProjectXml() {
            var loadProjectXmlPanel =
                    document.querySelector(
                            '#loadProjectXmlPanel'
                            );
            loadProjectXmlPanel.style
                    .display = 'none';
          }

          function saveProjectXml() {
            closeLoadProjectXml();
            var saveProjectXmlPanel =
                    document.querySelector(
                            '#saveProjectXmlPanel'
                            ), projectXmlSerializerSettings, projectSerializer, saveProjectXmlInput, saveProjectXmlOutput;
            saveProjectXmlPanel.style
                    .display =
                    'inherit';

            projectXmlSerializerSettings = {
              compact: true,
              spaceSeparated: true
            };
            projectSerializer =
                    DlhSoft.Controls.GanttChartView
                    .ProjectSerializer.initialize(
                            ganttChartView,
                            projectXmlSerializerSettings
                            );
            saveProjectXmlInput =
                    document.querySelector(
                            '#saveProjectXmlInput'
                            );
            saveProjectXmlOutput =
                    document.querySelector(
                            '#saveProjectXmlOutput'
                            );
            saveProjectXmlOutput.value =
                    projectSerializer.getXml();
            saveProjectXmlOutput.focus();
            saveProjectXmlOutput.select();
          }

          function closeSaveProjectXml() {
            var saveProjectXmlPanel =
                    document.querySelector(
                            '#saveProjectXmlPanel'
                            );
            saveProjectXmlPanel.style
                    .display = 'none';
          }

          function print() {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            ganttChartView.print({
              title: 'Gantt Chart (printable)',
              isGridVisible: true,
              columnIndexes: [
                  1
              ],
              timelineStart: new Date(
                      year,
                      month,
                      1),
              timelineFinish: new Date(
                      new Date(
                              year,
                              month,
                              1
                              ).valueOf() +
                      5 *
                      7 *
                      24 *
                      60 *
                      60 *
                      1000
                      ),
              preparingMessage: '...'
            });
          }
          // Optionally, synchronize other displayed views upon standard Gantt Chart item or displayed time changes on the client side.
          originalItemPropertyChangeHandler =
                  settings.itemPropertyChangeHandler;
          settings.itemPropertyChangeHandler =
                        function(item,
                                propertyName,
                                isDirect, isFinal) {
                          if (isDirect &&
                                  isFinal && ((!
                                          item.hasChildren &&
                                          (
                                                  propertyName === 'content' ||
                                                  propertyName === 'start' ||
                                                  propertyName === 'finish' ||
                                                  propertyName === 'completedFinish' ||
                                                  propertyName === 'isMilestone' ||
                                                  propertyName === 'assignmentsContent'
                                                  )) || propertyName === 'indentation'
                                          )) {
                            refreshOtherViews();
                          }
                          if (typeof originalItemPropertyChangeHandler !==
                                  'undefined') {
                            originalItemPropertyChangeHandler(
                                    item,
                                    propertyName,
                                    isDirect,
                                    isFinal);
                          }
                        };
          settings.displayedTimeChangeHandler =
                        function(displayedTime) {
                          refreshViewsDisplayedTime
                                  ('GanttChart',
                                          displayedTime
                                          );
                        };
          settings.splitterPositionChangeHandler =
                        function(gridWidth,
                                chartWidth) {
                          refreshViewsSplitterPosition
                                  ('GanttChart',
                                          gridWidth,
                                          chartWidth);
                        };
          settings.hourWidthChangeHandler =
                        function() {
                          refreshOtherViews();
                        };

          function refreshOtherViews() {
            refreshScheduleChartView
                    ();
            refreshLoadChartResourceSelector
                    ();
            refreshLoadChartView();
            closePertChartView();
            closeNetworkDiagramView
                    ();
            closeLoadProjectXml();
            closeSaveProjectXml();
          }

          function refreshScheduleChartView() {
            var scheduleChartPanel =
                    document.querySelector(
                            '#scheduleChartPanel'
                            );
            if (scheduleChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshScheduleChartView
                    ) {
              isWaitingToRefreshScheduleChartView = true;
              setTimeout(function() {
                isWaitingToRefreshScheduleChartView = false;
                var
                        scheduleChartView =
                        document
                        .querySelector(
                                '#scheduleChartView'
                                );
                scheduleChartView
                        .scheduleChartItems =
                        ganttChartView
                        .getScheduleChartItems();
                ganttChartView
                        .copyCommonSettings(
                                scheduleChartView
                                .settings
                                );
                scheduleChartView
                        .refresh();
              }, 0);
            }
          }

          function refreshLoadChartResourceSelector() {
            var
                    loadChartResourceFilter =
                    document.querySelector(
                            '#loadChartResourceFilter'
                            ),
                    i, resources, resource, option,
                    previouslySelectedResource =
                    loadChartResourceFilter
                    .value;
            for (i = loadChartResourceFilter.childNodes.length; i-- > 2;) {
              loadChartResourceFilter
                      .removeChild(
                              loadChartResourceFilter
                              .childNodes[i]);
            }
            resources =
                    ganttChartView.getAssignedResources();
            for (i = 0; i <
                    resources.length; i++
                    ) {
              resource =
                      resources[i];
              option =
                      document.createElement(
                              'option');
              option.appendChild(
                      document.createTextNode(
                              resource
                              ));
              if (resource === previouslySelectedResource) {
                option.setAttribute(
                        'selected',
                        'true');
              }
              loadChartResourceFilter
                      .appendChild(
                              option);
            }
          }

          function loadChartResourceFilterChanged() {
            refreshLoadChartView();
          }

          function refreshLoadChartView() {
            var loadChartPanel =
                    document.querySelector(
                            '#loadChartPanel'
                            );
            if (loadChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshLoadChartView
                    ) {
              isWaitingToRefreshLoadChartView = true;
              setTimeout(function() {
                var
                        loadChartView =
                        document
                        .querySelector(
                                '#loadChartView'
                                ),
                        loadChartResourceFilter =
                        document
                        .querySelector(
                                '#loadChartResourceFilter'
                                ),
                        resourceFilterValue =
                        loadChartResourceFilter
                        .value;
                if (
                        resourceFilterValue === '') {
                  loadChartView
                          .loadChartItems =
                          ganttChartView
                          .getLoadChartItems();
                  loadChartView
                          .settings
                          .itemHeight =
                          21;
                  loadChartView
                          .settings
                          .barHeight =
                          10.5;
                } else {
                  loadChartView
                          .loadChartItems =
                          ganttChartView
                          .getLoadChartItems(
                                  [
                                      resourceFilterValue
                                  ]
                                  );
                  loadChartView
                          .settings
                          .itemHeight =
                          63;
                  loadChartView
                          .settings
                          .barHeight =
                          52.5;
                }
                ganttChartView
                        .copyCommonSettings(
                                loadChartView
                                .settings
                                );
                loadChartView
                        .refresh();
                isWaitingToRefreshLoadChartView = false;
              }, 0);
            }
          }

          function refreshViewsDisplayedTime(
                  sourceControlType,
                  displayedTime) {
            var loadChartPanel =
                    document.querySelector(
                            '#loadChartPanel'
                            ), scheduleChartPanel =
                    document.querySelector(
                            '#scheduleChartPanel'
                            );
            if (sourceControlType !== 'ScheduleChart' &&
                    scheduleChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshScheduleChartViewDisplayedTime
                    ) {
              isWaitingToRefreshScheduleChartViewDisplayedTime = true;
              setTimeout(function() {
                var
                        scheduleChartView =
                        document
                        .querySelector(
                                '#scheduleChartView'
                                );
                scheduleChartView
                        .scrollToDateTime(
                                displayedTime
                                );
                isWaitingToRefreshScheduleChartViewDisplayedTime = false;
              }, 0);
            }
            if (sourceControlType !== 'LoadChart' &&
                    loadChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshLoadChartViewDisplayedTime
                    ) {
              isWaitingToRefreshLoadChartViewDisplayedTime = true;
              setTimeout(function() {
                var
                        loadChartView =
                        document
                        .querySelector(
                                '#loadChartView'
                                );
                loadChartView
                        .scrollToDateTime(
                                displayedTime
                                );
                isWaitingToRefreshLoadChartViewDisplayedTime = false;
              }, 0);
            }
            if (sourceControlType !== 'GanttChart' && !
                    isWaitingToRefreshGanttChartViewDisplayedTime
                    ) {
              isWaitingToRefreshGanttChartViewDisplayedTime = true;
              setTimeout(function() {
                ganttChartView
                        .scrollToDateTime(
                                displayedTime
                                );
                isWaitingToRefreshGanttChartViewDisplayedTime = false;
              }, 0);
            }
          }

          function refreshViewsSplitterPosition(
                  sourceControlType,
                  gridWidth, chartWidth) {
            var loadChartPanel =
                    document.querySelector(
                            '#loadChartPanel'
                            ), scheduleChartPanel =
                    document.querySelector(
                            '#scheduleChartPanel'
                            );
            if (sourceControlType !== 'ScheduleChart' &&
                    scheduleChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshScheduleChartViewSplitterPosition
                    ) {
              isWaitingToRefreshScheduleChartViewSplitterPosition = true;
              setTimeout(function() {
                var
                        scheduleChartView =
                        document
                        .querySelector(
                                '#scheduleChartView'
                                );
                scheduleChartView
                        .setSplitterPosition(
                                gridWidth,
                                chartWidth
                                );
                isWaitingToRefreshScheduleChartViewSplitterPosition = false;
              }, 0);
            }
            if (sourceControlType !== 'LoadChart' &&
                    loadChartPanel.style
                    .display !== 'none' &&
                    !
                    isWaitingToRefreshLoadChartViewSplitterPosition
                    ) {
              isWaitingToRefreshLoadChartViewSplitterPosition = true;
              setTimeout(function() {
                var
                        loadChartView =
                        document
                        .querySelector(
                                '#loadChartView'
                                );
                loadChartView
                        .setSplitterPosition(
                                gridWidth,
                                chartWidth
                                );
                isWaitingToRefreshLoadChartViewSplitterPosition = false;
              }, 0);
            }
            if (sourceControlType !== 'GanttChart' && !isWaitingToRefreshGanttChartViewSplitterPosition) {
              isWaitingToRefreshGanttChartViewSplitterPosition = true;
              setTimeout(function() {
                ganttChartView
                        .setSplitterPosition(
                                gridWidth,
                                chartWidth
                                );
                isWaitingToRefreshGanttChartViewSplitterPosition = false;
              }, 0);
            }
          }
          $scope.addNewItem = addNewItem;
          $scope.closeLoadChartView = closeLoadChartView;
          $scope.closeLoadProjectXml = closeLoadProjectXml;
          $scope.closeNetworkDiagramView = closeNetworkDiagramView;
          $scope.closePertChartView = closePertChartView;
          $scope.closeSaveProjectXml = closeSaveProjectXml;
          $scope.closeScheduleChartView = closeScheduleChartView;
          $scope.copyItem = copyItem;
          $scope.decreaseItemIndentation = decreaseItemIndentation;
          $scope.decreaseTimelinePage = decreaseTimelinePage;
          $scope.deleteItem = deleteItem;
          $scope.highlightCriticalPath = highlightCriticalPath;
          $scope.increaseItemIndentation = increaseItemIndentation;
          $scope.increaseTimelinePage = increaseTimelinePage;
          $scope.insertNewItem = insertNewItem;
          $scope.levelResources = levelResources;
          $scope.loadChart = loadChart;
          $scope.loadChartResourceFilterChanged = loadChartResourceFilterChanged;
          $scope.loadProjectXml = loadProjectXml;
          $scope.loadProjectXmlContent = loadProjectXmlContent;
          $scope.moveItemDown = moveItemDown;
          $scope.moveItemUp = moveItemUp;
          $scope.networkDiagram = networkDiagram;
          $scope.pasteItem = pasteItem;
          $scope.pertChart = pertChart;
          $scope.print = print;
          $scope.projectStatistics = projectStatistics;
          $scope.refreshLoadChartResourceSelector = refreshLoadChartResourceSelector;
          $scope.refreshLoadChartView = refreshLoadChartView;
          $scope.refreshOtherViews = refreshOtherViews;
          $scope.refreshScheduleChartView = refreshScheduleChartView;
          $scope.refreshViewsDisplayedTime = refreshViewsDisplayedTime;
          $scope.refreshViewsSplitterPosition = refreshViewsSplitterPosition;
          $scope.saveProjectXml = saveProjectXml;
          $scope.scheduleChart = scheduleChart;
          $scope.setCustomBarColorToItem = setCustomBarColorToItem;
          $scope.setCustomScales = setCustomScales;
          $scope.splitRemainingWork = splitRemainingWork;
          $scope.toggleDependencyConstraints = toggleDependencyConstraints;
          $scope.zoomIn = zoomIn;
          $scope.toggleBaseline = toggleBaseline;
          $scope.toggleBaseline = toggleBaseline;
          $scope.toggleBaseline = toggleBaseline;
          $scope.toggleBaseline = toggleBaseline;
          $scope.toggleBaseline = toggleBaseline;
          $scope.toggleBaseline = toggleBaseline;

        }]);
