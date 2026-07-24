# REST API Endpoints

The backend exposes a standard RESTful API for the React frontend and mobile clients. All endpoints (except public ones) require JWT authentication via the `Authorization: Bearer <token>` header.

## Public Endpoints
* `POST /api/v1/auth/register` - Register a new user
* `POST /api/v1/auth/login` - Authenticate user, returns JWT and user tier
* `POST /api/v1/auth/refresh` - Refresh JWT token
* `GET /api/v1/public/tips/daily` - Retrieve 1-2 free daily tips (delayed by 2-4 hours)
* `GET /api/v1/public/performance` - Get high-level stats (ROI, Win Rate, Profit/Loss) for marketing
* `GET /api/v1/public/leaderboard` - Public ledger of recent verified past results

## User / Dashboard Endpoints (Requires Auth)
* `GET /api/v1/users/me` - Get current user profile and subscription details
* `PUT /api/v1/users/me` - Update profile settings (notification preferences)
* `POST /api/v1/payments/checkout-session` - Create Stripe/PayPal checkout session
* `POST /api/v1/payments/crypto` - Initialize a crypto payment via Coinbase Commerce/NowPayments
* `GET /api/v1/predictions/today` - Retrieve daily predictions. Rate-limited and filtered based on user's `tier` (VIP, Gold, Platinum).
* `GET /api/v1/predictions/accumulator` - Retrieve "Banker Accumulator" (Gold/Platinum only)
* `GET /api/v1/predictions/history` - Detailed personal betting history and P&L calculator

## Admin Endpoints (Requires Admin Role)
* `GET /api/v1/admin/users` - List all users with pagination and filtering
* `PUT /api/v1/admin/users/{id}` - Modify user status/tier (manual overrides)
* `GET /api/v1/admin/predictions/pending` - View predictions before they are published to users
* `PUT /api/v1/admin/predictions/{id}/override` - Manually override or void a ML prediction
* `GET /api/v1/admin/analytics/models` - View model performance monitoring (accuracy, brier score, confidence calibration)
* `POST /api/v1/admin/trigger/scrape` - Manually trigger the scraper job

## Webhooks
* `POST /api/v1/webhooks/stripe` - Handle Stripe subscription events (renew, cancel, payment_failed)
* `POST /api/v1/webhooks/crypto` - Handle Crypto payment confirmations
