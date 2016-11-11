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
    return (<div class="container">

    <h1>Tillgängliga jobb</h1>

    <div class="row">

        <div class="col-md-7">

            <ul class="list-group">

                {ctrl.list().map(function(job) {
                    return <li class="list-group-item">
                        <h4>
                            {job.bookmarked() ?
                                <i title="Ta bort bokmärke"
                                    class="fa fa-bookmark pointer bookmark float-r"
                                    onclick={ctrl.removeBookmark.bind(ctrl, job)}>
                                </i> :

                                <i title="Lägg till bokmärke"
                                    class="fa fa-bookmark-o pointer bookmark float-r"
                                    onclick={ctrl.addBookmark.bind(ctrl, job)}>
                                </i>
                            }

                            <a href={"#/jobs/" + job.annonsid}>{job.annonsrubrik}</a> &nbsp;
                        </h4>

                        <p>{job.yrkesbenamning}, {job.kommunnamn}</p>


                    </li>
                })}

            </ul>

        </div>

        <div class="col-md-5">

            <div>
                <h2>Bookmärken</h2>
                {ctrl.getBookmarks().map(function(bookmark) {
                    return <div>
                        {bookmark.annonsrubrik} &nbsp;
                        <i title="Ta bort bokmärke"
                            class="fa fa-remove pointer"
                            onclick={ctrl.removeBookmark.bind(ctrl, bookmark)}>
                        </i>
                    </div>
                })}

                {ctrl.getBookmarks().length > 0 ?
                    <div>
                        <button
                            class="btn btn-primary"
                            onclick={ctrl.saveBookmarks}>
                            Spara bokmärken
                        </button>

                        <button
                            class="btn btn-warning"
                            onclick={ctrl.clearBookmarks}>
                            Rensa bokmärken
                        </button>
                    </div>

                    : null
                }
            </div>

        </div>

    </div>

</div>
);
};

module.exports = Jobs;
