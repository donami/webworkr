<div class="bookmark-component">

    {ctrl.list().length <= 0 ? <p><em>Du har inga bokmärken</em></p> : null}

    <ul class="item-list">
        {ctrl.list().map(function(bookmark) {
            return <li>
                <a href={'#/jobs/' + bookmark.annonsid}>{bookmark.annonsrubrik}</a>
                <i title="Ta bort bokmärke"
                    class="fa fa-remove pointer"
                    onclick={ctrl.remove.bind(ctrl, bookmark)}>
                </i>
            </li>
        })}
    </ul>

    {ctrl.list().length > 0 ?
        <div class="buttons">
            <button
                class="btn btn-primary save-button"
                onclick={ctrl.save}>
                Spara bokmärken
            </button>

            <button
                class="btn btn-warning clear-button"
                onclick={ctrl.clear}>
                Rensa bokmärken
            </button>
        </div>

        : null
    }

</div>
