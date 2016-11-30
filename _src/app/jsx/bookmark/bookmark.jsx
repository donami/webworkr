var m = require('mithril');

var Bookmark = {}
Bookmark.controller = function() {

    this.bookmarks = [];

    /**
     * Init controller
     * @return void
     */
    this.init = function() {
        if (localStorage.getItem('bookmarks')) {
            this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        }
    }.bind(this);

    /**
     * Return a list of bookmarks
     * @return array
     */
    this.list = function() {
        return this.bookmarks;
    }.bind(this);

    /**
     * Add a bookmark
     * @param Object    bookmark
     * @return void
     */
    this.add = function(bookmark) {
        bookmark.bookmarked = m.prop(true);
        this.bookmarks.push(bookmark);
    }.bind(this);

    /**
     * Remove bookmark
     * @param Object    bookmark
     * @return Boolean
     */
    this.remove = function(bookmark) {
        bookmark.bookmarked = m.prop(false);
        
        this.bookmarks = this.bookmarks.filter(function(obj) {
            return obj.annonsid != bookmark.annonsid;
        });
    }.bind(this);

    /**
     * Save the bookmarks in localStorage
     * @return void
     */
    this.save = function() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }.bind(this);

    /**
     * Clear the bookmarks
     * @return void
     */
    this.clear = function() {
        this.bookmarks = [];
        localStorage.removeItem('bookmarks');
    }.bind(this);

    this.init();
}

/**
 * View
 * @param  Object   ctrl
 * @return Object
 */
Bookmark.view = function(ctrl) {
    return (@@include('_bookmark.tpl.jsx'));
}

module.exports = Bookmark;
