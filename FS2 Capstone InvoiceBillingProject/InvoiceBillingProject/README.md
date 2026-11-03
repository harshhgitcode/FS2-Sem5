# Invoice & Billing Management SaaS

A full-stack invoice and billing application based on the supplied capstone synopsis, using:
- **Frontend:** React + Vite + Axios
- **Backend:** Java 17, Spring Boot 3, Spring Security, JWT
- **Database:** MongoDB (local MongoDB Community Server or MongoDB Atlas)
- **PDF:** Server-generated invoice and date-range report PDFs

The original synopsis describes registration/login, customer management, invoice creation and editing, item/tax totals, unpaid and overdue tracking, payment recording, dashboard summaries, and PDF exports. This implementation covers those core modules. The synopsis mockup is not used as the UI reference; the frontend has a fresh responsive dashboard layout.

## Requirements
- Java 17+
- Maven 3.9+
- Node.js 20+
- MongoDB 6+ (or Atlas connection string)

## 1. Start MongoDB
If MongoDB Community Server is installed locally, start the MongoDB service. The default backend connection is:
`mongodb://localhost:27017/invoice_billing_saas`

You can also use MongoDB Compass:
1. Open Compass.
2. Connect to `mongodb://localhost:27017`.
3. Start the backend; it creates the `invoice_billing_saas` database and collections automatically when records are saved.

For Atlas, set `MONGODB_URI` to your Atlas connection string.

## 2. Run the Spring Boot backend
Open a terminal in `backend`:

```bash
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`
Health check: `http://localhost:8080/api/health`

Optional environment variables:
- `MONGODB_URI` (default `mongodb://localhost:27017/invoice_billing_saas`)
- `JWT_SECRET` (use a long random secret in production)
- `JWT_EXPIRATION_MS` (default `86400000`)
- `APP_CORS_ORIGIN` (default `http://localhost:5173`)

## 3. Run the React frontend
Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## First use
1. Register an account from the login screen.
2. Add customers.
3. Create an invoice with one or more line items, tax percentage, issue date and due date.
4. Open an invoice to record one or more payments. The app calculates `UNPAID`, `PARTIALLY_PAID`, `PAID`, or `OVERDUE` from its balance and due date.
5. Download an invoice PDF or a date-range report PDF.

All customer, invoice, payment and dashboard queries are scoped to the authenticated user. Passwords are BCrypt-hashed and API routes require a signed JWT except registration/login and health check.

## Main API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login and receive JWT |
| GET/POST | `/api/customers` | List/create customers |
| GET/PUT/DELETE | `/api/customers/{id}` | Read/update/delete customer |
| GET/POST | `/api/invoices` | List/create invoices |
| GET/PUT/DELETE | `/api/invoices/{id}` | Read/update/delete invoice |
| POST | `/api/invoices/{id}/payments` | Record a payment |
| GET | `/api/invoices/{id}/pdf` | Download invoice PDF |
| GET | `/api/reports/pdf?from=YYYY-MM-DD&to=YYYY-MM-DD` | Download report PDF |
| GET | `/api/dashboard` | Dashboard totals and recent invoices |

## Project structure
```text
invoice-billing-saas/
  backend/
    pom.xml
    src/main/java/com/capstone/invoicebilling/
      InvoiceBillingApplication.java
      config/
      security/
      model/
      dto/
      repository/
      service/
      controller/
  frontend/
    package.json
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      api.js
      styles.css
      components/
```

## Notes / production hardening
This is a runnable academic project starter, not a production accounting or tax-compliance product. Before deployment, set a strong JWT secret, configure HTTPS, add automated tests and backups, review GST/legal requirements, and consider refresh-token rotation and audit logs. Online payment gateways, automatic email reminders, recurring invoices, multi-currency, staff roles and statutory tax filing are intentionally outside the synopsis' current scope.
