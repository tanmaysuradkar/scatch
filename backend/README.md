# Backend (scatch)

Comprehensive API documentation and usage for the Scatch backend.

Base URL (development)

- http://localhost:4000/ (default; see `app.js`)

Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- `.env` with the following keys:
	- MONGODB_URI
	- JWT_KEY
	- RAZORPAY_KEY_ID
	- RAZORPAY_SECRET
	- EXPRESS_SESSION_SECRET

Run (development)

PowerShell:

```powershell
cd c:\Users\shital\Desktop\project\scatch\backend
npm install
node app.js
```

Key features

- User registration, login, email verification and cookie/JWT authentication
- User cart stored in `user.orders` (cart is mutable by users)
- Razorpay payment integration; payments stored in `Payment` collection
- Owner dashboard endpoints to review transactions and update payment status
- Product management endpoints used by owner UI

API Reference (detailed)

All endpoints are relative to the Base URL above. Example responses show typical successful replies and validation notes.

-----------------------------------------------------------------
1) Users / Auth
-----------------------------------------------------------------

POST /users/register
- Description: Register a new user
- Request body:

```json
{
	"email": "user@example.com",
	"password": "secret",
	"fullname": "Full Name"
}
```
# Backend (scatch)

This document provides setup instructions and a compact API reference for the Scatch backend.

Base URL (development)

- http://localhost:4000/ (the server listens on port 4000 in `app.js`)

Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- A working `.env` file (see example below)

Quick start (PowerShell)

```powershell
cd c:\Users\shital\Desktop\project\scatch\backend
npm install
node app.js
```

Recommended .env keys

Create a `.env` file at the project root for the backend. The code expects the following keys (names used in the source):

- MONGODB_URI
- JWT_KEY
- RAZORPAY_KEY_ID
- RAZORPAY_SECRET
- EXPRESS_SESSION_SECRET
- frontentURL                # (note: the code currently uses `process.env.frontentURL` for OAuth redirects)

If you change the env variable names, update `routes/index.js` and `app.js` accordingly.

Key features

- User registration, login, email verification and cookie/JWT authentication
- User cart kept in `user.orders` (cart is mutable)
- Razorpay integration (server: create order + verify signature)
- Payments persisted to the `Payment` collection (each Payment can contain multiple items)
- Owner endpoints to list transactions and update payment status
- Product management endpoints used by the owner UI

Notes about authentication

- Token format (header): `Authorization: Bearer <token>`
- `isLoggedIn` middleware protects many user routes and checks cookie or Authorization header. Blacklisted tokens are saved to `blacklistToken-model` (TTL applied).
- Owner routes (`/owners/*`) are currently not protected by a dedicated owner auth middleware. Add owner authentication and role checks before deploying to production.

OAuth (Google)

- The app registers Google OAuth routes under `/auth/google` and `/auth/google/callback`.
- The server currently redirects successful logins to the frontend path configured in `process.env.frontentURL` (for example `http://localhost:5173/OAuth`). The current code does not append a JWT to that redirect — if you rely on a token in the frontend after OAuth, update the callback handler to return the token in a query param (or in a secure cookie).

API reference (selected endpoints)

All endpoints are relative to the base URL (http://localhost:4000/).

1) Users / Auth

- POST /users/register
  - Body: { email, password, fullname }
  - Registers a new user. Returns basic user meta on success.

- POST /users/login
  - Body: { email, password }
  - Returns a JWT and sets a session cookie on success.

- POST /users/verify
  - Body: { token }
  - Verify a user's email using the server-side verification token.

- POST /users/profile (protected)
  - Returns the authenticated user's profile. Provide cookie or Authorization header.

- GET /users/logout (protected)
  - Logs the user out and blacklists the token.

2) Cart / Orders (user-side)

- POST /users/addcart
  - Body: { productId, userId, quantity }
  - Adds an item to the user's cart (`user.orders`).

- POST /users/getOrder
  - Body: { userId }
  - Returns the user's cart (may be empty).

- POST /users/deleteOrder
  - Body: { userId, productId }
  - Removes a single product entry from a user's cart. Returns the updated cart.

3) Products (owner-facing)

- POST /products/getProducts
  - Body example: { isModeALL: "ALL" }
  - Returns products. When `isModeALL` is `ALL` the controller returns all products.

- POST /products/createProducts
  - Body: product fields (image, name, Categories, genStyles, price, discount, etc.)

- POST /products/deleteProduct
  - Current implementation deletes by `name` (body: { name }) — this is fragile because names are not unique. Recommended: change controller to accept `productId` and use `findByIdAndDelete(productId)`.

- POST /products/updateProduct
  - Current implementation updates by `name`. Recommended: accept `productId` and use `findByIdAndUpdate(productId, payload)` instead.

Recommendation: I can update the controller and frontend to use `_id` (productId) instead of `name` to make updates and deletes safe. This is a small, low-risk change.

4) Payments (Razorpay)

- POST /payment/order
  - Body: { amount } (amount in rupees). Creates an order with Razorpay.

- POST /payment/verify (protected)
  - Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, orderList }
  - Verifies Razorpay signature and saves a Payment document. `orderList` should be an array of items: { product: <productId>, quantity, orderDate }.

Payment model notes

- `backend/models/payment-model.js` stores `product` as an array of items (each: { product: ObjectId, quantity, orderDate }), plus user, razorpay ids, amount, currency and `status`.

5) Owner endpoints

- GET /owners/transactions
  - Returns transactions derived from Payment documents. Each payment can contain multiple items; the endpoint flattens them so each row represents one purchased item along with buyer email and `paymentId`.

- POST /owners/updateStatus
  - Body: { paymentId, status }
  - Updates the top-level Payment.status (applies to the entire Payment document). Allowed statuses used in the UI: Pending, Paid, Failed, Refunded.

6) Reviews

- POST /reviews/createReview
  - Body: `{"username": "<userId>", "productId": "<productId>", "message": "Nice product", "rating": 4}`
  - Validates: username, productId, message (min 3 chars), rating (1-5).
  - Success (201): Returns created review meta and reviewer full name.

Example request:

```json
{
  "username": "648f...",
  "productId": "650a...",
  "message": "Really liked the fabric and fit",
  "rating": 5
}
```

- POST /reviews/getReview
  - Body examples:
    - By product: `{ "getType": "product", "productId": "<productId>" }`
    - By user: `{ "getType": "user", "userId": "<userId>" }`
  - Returns matching reviews or 404 when none found.

Example request:

```json
{ "getType": "product", "productId": "650a..." }
```

- POST /reviews/deleteReview
  - Body: `{ "reviewId": "<reviewId>", "username": "<userId>" }`
  - Only the review owner (username) may delete their review. Returns 200 on success.

Example request:

```json
{ "reviewId": "66a...", "username": "648f..." }
```

Error handling notes

- 400 Bad Request — validation errors
- 401 Unauthorized — missing/invalid token
- 403 Forbidden — attempting to delete a review you don't own
- 404 Not Found — resource not found
- 500 Internal Server Error — unexpected server error