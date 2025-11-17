# API Integration Summary - Laravel Backend

## ✅ Completed Tasks

### 1. Configuration

- ✅ Created `.env` with Laravel API URL (`http://localhost:8000/api/v1`)
- ✅ Updated `.env.example` with correct API configuration
- ✅ Removed all Firebase/Supabase references

### 2. Type Definitions

- ✅ Created `src/types/backend.types.ts` with all Laravel response types:
  - BackendUser
  - BackendSignature
  - BackendWallpaper
  - BackendWallpaperTemplate
  - BackendSubscription
  - BackendFeedback
  - AuthTokens, AuthResponse
  - Request/Response types for all entities

- ✅ Updated `src/types/api.types.ts` with Laravel pagination format:
  - LaravelPaginationLinks
  - LaravelPaginationMeta
  - PaginatedResponse<T>

### 3. HTTP Client

- ✅ Consolidated to single `httpClient.ts` (removed duplicate `client.ts`)
- ✅ Updated base URL to use `EXPO_PUBLIC_API_URL`
- ✅ Automatic JWT token refresh (15 min expiry)
- ✅ Bearer token injection
- ✅ Comprehensive error handling

### 4. API Services Implemented

#### ✅ authApi (src/services/api/authApi.ts)

Already complete with:

- Register, Login, Logout
- OAuth (Google, Apple, Facebook, Twitter, Instagram, TikTok)
- MFA (setup, verify, enable, disable)
- Password reset (forgot, reset)
- Token refresh
- Get current user

#### ✅ signaturesApi (src/services/api/signaturesApi.ts)

- `getAll(params)` - Paginated list with search
- `getById(id)` - Single signature
- `create(data, userId)` - **Multipart file upload** (image)
- `update(id, data)` - Update name/description
- `delete(id)` - Delete signature

#### ✅ wallpapersApi (src/services/api/wallpapersApi.ts)

- `getAll(params)` - Paginated list with filters (signature_id, template_id)
- `getById(id)` - Single wallpaper
- `generate(data)` - Generate from signature + template
- `delete(id)` - Delete wallpaper
- `checkGenerationStatus(id)` - Poll generation status

#### ✅ wallpaperTemplatesApi (src/services/api/wallpaperTemplatesApi.ts)

- `getAll(params)` - Paginated list with filters (category, is_premium)
- `getById(id)` - Single template
- `getByCategory(category)` - Filter by category
- `getFreeTemplates()` - Free templates only
- `getPremiumTemplates()` - Premium templates only

#### ✅ subscriptionsApi (src/services/api/subscriptionsApi.ts)

- `getPlans()` - All available plans
- `getStatus()` - Current subscription status
- `createCheckoutSession(planId)` - Stripe checkout URL
- `cancel()` - Cancel subscription
- `hasPremiumAccess()` - Check premium status
- `getPremiumFeatures()` - List of features
- `getMonthlyPlan()` - Helper for monthly plan
- `getAnnualPlan()` - Helper for annual plan

#### ✅ analyticsApi (src/services/api/analyticsApi.ts)

- `trackEvent(event)` - Track single event
- `trackEventsBatch(events)` - Batch tracking
- `getStats()` - User analytics stats
- Helper methods:
  - `trackSignatureCreated(id)`
  - `trackWallpaperGenerated(id, templateId)`
  - `trackWallpaperShared(id, platform)`
  - `trackPremiumUpgrade(plan)`
  - `trackScreenView(screenName)`

#### ✅ feedbackApi (src/services/api/feedbackApi.ts)

- `getAll(params)` - Paginated feedback list
- `getById(id)` - Single feedback
- `create(data)` - Submit feedback
- `delete(id)` - Delete feedback
- Helper methods:
  - `submitBugReport(message)`
  - `submitFeatureRequest(message)`
  - `submitGeneralFeedback(message)`
  - `submitComplaint(message)`

### 5. API Index

- ✅ Created `src/services/api/index.ts` for centralized exports
- All services can now be imported with:
  ```typescript
  import { signaturesApi, wallpapersApi, authApi } from '@/services/api';
  ```

---

## 📋 Next Steps (TODO)

### 1. Update React Query Hooks

Replace mock data with real API calls:

**Files to update:**

- `src/hooks/useSignature.ts` - Use `signaturesApi`
- `src/hooks/useWallpaper.ts` - Use `wallpapersApi`
- `src/hooks/usePremium.ts` - Use `subscriptionsApi`
- `src/hooks/useAuth.ts` - Already using `authApi` ✅

**Example migration:**

```typescript
// OLD (mock)
const { data } = useQuery(['signatures'], () => mockApi.getSignatures());

// NEW (real API)
const { data } = useQuery(['signatures'], () => signaturesApi.getAll());
```

### 2. Update Zustand Stores

Integrate with real API state:

**Files to update:**

- `src/store/signatures-store.ts` - Use `signaturesApi`
- `src/store/auth-store.ts` - Already integrated ✅
- `src/store/premium-store.ts` - Use `subscriptionsApi`

### 3. Handle API-Specific Features

#### Image Upload (Signatures)

The `signaturesApi.create()` already handles multipart upload:

- Automatically converts React Native image URI to FormData
- Handles MIME types
- Max 10MB validation (server-side)

**Usage:**

```typescript
await signaturesApi.create(
  {
    name: 'My Signature',
    description: 'Optional description',
    image: {
      uri: 'file://...',
      type: 'image/png',
      name: 'signature.png',
    } as unknown as File,
  },
  userId
);
```

#### Premium Access Control

Check before using premium features:

```typescript
const hasPremium = await subscriptionsApi.hasPremiumAccess();

if (!hasPremium && template.is_premium) {
  // Show paywall
  showPaywall();
  return;
}

// Generate wallpaper
await wallpapersApi.generate({ signature_id, template_id });
```

#### Error Handling

All APIs return standardized errors:

```typescript
const response = await signaturesApi.create(data, userId);

if (!response.success) {
  // Handle error
  Alert.alert('Error', response.error?.message);

  // Check error code
  if (response.error?.code === 'PREMIUM_REQUIRED') {
    showPaywall();
  }
}
```

### 4. Testing Checklist

#### Local Backend Setup

1. Start Laravel backend:

   ```bash
   cd /Users/fred/PhpstormProjects/signature-api
   php artisan serve
   ```

2. Verify API is running:
   ```bash
   curl http://localhost:8000/api/v1/auth/register
   ```

#### Test Authentication Flow

- [ ] Register new user
- [ ] Login with email/password
- [ ] Token refresh (wait 15 minutes or force expiry)
- [ ] Logout
- [ ] Password reset flow
- [ ] OAuth login (Google/Apple) - if configured

#### Test Signatures

- [ ] Create signature with image upload
- [ ] List all signatures (pagination)
- [ ] Get single signature
- [ ] Update signature (name/description)
- [ ] Delete signature

#### Test Wallpapers

- [ ] List templates (free + premium)
- [ ] Generate wallpaper from signature + template
- [ ] List generated wallpapers
- [ ] Check generation status (if async)
- [ ] Delete wallpaper

#### Test Premium

- [ ] Get subscription plans
- [ ] Check premium status (free user)
- [ ] Create Stripe checkout session
- [ ] Attempt premium template without subscription (should fail)
- [ ] Cancel subscription

#### Test Analytics

- [ ] Track events
- [ ] Batch track events
- [ ] Get user stats

#### Test Feedback

- [ ] Submit bug report
- [ ] Submit feature request
- [ ] List user feedback

---

## 🔧 Configuration Reference

### Environment Variables

```env
# .env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1

# Production
EXPO_PUBLIC_API_URL=https://api.signatureapp.com/api/v1
```

### API Endpoints

All endpoints are prefixed with `/api/v1`:

- **Auth:** `/auth/*`
- **Signatures:** `/signatures`
- **Wallpapers:** `/wallpapers`
- **Templates:** `/wallpaper-templates`
- **Subscriptions:** `/subscriptions/*`
- **Analytics:** `/analytics/*`
- **Feedback:** `/feedback`

### Token Management

- **Access Token:** 15 minutes expiry
- **Refresh Token:** 30 days expiry
- **Auto-refresh:** Handled by `httpClient.ts`
- **Storage:** Secure storage via `@/utils/storage`

---

## 🚨 Important Notes

### File Upload Limitations

- **Max size:** 10MB (enforced by Laravel)
- **Allowed types:** JPEG, PNG, GIF
- **Automatic metadata extraction:** width, height, file_size, mime_type

### Premium Features

Templates, HD/UHD resolutions require premium subscription:

- Check `template.is_premium` before generation
- API returns `403 FORBIDDEN` with `PREMIUM_REQUIRED` error code
- Use `subscriptionsApi.hasPremiumAccess()` to check

### Pagination

Laravel uses cursor-based pagination:

- **Default:** 20 items per page
- **Max:** 100 items per page
- Response includes `links` and `meta` for navigation

### Error Codes

Common error codes:

- `VALIDATION_ERROR` - 422 validation failed
- `UNAUTHORIZED` - 401 invalid/expired token
- `FORBIDDEN` - 403 premium required or access denied
- `NOT_FOUND` - 404 resource not found
- `PREMIUM_REQUIRED` - 403 premium subscription required
- `NETWORK_ERROR` - Network/connection error

---

## 📁 File Structure

```
src/
├── services/
│   └── api/
│       ├── httpClient.ts              # HTTP client with JWT refresh
│       ├── authApi.ts                 # ✅ Authentication
│       ├── signaturesApi.ts           # ✅ Signatures (multipart)
│       ├── wallpapersApi.ts           # ✅ Wallpapers
│       ├── wallpaperTemplatesApi.ts   # ✅ Templates
│       ├── subscriptionsApi.ts        # ✅ Subscriptions
│       ├── analyticsApi.ts            # ✅ Analytics
│       ├── feedbackApi.ts             # ✅ Feedback
│       └── index.ts                   # Centralized exports
│
├── types/
│   ├── api.types.ts                   # ✅ Updated with Laravel pagination
│   └── backend.types.ts               # ✅ All Laravel response types
│
└── (legacy - to migrate)
    ├── services/api/
    │   ├── auth.ts                    # OLD mock service
    │   ├── client.ts                  # OLD duplicate HTTP client
    │   ├── signatures.ts              # OLD mock service
    │   └── subscriptions.ts           # OLD mock service
    └── hooks/
        ├── useSignature.ts            # TODO: Update to use signaturesApi
        ├── useWallpaper.ts            # TODO: Update to use wallpapersApi
        └── usePremium.ts              # TODO: Update to use subscriptionsApi
```

---

## ✅ Summary

**All API services have been implemented and are ready to use!**

The React Native app is now fully configured to communicate with the Laravel backend. The next step is to update the React Query hooks and Zustand stores to use these real API services instead of the mock implementations.

**Key achievements:**

- 🎯 7 API services fully implemented
- 🔐 JWT authentication with auto-refresh
- 📤 Multipart file upload for signatures
- 💎 Premium access control
- 📊 Analytics event tracking
- 💬 Feedback system
- 📄 Complete type safety with TypeScript

**Status:** Ready for integration testing with live Laravel backend! 🚀
