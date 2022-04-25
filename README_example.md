# EatMoreFood - web-ohjelmoinnin sovellusprojekti / Oulun ammattikorkeakoulu 

<br></br>

## ESITTELY
EatMoreFood on Oulun ammattikorkeakoulun 2. vuoden opiskelijoiden toteuttama sovellusprojekti, jossa tehtiin neljän hengen ryhmätyönä kuvitteellinen ruoan tilauspalvelu. Projektin esikuvina toimivat tosielämän palvelut Wolt ja Foodora. Projektissa toteutettiin web-pohjainen REST API-sovellus, jossa kuluttaja-asiakkaat voivat tilata ruoka-annoksia kotiinkuljetuksella ja ravintolan omistajat voivat luoda tietokantaan ravintolan sekä menun kyseiselle ravintolalle. Jokainen projektiryhmän jäsen toimi projektissa Full Stack -kehittäjänä, työstäen sekä selain- että palvelinpuolta. 

Projektin frontend (selainpuoli) toteutettiin käyttäen React.js -nimistä JavaScript-kirjastoa (https://en.wikipedia.org/wiki/React_(JavaScript_library)) ja backend  (palvelinosio) käyttäen Node.js-ajoympäristöä (https://fi.wikipedia.org/wiki/Node.js). Sovelluksen tietokannaksi valikoitui PostgreSQL -relaatiotietokantaan pohjautuva Heroku Postgres.

<br></br>

## SOVELLUKSEN TOTEUTUS
![Asiakaspuolen käyttöliittymän etusivu, jossa ravintoloiden sivuttaisselaus. Yläpalkista löytyvät ravintoloiden hakupalkki, sekä linkit asiakastille kirjautumiseen ja sen luomiseen.](https://user-images.githubusercontent.com/91624045/165084345-407e20f4-9da1-4425-806c-10aded62b8a4.png "Kuva 1.")
> **Kuva 1 (yllä)**. Asiakaspuolen käyttöliittymän etusivu, jossa ravintoloiden sivuttaisselaus. Yläpalkista löytyvät ravintoloiden hakupalkki, sekä linkit asiakastille kirjautumiseen ja sen luomiseen.

<br></br>

![Etusivun linkistä pääsee suoraan kaikkien ravintoloiden listanäkymään. Yksittäisen ravintolan kortti toimii linkkinä ravintolan omille sivuille.](https://user-images.githubusercontent.com/91624045/165084395-bb2319b7-7dd4-4926-9767-3a4666a0a477.png "Kuva 2")
> Kuva 2. Etusivun linkistä pääsee suoraan kaikkien ravintoloiden listanäkymään. Yksittäisen ravintolan kortti toimii linkkinä ravintolan omille sivuille.

<br></br>

![Hakupalkin kautta tapahtuva haku etsii ravintolaa sen nimen, tyypin ja osoitteen perusteella. Ensimmäiset viisi hakutulosta näytetään, joiden jälkeen on linkki kaikkiin hakutuloksiin.](https://user-images.githubusercontent.com/91624045/165084424-862c6e40-3233-4985-9d60-18af7cf1f444.png "Kuva 3")
> Kuva 3. Hakupalkin kautta tapahtuva haku etsii ravintolaa sen nimen, tyypin ja osoitteen perusteella. Ensimmäiset viisi hakutulosta näytetään, joiden jälkeen on linkki kaikkiin hakutuloksiin.

<br></br>

![Kirjautumisnäkymä on toteutettu korttina, joka ponnahtaa silloisen näkymän päälle. Kirjautuminen tapahtuu sähköpostilla ja salasanalla. Näkymässä on myös linkki rekisteröitymiseen, mikäli asiakkaalla ei ole vielä tiliä. Onnistunen kirjautumisen jälkeen näkyy sovelluksen oikeassa yläkulmassa pudotusvalikko, jonka kautta pääsee asiakkaan profiiliin (katso kuva 5)](https://user-images.githubusercontent.com/91624045/165084448-a7ef7a74-93eb-4e37-baca-c63ee7656f3d.png "Kuva 4")
> Kuva 4. Kirjautumisnäkymä on toteutettu korttina, joka ponnahtaa silloisen näkymän päälle. Kirjautuminen tapahtuu sähköpostilla ja salasanalla. Näkymässä on myös linkki rekisteröitymiseen, mikäli asiakkaalla ei ole vielä tiliä. Onnistunen kirjautumisen jälkeen näkyy sovelluksen oikeassa yläkulmassa pudotusvalikko, jonka kautta pääsee asiakkaan profiiliin (katso kuva 5).

<br></br>

![Asiakkaan profiilinäkymä, jossa on kolme välilehteä: henkilökohtaiset tiedot, tilaushistoria ja asetukset. Sovelluksen yrityspuolella (katso kuva 11) on myös samankaltainen yrityksen profiilinäkymä](https://user-images.githubusercontent.com/91624045/165084473-8a76764b-dff1-4acf-af1b-639325fd3a4b.png "Kuva 5")
> Kuva 5. Asiakkaan profiilinäkymä, jossa on kolme välilehteä: henkilökohtaiset tiedot, tilaushistoria ja asetukset. Sovelluksen yrityspuolella (katso kuva 11) on myös samankaltainen yrityksen profiilinäkymä.

<br></br>

![Rekisteröityminen on jaettu kolmeen eri vaiheeseen, joista ensimmäisessä syötetään käyttäjätiedot lomakkeeseen. Toisen vaiheen näkymässä lomakkeen tiedot tarkistutetaan käyttäjällä ja kolmannessa vaiheessa käyttäjä valitsee itselleen salasanan](https://user-images.githubusercontent.com/91624045/165084502-6231641a-d4fa-44ab-8b3f-f8d3142a10c9.png "Kuva 6")
> Kuva 6. Rekisteröityminen on jaettu kolmeen eri vaiheeseen, joista ensimmäisessä syötetään käyttäjätiedot lomakkeeseen. Toisen vaiheen näkymässä lomakkeen tiedot tarkistutetaan käyttäjällä ja kolmannessa vaiheessa käyttäjä valitsee itselleen salasanan.

<br></br>

![Yksittäisen ravintolan näkymä, jossa ravintolan kaikki tuotteet on listattu kategorioittain. Kategoriat on listattu sivun vasemmassa laidassa ja kategoriaa klikkaamalla sivu kelaa tuotelistassa kyseisen kategorian kohdalle. Yksittäistä tuotetta klikkaamalla saa kyseisen tuotteen näkymän esiin näytölle. Tuotteen näkymästä kirjautunut asiakas voi lisätä tuotteen ostoskoriin ja muuttaa sen kappalemäärää ostoskorissa. Kuvassa 7 näkyy ostoskorin pikakuvake oikeassa yläkulmassa, koska koriin on lisätty yksi tuote. Pikakuvake näyttää tuotteiden kokonaismäärän ja tuotteiden yhteenlasketun hinnan. Pikakuvaketta klikkaamalla saa koko ostoskorin näkyville.](https://user-images.githubusercontent.com/91624045/165084532-b527f2e7-173c-48f8-b056-ab7725e238fd.png "Kuva 7")
> Kuva 7. Yksittäisen ravintolan näkymä, jossa ravintolan kaikki tuotteet on listattu kategorioittain. Kategoriat on listattu sivun vasemmassa laidassa ja kategoriaa klikkaamalla sivu kelaa tuotelistassa kyseisen kategorian kohdalle. Yksittäistä tuotetta klikkaamalla saa kyseisen tuotteen näkymän esiin näytölle. Tuotteen näkymästä kirjautunut asiakas voi lisätä tuotteen ostoskoriin ja muuttaa sen kappalemäärää ostoskorissa. Kuvassa 7 näkyy ostoskorin pikakuvake oikeassa yläkulmassa, koska koriin on lisätty yksi tuote. Pikakuvake näyttää tuotteiden kokonaismäärän ja tuotteiden yhteenlasketun hinnan. Pikakuvaketta klikkaamalla saa koko ostoskorin näkyville.

<br></br>

![Koko ostoskorin näkymä, jossa tuotteet listattu. Yksittäisen tuotteen lukumäärää voi muuttaa, tai sen voi poistaa korista. Ostoskorissa voi nähdä yksittäisen tuotteen kaikkien kappalemäärien kokonaishinnan. Kori näyttää myös kaikkien tuotteiden yhteenlasketun määrän ja hinnan painikkeessa, jonka kautta voi siirtyä tilauksen viimeistelyyn. ](https://user-images.githubusercontent.com/91624045/165084569-38b21ffb-ac1d-4d3f-a8d0-ed35037a9610.png "Kuva 8")
> Kuva 8. Koko ostoskorin näkymä, jossa tuotteet listattu. Yksittäisen tuotteen lukumäärää voi muuttaa, tai sen voi poistaa korista. Ostoskorissa voi nähdä yksittäisen tuotteen kaikkien kappalemäärien kokonaishinnan. Kori näyttää myös kaikkien tuotteiden yhteenlasketun määrän ja hinnan painikkeessa, jonka kautta voi siirtyä tilauksen viimeistelyyn. 

<br></br>

![Tilauksen viimeistelynäkymä, jossa pudotusvalikosta voi valita tuotteelle toimitusosoitteeksi joko asiakkaan vakio-osoitteen tai uuden osoitteen. Näkymässä on myös listattu kaikki ostoskorissa olevat tuotteet sekä yksittäisen tuotteen lukumäärä ja sen kaikkien kappalemäärien kokonaishinta. Sivulla on kaksi painiketta, joiden kautta pääsee takaisin ravintolan omalle sivulle muokkaamaan ostoskoria. Viimeistelynäkymässä on nähtävillä myös tilauksen kokonaishinta, sekä mistä maksuista se koostuu. Näkymässä on “Proceed to payment” -painike, jonka kautta pääsee tilauksen maksuun. Maksu tapahtuu syöttämällä asiakkaan kirjautumistunnukset, eli sähköposti ja salasana. Onnistuneesta maksusta tulee näytölle ponnahdusilmoitus ja asiakas ohjataan palvelun etusivulle (kuva 1).](https://user-images.githubusercontent.com/91624045/165084592-b203bd40-70a3-49c6-99c0-a204213701cd.png "Kuva 9")
> Kuva 9. Tilauksen viimeistelynäkymä, jossa pudotusvalikosta voi valita tuotteelle toimitusosoitteeksi joko asiakkaan vakio-osoitteen tai uuden osoitteen. Näkymässä on myös listattu kaikki ostoskorissa olevat tuotteet sekä yksittäisen tuotteen lukumäärä ja sen kaikkien kappalemäärien kokonaishinta. Sivulla on kaksi painiketta, joiden kautta pääsee takaisin ravintolan omalle sivulle muokkaamaan ostoskoria. Viimeistelynäkymässä on nähtävillä myös tilauksen kokonaishinta, sekä mistä maksuista se koostuu. Näkymässä on “Proceed to payment” -painike, jonka kautta pääsee tilauksen maksuun. Maksu tapahtuu syöttämällä asiakkaan kirjautumistunnukset, eli sähköposti ja salasana. Onnistuneesta maksusta tulee näytölle ponnahdusilmoitus ja asiakas ohjataan palvelun etusivulle (kuva 1).

<br></br>

![Asiakassovelluksen alaviitteistä löytyy linkki “For businesses”, joka johtaa sovelluksen yrityspuolelle. Yrityspuolella ravintolanomistajat voivat rekisteröidä oman ravintolansa asiakaspuolen tilauspalveluun.](https://user-images.githubusercontent.com/91624045/165084643-42f69ffa-4cb9-42d1-b5e9-b5174ee926ca.png "Kuva 10")
> Kuva 10. Asiakassovelluksen alaviitteistä löytyy linkki “For businesses”, joka johtaa sovelluksen yrityspuolelle. Yrityspuolella ravintolanomistajat voivat rekisteröidä oman ravintolansa asiakaspuolen tilauspalveluun.

<br></br>

![Kuva 11. Sovelluksen yrityspuoli, jossa ravintolanomistaja voi rekisteröidä ravintolansa ja saattaa sen asiakaspuolen tilausjärjestelmään. Yrityspuolella on asiakaspuolta vastaava kolmivaiheinen rekisteröityminen. Yrityspuolen sivun alaviitteissä on linkki asiakaspuolen sivustolle.](https://user-images.githubusercontent.com/91624045/165084682-192d57e2-489b-4cf6-bbfc-fb001e17f779.png "Kuva 11")
Kuva 11. Sovelluksen yrityspuoli, jossa ravintolanomistaja voi rekisteröidä ravintolansa ja saattaa sen asiakaspuolen tilausjärjestelmään. Yrityspuolella on asiakaspuolta vastaava kolmivaiheinen rekisteröityminen. Yrityspuolen sivun alaviitteissä on linkki asiakaspuolen sivustolle.

<br></br>

![Ravintolan tuotenäkymä, joka aukeaa, kun ravintolan tunnuksilla kirjaudutaan yrityspuolelle. Näkymässä on listattuna kaikki ravintolan tuotteet (nimi, kuvaus, kategoria, hinta ja kuva) sekä painikkeet uuden tuotteen lisäämiselle tai olemassa olevan tuotteen muokkaamiselle.](https://user-images.githubusercontent.com/91624045/165084715-6eb2d0dd-6cc4-41c7-94fa-41e0045c664e.png "Kuva 12")
> Kuva 12. Ravintolan tuotenäkymä, joka aukeaa, kun ravintolan tunnuksilla kirjaudutaan yrityspuolelle. Näkymässä on listattuna kaikki ravintolan tuotteet (nimi, kuvaus, kategoria, hinta ja kuva) sekä painikkeet uuden tuotteen lisäämiselle tai olemassa olevan tuotteen muokkaamiselle.

<br></br>

![Tuotteen muokkausnäkymä, jossa lomakkeen tietokenttiin haetaan olemassa olevan tuotteen tiedot. Näkymässä tuotteen tietoja tai kuvaa voi muuttaa tai tuotteen voi kokonaan poistaa. Uuden tuotteen lisääminen tapahtuu vastaavanlaisessa näkymässä.](https://user-images.githubusercontent.com/91624045/165084734-2057417a-a00b-45a1-9e0d-449c2b0f94ea.png "Kuva 13")
> Kuva 13. Tuotteen muokkausnäkymä, jossa lomakkeen tietokenttiin haetaan olemassa olevan tuotteen tiedot. Näkymässä tuotteen tietoja tai kuvaa voi muuttaa tai tuotteen voi kokonaan poistaa. Uuden tuotteen lisääminen tapahtuu vastaavanlaisessa näkymässä.

<br></br>

## SOVELLUKSEN KÄYTTÖÖNOTTO
Sovelluksen demo pyörii Heroku -palvelussa osoitteessa http://eat-more-food.herokuapp.com/.
