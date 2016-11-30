<div class="container">

    <h1 class="page-title">Hitta jobb</h1>

    <div class="row">

        <div class="col-md-7">

            <div class="box">
                <h2>Tillgängliga jobb ({ctrl.list().filter(ctrl.visible).length})</h2>

                <div class="form-group">
                    <label>Filtrera på annonsnamn</label>
                    <input type="text"
                        class="form-control"
                        value={ctrl.searchTerm()}
                        oninput={m.withAttr("value", ctrl.searchTerm)}
                        placeholder="Snabb filter"/>
                </div>

                {ctrl.hasFilter('cities') ?
                    <div class="tags">
                        <h5><strong>Städer</strong></h5>
                        {ctrl.filterList.cities().map(function(city) {
                            return <div
                                onclick={ctrl.removeFilter.bind(ctrl, city(), 'cities')}
                                class="tag pointer">
                                    {city()} <i class="fa fa-times" aria-hidden="true"></i>
                                </div>
                        })}
                    </div>
                    : null
                }

                {ctrl.hasFilter('workTitles') ?
                    <div class="tags">
                        <h5><strong>Yrke</strong></h5>
                        {ctrl.filterList.workTitles().map(function(title) {
                            return <div
                                onclick={ctrl.removeFilter.bind(ctrl, title(), 'workTitles')}
                                class="tag pointer">
                                    {title()} <i class="fa fa-times" aria-hidden="true"></i>
                                </div>
                        })}
                    </div>
                    : null
                }

                <ul class="list-group">

                    {ctrl.list().filter(ctrl.visible).map(function(job) {
                        return <li class="list-group-item">
                            <h4>
                                {job.bookmarked() ?
                                    <i title="Ta bort bokmärke"
                                        class="fa fa-bookmark pointer bookmark float-r"
                                        onclick={ctrl.bookmark.remove.bind(ctrl.bookmark, job)}>
                                    </i> :

                                    <i title="Lägg till bokmärke"
                                        class="fa fa-bookmark-o pointer bookmark float-r"
                                        onclick={ctrl.bookmark.add.bind(ctrl.bookmark, job)}>
                                    </i>
                                }

                                <a href={"#/jobs/" + job.annonsid}>{job.annonsrubrik}</a> &nbsp;
                            </h4>

                            <p>
                                {job.yrkesbenamning},&nbsp;

                                <span
                                    class="pointer"
                                    onclick={m.withAttr("innerHTML", ctrl.setSearchTerm)}>
                                        {job.kommunnamn}
                                </span>

                            </p>


                        </li>
                    })}

                </ul>

                {ctrl.list().filter(ctrl.visible).length <= 0 ?
                    <div>Vi hittade inga annonser matchade din filtrering</div> : null
                }

            </div>

        </div>

        <div class="col-md-5">

            <div class="box">

                <div>
                    <h2>Bookmärken</h2>

                    {bookmark.view(ctrl.bookmark)}
                </div>

            </div>

            <div class="box">
                <button class="btn btn-primary btn-sm pull-right"
                    onclick={ctrl.clearFilter}>
                        <i class="fa fa-times" aria-hidden="true"></i> Rensa
                </button>

                <h2>Filter</h2>

                <h4>Kommuner</h4>
                <div class="tags">
                    {ctrl.cities().map(function(city) {
                        return <div
                            class="tag pointer"
                            onclick={ctrl.addFilter.bind(ctrl, city, 'cities')}>
                                {city}
                        </div>
                    })}
                </div>

                <h4>Yrkestyp</h4>
                <div class="tags">
                    {ctrl.workTitle().map(function(title) {
                        return <div
                            class="tag pointer"
                            onclick={ctrl.addFilter.bind(ctrl, title, 'workTitles')}>
                            {title}
                        </div>
                    })}
                </div>

            </div>

        </div>

    </div>

</div>
