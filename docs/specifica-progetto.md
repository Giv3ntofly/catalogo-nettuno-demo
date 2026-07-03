# Catalogo ordini Nettuno 2026 - specifica iniziale

## Obiettivo

Creare un catalogo interattivo per clienti registrati, pensato per professionisti, che permetta di:

- consultare il catalogo PDF;
- navigare per categoria e modello;
- scegliere codice, misura, colore telo e lavorazioni compatibili;
- aggiungere gli articoli a un carrello;
- salvare carrelli parziali;
- generare un PDF riepilogativo da inviare via email.

Nel primo rilascio non sono presenti prezzi. Il carrello produce quindi una richiesta ordine/preventivo. In futuro, inserendo listini e regole prezzo, lo stesso flusso potra generare preventivi gia valorizzati.

## Decisioni confermate

- Lingua: solo italiano.
- Accesso: solo clienti registrati.
- Prezzi: non visibili nella prima versione.
- Invio: inizialmente alla mail interna del referente; in seguito direttamente all'azienda Nettuno.
- Output: PDF riepilogativo ordine/preventivo.
- Colore telo: obbligatorio per tendalini e coperture.
- Riferimento ordine: campo per ogni articolo, utile per indicare barca, posto barca, armatore o codice interno cliente.
- Allegati: possibilita di associare file PDF agli articoli.
- Note custom: campo libero per prodotti su misura e modifiche richieste.
- Teli di prolunga: selezionabili per posizione solo nei modelli compatibili.
- Laterali: dove previsto, il laterale puo essere ordinato destro, sinistro o entrambi usando lo stesso codice.
- Rete microforata: usata solo per teli di prolunga ombreggianti; il colore resta obbligatorio.
- Combinazioni incompatibili: da bloccare, non solo segnalare.
- Lavorazioni custom: categoria consultabile, ma selezionabili solo dentro configurazioni permesse.
- Catalogo PDF: consultabile e scaricabile.

## Flusso utente

1. Il cliente registrato accede al catalogo.
2. Sceglie una categoria.
3. Apre una scheda prodotto.
4. Seleziona codice/misura.
5. Se richiesto, seleziona il colore telo.
6. Aggiunge eventuali lavorazioni compatibili.
7. Compila riferimento ordine, note e allegati PDF.
8. Aggiunge al carrello.
9. Salva il carrello parziale oppure genera il PDF riepilogativo.
10. Prepara l'email di invio.

## Struttura categorie

- Bimini
- Roll Bar
- T-Top
- Coperture
- Accessori per Tendalino
- Accessori Inox
- Accessori Nylon
- Accessori Roll Bar e T-Top
- Lavorazioni custom
- Telai
- Tubi
- Tessuti
- Accessori tappezzeria

Accessori Inox e Accessori Nylon restano separati, ma collegati alla macrocategoria Accessori per Tendalino.

## Dati prodotto

Il prototipo contiene una base dati iniziale, presa dal PDF 2026, non un'importazione completa dell'intero catalogo.

Esempi gia strutturati:

- Majestic
- Exclusive
- Royal 4 archi
- Prestige
- Epic Inox
- Copriconsolle
- Coprimotori
- Copriranda
- Puntoni
- Tenditori
- Snodo a forcella inox
- Supporto a forcella piatto con perno sfilabile
- Luci per Roll Bar e T-Top
- Tubi acciaio inox
- Rete ombreggiante Serge Ferrari
- Telai su misura

Le altre schede verranno aggiunte completando la mappa dati: categoria, modello, pagina PDF, codici, misure, colore obbligatorio, opzioni compatibili e note custom.

## Cosa intendevo per "database prodotti"

Per database prodotti intendevo un archivio strutturato, anche inizialmente in Excel o CSV, con colonne come:

- categoria;
- modello;
- codice;
- descrizione;
- misura;
- materiale;
- colore obbligatorio si/no;
- lavorazioni compatibili;
- prodotto ordinabile o solo preventivo;
- pagina PDF;
- prezzo futuro.

Non serve per forza un gestionale gia esistente. Possiamo partire da un file Excel pulito e poi trasformarlo in database quando nasceranno sito, login e listini.

## Limiti del prototipo statico

Il prototipo funziona senza server, quindi:

- il login e dimostrativo;
- il carrello viene salvato nel browser con localStorage;
- il PDF viene generato tramite stampa/salva come PDF del browser;
- l'email viene preparata con mailto;
- i PDF allegati vengono registrati come nome file, ma non caricati realmente.

Per il sito definitivo serviranno backend e database per:

- registrazione e accesso clienti;
- salvataggio carrelli su account cliente;
- upload reale dei PDF allegati;
- generazione PDF server-side;
- invio email con PDF allegato;
- listini, prezzi e ruoli cliente;
- eventuale invio diretto a Nettuno.

## Prossimi passi consigliati

1. Validare il prototipo e il flusso carrello.
2. Completare la mappatura dati dell'intero catalogo.
3. Preparare un file Excel master con tutti i codici e le compatibilita.
4. Decidere piattaforma sito e sistema login.
5. Collegare generazione PDF e invio email reali.
