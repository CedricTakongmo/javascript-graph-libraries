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
JGL_KARMA_GLOBAL.DATA_POINTS_URL = '../data/middle.json';
JGL_KARMA_GLOBAL.DATA_LANGUAGE_URL = '../data/language.json';
JGL_KARMA_GLOBAL.DATA_LANGUAGE = [
        {
            "text": "Deutsch",
            "value": "de_DE",
            "description": "Deutsche Sprache",
            "imageSrc": "../images/de_flag.png"

        },
        {
            "text": "english",
            "value": "en_US",
            "description": "English language",
            "imageSrc": "../images/uk_flag.png"

        }

    ];
JGL_KARMA_GLOBAL.DATA_PERFORMANCE_URL = '../data/performance.json';
JGL_KARMA_GLOBAL.DATA_PERFORMANCE =  [
        {
            "name": "Low",
            "url": "../data/low.json"
        }, {
            "name": "Middle",
            "url": "../data/middle.json"
        }, {
            "name": "High",
            "url": "../data/high.json"
        }
    ];
JGL_KARMA_GLOBAL.MAIN_VIEW_URL = 'views/main.html';
