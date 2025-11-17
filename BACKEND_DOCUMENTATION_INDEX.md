# Backend Documentation Index

Created: November 17, 2025  
Purpose: Complete API mapping for Laravel signature-api backend

---

## Documentation Files

### 1. **LARAVEL_API_DOCUMENTATION.md** - COMPLETE REFERENCE

**Size:** 27 KB | **Lines:** 1,211 | **Best for:** Comprehensive implementation

**Contents:**

- Complete authentication system documentation
- All 37 API endpoints with request/response examples
- Database schema for 8 tables
- Model relationships and relationships
- All request validation rules
- Error handling patterns
- Premium features & access control
- Authentication flows
- File upload handling
- Pagination patterns
- Rate limiting
- Soft delete behavior

**Use this when:** Building specific features, implementing endpoints, understanding data structures

### 2. **API_QUICK_REFERENCE.md** - QUICK LOOKUP

**Size:** 6.2 KB | **Lines:** 275 | **Best for:** Quick lookups during development

**Contents:**

- Base URL and auth setup
- Endpoint quick map organized by feature
- Common request/response patterns
- Data model field summaries
- Important notes and behaviors
- React Native integration checklist
- Testing examples with cURL

**Use this when:** Need to quickly find an endpoint, testing API, integrating features

### 3. **BACKEND_EXPLORATION_SUMMARY.md** - STRATEGIC OVERVIEW

**Size:** 15 KB | **Lines:** 441 | **Best for:** Understanding architecture and planning

**Contents:**

- Authentication system overview
- Complete endpoint map with descriptions
- Database schema summaries for each table
- Controllers and their methods
- Key implementation details
- React Native integration checklist
- Important API behaviors
- File structure reference
- Recommendations for client
- Next steps for development

**Use this when:** Planning architecture, onboarding team members, understanding system design

---

## Quick Navigation

### By Use Case

**Building Authentication:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 4 (AuthController)
- Reference: API_QUICK_REFERENCE.md → Auth endpoints
- Implementation: JwtService flow, token refresh logic

**Implementing Signature CRUD:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 4 (SignatureController)
- Validation: LARAVEL_API_DOCUMENTATION.md → Section 5
- Request/Response: LARAVEL_API_DOCUMENTATION.md → Section 4

**Setting Up File Uploads:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 9
- Validation rules: CreateSignatureRequest (LARAVEL_API_DOCUMENTATION.md)
- Response format: SignatureResource (LARAVEL_API_DOCUMENTATION.md)

**Handling Premium Features:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 7
- Error response: 403 Forbidden with PREMIUM_REQUIRED
- Check: is_premium AND premium_expires_at

**Implementing Pagination:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 10
- Query params: page, per_page
- Response structure: data, links, meta

**Testing OAuth:**

- See: LARAVEL_API_DOCUMENTATION.md → Section 4 (AuthController methods)
- Endpoints: /auth/oauth/apple, /auth/oauth/google
- Request: identity_token only (required)

---

## Key Statistics

### API Overview

- **Total Endpoints:** 37
- **Public Endpoints:** 8 (Auth routes)
- **Protected Endpoints:** 29
- **Controllers:** 7
- **Models:** 7 (plus 1 OAuthProvider)
- **Middleware:** 1 (JwtAuthMiddleware)

### Authentication

- **Method:** JWT (Firebase/JWT library)
- **Algorithm:** HS256
- **Access Token TTL:** 15 minutes
- **Refresh Token TTL:** 30 days
- **Rate Limit:** 60 req/min globally

### Database

- **Tables:** 8
- **All PKs:** UUID format
- **Soft Deletes:** User, Signature, Wallpaper
- **Total Fields:** 70+

---

## Feature Checklist for React Native

### Phase 1: Authentication

- [ ] Email/password registration (POST /auth/register)
- [ ] Email/password login (POST /auth/login)
- [ ] Token refresh mechanism (POST /auth/refresh)
- [ ] Secure token storage (React Native Keychain)
- [ ] Bearer token injection (HTTP interceptor)

### Phase 2: Basic Features

- [ ] List signatures (GET /signatures)
- [ ] Create signature (POST /signatures with image upload)
- [ ] View signature (GET /signatures/{id})
- [ ] Update signature (POST /signatures/{id})
- [ ] Delete signature (DELETE /signatures/{id})

### Phase 3: Wallpapers

- [ ] Browse templates (GET /wallpaper-templates)
- [ ] Generate wallpaper (POST /wallpapers)
- [ ] List wallpapers (GET /wallpapers)
- [ ] View wallpaper (GET /wallpapers/{id})
- [ ] Delete wallpaper (DELETE /wallpapers/{id})

### Phase 4: Advanced Auth

- [ ] OAuth Apple Sign-In (POST /auth/oauth/apple)
- [ ] OAuth Google Sign-In (POST /auth/oauth/google)
- [ ] Password reset flow (forgot + reset)
- [ ] MFA setup (POST /auth/mfa/setup)
- [ ] MFA verification (POST /auth/mfa/verify)

### Phase 5: Subscriptions & Premium

- [ ] Show plans (GET /subscription/plans)
- [ ] Check subscription (GET /subscription)
- [ ] Get premium status (GET /subscription/status)
- [ ] Cancel subscription (POST /subscription/cancel)
- [ ] Premium template access control

### Phase 6: Analytics & Feedback

- [ ] User stats (GET /analytics/stats)
- [ ] Event history (GET /analytics/events)
- [ ] Submit feedback (POST /feedback)
- [ ] View feedback (GET /feedback)

---

## Common Implementation Patterns

### Bearer Token Pattern

```javascript
// All protected requests
Authorization: Bearer {access_token}
```

### Request/Response Pattern

```json
// Request (example)
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Success Response (200)
{
  "access_token": "jwt_token",
  "refresh_token": "refresh_token",
  "token_type": "Bearer",
  "expires_in": 900,
  "user": { /* UserResource */ }
}

// Validation Error Response (422)
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field must be a valid email."],
    "password": ["The password must be at least 8 characters."]
  }
}

// Forbidden Response (403)
{
  "message": "This template requires a premium subscription.",
  "error": "PREMIUM_REQUIRED",
  "template_id": "uuid"
}
```

### Pagination Pattern

```javascript
// Query
GET /api/v1/signatures?page=2&per_page=20

// Response includes
{
  "data": [ /* items */ ],
  "links": {
    "first": "url?page=1",
    "prev": "url?page=1",
    "next": "url?page=3",
    "last": "url?page=5"
  },
  "meta": {
    "current_page": 2,
    "from": 16,
    "to": 30,
    "total": 75,
    "per_page": 20,
    "last_page": 5
  }
}
```

### Multipart Upload Pattern

```javascript
// Create signature with image
POST /api/v1/signatures
Content-Type: multipart/form-data

{
  "user_id": "uuid",
  "name": "My Signature",
  "description": "Black ink",
  "image": <binary_file>  // max 10MB, JPEG/PNG/GIF
}
```

---

## Important Constraints & Rules

### File Upload

- **Max size:** 10 MB
- **Allowed types:** JPEG, PNG, GIF
- **Content-Type:** multipart/form-data
- **Extracted metadata:** width, height, file_size, mime_type

### Validation

- **Email:** Valid format, unique on registration
- **Password:** Minimum 8 characters
- **Names:** Max 255 characters
- **UUID:** Valid format, must exist in DB
- **TOTP code:** 6 digits

### Premium Access

- **Check:** `is_premium` AND `premium_expires_at > now()`
- **If denied:** 403 Forbidden + "PREMIUM_REQUIRED"
- **Template flag:** `is_premium` boolean in template

### Rate Limiting

- **Global:** 60 requests per minute
- **Returns:** 429 Too Many Requests if exceeded
- **Header:** X-RateLimit-Limit: 60

### Timestamps

- **Format:** ISO 8601 (e.g., "2025-11-17T10:00:00Z")
- **Timezone:** UTC
- **Soft delete:** Records with deleted_at still exist in DB

---

## Troubleshooting Guide

### 401 Unauthorized

**Causes:**

- Missing Authorization header
- Invalid JWT token
- Token expired

**Solution:**

- Refresh token using POST /auth/refresh
- Re-login if refresh fails
- Check token format (Bearer {token})

### 403 Forbidden (Premium)

**Causes:**

- Accessing premium template without subscription
- Subscription expired (premium_expires_at in past)

**Solution:**

- Show upgrade UI to user
- Display available plans
- Handle gracefully with error message

### 422 Validation Error

**Causes:**

- Invalid input format
- Required field missing
- File too large

**Solution:**

- Parse `errors` object for field-level messages
- Show user-friendly validation messages
- Validate on client before submit

### 404 Not Found

**Causes:**

- Resource doesn't exist
- User doesn't own the resource
- Soft-deleted resource

**Solution:**

- Show "not found" message
- Refresh list to sync state
- Handle gracefully in UI

---

## File Locations in Backend

**Backend Root:** `/Users/fred/PhpstormProjects/signature-api/`

### Key Directories

```
/routes/api.php                    Main API routes (89 lines)
/app/Http/Controllers/Api/V1/     7 controllers for all features
/app/Http/Middleware/              JWT authentication middleware
/app/Http/Requests/                Validation classes (14 files)
/app/Http/Resources/               Response serializers (8 files)
/app/Models/                       8 Eloquent models
/app/Actions/                      Business logic (action classes)
/app/Services/                     Services (JWT, Analytics, Subscription)
/config/jwt.php                   JWT token configuration
/config/auth.php                  Authentication guards
/database/migrations/              8 database migrations
```

---

## Related Documentation in This Project

Other useful documentation files in `/Users/fred/PhpstormProjects/poc-signature/`:

1. **AUTH_SYSTEM_README.md** - React Native auth implementation guide
2. **AUTH_INSTALLATION.md** - Step-by-step auth setup
3. **DESIGN-SPECS-maquettes-figma.md** - UI/UX design specifications
4. **SDD-Application-Mobile-SignatureApp.md** - Complete system design document
5. **TYPESCRIPT-FIXES-SUMMARY.md** - TypeScript configuration notes
6. **DEVICE_TESTING_GUIDE.md** - Testing instructions

---

## Next Steps

1. **Read** LARAVEL_API_DOCUMENTATION.md sections 1-3 (Auth & Routes)
2. **Review** API_QUICK_REFERENCE.md for endpoints
3. **Set up** authentication service in React Native
4. **Implement** secure token storage
5. **Build** API client with Bearer token injection
6. **Start** with auth endpoints (register, login, refresh)
7. **Implement** signature CRUD operations
8. **Add** wallpaper browsing and generation
9. **Integrate** OAuth if desired
10. **Test** thoroughly before deployment

---

## Questions & Clarifications

If you need to understand a specific:

**Endpoint behavior:** → LARAVEL_API_DOCUMENTATION.md Section 4
**Database structure:** → LARAVEL_API_DOCUMENTATION.md Section 3
**Request validation:** → LARAVEL_API_DOCUMENTATION.md Section 5
**Integration flow:** → BACKEND_EXPLORATION_SUMMARY.md "Integration Requirements"
**Quick answers:** → API_QUICK_REFERENCE.md

---

**Status:** Documentation Complete  
**Last Updated:** November 17, 2025  
**Ready for:** React Native Client Implementation

For full backend codebase reference, see: `/Users/fred/PhpstormProjects/signature-api/`
