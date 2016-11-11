/** @jsx m */
'use strict';

// Mithril module
var m = require('mithril');
var Bookmark = require('./../bookmark/bookmark.jsx');

// Namespace
var Jobs = {};

// Model
Jobs.list = function() {
    return m.request({method: "GET", url: "json/search/web.json"})
}

// Controller
Jobs.controller = function() {
    var self = this;

    this.bookmark = new Bookmark();
    this.bookmark.list();

    // List of jobs
    this.list = m.prop([]);

    // Load job list
    new Jobs.list()
        .then(function(response) {
            var bookmarked = null;
            var data = response.matchningslista.matchningdata.map(function(obj) {
                bookmarked = self.bookmark.list().find(function(bookmark) {
                    return bookmark.annonsid == obj.annonsid;
                })

                obj.bookmarked = bookmarked ? m.prop(true) : m.prop(false);

                return obj;
            })
            return data;

        })
        .then(this.list);

    // Add bookmark
    this.addBookmark = function(job) {
        job.bookmarked = m.prop(true);
        this.bookmark.add(job);
    }.bind(this);

    // Remove bookmarks
    this.removeBookmark = function(job) {
        job.bookmarked = m.prop(false);
        this.bookmark.remove(job);
    }.bind(this);

    // Get bookmarks
    this.getBookmarks = function() {
        return this.bookmark.list();
    }.bind(this);

    // Save bookmarks
    this.saveBookmarks = function() {
        return this.bookmark.save();
    }.bind(this);

    // Clear bookmarks
    this.clearBookmarks = function() {
        return this.bookmark.clear();
    }.bind(this);
};


// View
Jobs.view = function(ctrl) {
    return (@@include('_jobs.tpl.jsx'));
};

module.exports = Jobs;
