# Laravel Signature API - Complete Backend Mapping

## 1. AUTHENTICATION SYSTEM

### Auth Method: JWT (JSON Web Tokens)

**Configuration File:** `/config/jwt.php`

- **Algorithm:** HS256 (HMAC SHA-256)
- **Secret Key:** `JWT_SECRET` environment variable
- **Access Token TTL:** 900 seconds (15 minutes)
- **Refresh Token TTL:** 2,592,000 seconds (30 days)

**JWT Service:** `App\Services\JwtService`

- Generates and verifies tokens
- Uses Firebase/JWT library
- Token structure:
  ```
  {
    "iss": "app.url",           // issuer
    "sub": "user_id",           // subject (User UUID)
    "iat": timestamp,           // issued at
    "exp": timestamp            // expiration
  }
  ```

**Middleware:** `App\Http\Middleware\JwtAuthMiddleware`

- Extracts Bearer token from Authorization header
- Verifies token validity
- Resolves user from token payload
- Returns 401 for missing/invalid tokens

---

## 2. API ROUTES STRUCTURE

**Base URL:** `/api/v1`

**Rate Limiting:** 60 requests per minute on all routes

### Authentication Routes (Public - `/api/v1/auth`)

```
POST   /auth/register              - Register new user
POST   /auth/login                 - Login user
POST   /auth/refresh               - Refresh access token
POST   /auth/logout                - Logout user
POST   /auth/forgot-password       - Request password reset
POST   /auth/reset-password        - Reset password with token
POST   /auth/oauth/apple           - Authenticate via Apple Sign-In
POST   /auth/oauth/google          - Authenticate via Google Sign-In
```

### MFA Management (Protected - `/api/v1/auth/mfa`)

```
POST   /auth/mfa/setup             - Generate MFA secret & QR code
POST   /auth/mfa/verify            - Verify MFA code & enable MFA
POST   /auth/mfa/disable           - Disable MFA for user
```

### Signatures Management (Protected - `/api/v1/signatures`)

```
GET    /signatures                 - List user's signatures (paginated)
POST   /signatures                 - Create new signature
GET    /signatures/{id}            - Get specific signature
POST   /signatures/{id}            - Update signature (supports file upload)
DELETE /signatures/{id}            - Soft delete signature
```

### Wallpapers Management (Protected - `/api/v1/wallpapers`)

```
GET    /wallpapers                 - List user's wallpapers (paginated)
POST   /wallpapers                 - Generate wallpaper from signature & template
GET    /wallpapers/{id}            - Get specific wallpaper
DELETE /wallpapers/{id}            - Soft delete wallpaper
```

### Wallpaper Templates (Protected - `/api/v1/wallpaper-templates`)

```
GET    /wallpaper-templates        - List active templates (browsable)
GET    /wallpaper-templates/{id}   - Get template details
```

### Subscriptions (Protected - `/api/v1/subscription`)

```
GET    /subscription/plans         - Get available subscription plans
GET    /subscription/              - Get user's current subscription
GET    /subscription/status        - Get premium access status
POST   /subscription/cancel        - Cancel subscription
```

### Analytics (Protected - `/api/v1/analytics`)

```
GET    /analytics/stats            - Get user statistics
GET    /analytics/events           - Get user event history
```

### Feedback (Protected - `/api/v1/feedback`)

```
POST   /feedback/                  - Submit feedback
GET    /feedback/                  - List user's feedback
GET    /feedback/stats             - Get feedback statistics
```

---

## 3. MODELS & DATABASE SCHEMA

### Users Table (`users`)

```php
UUID            id (primary key)
string          email (unique, indexed)
string          password_hash (nullable)
string          first_name (nullable)
string          last_name (nullable)
boolean         is_premium (default: false, indexed)
timestamp       premium_expires_at (nullable)
boolean         mfa_enabled (default: false)
string          mfa_secret (nullable)
string          locale (default: 'en', length: 10)
string          timezone (default: 'UTC', length: 50)
string          avatar_url (nullable)
string          remember_token
timestamps      created_at, updated_at
softDelete      deleted_at
```

**Model:** `App\Models\User`

```php
// Relationships
- signatures(): HasMany<Signature>
- subscription(): HasOne<Subscription>
- oauthProviders(): HasMany<OauthProvider>
- sessions(): HasMany<Session>

// Hidden fields (not returned in API)
- password_hash
- mfa_secret
- remember_token
```

### Signatures Table (`signatures`)

```php
UUID            id (primary key)
UUID            user_id (foreign key -> users.id, indexed)
string          name (nullable)
text            description (nullable)
string          celebrity_name
string          color (HEX color #FFFFFF)
longText        image_data (nullable, base64/SVG)
string          image_url (nullable)
string          image_path (nullable)
integer         image_width (nullable)
integer         image_height (nullable)
integer         file_size (nullable, bytes)
string          mime_type (nullable)
string          thumbnail_url (nullable)
timestamp       capture_date (indexed)
json            device_info (nullable)
timestamps      created_at, updated_at
softDelete      deleted_at
```

**Model:** `App\Models\Signature`

```php
// Relationships
- user(): BelongsTo<User>
- wallpapers(): HasMany<Wallpaper>
```

### Wallpapers Table (`wallpapers`)

```php
UUID            id (primary key)
UUID            signature_id (foreign key -> signatures.id, indexed)
UUID            template_id (foreign key -> wallpaper_templates.id, indexed)
string          wallpaper_url
string          thumbnail_url (nullable)
string          resolution (e.g., "1080x1920")
bigInteger      file_size (nullable, bytes)
enum            generation_status (pending|processing|completed|failed)
timestamps      created_at, updated_at
softDelete      deleted_at
```

**Model:** `App\Models\Wallpaper`

```php
// Relationships
- signature(): BelongsTo<Signature>
- template(): BelongsTo<WallpaperTemplate>
- shares(): HasMany<SharedWallpaper>
```

### Wallpaper Templates Table (`wallpaper_templates`)

```php
UUID            id (primary key)
string          name
text            description (nullable)
string          preview_url
string          category (indexed)
boolean         is_premium (indexed, default: false)
boolean         is_active (indexed, default: true)
json            config (nullable)
timestamps      created_at, updated_at
```

**Model:** `App\Models\WallpaperTemplate`

```php
// Relationships
- wallpapers(): HasMany<Wallpaper>
```

### Subscriptions Table (`subscriptions`)

```php
UUID            id (primary key)
UUID            user_id (foreign key -> users.id, indexed)
string          stripe_subscription_id (nullable, unique)
enum            status (active|cancelled|past_due|unpaid|incomplete, indexed)
enum            plan_type (monthly|annual)
timestamp       current_period_start
timestamp       current_period_end
timestamp       cancelled_at (nullable)
timestamps      created_at, updated_at
```

**Model:** `App\Models\Subscription`

```php
// Relationships
- user(): BelongsTo<User>
```

### Sessions Table (`sessions`)

```php
UUID            id (primary key)
UUID            user_id (foreign key -> users.id, indexed)
string          refresh_token (unique, indexed)
string          ip_address (nullable, length: 45)
text            user_agent (nullable)
timestamp       expires_at (indexed)
timestamp       last_used_at (nullable)
timestamps      created_at, updated_at
```

**Model:** `App\Models\Session`

```php
// Relationships
- user(): BelongsTo<User>

// Use: Stores refresh tokens securely (hashed with SHA-256)
```

### OAuth Providers Table (`oauth_providers`)

```php
UUID            id (primary key)
UUID            user_id (foreign key -> users.id, indexed)
enum            provider (apple|google)
string          provider_user_id
timestamps      created_at, updated_at
// Unique constraint: (provider, provider_user_id)
```

**Model:** `App\Models\OauthProvider`

```php
// Relationships
- user(): BelongsTo<User>
```

---

## 4. API CONTROLLERS & RESPONSE STRUCTURES

### AuthController

**File:** `App\Http\Controllers\Api\V1\AuthController`

#### register(RegisterRequest)

```json
POST /api/v1/auth/register
REQUEST:
{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Doe"
}

RESPONSE (200):
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "random64string",
  "token_type": "Bearer",
  "expires_in": 900,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_premium": false,
    "premium_expires_at": null,
    "mfa_enabled": false,
    "locale": "en",
    "timezone": "UTC",
    "avatar_url": null,
    "created_at": "2025-11-17T10:00:00Z"
  }
}
```

#### login(LoginRequest)

```json
POST /api/v1/auth/login
REQUEST:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

RESPONSE (200):
// Same as register response
```

#### refresh(RefreshTokenRequest)

```json
POST /api/v1/auth/refresh
REQUEST:
{
  "refresh_token": "random64string"
}

RESPONSE (200):
{
  "access_token": "new_jwt_token",
  "refresh_token": "new_refresh_token",
  "token_type": "Bearer",
  "expires_in": 900,
  "user": { /* UserResource */ }
}
```

#### logout(LogoutRequest)

```json
POST /api/v1/auth/logout
REQUEST:
{
  "refresh_token": "random64string"
}

RESPONSE (200):
{
  "message": "Successfully logged out."
}
```

#### forgotPassword(ForgotPasswordRequest)

```json
POST /api/v1/auth/forgot-password
REQUEST:
{
  "email": "user@example.com"
}

RESPONSE (200):
{
  "message": "Password reset link sent to your email.",
  "token": "reset_token_for_email"
}
```

#### resetPassword(ResetPasswordRequest)

```json
POST /api/v1/auth/reset-password
REQUEST:
{
  "token": "reset_token_from_email",
  "email": "user@example.com",
  "password": "newPassword123"
}

RESPONSE (200):
{
  "message": "Password has been reset successfully."
}
```

#### setupMfa(SetupMfaRequest)

```json
POST /api/v1/auth/mfa/setup
REQUEST:
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}

RESPONSE (200):
{
  "data": {
    "secret": "JBSWY3DPEBLW64TMMQ======",
    "qr_code": "data:image/png;base64,...",
    "backup_codes": ["code1", "code2", ...]
  }
}
```

#### verifyMfa(VerifyMfaRequest)

```json
POST /api/v1/auth/mfa/verify
REQUEST:
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "123456"
}

RESPONSE (200):
{
  "message": "MFA enabled successfully.",
  "mfa_enabled": true
}
```

#### disableMfa(DisableMfaRequest)

```json
POST /api/v1/auth/mfa/disable
REQUEST:
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}

RESPONSE (200):
{
  "message": "MFA has been disabled."
}
```

#### oauthApple(OauthAppleRequest)

```json
POST /api/v1/auth/oauth/apple
REQUEST:
{
  "identity_token": "apple_jwt_token",
  "email": "user@example.com",  // optional
  "name": "John Doe"             // optional
}

RESPONSE (200):
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "random64string",
  "token_type": "Bearer",
  "expires_in": 900,
  "user": { /* UserResource */ }
}
```

#### oauthGoogle(OauthGoogleRequest)

```json
POST /api/v1/auth/oauth/google
REQUEST:
{
  "identity_token": "google_jwt_token",
  "email": "user@example.com",  // optional
  "name": "John Doe"             // optional
}

RESPONSE (200):
// Same as oauthApple response
```

---

### SignatureController

**File:** `App\Http\Controllers\Api\V1\SignatureController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### index(ListSignaturesRequest)

```json
GET /api/v1/signatures?per_page=20&search=john
QUERY PARAMS:
{
  "per_page": 20,
  "search": "john"  // optional search filter
}

RESPONSE (200):
{
  "data": [
    {
      "id": "sig-uuid",
      "user_id": "user-uuid",
      "name": "My Signature",
      "description": "Black ink signature",
      "image_url": "https://storage.url/signatures/path.png",
      "image_path": "signatures/path.png",
      "image_width": 500,
      "image_height": 200,
      "file_size": 50000,
      "mime_type": "image/png",
      "created_at": "2025-11-17T10:00:00Z",
      "updated_at": "2025-11-17T10:00:00Z"
    }
  ],
  "links": { /* pagination */ },
  "meta": { /* pagination meta */ }
}
```

#### store(CreateSignatureRequest)

```json
POST /api/v1/signatures
CONTENT-TYPE: multipart/form-data

REQUEST:
{
  "user_id": "user-uuid",
  "name": "My Signature",
  "description": "Black ink signature",
  "image": <binary_file>  // JPEG, PNG, GIF; max 10MB
}

RESPONSE (201):
{
  "data": {
    "id": "sig-uuid",
    "user_id": "user-uuid",
    "name": "My Signature",
    "description": "Black ink signature",
    "image_url": "https://storage.url/signatures/path.png",
    "image_path": "signatures/path.png",
    "image_width": 500,
    "image_height": 200,
    "file_size": 50000,
    "mime_type": "image/png",
    "created_at": "2025-11-17T10:00:00Z",
    "updated_at": "2025-11-17T10:00:00Z"
  }
}

VALIDATION ERRORS (422):
{
  "message": "Validation failed",
  "errors": {
    "user_id": ["User not found."],
    "image": ["Image must not be larger than 10MB."]
  }
}
```

#### show(string $id)

```json
GET /api/v1/signatures/{id}

RESPONSE (200):
{
  "data": { /* SignatureResource */ }
}

RESPONSE (404):
{
  "message": "Signature not found."
}
```

#### update(string $id, UpdateSignatureRequest)

```json
POST /api/v1/signatures/{id}
CONTENT-TYPE: multipart/form-data

REQUEST:
{
  "name": "Updated Name",         // optional
  "description": "New description",  // optional
  "image": <binary_file>           // optional
}

RESPONSE (200):
{
  "data": { /* updated SignatureResource */ }
}
```

#### destroy(string $id)

```json
DELETE /api/v1/signatures/{id}

RESPONSE (200):
{
  "message": "Signature deleted successfully."
}

RESPONSE (404):
{
  "message": "Signature not found."
}
```

---

### WallpaperController

**File:** `App\Http\Controllers\Api\V1\WallpaperController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### index(ListWallpapersRequest)

```json
GET /api/v1/wallpapers?signature_id=sig-uuid&template_id=tpl-uuid&page=1&per_page=20

QUERY PARAMS:
{
  "signature_id": "sig-uuid",     // optional filter
  "template_id": "tpl-uuid",      // optional filter
  "page": 1,
  "per_page": 20
}

RESPONSE (200):
{
  "data": [
    {
      "id": "wallpaper-uuid",
      "signature_id": "sig-uuid",
      "template_id": "tpl-uuid",
      "wallpaper_url": "https://storage.url/wallpapers/id.png",
      "thumbnail_url": "https://storage.url/wallpapers/thumb-id.png",
      "resolution": "1080x1920",
      "file_size": 1500000,
      "generation_status": "completed",
      "signature": { /* SignatureResource */ },
      "template": { /* WallpaperTemplateResource */ },
      "created_at": "2025-11-17T10:00:00Z",
      "updated_at": "2025-11-17T10:00:00Z"
    }
  ],
  "links": { /* pagination */ },
  "meta": { /* pagination meta */ }
}
```

#### store(GenerateWallpaperRequest)

```json
POST /api/v1/wallpapers

REQUEST:
{
  "signature_id": "sig-uuid",
  "template_id": "tpl-uuid",
  "resolution": "1080x1920"  // optional, defaults to template
}

RESPONSE (201):
{
  "data": { /* WallpaperResource */ }
}

RESPONSE (403):
{
  "message": "This template requires a premium subscription.",
  "error": "PREMIUM_REQUIRED",
  "template_id": "tpl-uuid"
}

RESPONSE (500):
{
  "message": "Failed to generate wallpaper.",
  "error": "Internal server error details"
}
```

#### show(string $id)

```json
GET /api/v1/wallpapers/{id}

RESPONSE (200):
{
  "data": { /* WallpaperResource */ }
}

RESPONSE (404):
{
  "message": "Wallpaper not found or does not belong to you."
}
```

#### destroy(string $id)

```json
DELETE /api/v1/wallpapers/{id}

RESPONSE (200):
{
  "message": "Wallpaper deleted successfully."
}

RESPONSE (404):
{
  "message": "Wallpaper not found or could not be deleted."
}
```

---

### WallpaperTemplateController

**File:** `App\Http\Controllers\Api\V1\WallpaperTemplateController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### index(ListWallpaperTemplatesRequest)

```json
GET /api/v1/wallpaper-templates?category=modern&is_premium=false&page=1&per_page=20

QUERY PARAMS:
{
  "category": "modern",      // optional filter
  "is_premium": false,        // optional filter
  "page": 1,
  "per_page": 20
}

RESPONSE (200):
{
  "data": [
    {
      "id": "tpl-uuid",
      "name": "Modern Blue",
      "description": "Contemporary blue template",
      "preview_url": "https://storage.url/templates/preview.png",
      "category": "modern",
      "is_premium": false,
      "config": {
        "background_color": "#0066ff",
        "padding": 20,
        "signature_scale": 1.0
      },
      "created_at": "2025-11-17T10:00:00Z",
      "updated_at": "2025-11-17T10:00:00Z"
    }
  ],
  "links": { /* pagination */ },
  "meta": { /* pagination meta */ }
}
```

#### show(string $id)

```json
GET /api/v1/wallpaper-templates/{id}

RESPONSE (200):
{
  "data": { /* WallpaperTemplateResource */ }
}

RESPONSE (403) [if premium and user not subscribed]:
{
  "message": "This is a premium template. Upgrade to premium to access it.",
  "error": "PREMIUM_REQUIRED",
  "template_id": "tpl-uuid"
}

RESPONSE (404):
{
  "message": "Template not found or inactive."
}
```

---

### SubscriptionController

**File:** `App\Http\Controllers\Api\V1\SubscriptionController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### plans()

```json
GET /api/v1/subscription/plans

RESPONSE (200):
{
  "data": [
    {
      "type": "monthly",
      "name": "Monthly Premium",
      "price": 9.99,
      "currency": "USD",
      "duration_days": 30,
      "features": [
        "Unlimited signatures",
        "Premium templates",
        "Priority support"
      ]
    },
    {
      "type": "annual",
      "name": "Annual Premium",
      "price": 99.99,
      "currency": "USD",
      "duration_days": 365,
      "features": [
        "Unlimited signatures",
        "Premium templates",
        "Priority support",
        "Save 17%"
      ]
    }
  ]
}
```

#### show()

```json
GET /api/v1/subscription/

RESPONSE (200):
{
  "data": {
    "id": "sub-uuid",
    "user_id": "user-uuid",
    "status": "active",
    "plan_type": "annual",
    "current_period_start": "2025-11-01T00:00:00+00:00",
    "current_period_end": "2026-11-01T00:00:00+00:00",
    "cancelled_at": null,
    "is_active": true,
    "created_at": "2025-11-01T10:00:00+00:00",
    "updated_at": "2025-11-17T10:00:00+00:00"
  }
}

RESPONSE (404):
{
  "message": "No active subscription found.",
  "data": null
}
```

#### status()

```json
GET /api/v1/subscription/status

RESPONSE (200):
{
  "is_premium": true,
  "plan_type": "annual",
  "premium_expires_at": "2026-11-01T00:00:00Z",
  "access_details": {
    "unlimited_signatures": true,
    "premium_templates_access": true,
    "priority_support": true
  }
}
```

#### cancel(CancelSubscriptionRequest)

```json
POST /api/v1/subscription/cancel

REQUEST:
{
  "reason": "Too expensive",           // optional
  "feedback": "Service quality needs improvement"  // optional
}

RESPONSE (200):
{
  "message": "Subscription cancelled successfully. Your premium access will continue until the end of the current billing period."
}

RESPONSE (400):
{
  "message": "No active subscription to cancel or subscription already cancelled."
}
```

---

### AnalyticsController

**File:** `App\Http\Controllers\Api\V1\AnalyticsController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### stats()

```json
GET /api/v1/analytics/stats

RESPONSE (200):
{
  "total_signatures": 15,
  "total_wallpapers": 42,
  "signatures_this_month": 5,
  "wallpapers_this_month": 12,
  "total_downloads": 25,
  "downloads_this_month": 8,
  "favorite_template_id": "tpl-uuid",
  "favorite_template_name": "Modern Blue"
}
```

#### events(Request)

```json
GET /api/v1/analytics/events?event_type=signature_created&start_date=2025-11-01&end_date=2025-11-17&page=1&per_page=20

QUERY PARAMS:
{
  "event_type": "signature_created",    // optional
  "start_date": "2025-11-01",           // optional
  "end_date": "2025-11-17",             // optional
  "page": 1,
  "per_page": 20
}

RESPONSE (200):
{
  "data": [
    {
      "id": "event-uuid",
      "user_id": "user-uuid",
      "event_type": "signature_created",
      "event_data": {
        "signature_id": "sig-uuid",
        "signature_name": "My Signature"
      },
      "created_at": "2025-11-17T10:00:00Z"
    }
  ],
  "links": { /* pagination */ },
  "meta": { /* pagination meta */ }
}
```

---

### FeedbackController

**File:** `App\Http\Controllers\Api\V1\FeedbackController`

**Headers Required:** `Authorization: Bearer {access_token}`

#### store(SubmitFeedbackRequest)

```json
POST /api/v1/feedback/

REQUEST:
{
  "type": "bug",              // bug, feature_request, general_feedback
  "subject": "Login Issue",
  "message": "Cannot login with Google account"
}

RESPONSE (201):
{
  "data": {
    "id": "feedback-uuid",
    "user_id": "user-uuid",
    "type": "bug",
    "subject": "Login Issue",
    "message": "Cannot login with Google account",
    "status": "new",
    "created_at": "2025-11-17T10:00:00Z"
  }
}
```

#### index(ListFeedbackRequest)

```json
GET /api/v1/feedback/?type=bug&status=open&page=1&per_page=20

QUERY PARAMS:
{
  "type": "bug",       // optional
  "status": "open",    // optional
  "page": 1,
  "per_page": 20
}

RESPONSE (200):
{
  "data": [
    {
      "id": "feedback-uuid",
      "user_id": "user-uuid",
      "type": "bug",
      "subject": "Login Issue",
      "message": "Cannot login with Google account",
      "status": "open",
      "created_at": "2025-11-17T10:00:00Z"
    }
  ],
  "links": { /* pagination */ },
  "meta": { /* pagination meta */ }
}
```

#### stats()

```json
GET /api/v1/feedback/stats

RESPONSE (200):
{
  "total_feedback": 12,
  "feedback_this_month": 5,
  "by_type": {
    "bug": 3,
    "feature_request": 4,
    "general_feedback": 5
  },
  "by_status": {
    "open": 8,
    "in_progress": 2,
    "closed": 2
  }
}
```

---

## 5. REQUEST VALIDATION RULES

### Auth Requests

**RegisterRequest:**

- `email`: required, valid email, unique in users table, max 255 chars
- `password`: required, min 8 chars, max 255 chars
- `first_name`: optional, string, max 100 chars
- `last_name`: optional, string, max 100 chars

**LoginRequest:**

- `email`: required, valid email
- `password`: required, string

**RefreshTokenRequest:**

- `refresh_token`: required, string

**LogoutRequest:**

- `refresh_token`: required, string

**SetupMfaRequest:**

- `user_id`: required, valid UUID, user exists

**VerifyMfaRequest:**

- `user_id`: required, valid UUID
- `code`: required, string (6-digit TOTP code)

**DisableMfaRequest:**

- `user_id`: required, valid UUID

**OauthAppleRequest & OauthGoogleRequest:**

- `identity_token`: required, string
- `email`: optional, valid email
- `name`: optional, string, max 255 chars

---

### Signature Requests

**CreateSignatureRequest:**

- `user_id`: required, valid UUID, user exists
- `name`: required, string, max 255 chars
- `description`: optional, string, max 1000 chars
- `image`: required, image file (jpeg, png, jpg, gif), max 10MB

**UpdateSignatureRequest:**

- `name`: optional, string, max 255 chars
- `description`: optional, string, max 1000 chars
- `image`: optional, image file (jpeg, png, jpg, gif), max 10MB

**ListSignaturesRequest:**

- `per_page`: optional, integer, default 15
- `search`: optional, string (searches in name/description)

---

### Wallpaper Requests

**GenerateWallpaperRequest:**

- `signature_id`: required, valid UUID
- `template_id`: required, valid UUID
- `resolution`: optional, string (e.g., "1080x1920")

**ListWallpapersRequest:**

- `signature_id`: optional, UUID filter
- `template_id`: optional, UUID filter
- `page`: optional, integer, default 1
- `per_page`: optional, integer, default 15

---

## 6. ERROR RESPONSES

All error responses follow this structure:

```json
{
  "message": "Error description",
  "errors": {
    // Only for validation errors (422)
    "field_name": ["Error message"]
  }
}
```

### Common Status Codes:

- **200 OK** - Successful request
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Missing or invalid authentication
- **403 Forbidden** - User lacks permission (e.g., non-premium trying to access premium template)
- **404 Not Found** - Resource not found
- **422 Unprocessable Entity** - Validation failed
- **429 Too Many Requests** - Rate limit exceeded (60 per minute)
- **500 Internal Server Error** - Server error

---

## 7. PREMIUM FEATURES & ACCESS CONTROL

### Premium Template Access

- Wallpaper templates can be marked as `is_premium = true`
- Users need active subscription to generate wallpapers from premium templates
- Check user's `is_premium` flag and `premium_expires_at` timestamp
- Returns 403 if expired or user not premium

### Premium Access Details

- Available via `GET /subscription/status`
- Features available to premium users are returned in `access_details`

---

## 8. AUTHENTICATION FLOW FOR REACT NATIVE

### Standard Login Flow:

1. POST `/api/v1/auth/login` with email/password
2. Receive `access_token` (valid 15 mins) and `refresh_token` (valid 30 days)
3. Store both tokens securely (use React Native Keychain)
4. Include `Authorization: Bearer {access_token}` in all protected requests
5. When access_token expires, use refresh_token to get new one via POST `/api/v1/auth/refresh`

### OAuth Flow (Apple/Google):

1. Use native Apple Sign-In / Google Sign-In SDK
2. Get `identity_token` from native SDK
3. POST `/api/v1/auth/oauth/apple` or `/api/v1/auth/oauth/google` with identity_token
4. Receive JWT tokens (same as standard login)
5. Store tokens securely

### MFA Flow:

1. After login/registration, user can enable MFA
2. POST `/api/v1/auth/mfa/setup` to get QR code
3. User scans QR with authenticator app
4. POST `/api/v1/auth/mfa/verify` with 6-digit code to enable
5. On subsequent logins, user will need to provide MFA code

---

## 9. FILE UPLOAD HANDLING

### Signature Image Upload

- Endpoint: `POST /api/v1/signatures` (multipart/form-data)
- Max size: 10MB
- Allowed types: JPEG, PNG, GIF
- Image metadata extracted: width, height, file_size, mime_type
- Stored path provided in response as `image_path`
- Public URL accessible via `image_url` (using Storage::disk('public'))

---

## 10. PAGINATION

List endpoints that return collections include pagination:

**Query Parameters:**

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 15, max: 100 for some endpoints)

**Response Structure:**

```json
{
  "data": [
    /* collection items */
  ],
  "links": {
    "first": "https://api.url/resource?page=1",
    "last": "https://api.url/resource?page=5",
    "prev": "https://api.url/resource?page=1",
    "next": "https://api.url/resource?page=3"
  },
  "meta": {
    "current_page": 2,
    "from": 16,
    "last_page": 5,
    "per_page": 15,
    "to": 30,
    "total": 75
  }
}
```

---

## 11. SOFT DELETES

The following models use soft deletes (data not actually removed):

- `User`
- `Signature`
- `Wallpaper`

Deleted records include a `deleted_at` timestamp. They're excluded from queries by default but can be restored.

---

## Summary

This Laravel API provides a complete backend for the signature wallpaper generation app with:

- JWT-based authentication with refresh tokens
- OAuth support (Apple, Google)
- Multi-factor authentication (MFA)
- Signature management (CRUD with image upload)
- Wallpaper generation from templates
- Premium subscription system
- Analytics and event tracking
- User feedback system
- Comprehensive role-based access control

All endpoints are rate-limited to 60 requests per minute and require JWT authentication (except public auth routes).
