# Laravel Backend Exploration - Complete Summary

**Date:** November 17, 2025  
**Backend Project:** `/Users/fred/PhpstormProjects/signature-api`  
**React Native Project:** `/Users/fred/PhpstormProjects/poc-signature`

---

## Documentation Files Generated

Two comprehensive documentation files have been created in the React Native project:

1. **LARAVEL_API_DOCUMENTATION.md** (27 KB)
   - Complete reference for all API endpoints
   - Full request/response examples with JSON payloads
   - Database schema documentation
   - Model relationships
   - Validation rules for all requests
   - Error handling patterns
   - OAuth flow details
   - Premium feature access control

2. **API_QUICK_REFERENCE.md** (6.2 KB)
   - Quick lookup guide for endpoints
   - Common request/response patterns
   - Data model field listings
   - React Native integration checklist
   - cURL examples for testing

---

## Authentication System Overview

### JWT Implementation

- **Library:** Firebase/JWT
- **Algorithm:** HS256 (HMAC SHA-256)
- **Access Token Lifetime:** 900 seconds (15 minutes)
- **Refresh Token Lifetime:** 2,592,000 seconds (30 days)
- **Middleware:** `JwtAuthMiddleware` validates all protected requests

### Token Flow

1. User logs in with credentials or OAuth
2. Backend returns `access_token` and `refresh_token`
3. React Native stores both securely (use Keychain)
4. Include `Authorization: Bearer {access_token}` in all requests
5. When token expires (after 15 min), use refresh_token to get new one
6. Refresh token stored in `sessions` table with SHA-256 hash

---

## Complete API Endpoint Map

### Base URL

```
http://localhost:8000/api/v1
```

### Authentication Endpoints (Public)

```
POST   /auth/register              - Register with email/password
POST   /auth/login                 - Login with email/password
POST   /auth/logout                - Invalidate refresh token
POST   /auth/refresh               - Get new access token
POST   /auth/forgot-password       - Request password reset email
POST   /auth/reset-password        - Reset password with token
POST   /auth/oauth/apple           - Apple Sign-In authentication
POST   /auth/oauth/google          - Google Sign-In authentication
```

### MFA Endpoints (Protected)

```
POST   /auth/mfa/setup             - Generate TOTP secret & QR code
POST   /auth/mfa/verify            - Enable MFA with 6-digit code
POST   /auth/mfa/disable           - Disable MFA for user
```

### Signature Management (Protected)

```
GET    /signatures                 - List all user signatures (paginated)
POST   /signatures                 - Create signature (multipart/form-data)
GET    /signatures/{id}            - Get specific signature
POST   /signatures/{id}            - Update signature (multipart/form-data)
DELETE /signatures/{id}            - Delete signature (soft delete)
```

### Wallpaper Management (Protected)

```
GET    /wallpapers                 - List wallpapers (paginated, filterable)
POST   /wallpapers                 - Generate wallpaper from template
GET    /wallpapers/{id}            - Get specific wallpaper
DELETE /wallpapers/{id}            - Delete wallpaper (soft delete)
```

### Wallpaper Templates (Protected)

```
GET    /wallpaper-templates        - Browse templates (paginated)
GET    /wallpaper-templates/{id}   - Get template details
```

### Subscriptions (Protected)

```
GET    /subscription/plans         - Get available subscription plans
GET    /subscription/              - Get user's current subscription
GET    /subscription/status        - Get premium status & access details
POST   /subscription/cancel        - Cancel active subscription
```

### Analytics (Protected)

```
GET    /analytics/stats            - Get user usage statistics
GET    /analytics/events           - Get event history (paginated)
```

### Feedback (Protected)

```
POST   /feedback/                  - Submit feedback/bug report
GET    /feedback/                  - List user's feedback (paginated)
GET    /feedback/stats             - Get feedback statistics
```

---

## Database Schema Summary

### Users Table

- **PK:** UUID `id`
- **Fields:** email (unique), password_hash, first_name, last_name
- **Premium:** is_premium (boolean), premium_expires_at (timestamp)
- **Security:** mfa_enabled (boolean), mfa_secret (encrypted)
- **Profile:** locale, timezone, avatar_url
- **Soft Delete:** deleted_at
- **Relationships:** signatures (1:N), subscription (1:1), oauthProviders (1:N), sessions (1:N)

### Signatures Table

- **PK:** UUID `id`
- **FK:** user_id (CASCADE delete)
- **Content:** name, description, celebrity_name, color
- **Image Data:** image_data (base64), image_path, image_url
- **Metadata:** image_width, image_height, file_size, mime_type, thumbnail_url
- **Tracking:** capture_date, device_info (JSON)
- **Soft Delete:** deleted_at
- **Relationships:** user (N:1), wallpapers (1:N)

### Wallpapers Table

- **PK:** UUID `id`
- **FK:** signature_id (CASCADE), template_id (RESTRICT)
- **Content:** wallpaper_url, thumbnail_url, resolution (e.g., "1080x1920")
- **Status:** generation_status (enum: pending, processing, completed, failed)
- **Metadata:** file_size
- **Soft Delete:** deleted_at
- **Relationships:** signature (N:1), template (N:1), shares (1:N)

### WallpaperTemplates Table

- **PK:** UUID `id`
- **Content:** name, description, preview_url
- **Classification:** category, is_premium (boolean), is_active (boolean)
- **Config:** config (JSON) - flexible template configuration
- **Relationships:** wallpapers (1:N)

### Subscriptions Table

- **PK:** UUID `id`
- **FK:** user_id (CASCADE)
- **Status:** status (enum: active, cancelled, past_due, unpaid, incomplete)
- **Plan:** plan_type (enum: monthly, annual)
- **Dates:** current_period_start, current_period_end, cancelled_at
- **Integration:** stripe_subscription_id (nullable, unique)
- **Relationships:** user (N:1)

### Sessions Table

- **PK:** UUID `id`
- **FK:** user_id (CASCADE)
- **Token:** refresh_token (unique, hashed SHA-256)
- **Tracking:** ip_address, user_agent, expires_at, last_used_at
- **Relationships:** user (N:1)

### OAuthProviders Table

- **PK:** UUID `id`
- **FK:** user_id (CASCADE)
- **Provider:** provider (enum: apple, google)
- **Id:** provider_user_id
- **Constraint:** unique(provider, provider_user_id)
- **Relationships:** user (N:1)

---

## Controllers & Methods

### AuthController (10 methods)

- `register(RegisterRequest)` - Create account
- `login(LoginRequest)` - Authenticate
- `refresh(RefreshTokenRequest)` - Refresh access token
- `logout(LogoutRequest)` - Revoke refresh token
- `forgotPassword(ForgotPasswordRequest)` - Send reset email
- `resetPassword(ResetPasswordRequest)` - Process password reset
- `setupMfa(SetupMfaRequest)` - Generate TOTP secret
- `verifyMfa(VerifyMfaRequest)` - Enable TOTP
- `disableMfa(DisableMfaRequest)` - Disable TOTP
- `oauthApple(OauthAppleRequest)` - Apple Sign-In
- `oauthGoogle(OauthGoogleRequest)` - Google Sign-In

### SignatureController (5 methods)

- `index(ListSignaturesRequest)` - Paginated list with optional search
- `store(CreateSignatureRequest)` - Create with image upload
- `show(string $id)` - Get single signature
- `update(string $id, UpdateSignatureRequest)` - Update with optional image
- `destroy(string $id)` - Soft delete

### WallpaperController (4 methods)

- `index(ListWallpapersRequest)` - Paginated list with filters
- `store(GenerateWallpaperRequest)` - Generate from template
- `show(string $id)` - Get single wallpaper
- `destroy(string $id)` - Soft delete

### WallpaperTemplateController (2 methods)

- `index(ListWallpaperTemplatesRequest)` - Browse templates
- `show(string $id)` - Get template details

### SubscriptionController (4 methods)

- `plans()` - Get available plans
- `show()` - Get current subscription
- `status()` - Get premium status
- `cancel(CancelSubscriptionRequest)` - Cancel subscription

### AnalyticsController (2 methods)

- `stats()` - User statistics
- `events(Request)` - Event history

### FeedbackController (3 methods)

- `store(SubmitFeedbackRequest)` - Submit feedback
- `index(ListFeedbackRequest)` - List feedback
- `stats()` - Feedback statistics

---

## Key Implementation Details

### File Upload Handling

- Endpoint: POST `/api/v1/signatures` or `/api/v1/signatures/{id}` (multipart/form-data)
- Max size: 10 MB
- Allowed MIME types: JPEG, PNG, GIF
- Stored path: `storage/app/public/signatures/...`
- Public URL: Via `Storage::disk('public')->url()`
- Metadata extracted: width, height, file_size, mime_type

### Premium Access Control

1. **Template Check:** `WallpaperTemplate.is_premium`
2. **User Check:** `User.is_premium && User.premium_expires_at > now()`
3. **Response:** 403 Forbidden if user not subscribed
4. **UI Response:** `{ "error": "PREMIUM_REQUIRED", "template_id": "..." }`

### Pagination

- Query params: `page` (default 1), `per_page` (default 15)
- Response includes:
  - `data`: array of items
  - `links`: first, prev, next, last URLs
  - `meta`: current_page, from, to, total, per_page, last_page

### Rate Limiting

- Global limit: 60 requests per minute
- Applied to all routes
- Header: `X-RateLimit-Limit: 60`

### Validation Rules (Summary)

- **Email:** required, valid format, unique (registration only)
- **Password:** required, min 8 chars
- **Image file:** required, image type, max 10MB
- **UUID:** valid UUID format, exists in DB
- **TOTP code:** 6-digit code

---

## React Native Integration Checklist

- [ ] **Authentication Setup**
  - [ ] Implement secure token storage (use react-native-keychain)
  - [ ] Create auth service for login/logout/refresh
  - [ ] Set up Bearer token injection in HTTP interceptor
  - [ ] Handle 401 responses with automatic refresh

- [ ] **OAuth Integration**
  - [ ] Install Apple Sign-In library (react-native-apple-authentication)
  - [ ] Install Google Sign-In library (@react-native-google-signin/google-signin)
  - [ ] Implement identity_token extraction
  - [ ] Connect to /oauth/apple and /oauth/google endpoints

- [ ] **File Upload**
  - [ ] Create signature canvas component
  - [ ] Implement image capture/conversion to file
  - [ ] Build multipart/form-data request
  - [ ] Handle file size validation (max 10MB)

- [ ] **Signature Management**
  - [ ] List signatures with infinite scroll pagination
  - [ ] Create signature with image upload
  - [ ] Edit signature metadata
  - [ ] Delete signature with confirmation

- [ ] **Wallpaper Features**
  - [ ] Browse wallpaper templates with categories
  - [ ] Generate wallpaper from signature + template
  - [ ] Handle 403 premium template errors
  - [ ] Display wallpaper generation status
  - [ ] List user's generated wallpapers
  - [ ] Download/share wallpapers

- [ ] **Subscriptions**
  - [ ] Display available plans
  - [ ] Show current subscription status
  - [ ] Handle subscription expiration
  - [ ] Implement cancel subscription flow

- [ ] **Analytics**
  - [ ] Display user statistics dashboard
  - [ ] Show event history

- [ ] **Error Handling**
  - [ ] Parse validation errors (422)
  - [ ] Display field-level error messages
  - [ ] Show generic error messages for API failures
  - [ ] Implement retry logic

- [ ] **Premium UX**
  - [ ] Show upsell UI for premium templates
  - [ ] Display premium badge on restricted features
  - [ ] Handle expiration notifications

---

## Important API Behaviors

### Authentication Response

- Always includes `access_token`, `refresh_token`, `expires_in` (900)
- User object returned on login/register/oauth
- Token type is always "Bearer"

### Soft Deletes

- Models with soft deletes: User, Signature, Wallpaper
- Deleted records still in database with `deleted_at` timestamp
- Queries exclude soft-deleted records by default

### Error Responses

- **Validation errors (422):** Include `errors` object with field-level messages
- **General errors:** Include `message` field
- **Premium access (403):** Include `error: "PREMIUM_REQUIRED"` and template_id

### Timestamp Formats

- All timestamps in ISO 8601 format: `2025-11-17T10:00:00Z`
- Some use `toIso8601String()`, others `toISOString()`

---

## File Structure Reference

```
/Users/fred/PhpstormProjects/signature-api/
├── routes/
│   └── api.php                          (Main API routes)
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/V1/          (7 controllers)
│   │   ├── Middleware/
│   │   │   └── JwtAuthMiddleware.php
│   │   ├── Requests/                    (Request validation classes)
│   │   └── Resources/                   (Response transformers)
│   ├── Models/                          (7 main models)
│   ├── Actions/                         (Business logic)
│   └── Services/
│       ├── JwtService.php               (Token generation/verification)
│       ├── AnalyticsService.php
│       └── SubscriptionPlanService.php
├── config/
│   ├── jwt.php                          (JWT configuration)
│   └── auth.php                         (Auth guards)
└── database/
    └── migrations/                      (8 migrations)
```

---

## What's Missing / Not Explored

Based on the exploration, these items appear incomplete in the backend:

1. Payment integration (Stripe config exists but not fully documented)
2. Email functionality (Mail config present but not detailed)
3. Queue system for background jobs
4. Webhook handling for payment events
5. Complete analytics event types
6. Admin functionality (if needed)

---

## Recommendations for React Native Client

1. **Token Management:**
   - Store tokens in secure storage immediately after login
   - Refresh token before it expires (set alarm for 14 minutes)
   - Clear tokens on logout

2. **Error Handling:**
   - Distinguish between network errors and API errors
   - Show user-friendly messages for validation errors
   - Implement exponential backoff for retries

3. **Premium Features:**
   - Cache premium status to avoid repeated checks
   - Update cache when subscription status changes
   - Show clear "upgrade" CTAs for premium features

4. **File Upload:**
   - Validate file size before upload
   - Show progress indicator during upload
   - Handle upload cancellation gracefully

5. **OAuth:**
   - Fall back to email/password if OAuth unavailable
   - Link OAuth account to existing email account if already registered
   - Store provider info for future OAuth logins

6. **MFA:**
   - Optionally prompt user to enable MFA after registration
   - Store backup codes securely
   - Allow disable with password confirmation

---

## Next Steps

1. **Review** both documentation files thoroughly
2. **Set up** authentication service with token refresh
3. **Implement** basic CRUD for signatures
4. **Add** wallpaper template browsing
5. **Integrate** OAuth flows
6. **Build** subscription/premium features
7. **Test** error scenarios
8. **Implement** analytics tracking

---

**Last Updated:** November 17, 2025  
**Documentation Status:** COMPLETE  
**Ready for:** React Native Client Development
