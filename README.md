# ecommers-api
Ecommerce api client sample

# E-Commerce API

REST-API zur Verwaltung von Produkten. Die Anwendung wurde mit Node.js, Express, MongoDB und Mongoose entwickelt.

## Verwendete Technologien

- Node.js – JavaScript-Laufzeitumgebung
- Express – Webserver und Routing
- MongoDB – Speicherung der Produktdaten
- Mongoose – Schema, Validierung und Datenbankabfragen
- Nodemon – automatischer Neustart während der Entwicklung
- `.env` – Speicherung von Umgebungsvariablen
- JSON – Format für Anfragen und Antworten

## Funktionen

Das Projekt orientiert sich am CRUD-Prinzip:

- Create – Produkte erstellen
- Read – Produkte auslesen
- Update – noch nicht implementiert
- Delete – Produkte löschen

### Die Controller können:

- ein einzelnes Produkt erstellen;
- mehrere Produkte gleichzeitig erstellen;
- alle Produkte auslesen;
- ein bestimmtes Produkt anhand seiner ID auslesen;
- ein Produkt anhand seiner ID löschen.

## Produktrouten

| Methode | Route | Controller | Beschreibung |
|---|---|---|---|
| `GET` | `/` | Server-Route | Serverstatus prüfen |
| `GET` | `/products` | `getProducts` | Alle Produkte auslesen |
| `GET` | `/products/:id` | `getProductById` | Ein Produkt anhand seiner ID auslesen |
| `POST` | `/products/single` | `addProduct` | Ein einzelnes Produkt erstellen |
| `POST` | `/products` | `addMultiProducts` | Mehrere Produkte gleichzeitig erstellen |
| `PUT` | `/products/:id` | `updateProduct` | Ein einzelnes Produkt verändern |
| `PATCH` | `/products/:id` | `patchProduct` | Einzelnes Produkt modifizieren |
| `DELETE` | `/products/:id` | `deleteProduct` | Ein Produkt anhand seiner ID löschen |

## Projektstruktur

```text
src/
├── config/
│   └── dbcon.js
├── controllers/
│   └── products.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── productsModel.js
├── routes/
│   └── products.js
└── server.js


