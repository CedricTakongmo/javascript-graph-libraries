var JGL_KARMA_GLOBAL = {};
JGL_KARMA_GLOBAL.DATA_POINTS = {
    graph: {
        "nodes": [{
                "id": "A",
                "label": "A"
            }, {
                "id": "B",
                "label": "B"
            }, {
                "id": "C",
                "label": "C",
                "data": "__DATA__"
            }, {
                "id": "T",
                "label": "T"
            }],
        "edges": [{
                "source": "A",
                "target": "B",
                "metadata": {
                    "value": 1
                }
            }, {
                "source": "B",
                "target": "C",
                "metadata": {
                    "value": 1
                }
            }]
    }
};
JGL_KARMA_GLOBAL.DATA_POINTS_URL = 'data/middle.json';
JGL_KARMA_GLOBAL.DATA_LANGUAGE_URL = 'data/language.json';
JGL_KARMA_GLOBAL.DATA_LANGUAGE = [
    {
        "text": "Deutsch",
        "value": "de_DE",
        "description": "Deutsche Sprache",
        "imageSrc": "images/de_flag.png"

    },
    {
        "text": "english",
        "value": "en_US",
        "description": "English language",
        "imageSrc": "images/uk_flag.png"

    }

];
JGL_KARMA_GLOBAL.DATA_PERFORMANCE_URL = 'data/performance.json';
JGL_KARMA_GLOBAL.DATA_PERFORMANCE = [
    {
        "name": "Low",
        "url": "data/low.json"
    }, {
        "name": "Middle",
        "url": "data/middle.json"
    }, {
        "name": "High",
        "url": "data/high.json"
    }
];
JGL_KARMA_GLOBAL.MAIN_VIEW_URL = 'views/main.html';
JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART_URL = 'data/d3GanttChart.json';
JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART = {
    "tasks": [{
            "startDate": "2012-12-09T06:36:45.000Z",
            "endDate": "2012-12-09T07:36:45.000Z",
            "taskName": "E Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T09:56:32.000Z",
            "endDate": "2012-12-09T11:35:47.000Z",
            "taskName": "A Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T11:29:53.000Z",
            "endDate": "2012-12-09T11:34:04.000Z",
            "taskName": "D Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T10:35:21.000Z",
            "endDate": "2012-12-09T11:21:22.000Z",
            "taskName": "P Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T10:00:06.000Z",
            "endDate": "2012-12-09T10:05:07.000Z",
            "taskName": "D Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T08:46:59.000Z",
            "endDate": "2012-12-09T09:54:19.000Z",
            "taskName": "P Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T09:02:45.000Z",
            "endDate": "2012-12-09T09:48:56.000Z",
            "taskName": "N Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T08:27:35.000Z",
            "endDate": "2012-12-09T08:58:43.000Z",
            "taskName": "E Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T06:40:11.000Z",
            "endDate": "2012-12-09T08:26:35.000Z",
            "taskName": "A Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T08:00:03.000Z",
            "endDate": "2012-12-09T08:09:51.000Z",
            "taskName": "D Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T06:21:00.000Z",
            "endDate": "2012-12-09T07:51:42.000Z",
            "taskName": "P Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T06:08:42.000Z",
            "endDate": "2012-12-09T06:33:42.000Z",
            "taskName": "N Job",
            "status": "FAILED"
        }, {
            "startDate": "2012-12-09T05:27:15.000Z",
            "endDate": "2012-12-09T05:54:56.000Z",
            "taskName": "E Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T05:29:48.000Z",
            "endDate": "2012-12-09T05:44:50.000Z",
            "taskName": "D Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T12:39:21.000Z",
            "endDate": "2012-12-09T12:43:22.000Z",
            "taskName": "P Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T12:00:06.000Z",
            "endDate": "2012-12-09T12:05:07.000Z",
            "taskName": "D Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T13:46:59.000Z",
            "endDate": "2012-12-09T14:54:19.000Z",
            "taskName": "P Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T14:02:45.000Z",
            "endDate": "2012-12-09T14:48:56.000Z",
            "taskName": "N Job",
            "status": "RUNNING"
        }, {
            "startDate": "2012-12-09T13:27:35.000Z",
            "endDate": "2012-12-09T13:58:43.000Z",
            "taskName": "E Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T13:40:11.000Z",
            "endDate": "2012-12-09T13:46:35.000Z",
            "taskName": "A Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T13:00:03.000Z",
            "endDate": "2012-12-09T13:09:51.000Z",
            "taskName": "D Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T15:21:00.000Z",
            "endDate": "2012-12-09T15:51:42.000Z",
            "taskName": "P Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T16:08:42.000Z",
            "endDate": "2012-12-09T16:33:42.000Z",
            "taskName": "N Job",
            "status": "FAILED"
        }, {
            "startDate": "2012-12-09T17:27:15.000Z",
            "endDate": "2012-12-09T17:54:56.000Z",
            "taskName": "E Job",
            "status": "SUCCEEDED"
        }, {
            "startDate": "2012-12-09T04:12:24.000Z",
            "endDate": "2012-12-09T05:26:13.000Z",
            "taskName": "A Job",
            "status": "KILLED"
        }]
}
