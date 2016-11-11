#!/usr/bin/env bash

#curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/kommuner?lanid=10"

URL="http://api.arbetsformedlingen.se/af/v0/"

# curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden" | jq . > "json/yrkesomraden.json"


# Todo:
# Need to filter out the ads in the category we are interested in
# then scrape them, to get each individual ad and place them in app/json/platsannons/[id].json



#curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/webb" | jq . > "app/json/yrkesomraden.json"

#curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "http://api.arbetsformedlingen.se/af/v0/platsannonser/6831947" | jq . > "app/json/platsannons/6831947.json"


# Get "yrke"
# curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid=3919" | jq . > "app/json/yrke/3919.json"


# Search for web
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "${URL}platsannonser/matchning/?nyckelord=web" | jq . > "app/json/search/web.json"

arr=( $(jq .matchningslista.matchningdata[].annonsid "app/json/search/web.json") )

for id in ${arr[@]}
do
    # Remove quote in beginning
    id="${id#\"}"
    # Remove quote in end
    id="${id%\"}"

    curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Accept-Language: sv" "${URL}platsannonser/$id" | jq . > "app/json/platsannons/$id.json"
done
