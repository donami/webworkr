/** @jsx m */
'use strict';

// Mithril module
var m = require('mithril');
var bookmark = require('./../bookmark/bookmark.jsx');

// Namespace
var Jobs = {};

// Model
Jobs.list = function() {
    return m.request({method: "GET", url: "json/search/web.json"})
}

Jobs.filterList = function() {
    this.cities = m.prop([]);
    this.workTitles = m.prop([]);
    this.hasFilter = m.prop(false);
};

// Controller
Jobs.controller = function() {
    var ctrl = this;

    this.filterList = new Jobs.filterList();

    // Bookmark handler
    this.bookmark = new bookmark.controller();

    this.searchTerm = m.prop("");

    /**
     * Filter list
     * @param  Object obj
     * @return Boolean
     */
    this.visible = function(obj) {

        // Filter by input field
        if (obj.annonsrubrik.toLowerCase().indexOf(ctrl.searchTerm().toLowerCase()) < 0) {
            return false;
        }

        // Check if any filter have been applied
        if (this.filterList.hasFilter()) {

            // If filtering by city
            if (this.filterList.cities().length > 0) {

                if (this.filterList.cities().map(function(obj) {
                    return obj();
                }).indexOf(obj.kommunnamn) == -1) {
                    return false;
                }

            }

            // If filtering by city
            if (this.filterList.workTitles().length > 0) {

                if (this.filterList.workTitles().map(function(obj) {
                    return obj();
                }).indexOf(obj.yrkesbenamning) == -1) {
                    return false;
                }

            }

        }

        return true;
    }.bind(this);

    /**
     * Add filter
     * @param string value  property to filter by
     * @param string value  type of filtering
     * @return void
     */
    this.addFilter = function(value, type) {
        if (this.filterList[type]().map(function(obj) {
            return obj();
        }).indexOf(value) < 0) {
            this.filterList[type]().push(m.prop(value));
            this.filterList.hasFilter = m.prop(true);
        }
    }.bind(this);

    /**
     * Remove filter
     * @param  string   value
     * @param  string   type
     * @return void
     */
    this.removeFilter = function(value, type) {
        var items = this.filterList[type]().filter(function(obj) {
            return obj() != value;
        });
        this.filterList[type] = m.prop(items);
    }.bind(this);

    /**
     * Return true if the type has a filter
     * @param  String  value
     * @return Boolean
     */
    this.hasFilter = function(value) {
        if (this.filterList[value]().length > 0)
            return true;
        return false;
    }.bind(this);

    /**
     * Clear filter
     * @return void
     */
    this.clearFilter = function() {
        this.filterList = new Jobs.filterList();
    }.bind(this);

    // List of jobs
    this.list = m.prop([]);

    // Load job list
    new Jobs.list()
        .then(function(response) {
            var bookmarked = null;
            var data = response.matchningslista.matchningdata.map(function(obj) {
                bookmarked = ctrl.bookmark.list().find(function(bookmark) {
                    return bookmark.annonsid == obj.annonsid;
                })

                obj.bookmarked = bookmarked ? m.prop(true) : m.prop(false);

                return obj;
            })
            return data;
        })
        .then(this.list);

    /**
     * Return an array of unique cities
     * @return Array
     */
    this.cities = function() {
        return this.list().reduce(function(memo, obj) {
            if (memo.indexOf(obj.kommunnamn) < 0) {
                memo.push(obj.kommunnamn);
            }

            return memo;
        }, []);
    }.bind(this);

    /**
     * Return an array of unique work titles
     * @return Array
     */
    this.workTitle = function() {
        return this.list().reduce(function(memo, obj) {
            if (memo.indexOf(obj.yrkesbenamning) < 0) {
                memo.push(obj.yrkesbenamning);
            }
            return memo;
        }, []);
    }.bind(this);

};


// View
Jobs.view = function(ctrl) {
    return (@@include('_jobs.tpl.jsx'));
};

module.exports = Jobs;
