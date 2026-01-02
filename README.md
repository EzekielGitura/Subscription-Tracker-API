# Subscription Tracker API

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4+-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Upstash QStash](https://img.shields.io/badge/Upstash-QStash-00C7B7)
![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-yellow)
![Arcjet](https://img.shields.io/badge/Security-Arcjet-red)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

Subscription Tracker API is a production-oriented backend service for managing user subscriptions and enforcing renewal awareness through automated, time-based email notifications.

The system is designed around three core concerns:
- secure user identity and access control,
- deterministic subscription lifecycle management,
- reliable, asynchronous reminder delivery.

The architecture favors explicit separation of concerns, defensive security defaults, and predictable API behavior suitable for extension into a larger financial or productivity platform.

---

## Project Structure

```

.
├── app.js                  # Express bootstrap, global middleware, routing entry
├── config/                 # Environment, Arcjet, Nodemailer, Upstash configuration
├── controllers/            # Request handling and domain logic
├── database/               # MongoDB connection and lifecycle management
├── middlewares/            # Auth, Arcjet enforcement, rate limiting, error handling
├── models/                 # Mongoose schemas and data relationships
├── routes/                 # API versioned route definitions
└── utils/                  # Email templates, mail dispatch, shared helpers

````

---

## Core Capabilities

### Authentication and Identity
- JWT-based authentication with hashed credentials.
- Token lifecycle control via configurable expiry.
- Middleware-enforced authorization boundaries.

### Subscription Management
- User-scoped subscription creation and retrieval.
- Explicit ownership validation at the API boundary.
- Data models optimized for reminder scheduling.

### Renewal Automation
- Event-driven reminder workflows powered by Upstash QStash.
- Pre-renewal notifications dispatched at 7, 5, 2, and 1 day intervals.
- Stateless webhook processing for horizontal scalability.

### Email Delivery
- HTML-formatted transactional emails via Nodemailer.
- Template-driven messaging for consistency and extensibility.
- Decoupled from request lifecycle to avoid blocking behavior.

### Security Posture
- Arcjet-based rate limiting and bot mitigation.
- Centralized error handling to prevent information leakage.
- Input validation and access control enforced at middleware level.

---

## Tech Stack

**Runtime**
- Node.js
- Express.js

**Persistence**
- MongoDB
- Mongoose ODM

**Authentication**
- bcrypt
- JSON Web Tokens (JWT)

**Async & Scheduling**
- Upstash QStash

**Messaging**
- Nodemailer

**Security**
- Arcjet

**Development Tooling**
- Nodemon
- ESLint

---

## Environment Configuration

Create a `.env.development.local` file at the project root.

```bash
# Server
PORT=3000
NODE_ENV=development
SERVER_URL=http://localhost:3000

# Database
DB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d

# Security
ARCJET_KEY=your_arcjet_site_key

# Upstash QStash
QSTASH_TOKEN=your_qstash_token
QSTASH_URL=https://qstash.upstash.io/v2/publish

# Email
EMAIL_PASSWORD=your_gmail_app_password
````

Secrets are mandatory. The application fails fast if critical configuration is missing.

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm
* MongoDB instance (local or managed)

### Installation

```sh
git clone https://github.com/EzekielGitura/Subscription-Tracker-API.git
cd Subscription-Tracker-API
npm install
```

### Development

```sh
npm run dev
```

The API becomes available at `http://localhost:3000`.

---

## API Design

All endpoints are versioned under `/api/v1`.

### Authentication (`/auth`)

| Method | Endpoint | Description                     |
| -----: | -------- | ------------------------------- |
|   POST | /sign-up | Register a new user             |
|   POST | /sign-in | Authenticate user and issue JWT |

### Users (`/users`)

| Method | Endpoint | Description    | Auth   |
| -----: | -------- | -------------- | ------ |
|    GET | /        | List users     | Public |
|    GET | /:id     | Get user by ID | Bearer |

### Subscriptions (`/subscriptions`)

| Method | Endpoint  | Description             | Auth   |
| -----: | --------- | ----------------------- | ------ |
|   POST | /         | Create subscription     | Bearer |
|    GET | /user/:id | List user subscriptions | Bearer |

### Workflows (`/workflows`)

| Method | Endpoint               | Description                                   |
| -----: | ---------------------- | --------------------------------------------- |
|   POST | /subscription/reminder | Internal QStash webhook for renewal reminders |

Workflow endpoints are not public APIs and are protected by request verification.

---

## Design Notes

* The API is stateless by design.
* Reminder scheduling is delegated to an external queue to avoid cron coupling.
* Security middleware executes before business logic.
* Errors are normalized at a single boundary to maintain response consistency.

This repository represents a backend foundation that is production-aligned, audit-friendly, and extensible without structural refactors.

