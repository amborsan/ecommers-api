# E-Commerce API

A small REST API for managing an e-commerce product catalogue. It is built with Node.js, Express, MongoDB, and Mongoose and exposes CRUD-style endpoints for products.

> The project name is kept as `ecommers-api` to match the repository and package name.

## Features

- Create one product or a batch of products
- Read all products or one product by its MongoDB ID
- Replace (`PUT`) or partially update (`PATCH`) a product
- Delete a product
- Validate required product fields through the Mongoose schema
- Return JSON responses and JSON request-body support
- Return a 404 response for routes that do not exist

## Technology

- [Node.js](https://nodejs.org/) with ECMAScript modules
- [Express 5](https://expressjs.com/) for HTTP server and routing
- [MongoDB](https://www.mongodb.com/) for data storage
- [Mongoose](https://mongoosejs.com/) for connection management, schemas, validation, and queries
- Nodemon for automatic restarts in development

## Requirements

- Node.js (a current LTS release is recommended)
- npm
- A reachable MongoDB instance (local or hosted)

## Installation and configuration

1. Clone the repository and open the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root. It must define the following variables:

   ```env
   PORT=3000
   DB_URL=mongodb://127.0.0.1:27017/ecommerce
   ```

   Use the connection string supplied by your MongoDB provider when using a hosted database. Do not commit credentials or a real `.env` file.

4. Start the API:

   ```bash
   npm start
   ```

The server listens on `http://localhost:<PORT>`. Visiting `GET /` returns a basic health response.

## Project structure

```text
src/
├── config/
│   └── dbcon.js           # MongoDB/Mongoose connection
├── controllers/
│   └── products.js        # Product request handlers
├── middleware/
│   └── errorHandler.js    # HTTP error helpers and unknown-route handler
├── models/
│   └── productsModel.js   # Mongoose product schema and model
├── routes/
│   └── products.js        # Product endpoint definitions
└── server.js              # Express application bootstrap
postman/                   # Postman workspace globals
```

## API endpoints

All product routes are prefixed with `/products`.

| Method   | Endpoint          | Description                          | Success response |
| -------- | ----------------- | ------------------------------------ | ---------------- |
| `GET`    | `/`               | API health check                     | `200`            |
| `POST`   | `/products`       | Create one product                   | `201`            |
| `POST`   | `/products/multi` | Create a non-empty array of products | `201`            |
| `GET`    | `/products`       | Get all products                     | `200`            |
| `GET`    | `/products/:id`   | Get a product by MongoDB `_id`       | `200`            |
| `PUT`    | `/products/:id`   | Update a product                     | `200`            |
| `PATCH`  | `/products/:id`   | Partially update a product           | `200`            |
| `DELETE` | `/products/:id`   | Delete a product                     | `201`            |

Invalid request data and invalid IDs currently return `400`. A product lookup or update that finds no record returns `404`. Requests to an unregistered route also return `404`.

### Product data

The Mongoose model validates the following shape. `name`, `description`, `price`, `discount`, `category`, and `images` are required. Mongoose also adds `createdAt` and `updatedAt` timestamps.

| Field         | Type    | Required | Notes                                                   |
| ------------- | ------- | -------- | ------------------------------------------------------- |
| `name`        | string  | Yes      | Whitespace is trimmed                                   |
| `description` | string  | Yes      | Whitespace is trimmed                                   |
| `price`       | number  | Yes      |                                                         |
| `discount`    | number  | Yes      |                                                         |
| `category`    | string  | Yes      | Whitespace is trimmed                                   |
| `variants`    | array   | No       |                                                         |
| `inStock`     | boolean | No       |                                                         |
| `tages`       | array   | No       | This is the current field name in the code (not `tags`) |
| `brand`       | string  | No       | Whitespace is trimmed                                   |
| `images`      | array   | Yes      |                                                         |

Example request to create a product:

```bash
curl -X POST http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Wireless Headphones",
    "description": "Over-ear Bluetooth headphones",
    "price": 89.99,
    "discount": 10,
    "category": "Electronics",
    "variants": ["black", "white"],
    "inStock": true,
    "tages": ["audio", "wireless"],
    "brand": "Example Brand",
    "images": ["https://example.com/headphones.jpg"]
  }'
```

For `POST /products/multi`, send a JSON array containing product objects with the same required fields.

## Switching to another DBMS

This API is currently tightly coupled to MongoDB through Mongoose. The HTTP routes and most controller-level request/response handling can remain, but the persistence layer must be replaced. Keep the public API contract stable where possible, especially the request body and response shape.

| Area         | Current MongoDB-specific code                                                                                               | Change needed for another DBMS                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependencies | `mongoose` in `package.json`                                                                                                | Remove Mongoose and add a driver/ORM suitable for the target database (for example Prisma, Sequelize, `pg`, or `mysql2`)                                                        |
| Environment  | `DB_URL` is a MongoDB connection string                                                                                     | Replace it with the target driver's connection settings; use a URL or separate host, port, database, user, and password variables as appropriate                                |
| Connection   | `src/config/dbcon.js` calls `mongoose.connect()`                                                                            | Replace with connection-pool/client initialization and update the startup/shutdown lifecycle in `src/server.js`                                                                 |
| Data model   | `src/models/productsModel.js` defines a Mongoose schema, validation, timestamps, and collection name                        | Create a table/schema/entity and migration for products. Recreate constraints, types, required fields, trimming/validation, and timestamps                                      |
| Queries      | `src/controllers/products.js` uses `create`, `insertMany`, `find`, `findById`, `findByIdAndUpdate`, and `findByIdAndDelete` | Reimplement these calls using the new repository/ORM. Preserve `404` behavior when no row is found and map database errors to suitable HTTP responses                           |
| Identifiers  | Routes accept MongoDB ObjectIds via `:id`; responses use `_id`                                                              | Choose an ID strategy (integer, UUID, etc.), validate it, and decide whether to return `id` instead of `_id`. If the response field changes, treat it as an API-breaking change |
| Arrays       | `variants`, `tages`, and `images` are MongoDB arrays                                                                        | Model them as JSON/array columns if supported, or normalize them into related tables with foreign keys                                                                          |

### Suggested migration sequence

1. Choose the target DBMS and data-access library.
2. Define and run a migration for the `products` table/entity, including `createdAt` and `updatedAt` fields.
3. Replace `dbcon.js` and update the application startup so the server only runs once the database is available.
4. Replace the Mongoose model with a database-agnostic repository (for example `productsRepository.js`).
5. Update `src/controllers/products.js` to call that repository rather than Mongoose directly.
6. Add tests for every endpoint before and after the migration to confirm that the API behavior has not changed.

Keeping database operations behind a repository module makes later DBMS changes much smaller: only the connection and repository implementation need to change, while routes and controllers can stay focused on HTTP concerns.

## Scripts

| Command     | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| `npm start` | Starts the server through Nodemon and loads variables from `.env` |
| `npm test`  | Placeholder script; automated tests are not configured yet        |

## Current limitations

- There is no automated test suite yet.
- Authentication, authorization, pagination, filtering, and API documentation tooling are not implemented.
- The global error-response middleware is currently not enabled; controller errors are handled locally.

## Team

- Kseniia
- Feras
- I-Chieh Liu
- Ali
