/** @jsx m */
'use strict';

// Mithril module
var m = require('mithril');

// Namespace
var Job = {};

// Model
Job.Job = function() {};

Job.item = function(id) {
    return m.request({method: 'GET', url: 'json/platsannons/' + id + '.json'})
        .then(function(item) {
            if (typeof item == "undefined") {
                return Promise.reject("Unable to load ad")
            }

            item.platsannons.annons.annonstext = m.trust(item.platsannons.annons.annonstext.split("\n").join("<br/>"));
            return item;
        })
        .catch(function(error) {
            console.log(error);
        });
};

// Controller
Job.controller = function() {
    var jobId = m.route.param('id');

    this.item = new Job.item(jobId);
};

// View
Job.view = function(ctrl) {
    console.log(ctrl.item());
    return (@@include('_job.tpl.jsx'));
};

module.exports = Job;
