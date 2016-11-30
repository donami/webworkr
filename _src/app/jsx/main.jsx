/** @jsx m */
'use strict';

//require jquery
var $ = require('jquery');
window.jQuery = $;
require('bootstrap');
//require lodash
var lodash = require('lodash');
window._ = lodash;
//require mithril
var m = require('mithril');

$(document).ready(function() {
    //setup routes to start w/ the `#` symbol
    m.route.mode = 'hash';
    //routing configuration
    m.route(document.getElementById('ui-router'), '/', {
        '/': require('./app/app.jsx'),
        '/about': require('./about/about.jsx'),
        '/jobs': require('./jobs/jobs.jsx'),
        '/jobs/:id': require('./job/job.jsx')
    });
});
