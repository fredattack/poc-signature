# Data Model: Digital Autograph Platform

**Phase**: 1 - Design & Contracts
**Date**: 2025-10-27
**Source**: Extracted from spec.md Key Entities and Functional Requirements

## Entity Definitions

### 1. Signature

**Description**: Digital autograph captured on canvas with touch input, containing signature image data, celebrity name, capture metadata, and sync status.

**Fields**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | UUID | Yes | Unique | Primary identifier |
| userId | UUID | Yes | Foreign key | Owner of signature (null for anonymous users) |
| celebrityName | String | Yes | 1-100 chars | Name entered by user (FR-003) |
| signatureImagePath | String | Yes | File path | Local path to PNG file |
| signatureColor | Enum | Yes | black, blue, red, white | Stroke color used (FR-002) |
| capturedAt | DateTime | Yes | Auto-generated | Timestamp of signature capture (FR-003) |
| location | Object (optional) | No | { city, country, lat, lon } | City-level location data (FR-004) |
| syncStatus | Enum | Yes | pending, synced, error | Cloud sync state for offline support |
| cloudImageUrl | String | No | URL | Cloud storage URL after sync |
| createdAt | DateTime | Yes | Auto-generated | Record creation timestamp |
| updatedAt | DateTime | Yes | Auto-updated | Last modification timestamp |

**Validation Rules**:
- celebrityName: Required, trimmed, 1-100 characters, non-empty after trim
- signatureColor: Must be one of the 4 preset colors (black, blue, red, white)
- signatureImagePath: Must exist in local file system before save
- location: Optional; if present, must have at least city and country fields
- syncStatus: Defaults to 'pending' on creation, updated to 'synced' after successful upload

**Relationships**:
- Belongs to User (userId) - nullable for anonymous users
- Has many Wallpapers (one signature can be used in multiple wallpapers)

**State Transitions**:
1. **New** → User draws on canvas → **Drawing**
2. **Drawing** → User enters celebrity name → **Valid** (can save)
3. **Valid** → User taps "Save" → **Saved** (syncStatus: pending)
4. **Saved (pending)** → Background sync succeeds → **Synced** (syncStatus: synced)
5. **Saved (pending)** → Sync fails → **Error** (syncStatus: error, retry later)

**Storage**:
- Metadata: AsyncStorage (local), API database (cloud)
- Image file: expo-file-system (local), S3/Cloud Storage (cloud)

---

### 2. Wallpaper

**Description**: Generated image combining a signature with a selected template, background color, and optional metadata display (date/location). Links to source signature.

**Fields**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | UUID | Yes | Unique | Primary identifier |
| signatureId | UUID | Yes | Foreign key | Source signature used |
| userId | UUID | Yes | Foreign key | Creator of wallpaper |
| templateId | String | Yes | Must exist in templates.ts | Template configuration ID |
| backgroundColor | String | Yes | Hex color | Customized background color (FR-007) |
| showDate | Boolean | Yes | Default true | Toggle date display (FR-008) |
| showLocation | Boolean | Yes | Default true | Toggle location display (FR-008) |
| wallpaperImagePath | String | Yes | File path | Local path to generated wallpaper PNG |
| cloudImageUrl | String | No | URL | Cloud storage URL if synced |
| resolution | Enum | Yes | standard, hd | Export quality based on premium status (FR-029) |
| createdAt | DateTime | Yes | Auto-generated | Wallpaper creation timestamp |
| updatedAt | DateTime | Yes | Auto-updated | Last modification timestamp |

**Validation Rules**:
- signatureId: Must reference existing Signature entity
- templateId: Must exist in templates config (free templates for free users, all for premium)
- backgroundColor: Valid hex color format (#RRGGBB)
- resolution: 'hd' only for premium users, 'standard' for free users
- wallpaperImagePath: Must exist after generation

**Relationships**:
- Belongs to Signature (signatureId)
- Belongs to User (userId)
- References Template (templateId) - configuration object, not database entity

**State Transitions**:
1. **New** → User opens editor from signature → **Editing**
2. **Editing** → User selects template, customizes colors → **Ready**
3. **Ready** → User taps "Generate" → **Generating** (async operation, 1-3s)
4. **Generating** → Generation succeeds → **Generated** (saved to file system)
5. **Generated** → User taps "Set as Wallpaper" → **Applied** (OS handles)
6. **Generated** → User taps "Save to Gallery" → **Saved** (media library)
7. **Generated** → User taps "Share" → **Shared** (social platforms)

**Storage**:
- Metadata: AsyncStorage (local), API database (cloud)
- Image file: expo-file-system (local), optionally cloud storage

---

### 3. Template

**Description**: Pre-designed wallpaper layout configuration with designated areas for signature, text (date/location), and customizable background. Not a database entity, stored as static configuration.

**Fields** (Configuration Object):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | Yes | Unique template identifier (e.g., "minimal-white", "elegant-black") |
| name | String | Yes | Display name (e.g., "Minimaliste Blanc") |
| isPremium | Boolean | Yes | Free (false) or Premium (true) tier (FR-005, FR-028) |
| thumbnail | String | Yes | Asset path for template preview |
| layout | Object | Yes | Position definitions for signature, date, location |
| layout.signature | Rect | Yes | { x, y, width, height } - signature placement |
| layout.date | Point | Yes | { x, y } - date text position |
| layout.location | Point | Yes | { x, y } - location text position |
| style | Object | Yes | Default styling (backgroundColor, textColor, borderStyle) |
| description | String | Yes | Template description for UI |

**Validation Rules**:
- id: Must be unique across all templates
- isPremium: Free users can only access templates where isPremium = false
- layout coordinates: Must fit within device screen dimensions (dynamic)
- At least 5 templates with isPremium = false (FR-005)

**Constants**:
- Stored in `src/constants/templates.ts`
- 5 free templates: Minimal White, Elegant Black, Modern Gradient, Colorful Pop, Dark Mode
- 15+ premium templates (additional styles)

**Usage**:
- TemplateCarousel loads all templates (filter by premium status)
- WallpaperEditor applies template layout to signature + metadata
- TemplateRenderer uses configuration to position elements

---

### 4. User

**Description**: Account holder with authentication credentials, subscription status, collection of signatures, and sync preferences. Can be anonymous (local only) or authenticated (cloud synced).

**Fields**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | UUID | Yes | Unique | Primary identifier |
| email | String | Conditional | Valid email, unique | Required for authenticated users (FR-020) |
| passwordHash | String | Conditional | Hashed | Stored securely, never plain text |
| firstName | String | No | 1-50 chars | Optional display name |
| avatar | String | No | URL or null | Profile picture URL |
| authProvider | Enum | Yes | email, google, apple, anonymous | Authentication method (FR-021) |
| isPremium | Boolean | Yes | Default false | Premium subscription status |
| subscriptionId | UUID | No | Foreign key | Active subscription if premium |
| signatureCount | Integer | Yes | Default 0 | Count of signatures (for free limit FR-027) |
| preferences | Object | Yes | JSON | App settings (theme, notifications, etc.) |
| createdAt | DateTime | Yes | Auto-generated | Account creation timestamp |
| updatedAt | DateTime | Yes | Auto-updated | Last modification timestamp |
| lastLoginAt | DateTime | No | Nullable | Last successful login

**Validation Rules**:
- email: Required for non-anonymous users, must be valid format, unique in database
- passwordHash: Required for authProvider = 'email', hashed with bcrypt/Argon2
- authProvider: Must be one of [email, google, apple, anonymous]
- signatureCount: Enforce limit of 10 for free users (isPremium = false) per FR-027
- isPremium: Updated when subscription becomes active/expires

**Relationships**:
- Has many Signatures (userId)
- Has many Wallpapers (userId)
- Has one Subscription (subscriptionId) - optional

**State Transitions**:
1. **Anonymous** → User opens app → **Anonymous Active** (local only, no account)
2. **Anonymous** → User taps "Sign Up" → **Registering**
3. **Registering** → Email/password or social auth → **Authenticated**
4. **Authenticated (Free)** → User subscribes → **Authenticated (Premium)**
5. **Authenticated (Premium)** → Subscription expires → **Authenticated (Free)**

**Storage**:
- Credentials: expo-secure-store (auth tokens)
- Profile data: AsyncStorage (cache), API database (source of truth)

---

### 5. Subscription

**Description**: Premium membership record with plan type, status, payment details, and renewal information via Stripe.

**Fields**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | UUID | Yes | Unique | Primary identifier |
| userId | UUID | Yes | Foreign key | Subscriber user |
| plan | Enum | Yes | monthly, annual | Subscription plan type (FR-026) |
| status | Enum | Yes | trialing, active, expired, canceled | Current subscription state |
| stripeCustomerId | String | Yes | Unique | Stripe customer ID |
| stripeSubscriptionId | String | Yes | Unique | Stripe subscription ID |
| startDate | DateTime | Yes | | Subscription start date |
| trialEndDate | DateTime | No | Nullable | End of 7-day free trial (FR-026) |
| currentPeriodEnd | DateTime | Yes | | Next renewal/expiration date |
| cancelAtPeriodEnd | Boolean | Yes | Default false | User requested cancellation |
| price | Decimal | Yes | USD | Subscription price (e.g., 2.99, 24.99) |
| currency | String | Yes | ISO code | Currency code (USD, EUR, etc.) |
| createdAt | DateTime | Yes | Auto-generated | Subscription creation timestamp |
| updatedAt | DateTime | Yes | Auto-updated | Last modification timestamp |

**Validation Rules**:
- plan: Must be 'monthly' or 'annual'
- status: Must be one of [trialing, active, expired, canceled]
- trialEndDate: Required if status = 'trialing', must be 7 days after startDate
- currentPeriodEnd: Must be after startDate
- price: Must match plan price (monthly: $2.99, annual: $24.99 as example)
- Only one active subscription per user

**Relationships**:
- Belongs to User (userId) - one-to-one relationship for active subscription

**State Transitions**:
1. **New** → User taps "Start Free Trial" → **Trialing** (status: trialing, 7 days)
2. **Trialing** → Trial period ends, payment succeeds → **Active** (status: active)
3. **Trialing** → User cancels during trial → **Canceled** (status: canceled, no charge)
4. **Active** → Payment fails on renewal → **Expired** (status: expired)
5. **Active** → User cancels → **Canceled** (cancelAtPeriodEnd: true, remains active until period end)
6. **Canceled** → Current period ends → **Expired** (status: expired)
7. **Expired** → User re-subscribes → **Active** (new subscription created)

**Business Logic**:
- Update User.isPremium = true when status = 'trialing' or 'active'
- Update User.isPremium = false when status = 'expired' or 'canceled'
- Webhook from Stripe backend updates subscription status automatically
- Premium features gated by User.isPremium check

**Storage**:
- API database (source of truth)
- Zustand premium-store (client-side cache)

---

## Relationships Summary

```
User (1) ──< (many) Signature
User (1) ──< (many) Wallpaper
User (1) ──< (1) Subscription (optional)

Signature (1) ──< (many) Wallpaper

Template (config) ─── (referenced by) Wallpaper
```

## Data Flow Examples

### Signature Capture Flow:
1. User draws on canvas → SignatureCanvas component captures path data
2. User enters celebrity name → Validates non-empty string
3. User enables location toggle → useLocation hook fetches city via expo-location
4. User taps "Validate" → Creates Signature entity with syncStatus: 'pending'
5. Signature saved to AsyncStorage + local file system (expo-file-system)
6. Background sync detects new signature → Uploads to API via TanStack Query mutation
7. API returns cloudImageUrl → Updates signature with syncStatus: 'synced'

### Wallpaper Generation Flow:
1. User opens signature detail → Taps "Create Wallpaper"
2. Wallpaper editor opens → Loads signature + template config
3. User selects template (id: "minimal-white", isPremium: false)
4. User customizes backgroundColor to "#8A9A5B"
5. User toggles showDate: true, showLocation: true
6. User taps "Generate" → TemplateRenderer creates wallpaper view
7. react-native-view-shot captures view as PNG (resolution based on User.isPremium)
8. Wallpaper entity created with wallpaperImagePath
9. User taps "Save to Gallery" → expo-media-library saves file
10. User taps "Share" → expo-sharing opens native share sheet

### Premium Subscription Flow:
1. User taps locked premium template → Paywall modal opens
2. User selects plan: 'annual', price: $24.99
3. User taps "Start Free Trial" → Stripe checkout sheet opens
4. User completes payment → Stripe webhook fires to backend API
5. Backend creates Subscription entity (status: 'trialing', trialEndDate: +7 days)
6. Backend updates User.isPremium = true
7. Client polls API → Detects premium status change
8. Zustand premium-store updates → UI unlocks premium templates
9. 7 days later → Stripe auto-charges, Subscription.status = 'active'

## Validation Summary

All entities include:
- **Timestamps**: createdAt, updatedAt for audit trails
- **Foreign Keys**: Proper relationships with referential integrity
- **Enums**: Constrained values for type safety
- **Required Fields**: Enforce data completeness from requirements
- **Optional Fields**: Support phased rollout and edge cases

Aligns with:
- FR-001 to FR-032 (all functional requirements covered)
- Constitution II (Type Safety) - all fields strongly typed
- Constitution III (Cross-Platform) - data model platform-agnostic

## Next Steps

Phase 1 continues with:
- Generate API contracts (OpenAPI specs for each entity)
- Write quickstart.md (setup guide for developers)
- Update agent context with technologies
