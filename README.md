# Dokumentation

Bash-filen som hämtar JSON data från API:et är update_sources.bash och körs.

./update_sources.bash

Skriptet skriver ut om datan skrevs till JSON filen korrekt.

Den använder sig utav jq för att söka i datan.

Projektet använder sig utav Mithril. Jag använder även en del andra paket.

Grunt används för att köra dev-servern med node och bygga till dist/.

"grunt serve" - kör dev server
"grunt build" - deployment

dist/ är sedan den mapp där projektet kommer köras från på studentservern, men de andra filerna kommer finnas i en mapp så man kan gå igenom koden eftersom jag gör om den till en fil som läses in.

För att hantera template/view så använder jag mig utav MSX (JSX).
MSX är en lösning utvecklad för Mithril som gör att man kan i princip använda sig utav React's JSX.  

Stilen körs genom sass och filerna finns i app/styles/\*.scss.

JSON filerna som sidan använder finns i /app/json

För att kör dev-servern används "grunt serve".

För att deploya "grunt build".
