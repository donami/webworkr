<div class="container">

    <h1>{ctrl.item().platsannons.annons.annonsrubrik}</h1>

    <div class="row">

        <div class="col-md-8">
            <div>
                <h4>{ctrl.item().platsannons.annons.yrkesbenamning}</h4>
                <p>{ctrl.item().platsannons.annons.annonstext}</p>

                { !ctrl.item().platsannons.krav.egenbil ? 'Egen bil är ett krav' : null }

                <div>På <a href={ctrl.item().platsannons.annons.platsannonsUrl} target="_blank">arbetsförmedlingen</a></div>
            </div>

            <div>

                <h2>Ansökan</h2>
                <p>
                    Ansökan sker <a href={ctrl.item().platsannons.ansokan.webbplats}>här</a> <br/>

                    Sista ansökningsdag: {new Date(ctrl.item().platsannons.ansokan.sista_ansokningsdag).toDateString()}
                </p>

            </div>
        </div>

        <div class="col-md-4">
            <h3>Allmänt</h3>
            <ul class="list-group">
                <li class="list-group-item">Anställningstyp: {ctrl.item().platsannons.annons.anstallningstyp}</li>
                <li class="list-group-item">Antal platser: {ctrl.item().platsannons.annons.antal_platser}</li>
                <li class="list-group-item">Kommun: {ctrl.item().platsannons.annons.kommunnamn}</li>
            </ul>

            <h3>Anställningsvillkor</h3>
            <ul class="list-group">
                <li class="list-group-item">Varaktighet: {ctrl.item().platsannons.villkor.varaktighet}</li>
                <li class="list-group-item">Arbetstid: {ctrl.item().platsannons.villkor.arbetstid}</li>
                <li class="list-group-item">Löneform: {ctrl.item().platsannons.villkor.loneform}</li>
            </ul>

            <h3>Arbetsplats</h3>
            <ul class="list-group">
                <li class="list-group-item">Namn: {ctrl.item().platsannons.arbetsplats.arbetsplatsnamn}</li>
                <li class="list-group-item">Besöksadress: {ctrl.item().platsannons.arbetsplats.besoksadress}</li>
                <li class="list-group-item">Postort: {ctrl.item().platsannons.arbetsplats.postort}</li>
            </ul>
        </div>

    </div>

</div>
