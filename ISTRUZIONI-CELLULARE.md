# Uso dal cellulare senza PC

Questa demo e pronta per essere caricata come sito statico/PWA.

## Metodo consigliato

1. Carica il contenuto della cartella `catalogo-interattivo` su un hosting statico.
2. Apri il link generato dal telefono.
3. Salva la web-app nella schermata Home.

Su Android/Chrome:

`Menu` > `Aggiungi a schermata Home`

Su iPhone/Safari:

`Condividi` > `Aggiungi alla schermata Home`

## Pacchetto pronto

Nella cartella principale del progetto viene generato questo file:

`catalogo-interattivo-webapp.zip`

Il file ZIP deve contenere `index.html` in radice. Se il servizio di hosting chiede di trascinare una cartella o un file ZIP, usa questo pacchetto.

## Note

- Il catalogo funziona come web-app installabile solo se pubblicato su `https://` o su un dominio locale sicuro.
- Dopo il primo caricamento online, i file principali vengono salvati nella cache del telefono.
- Per l'invio email definitivo e il salvataggio allegati reali servirà una piccola parte server quando passeremo dalla demo alla versione definitiva.
