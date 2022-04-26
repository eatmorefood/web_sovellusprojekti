# EatMoreFood – ruoan tilauspalveluprojekti 
Tekijät: Jens Eriksson, Antti Moilanen, Elias Pirttikangas ja Katri Rahikkala
<br></br>
## ESITTELY
EatMoreFood on Oulun ammattikorkeakoulun 2. vuoden opiskelijoiden toteuttama sovellusprojekti, jossa tehtiin neljän hengen ryhmätyönä kuvitteellinen ruoan tilauspalvelu. Projektin esikuvina toimivat tosielämän palvelut Wolt ja Foodora. Projektissa toteutettiin web-pohjainen REST API -sovellus, jossa kuluttaja-asiakkaat voivat tilata ruoka-annoksia kotiinkuljetuksella ja ravintolan omistajat voivat luoda tietokantaan ravintolan sekä menun kyseiselle ravintolalle. Jokainen projektiryhmän jäsen toimi projektissa Full Stack -kehittäjänä, työstäen sekä selain- että palvelinpuolta. 

Projektin frontend toteutettiin käyttäen React.js-nimistä JavaScript-kirjastoa ja backend käyttäen Node.js-ajoympäristöä. Sovelluksen tietokannaksi valikoitui PostgreSQL-relaatiotietokantaan pohjautuva Heroku Postgres.
<br></br>
## SOVELLUKSEN KÄYTTÖLIITTYMIEN TOTEUTUS

### ASIAKASKÄYTTÖLIITTYMÄ  

Asiakaskäyttöliittymän yläpalkista löytyvät ravintoloiden hakupalkki sekä linkit asiakastille kirjautumiseen ja sen luomiseen. Etusivun (kuva 1) linkistä “See all restaurants” pääsee suoraan kaikkien ravintoloiden listanäkymään. Yksittäisen ravintolan kortti toimii linkkinä ravintolan omille sivuille. 

Yläpalkin hakutoiminnon kautta tapahtuva haku etsii ravintolaa sen nimen, tyypin ja osoitteen perusteella. Ensimmäiset viisi hakutulosta näytetään korttina suoraan hakupalkin alla. Kortin pohjassa hakutulosten alla on linkki, jonka kautta pääsee kaikkiin hakutuloksiin. 

![Asiakaspuolen käyttöliittymän etusivu, jossa ravintoloiden sivuttaisselaus.](https://user-images.githubusercontent.com/91624045/165097227-583d0a7b-eead-45b1-9872-632f3978d9a1.png)
> **KUVA 1**. Asiakaspuolen käyttöliittymän etusivu, jossa ravintoloiden sivuttaisselaus.

Yläpalkissa näkyvät linkit asiakkaan kirjautumiseen ja rekisteröitymiseen. Kirjautumisnäkymä on toteutettu korttina, joka ponnahtaa silloisen näkymän päälle. Kirjautuminen tapahtuu sähköpostilla ja salasanalla. Myös kirjautumisnäkymässä on linkki rekisteröitymiseen, mikäli asiakkaalla ei ole vielä tiliä. Onnistuneen kirjautumisen jälkeen näkyy sovelluksen oikeassa yläkulmassa pudotusvalikko, jonka kautta pääsee asiakkaan profiiliin. 

Rekisteröityminen taas on jaettu kolmeen eri vaiheeseen, joista ensimmäisessä syötetään käyttäjätiedot lomakkeeseen. Toisen vaiheen näkymässä lomakkeen tiedot tarkistutetaan käyttäjällä ja kolmannessa vaiheessa käyttäjä valitsee itselleen salasanan. Onnistunen kirjautumisen jälkeen näkyvät käyttäjän nimikirjaimet sovelluksen oikeassa yläkulmassa käyttäjäkuvakkeessa (kuva 2), jota klikkaamalla aukeaa käyttäjän profiiliin tai uloskirjautumiseen linkit tarjoava pudotusvalikko. Profiilinäkymässä on kolme välilehteä: henkilökohtaiset tiedot, tilaushistoria ja asetukset. Sovelluksen yrityskäyttöliittymässä on myös kirjautumisen jälkeen samankaltainen käyttäjäkuvake. 
<br></br>

![Yksittäisen ravintolan näkymä, jossa ravintolan kaikki tuotteet on listattu kategorioittain.](https://user-images.githubusercontent.com/91624045/165097374-bffc7621-820e-49a2-be5a-95a29f8e7419.png)
> **KUVA 2**. Yksittäisen ravintolan näkymä, jossa ravintolan kaikki tuotteet on listattu kategorioittain.

Ravintolanäkymän ravintolan tuotekategoriat on listattu sivun vasemmassa laidassa ja kategoriaa klikkaamalla sivu kelaa tuotelistassa kyseisen kategorian kohdalle. Yksittäistä tuotetta klikkaamalla saa kyseisen tuotteen näkymän esiin näytölle. Tuotteen näkymästä kirjautunut asiakas voi lisätä tuotteen ostoskoriin ja muuttaa sen kappalemäärää ostoskorissa. Kuvassa 2 näkyy ostoskorin pikakuvake oikeassa yläkulmassa, koska koriin on lisätty yksi tuote. Pikakuvake näyttää tuotteiden kokonaismäärän ja tuotteiden yhteenlasketun hinnan. Pikakuvaketta klikkaamalla saa koko ostoskorin näkyville. 

Ostoskorissa on listattu kaikki tuotteet. Yksittäisen tuotteen lukumäärää voi ostoskorissa muuttaa, tai sen voi poistaa korista. Ostoskorissa voi nähdä yksittäisen tuotteen kokonaishinnan useamman kappalemäärän osalta. Kori näyttää myös kaikkien tuotteiden yhteenlasketun kappalemäärän ja hinnan painikkeessa, jonka kautta voi siirtyä tilauksen viimeistelyyn (kuva 3). 
<br></br>

![Tilauksen viimeistelynäkymä.](https://user-images.githubusercontent.com/91624045/165097473-392fdb37-c1ee-4f26-8021-169506f3dd0a.png)
> **KUVA 3**. Tilauksen viimeistelynäkymä.

Tilauksen viimeistelynäkymän pudotusvalikosta voi valita tuotteelle toimitusosoitteeksi joko asiakkaan vakio-osoitteen tai uuden osoitteen. Näkymässä on myös listattu kaikki ostoskorissa olevat tuotteet sekä yksittäisen tuotteen lukumäärä ja kokonaishinta sekä maksut, josta se koostuu. Sivulla on kaksi painiketta, joiden kautta pääsee takaisin ravintolan omalle sivulle muokkaamaan ostoskoria. Viimeistelynäkymässä on nähtävillä myös tilauksen kokonaishinta sekä mistä maksut, joista se koostuu. Näkymässä on ”Proceed to payment” -painike, jonka kautta pääsee tilauksen maksuun. Maksu tapahtuu syöttämällä asiakkaan kirjautumistunnukset eli sähköposti ja salasana. Onnistuneesta maksusta tulee näytölle ponnahdusilmoitus ja asiakas ohjataan palvelun etusivulle. 
<br></br>

### YRITYSKÄYTTÖLIITTYMÄ  

Sovelluksen yrityskäyttöliittymään (kuva 4) pääsee asiakassovelluksen alapalkista löytyvästä linkistä ”For businesses”. Yrityskäyttöliittymässä ravintolanomistajat voivat rekisteröidä oman ravintolansa ja saattaa sen asiakaskäyttöliittymän tilausjärjestelmään. Yrityskäyttöliittymässä on asiakaskäyttöliittymää vastaava kolmivaiheinen rekisteröityminen ja liittymän alapalkissa on linkki asiakaskäyttöliittymän sivustolle. 

![Sovelluksen yrityskäyttöliittymän etusivu.](https://user-images.githubusercontent.com/91624045/165097558-cad6ba15-9324-4ba1-943d-a1e3fc1791c6.png)
> **KUVA 4**. Sovelluksen yrityskäyttöliittymän etusivu.

Ravintolan tuotenäkymässä (kuva 5) on listattuna kaikki ravintolan tuotteet sekä painikkeet uuden tuotteen lisäämiselle tai olemassa olevan tuotteen muokkaamiselle. Yksittäisen tuotteen muokkausnäkymässä on lomake, jonka tietokenttiin haetaan olemassa olevan tuotteen tiedot. Näkymässä tuotteen tietoja tai kuvaa voi muuttaa tai tuotteen voi kokonaan poistaa. Uuden tuotteen lisääminen tapahtuu vastaavanlaisessa näkymässä. 
<br></br>

![Ravintolan tuotenäkymä, joka aukeaa onnistuneen yrityspuolelle kirjautumisen jälkeen.](https://user-images.githubusercontent.com/91624045/165097640-987133dd-e7af-4741-8a0f-558838d2cfbb.png)
> **KUVA 5**. Ravintolan tuotenäkymä, joka aukeaa onnistuneen yrityspuolelle kirjautumisen jälkeen.
<br></br>

## SOVELLUKSEN KÄYTTÖÖNOTTO
[Sovelluksen demo](http://eat-more-food.herokuapp.com/ "Sovelluksen demon linkki") pyörii Heroku -palvelussa.
