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
    return (<div class="container">
    <h1>Om sidan</h1>
    <p>
        Detta är en sida
    </p>
</div>
);
};

module.exports = About;
