# AngularLab

Di seguito trovate una piccola demo del progetto

![Adobe Logo](/src/assets/video/example_angular_lab.gif)

>[!INFO]
>
>* Versione Angular: 16.2.5.
>* Versione [Angular Material](https://material.angular.io/): 16.2.8
>* [Profilo linkedin](https://www.linkedin.com/in/manuelmidiri/)

## Flusso della webapp per utente ADMIN

Pagine navigabili:
* Login;
* Pagina principale SAMPLE;
* Pagina dettaglio SAMPLE:/id;

| USER | Pagina sample | Pagina dettaglio SAMPLE |
| --- | --- | --- |
| Admin | Creare nuovo sample | Creare nuovo test per Sample |
| --- | Editare un sample già esistente | Editare un test già esistente |
| --- | Eliminare un sample | Eliminare un test già esistente |

## Flusso della webapp per utente USER

Pagine navigabili:
* Login;
* Pagina principale SAMPLE;
* Pagina dettaglio SAMPLE:/id;

| USER | Pagina sample | Pagina dettaglio SAMPLE |
| --- | --- | --- |
| User | Solo visualizzazione | Solo visualizzazione |

## Dettaglio azioni

Dopo aver effettuato la login, verremo reindirizzati sulla pagina principale "**SAMPLE**", dove tramite una barra di ricerca abbiamo la possibilità di cercare un sample per nome.
Subito dopo, compare una tabella, dove l'utente **Admin**, potrà fare alcune azioni: 
* aggiungere un nuovo sample compilando i campi nome e descrizione;
* vedere nel dettaglio cosa contiene quel sample;
* editare una sample cambiando i campi nome e descrizione;
* eliminare sample;
Andando nel dettaglio di un sample, vedremo che al posto della barra di ricerca ci sarà un riepilogo del sample visualizzato e a seguire i test contenuti nel sample.
In questo caso le azioni saranno: 
* aggiungere un nuovo test compilando il campo nome;
* editarlo cambiando il campo nome;
* eliminare test;
Mentre se accediamo come utente **User**, possiamo solo visualizzare i dati, senza avere la possibilità di interagirci.

## Login

Una volta effettuata la login, mi assicuro di salvare la response nel localStorage e successivamente chiamare la user/Me, salvandomi i dati dell'utente sempre nel localStorage.
Utilizzerò in seguito questi dati per assegnare nome ed email, ad un avatar posto sulla sidebar e verificarne il ruolo all'occorrenza.

## Guardia e Interceptor

Fatta la login, atterriamo su "/sample", ben consapevoli che abbiamo una "**Guardia**" e un "**Interceptor**", che resteranno sempre in ascolto, per verificare se siamo autenticati e se il nostro token non è scaduto. Nel caso quest'ultimo lo fosse, l'interceptor provvederà a effettuare una chiamata al refreshToken per restituirci un nuovo token. Mentre, nel caso in cui non siamo autenticati la guardia ci reidirizzera verso la "/login".

## Librerie e Responsive

Ho deciso di usare Angular Material per lo sviluppo di questa webapp, per la sua perfetta integrazione con questo framework e per la facilità nel reperire componenti e informazioni utili, in poco tempo.
Al momento non è stata prevista una versione mobile, di conseguenza in responsive potrebbe avere dei **gravi problemi**.

## Logout

Al momento della logout, saranno eliminati tutti gli elementi presenti nel localStorage.
Di conseguenza se si vuole riaccedere alla webapp, bisognerà reinserire le credenziali. Mentre se non si effettua la logout, ma si chiude la pagina, al rientro avremo accesso senza reinserire i dati.