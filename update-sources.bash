#!/usr/bin/env bash

URL="http://api.arbetsformedlingen.se/af/v0/"

WRITTEN=false

# Search for web
if curl --fail -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "${URL}platsannonser/matchning/?nyckelord=web" | jq . > "json/search/web.json"; then
    echo "Data written to 'json/search/web.json"
    WRITTEN=true
else
    echo "Failed when writing to 'json/search/web.json'"
fi

if [ "$WRITTEN" = true ]; then
    arr=( $(jq .matchningslista.matchningdata[].annonsid "json/search/web.json") )

    for id in ${arr[@]}
    do
        # Remove quote in beginning
        id="${id#\"}"
        # Remove quote in end
        id="${id%\"}"

        if curl --fail -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "${URL}platsannonser/$id" | jq . > "json/platsannons/$id.json"; then
            echo "Data written to 'json/platsannons/$id.json'"
        else
            echo "Failed when writing to 'json/platsannons/$id.json'"
        fi
    done
fi
