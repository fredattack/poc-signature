# Laravel Signature API - Quick Reference Guide

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

All protected endpoints require:

```
Authorization: Bearer {access_token}
```

**Token Refresh:** Access tokens expire in 15 minutes. Use refresh token to get new one.

---

## Key Endpoints Quick Map

### Auth (No auth required)

```
POST   /auth/register                    // Email + Password signup
POST   /auth/login                       // Email + Password login
POST   /auth/refresh                     // Get new access token
POST   /auth/logout                      // Invalidate refresh token
POST   /auth/forgot-password             // Request reset email
POST   /auth/reset-password              // Reset with token
POST   /auth/oauth/apple                 // Apple Sign-In
POST   /auth/oauth/google                // Google Sign-In
```

### MFA (Auth required)

```
POST   /auth/mfa/setup                   // Generate QR code
POST   /auth/mfa/verify                  // Enable MFA with code
POST   /auth/mfa/disable                 // Disable MFA
```

### Signatures (Auth required)

```
GET    /signatures                       // List all signatures
POST   /signatures                       // Create (multipart form-data)
GET    /signatures/{id}                  // Get one
POST   /signatures/{id}                  // Update (multipart form-data)
DELETE /signatures/{id}                  // Delete
```

### Wallpapers (Auth required)

```
GET    /wallpapers                       // List all
POST   /wallpapers                       // Generate from template
GET    /wallpapers/{id}                  // Get one
DELETE /wallpapers/{id}                  // Delete
```

### Wallpaper Templates (Auth required)

```
GET    /wallpaper-templates              // Browse all
GET    /wallpaper-templates/{id}         // Get details
```

### Subscriptions (Auth required)

```
GET    /subscription/plans               // Available plans
GET    /subscription/                    // Current subscription
GET    /subscription/status              // Premium status
POST   /subscription/cancel              // Cancel subscription
```

### Analytics (Auth required)

```
GET    /analytics/stats                  // Usage statistics
GET    /analytics/events                 // Event history
```

### Feedback (Auth required)

```
POST   /feedback/                        // Submit feedback
GET    /feedback/                        // List feedback
GET    /feedback/stats                   // Feedback statistics
```

---

## Common Request/Response Patterns

### Login Response

```json
{
  "access_token": "eyJ0eXAi...",
  "refresh_token": "random64string",
  "token_type": "Bearer",
  "expires_in": 900,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_premium": false,
    "mfa_enabled": false,
    "created_at": "2025-11-17T10:00:00Z"
  }
}
```

### Error Response

```json
{
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### List Response (Paginated)

```json
{
  "data": [
    /* items */
  ],
  "links": {
    "first": "url?page=1",
    "prev": null,
    "next": "url?page=2",
    "last": "url?page=5"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "to": 15,
    "total": 75,
    "per_page": 15,
    "last_page": 5
  }
}
```

---

## Data Models

### User

```
id (UUID)
email
first_name, last_name
is_premium (boolean)
premium_expires_at (timestamp)
mfa_enabled (boolean)
locale, timezone
avatar_url
created_at, updated_at
```

### Signature

```
id (UUID)
user_id (FK)
name, description
image_path
image_url
image_width, image_height
file_size
mime_type
created_at, updated_at
```

### Wallpaper

```
id (UUID)
signature_id (FK)
template_id (FK)
wallpaper_url
thumbnail_url
resolution (e.g., "1080x1920")
generation_status (pending|processing|completed|failed)
created_at, updated_at
```

### WallpaperTemplate

```
id (UUID)
name, description
preview_url
category
is_premium (boolean)
is_active (boolean)
config (JSON)
created_at, updated_at
```

### Subscription

```
id (UUID)
user_id (FK)
status (active|cancelled|past_due|unpaid|incomplete)
plan_type (monthly|annual)
current_period_start, current_period_end
cancelled_at
created_at, updated_at
```

---

## Important Notes

1. **JWT Tokens:**
   - Access Token: 15 minutes
   - Refresh Token: 30 days
   - Algorithm: HS256

2. **File Upload:**
   - Use multipart/form-data for signature images
   - Max size: 10MB
   - Allowed: JPEG, PNG, GIF

3. **Rate Limiting:**
   - 60 requests per minute globally

4. **Premium Access:**
   - Check `user.is_premium` and `premium_expires_at`
   - Premium templates return 403 if not subscribed

5. **Soft Deletes:**
   - User, Signature, Wallpaper use soft deletes
   - Deleted records still exist in DB with deleted_at timestamp

---

## React Native Integration Checklist

- [ ] Store access_token & refresh_token securely (React Native Keychain)
- [ ] Set up token refresh mechanism before expiry
- [ ] Add Bearer token to all request headers
- [ ] Handle 401 responses for token refresh
- [ ] Implement OAuth integration (Apple/Google)
- [ ] Handle MFA flow if user has it enabled
- [ ] Use multipart/form-data for image uploads
- [ ] Parse pagination meta for infinite scroll
- [ ] Display premium upsell for premium templates (403 response)

---

## Testing Auth Flow

```bash
# 1. Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","first_name":"John","last_name":"Doe"}'

# 2. Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. Use access_token for protected request
curl -X GET http://localhost:8000/api/v1/signatures \
  -H "Authorization: Bearer {access_token}"

# 4. Refresh token when expired
curl -X POST http://localhost:8000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"{refresh_token}"}'
```

---

## File Locations

- Routes: `/routes/api.php`
- Controllers: `/app/Http/Controllers/Api/V1/`
- Models: `/app/Models/`
- JWT Service: `/app/Services/JwtService.php`
- Middleware: `/app/Http/Middleware/JwtAuthMiddleware.php`
- Migrations: `/database/migrations/`
