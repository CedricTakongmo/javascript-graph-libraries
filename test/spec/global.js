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
JGL_KARMA_GLOBAL.DATA_POINTS_URL = '../data/low.json';
JGL_KARMA_GLOBAL.MAIN_VIEW_URL = 'views/main.html';
