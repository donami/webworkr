/** @jsx m */
'use strict';

// Mithril module
var m = require('mithril');

// Namespace
var About = {};

// Model
About.About = function() {};

// Controller
About.controller = function() {

};

// View
About.view = function(ctrl) {
    return (@@include('_about.tpl.jsx'));
};

module.exports = About;
