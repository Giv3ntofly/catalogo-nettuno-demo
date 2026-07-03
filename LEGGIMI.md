# Come provare il catalogo interattivo

Apri questo file nel browser:

`index.html`

Percorso completo:

`C:\Users\dgpas\Desktop\NSP Codex\catalogo-interattivo\index.html`

## Cosa puoi provare ora

- accesso dimostrativo come cliente registrato;
- navigazione categorie;
- configurazione di alcune schede prodotto reali;
- colore telo obbligatorio dove previsto;
- teli di prolunga solo sui modelli compatibili;
- lavorazioni custom filtrate per compatibilita;
- campo Riferimento ordine per ogni articolo;
- note custom e allegati PDF;
- carrello salvato nel browser;
- generazione PDF ordine/preventivo come file scaricabile;
- preparazione email.

## Tabella master estratta dal PDF

La demo usa anche una base dati estratta automaticamente dal catalogo PDF:

`docs\catalogo-master-estratto.csv`

Il file contiene i codici trovati nel PDF, la famiglia articolo, la categoria, la pagina e un contesto testuale utile per il controllo.

Le schede demo generate da questa tabella sono nel file:

`assets\catalog-extracted.js`

Le schede curate a mano restano prioritarie; quelle estratte servono per rendere il catalogo completo e navigabile in fase di prova.

## Nota email

Prima dell'uso reale va impostata la tua email nel file:

`assets/catalog-data.js`

Campo:

`ownerEmail`

Al momento e impostato un indirizzo segnaposto.
