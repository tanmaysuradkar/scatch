# Frontend (scatch)

This folder contains the Vite + React frontend for the Scatch project.

What this app contains
- Main UI for shoppers (product listing, cart, checkout, payment , OAuth, Protect route) under `src/components/pages`.
- Owner Dashboard: `src/components/pages/OwenerProfile.jsx` — owner tools for:
	- Viewing payment transactions (reads from `/owners/transactions`)
	- Updating payment status (POST `/owners/updateStatus`)
	- Viewing and managing products (uses `/products/getProducts`, `/products/updateProduct`, `/products/deleteProduct`)
	- Creating products (POST `/products/createProducts`) — a Create Product form is provided in the Owner Dashboard.

Backend API notes
- The frontend expects these backend endpoints (examples):
	- `GET ${VITE_backendURL}owners/transactions` — returns payment-backed transactions.
	- `POST ${VITE_backendURL}owners/updateStatus` — body: `{ paymentId, status }` — updates payment status.
	- `POST ${VITE_backendURL}products/getProducts` — body: `{ isModeALL: 'ALL' }` to fetch all products.
	- `POST ${VITE_backendURL}products/createProducts` — create a new product (form data sent from Create Product tab).
	- `POST ${VITE_backendURL}products/updateProduct` — controller currently expects `{ name, image, rename, Categories, price, discount }`.
	- `POST ${VITE_backendURL}products/deleteProduct` — controller expects `{ name }`.

Notes & suggestions
- The owner routes are currently not protected by owner authentication; add middleware to secure them before deploying to production.
- The `updateProduct` and `deleteProduct` backend controllers use `name` to identify products — using `_id` would be safer and less error-prone. I can update backend + frontend to use `_id` if you want.
- Payment records are stored in the backend `Payment` model. The Owner Dashboard reads payments and flattens multi-item payments into rows for each item.

Troubleshooting
- If you see CORS errors, make sure the backend CORS policy allows the frontend origin (e.g. `http://localhost:5173`) and `credentials: true` if needed.
- If requests fail, verify `VITE_backendURL` is correct and the backend server is running.

Want more?
- I can: protect owner endpoints, add product image upload, switch product updates to use `_id`, add pagination/search to the product list, or add toasts/confirmations for create/update/delete actions.



Prerequisites
- Node.js (recommended v16 or later)
- npm (or yarn)

Environment
- Copy or create a `.env` file in the `frontend/` folder if needed. The frontend expects at least:

- `VITE_backendURL` — base URL of your backend API (example: `http://localhost:4000/`)

Quick start (development)

PowerShell (Windows):

```powershell
cd c:\Users\shital\Desktop\project\scatch\frontend
# Frontend (scatch)

This folder contains the Vite + React frontend for the Scatch project.

What this app contains
- Main UI for shoppers (product listing, cart, checkout, payment, OAuth, protected routes) under `src/components/pages`.
- Owner Dashboard: `src/components/pages/OwenerProfile.jsx` — owner tools for:
	- Viewing payment transactions (reads from `/owners/transactions`)
	- Updating payment status (POST `/owners/updateStatus`)
	- Viewing and managing products (uses `/products/getProducts`, `/products/updateProduct`, `/products/deleteProduct`)
	- Creating products (POST `/products/createProducts`) — a Create Product form is provided in the Owner Dashboard.

Backend API notes
- The frontend expects these backend endpoints (examples):
	- `GET ${VITE_backendURL}owners/transactions` — returns payment-backed transactions.
	- `POST ${VITE_backendURL}owners/updateStatus` — body: `{ paymentId, status }` — updates payment status.
	- `POST ${VITE_backendURL}products/getProducts` — body: `{ isModeALL: 'ALL' }` to fetch all products.
	- `POST ${VITE_backendURL}products/createProducts` — create a new product (form data sent from Create Product tab).
	- `POST ${VITE_backendURL}products/updateProduct` — recommended body example uses `productId` (see below).
	- `POST ${VITE_backendURL}products/deleteProduct` — recommended body example uses `productId` (see below).

Product update/delete (recommended payloads)

Use `_id` (productId) to identify products when updating or deleting — this is safer than using `name`.

Example: Update product (replace fields as needed)

```json
{
	"productId": "<productObjectId>",
	"image": "url-or-path",
	"name": "New Product Name",
	"Categories": "Casual",
	"genStyles": "Man",
	"price": 199,
	"discount": 10
}
```

Example: Delete product

```json
{ "productId": "<productObjectId>" }
```

Notes & suggestions
- The owner routes are currently not protected by owner authentication; add middleware to secure them before deploying to production.
- The `updateProduct` and `deleteProduct` backend controllers used to use `name` to identify products — switching to `_id` is recommended. If you want, I can update the backend and frontend code to expect `productId` and perform `findByIdAndUpdate`/`findByIdAndDelete`.
- Payment records are stored in the backend `Payment` model. The Owner Dashboard reads payments and flattens multi-item payments into rows for each item.

Troubleshooting
- If you see CORS errors, make sure the backend CORS policy allows the frontend origin (e.g. `http://localhost:5173`) and `credentials: true` if needed.
- If requests fail, verify `VITE_backendURL` is correct and the backend server is running.

Want more?
- I can: protect owner endpoints, add product image upload, switch product updates to use `_id`, add pagination/search to the product list, or add toasts/confirmations for create/update/delete actions.

Prerequisites
- Node.js (recommended v16 or later)
- npm (or yarn)

Environment
- Copy or create a `.env` file in the `frontend/` folder if needed. The frontend expects at least:

`VITE_backendURL` — base URL of your backend API (example: `http://localhost:4000/`)

Quick start (development)

PowerShell (Windows):

```powershell
cd c:\Users\shital\Desktop\project\scatch\frontend
npm install
npm run dev
```

The Vite dev server will start (by default at http://localhost:5173). Open that URL in your browser.

Build (production)

```powershell
npm run build
npm run preview
```
