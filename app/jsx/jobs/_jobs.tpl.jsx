<div class="container">

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
