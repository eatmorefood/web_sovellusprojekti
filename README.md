# EatMoreFood - web-ohjelmoinnin sovellusprojekti / Oulun ammattikorkeakoulu 
Tekijät: Jens Eriksson, Antti Moilanen, Elias Pirttikangas ja Katri Rahikkala TVT21KMO
<br></br>
## ESITTELY
EatMoreFood on Oulun ammattikorkeakoulun 2. vuoden opiskelijoiden toteuttama sovellusprojekti, jossa tehtiin neljän hengen ryhmätyönä kuvitteellinen ruoan tilauspalvelu. Projektin esikuvina toimivat tosielämän palvelut Wolt ja Foodora. Projektissa toteutettiin web-pohjainen REST API-sovellus, jossa kuluttaja-asiakkaat voivat tilata ruoka-annoksia kotiinkuljetuksella ja ravintolan omistajat voivat luoda tietokantaan ravintolan sekä menun kyseiselle ravintolalle. Jokainen projektiryhmän jäsen toimi projektissa Full Stack -kehittäjänä, työstäen sekä selain- että palvelinpuolta. 

Projektin frontend (selainpuoli) toteutettiin käyttäen React.js -nimistä JavaScript-kirjastoa (https://en.wikipedia.org/wiki/React_(JavaScript_library)) ja backend  (palvelinpuoli) käyttäen Node.js-ajoympäristöä (https://fi.wikipedia.org/wiki/Node.js). Sovelluksen tietokannaksi valikoitui PostgreSQL -relaatiotietokantaan pohjautuva Heroku Postgres.
<br></br>
## SOVELLUKSEN TOTEUTUS
![Kuva 1](https://user-images.githubusercontent.com/91624045/165097227-583d0a7b-eead-45b1-9872-632f3978d9a1.png "Kuva 1.")
> **Kuva 1 (yllä)**. Asiakaspuolen käyttöliittymän etusivu, jossa ravintoloiden sivuttaisselaus.

Yläpalkista (header) löytyvät ravintoloiden hakupalkki, sekä linkit asiakastille kirjautumiseen ja sen luomiseen. Etusivun linkistä “See all restaurants” pääsee suoraan kaikkien ravintoloiden listanäkymään. Yksittäisen ravintolan kortti toimii linkkinä ravintolan omille sivuille.

Yläpalkin hakutoiminnon kautta tapahtuva haku etsii ravintolaa sen nimen, tyypin ja osoitteen perusteella. Ensimmäiset viisi hakutulosta näytetään korttina suoraan hakupalkin alla. Kortin pohjassa hakutulosten alla on linkki, jonka kautta pääsee kaikkiin hakutuloksiin.

Yläpalkissa näkyvät linkit asiakkaan kirjautumiseen ja rekisteröitymiseen. Kirjautumisnäkymä on toteutettu korttina, joka ponnahtaa silloisen näkymän päälle. Kirjautuminen tapahtuu sähköpostilla ja salasanalla. Myös kirjautumisnäkymässä on linkki rekisteröitymiseen, mikäli asiakkaalla ei ole vielä tiliä. Onnistunen kirjautumisen jälkeen näkyy sovelluksen oikeassa yläkulmassa pudotusvalikko, jonka kautta pääsee asiakkaan profiiliin.

Rekisteröityminen taas on jaettu kolmeen eri vaiheeseen, joista ensimmäisessä syötetään käyttäjätiedot lomakkeeseen. Toisen vaiheen näkymässä lomakkeen tiedot tarkistutetaan käyttäjällä ja kolmannessa vaiheessa käyttäjä valitsee itselleen salasanan. Onnistunen kirjautumisen jälkeen näkyvät käyttäjän nimikirjaimet sovelluksen oikeassa yläkulmassa käyttäjäkuvakkeessa (katso kuva 2), jota klikkaamalla aukeaa käyttäjän profiiliin tai uloskirjautumiseen linkit tarjoava pudotusvalikko. Profiilinäkymässä on kolme välilehteä: henkilökohtaiset tiedot, tilaushistoria ja asetukset. Sovelluksen yrityspuolella (katso kuva 4) on myös kirjautumisen jälkeen samankaltainen käyttäjäkuvake.
<br></br>

![Kuva 2](https://user-images.githubusercontent.com/91624045/165097374-bffc7621-820e-49a2-be5a-95a29f8e7419.png "Kuva 2")
> **Kuva 2**. Yksittäisen ravintolan näkymä, jossa ravintolan kaikki tuotteet on listattu kategorioittain.

Ravintolanäkymän ravintolan tuotekategoriat on listattu sivun vasemmassa laidassa ja kategoriaa klikkaamalla sivu kelaa tuotelistassa kyseisen kategorian kohdalle. Yksittäistä tuotetta klikkaamalla saa kyseisen tuotteen näkymän esiin näytölle. Tuotteen näkymästä kirjautunut asiakas voi lisätä tuotteen ostoskoriin ja muuttaa sen kappalemäärää ostoskorissa. Kuvassa 2 näkyy ostoskorin pikakuvake oikeassa yläkulmassa, koska koriin on lisätty yksi tuote. Pikakuvake näyttää tuotteiden kokonaismäärän ja tuotteiden yhteenlasketun hinnan. Pikakuvaketta klikkaamalla saa koko ostoskorin näkyville.

Ostoskorissa on listattu kaikki tuotteet. Yksittäisen tuotteen lukumäärää voi ostoskorissa muuttaa, tai sen voi poistaa korista. Ostoskorissa voi nähdä yksittäisen tuotteen kaikkien kappalemäärien kokonaishinnan. Kori näyttää myös kaikkien tuotteiden yhteenlasketun määrän ja hinnan painikkeessa, jonka kautta voi siirtyä tilauksen viimeistelyyn.
<br></br>

![Kuva 3](https://user-images.githubusercontent.com/91624045/165097473-392fdb37-c1ee-4f26-8021-169506f3dd0a.png "Kuva 3")
> **Kuva 3**. Tilauksen viimeistelynäkymä.

Tilauksen viimeistelynäkymän pudotusvalikosta voi valita tuotteelle toimitusosoitteeksi joko asiakkaan vakio-osoitteen tai uuden osoitteen. Näkymässä on myös listattu kaikki ostoskorissa olevat tuotteet sekä yksittäisen tuotteen lukumäärä ja sen kaikkien kappalemäärien kokonaishinta. Sivulla on kaksi painiketta, joiden kautta pääsee takaisin ravintolan omalle sivulle muokkaamaan ostoskoria. Viimeistelynäkymässä on nähtävillä myös tilauksen kokonaishinta, sekä mistä maksuista se koostuu. Näkymässä on “Proceed to payment” -painike, jonka kautta pääsee tilauksen maksuun. Maksu tapahtuu syöttämällä asiakkaan kirjautumistunnukset, eli sähköposti ja salasana. Onnistuneesta maksusta tulee näytölle ponnahdusilmoitus ja asiakas ohjataan palvelun etusivulle (kuva 1).
<br></br>

![Kuva 4](https://user-images.githubusercontent.com/91624045/165097558-cad6ba15-9324-4ba1-943d-a1e3fc1791c6.png "Kuva 4")
> **Kuva 4**. Sovelluksen yrityspuolen etusivu.

Sovelluksen yrityspuolelle pääsee asiakassovelluksen alapalkista (footer) löytyvästä linkistä “For businesses”. Yrityspuolella ravintolanomistajat voivat rekisteröidä oman ravintolansa ja saattaa sen asiakaspuolen tilausjärjestelmään. Yrityspuolella on asiakaspuolta vastaava kolmivaiheinen rekisteröityminen. Yrityspuolen sivun alapalkissa on linkki asiakaspuolen sivustolle.
<br></br>

![Kuva 5](https://user-images.githubusercontent.com/91624045/165097640-987133dd-e7af-4741-8a0f-558838d2cfbb.png "Kuva 5")
> **Kuva 5**. Ravintolan tuotenäkymä, joka aukeaa, kun ravintolan tunnuksilla kirjaudutaan yrityspuolelle.

Ravintolan tuotenäkymässä on listattuna kaikki ravintolan tuotteet sekä painikkeet uuden tuotteen lisäämiselle tai olemassa olevan tuotteen muokkaamiselle. Yksittäisen tuotteen muokkausnäkymässä on lomake, jonka tietokenttiin haetaan olemassa olevan tuotteen tiedot. Näkymässä tuotteen tietoja tai kuvaa voi muuttaa tai tuotteen voi kokonaan poistaa. Uuden tuotteen lisääminen tapahtuu vastaavanlaisessa näkymässä.
<br></br>

## SOVELLUKSEN KÄYTTÖÖNOTTO
Sovelluksen demo pyörii Heroku -palvelussa osoitteessa http://eat-more-food.herokuapp.com/.
<br></br>
### 😄 `HAPPY TESTING` 😄
