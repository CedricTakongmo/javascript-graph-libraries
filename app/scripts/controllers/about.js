/*globals angular*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:AboutCtrl
 * @description

 * # AboutCtrl
 * <div id="readme" class="readme boxed-group clearfix announce instapaper_body md">
        <article class="markdown-body entry-content" itemprop="text">
            <h3><a id="user-content-javascript-graph-libraries" class="anchor" href="#javascript-graph-libraries" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16"><path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z"/></svg></a>Javascript Graph Libraries</h3>

            <p>
                <a href="https://travis-ci.org/CedricTakongmo/javascript-graph-libraries">
                    </a></p><p class="lead"><a href="https://travis-ci.org/CedricTakongmo/javascript-graph-libraries">
                        <img alt="Build state" src="https://travis-ci.org/CedricTakongmo/javascript-graph-libraries.svg?branch=master"><br>
                    </a></p><a href="https://travis-ci.org/CedricTakongmo/javascript-graph-libraries">
                </a>
            <p></p>

            <h4><a id="user-content-quickstart" class="anchor" href="#quickstart" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16"><path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z"/></svg></a>Quickstart</h4>

            <ol>
                <li>
                    <p>Install <a href="https://nodejs.org/en/download/"><strong>NodeJS</strong></a>
                        <br>It will normaly install the npm package.</p>
                </li>
                <li>
                    <p>Install all the global packages
                        <br><code>npm install grunt-cli</code>
                        <br><code>npm install bower</code></p>
                </li>
                <li>
                    <p>clone project and enter in the main directory
                        <br>
                        <code>git clone https://github.com/CedricTakongmo/javascript-graph-libraries.git</code>
                        <br>
                        <code>cd javascript-graph-libraries</code></p>
                </li>
                <li>
                    <p>Install the local dependencies
                        <br>
                        <code>npm install</code>
                        <br>
                        <code>bower install</code> </p>
                </li>
                <li>
                    <p>Start javascript-graph-libraries
                        <code>grunt serve</code>
                        <br> You access to the application under <a href="http://localhost:9000">localhost:9000</a></p>
                </li>
            </ol>

            <h4><a id="user-content-testing" class="anchor" href="#testing" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16"><path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z"/></svg></a>Testing</h4>

            <p>Running <code>grunt test</code> will run the unit tests with karma.</p>
        </article>
    </div>
 */
angular.module('javascriptGraphLibrariesApp')
  .controller('AboutCtrl', [ function() {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
