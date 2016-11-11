var Bookmark = {};


/**
 * Bookmark class to handle bookmarked jobs
 */
var Bookmark = function() {
    if (localStorage.getItem('bookmarks')) {
        this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else {
        this.bookmarks = [];
    }
}

/**
 * Add a bookmark
 * @param void
 */
Bookmark.prototype.add = function(bookmark) {
    this.bookmarks.push(bookmark);
}

/**
 * Save the bookmarks in localStorage
 * @return void
 */
Bookmark.prototype.save = function() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
}

/**
 * Return a list of bookmarks
 * @return array
 */
Bookmark.prototype.list = function() {
    return this.bookmarks;
}

/**
 * Clear the bookmarks
 * @return void
 */
Bookmark.prototype.clear = function() {
    this.bookmarks = [];
    localStorage.removeItem('bookmarks');
}

/**
 * Remove bookmark
 * @return void
 */
Bookmark.prototype.remove = function(bookmark) {
    this.bookmarks = this.bookmarks.filter(function(obj) {
        return obj.annonsid != bookmark.annonsid;
    });
}

module.exports = Bookmark;
