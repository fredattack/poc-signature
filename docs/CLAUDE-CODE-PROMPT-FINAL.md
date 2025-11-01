# 🚀 CLAUDE CODE BRIEFING (ARCHITECTURE ALIGNED)

## SignatureApp - Modernisation Screen "Capture Signature"

**Status:** ✅ Prêt pour exécution  
**Date:** 1er novembre 2025  
**Priority:** 🔴 HAUTE - MVP Critical Path  
**Timeline:** 1-2 sprints (1-2 semaines)  
**Architecture:** Expo Router + Zustand + React Native Skia + Services

---

## 📋 RÉSUMÉ EXÉCUTIF

**Objectif:** Refactoriser complètement l'écran "Capture Signature" pour l'aligner avec les standards de design 2026 et la charte graphique SignatureApp v2.0

**Pourquoi:**

- Interface actuelle fragmentée (scroll excessif)
- Color picker limité et peu accessible
- Manque de micro-interactions modernes
- Non-conforme à WCAG 3.0 AAA (charte cible)
- Pas de cohérence avec palette sage green/beige

**Impact:** Amélioration drastique UX, accessibilité 100%, design premium 2026

**Livrables:**

- ✅ Page `src/app/signature-canvas.tsx` refactorisée (single-page)
- ✅ Composant `src/components/signature/SignatureCanvas.tsx` moderne avec affordances (Skia-based)
- ✅ ColorPickerDropdown moderne (avec preview live)
- ✅ Form validation accessible (icon+text)
- ✅ Integration avec SignaturesStore Zustand
- ✅ Dark mode complet + animations 60fps

---

## 🎯 PHASE 1: ARCHITECTURE & AUDIT (Claude Code - Step 1)

### 1.1 Analyse Actuelle Requise

**Fichiers à analyser:**

- `src/app/signature-canvas.tsx` (page route - point d'entrée)
- `src/components/signature/SignatureCanvas.tsx` (composant canvas Skia)
- `src/app/(tabs)/index.tsx` (home page - pour context)
- `src/app/(tabs)/gallery.tsx` (galerie - pour context)
- `src/stores/signature.store.ts` (Zustand store - état signatures)
- `src/stores/auth.store.ts` (Zustand store - authentification)
- `src/hooks/useSignature.ts` (hook business logic)
- `src/services/api.service.ts` (API client)
- `src/services/storage.service.ts` (FileSystem service)

Claude Code doit :

1. **Identifier la structure actuelle**
   - Zustand stores pattern et data flow
   - React Native Skia canvas implementation
   - Hook architecture (useSignature, useManualSync)
   - Services layer (API, storage, analytics)
   - AsyncStorage + SecureStore usage
   - Error handling with Sentry integration

2. **Audit des problèmes spécifiques**

   ```
   Point to analyze:
   ☐ Hauteur totale du scroll en signature-canvas.tsx (devrait être 0)
   ☐ Comment SignaturesStore est utilisé (state management)
   ☐ Canvas Skia implementation actuelle (quels appels API?)
   ☐ Color picker (4 boutons - à remplacer par dropdown)
   ☐ Form fields (validations, erreurs)
   ☐ Integration avec useSignature hook
   ☐ How images saved to FileSystem
   ☐ How signatures persisted to Zustand store
   ☐ Accessibility (aria-labels? semantic structure?)
   ☐ Dark mode support (prefers-color-scheme?)
   ☐ Error handling (Sentry logging?)
   ☐ Navigation integration (Expo Router?)
   ```

3. **Proposer architecture moderne**
   ```
   Expected output:
   - Component breakdown (aligned with Skia + Zustand)
   - Zustand store updates needed
   - Hook enhancements required
   - Service layer integration points
   - Animation strategy (with existing libs)
   - Accessibility approach (WCAG 3.0 AA)
   - Error handling integration (Sentry)
   - Form validation pattern (with hooks)
   ```

### 1.2 Prompt pour Phase 1 (Architecture)

```
⚠️ CLAUDE CODE - PHASE 1 PROMPT:

You are modernizing the "Capture Signature" screen of SignatureApp.

PROJECT STRUCTURE & TECH STACK:
- Framework: Expo Router (file-based routing)
- State Management: Zustand (store-based)
- Canvas Drawing: React Native Skia (high-performance vector graphics)
- Storage: AsyncStorage (user data) + SecureStore (tokens)
- File System: expo-file-system (for signature images)
- HTTP Client: Custom API service with Bearer token auth
- Error Tracking: Sentry integration
- Analytics: Amplitude

CURRENT FILE ARCHITECTURE:
- Main page: src/app/signature-canvas.tsx
- Canvas component: src/components/signature/SignatureCanvas.tsx
- Home (tabs): src/app/(tabs)/index.tsx
- Gallery (tabs): src/app/(tabs)/gallery.tsx
- Signature store: src/stores/signature.store.ts (Zustand)
- Auth store: src/stores/auth.store.ts (Zustand)
- Premium store: src/stores/premium.store.ts (Zustand)
- useSignature hook: src/hooks/useSignature.ts (business logic)
- useManualSync hook: src/hooks/useManualSync.ts (sync logic)
- API service: src/services/api.service.ts (REST calls)
- Storage service: src/services/storage.service.ts (FileSystem)
- Sync service: src/services/sync.service.ts (cloud sync)

REQUIRED FILES TO ANALYZE:
1. src/app/signature-canvas.tsx
   - Current page layout & scroll issues
   - State management (local vs Zustand)
   - Error handling & loading states
   - Navigation integration

2. src/components/signature/SignatureCanvas.tsx
   - React Native Skia implementation
   - How strokes captured & stored
   - Current affordances (or lack thereof)
   - Ref API for parent control

3. src/stores/signature.store.ts
   - Current Zustand store structure
   - What actions available
   - How signatures persisted
   - Sync status tracking

4. src/hooks/useSignature.ts
   - Current business logic
   - Canvas interaction handling
   - Form validation logic
   - How images saved & signatures created

5. src/app/(tabs)/index.tsx & gallery.tsx
   - Navigation context
   - Tab integration
   - How signatures displayed

REFERENCE DOCUMENTS:
1. /docs/MODERNIZATION-GUIDE.md (section "B. PAGE CAPTURE SIGNATURE")
   - Layout target (single-page, 600pt max height)
   - Color picker replacement (dropdown, modern)
   - Form validation pattern (accessible)

2. /docs/CHARTE-GRAPHIQUE.md (section "FONDAMENTAUX VISUELS")
   - Color palette: Sage #8A9A5B, Water Green #A8C3BC, Beige #D4C5B1
   - 8pt grid system, 16pt radius standard
   - WCAG 3.0 AAA target
   - Dark mode requirements

ARCHITECTURE ANALYSIS REQUIRED:

1. Current Design Issues
   ☐ What's causing excessive scroll in signature-canvas.tsx?
   ☐ How does Zustand store integrate with canvas component?
   ☐ What's the current form validation pattern?
   ☐ How are animations implemented (React Native Animated vs Reanimated)?
   ☐ What error handling exists? (Sentry integration?)
   ☐ How is dark mode currently handled?
   ☐ What's the FileSystem save strategy for images?
   ☐ How does cloud sync work (relevant for success state)?

2. Zustand Store Impact
   ☐ Analyze SignaturesStore actions & state
   ☐ What needs to be added for new features?
   ☐ How to handle optimistic updates?
   ☐ Middleware for persistence & sync?

3. Modern Component Breakdown
   Propose in src/components/signature/:
   ├─ signature-canvas.tsx (main page route)
   ├─ components/
   │  ├─ SignatureCanvas.tsx (enhanced Skia canvas)
   │  ├─ ColorPickerDropdown.tsx (new, replaces 4 buttons)
   │  ├─ FormField.tsx (with inline validation)
   │  ├─ AnimatedButton.tsx (with micro-interactions)
   │  ├─ SyncStatusIndicator.tsx (show sync status)
   │  └─ theme.ts (design tokens)
   └─ hooks/
      ├─ useSignatureCapture.ts (refactored from useSignature)
      └─ useFormValidation.ts (new, for validation)

4. Zustand Store Enhancements
   What needs updating in SignaturesStore:
   ☐ Loading states for UI feedback
   ☐ Error states with user messages
   ☐ Sync status per signature (pending, syncing, synced, failed)
   ☐ Optimistic updates for better UX
   ☐ Validation state management

5. Service Layer Integration
   ☐ How API service handles errors
   ☐ How storage service saves images
   ☐ How sync service works
   ☐ Token refresh mechanism
   ☐ Retry logic for failed saves

6. Accessibility with Zustand
   ☐ How to manage accessibility state (focus, screen reader)
   ☐ Error message display with aria-labels
   ☐ Loading state announcements

7. Animation Strategy
   ☐ What animation library is used project-wide?
   ☐ How to animate with Skia canvas?
   ☐ Canvas hint animations (with Skia)
   ☐ Form expand animations
   ☐ Button micro-interactions

8. Navigation & Error Handling
   ☐ How Expo Router navigation works
   ☐ Error boundary integration (React error boundary exists?)
   ☐ Sentry error logging
   ☐ User-facing error messages

OUTPUT FORMAT:
Provide:
- Component architecture diagram (aligned with Zustand)
- Zustand store modifications needed
- Hook refactoring strategy
- Service integration points
- Animation architecture
- Accessibility checklist
- Error handling flow
- Data flow diagram (capture → save → sync)

DO NOT write code yet. Only propose architecture aligned with actual tech stack.
```

---

## 🎯 PHASE 2: CORE COMPONENTS (Claude Code - Step 2)

### 2.1 Components à Créer/Modifier dans `src/components/signature/`

#### Component 1: SignatureCanvas.tsx (ENHANCE EXISTING with Skia)

```
Location: src/components/signature/SignatureCanvas.tsx (REFACTOR)
Purpose: Canvas with affordances, animations, feedback (using React Native Skia)

Keep existing:
- Skia drawing implementation
- Stroke accumulation logic
- Ref-based API (captureRef, undo, clear)
- Image capture & URI generation

Add new:
✓ Initial state: Hint animation (pulse, 300ms cycle)
✓ Active state: Real-time stroke with selected color + haptic feedback
✓ Completed state: Subtle checkmark animation (Skia-based)
✓ Dark mode: Canvas white, border adapts
✓ Affordances: "✍️ Draw here" hint with pulsing animation

Considerations:
- Skia animations (native Skia API, not JavaScript Animated)
- Performance: 60fps on lower-end devices
- Canvas resource cleanup on unmount
- Memory management for image caching

Props:
<SignatureCanvas
  ref={canvasRef}
  strokeColor="#000000"
  onBegin={() => setIsDrawing(true)}
  onEnd={() => setIsDrawing(false)}
  onSignatureChange={(sig) => setSignature(sig)}
  isDarkMode={isDarkMode}
  height={280}
/>
```

#### Component 2: ColorPickerDropdown.tsx

```
Location: src/components/signature/ColorPickerDropdown.tsx
Purpose: Replace 4-button color picker with modern dropdown

Requirements:
✓ Show color swatches with names (accessible)
✓ Expand/collapse animation (300ms ease-in-out)
✓ Live stroke preview on canvas
✓ Support 6-8 colors from palette + custom
✓ Dark mode support
✓ Accessibility: aria-label, keyboard navigation
✓ Integration with form validation state

Props:
<ColorPickerDropdown
  selectedColor="#000000"
  onColorChange={(color) => updateStroke(color)}
  colors={PALETTE_COLORS}
  isExpanded={colorPickerOpen}
  onToggle={() => toggleColorPicker()}
  error={validationError}
/>
```

#### Component 3: FormField.tsx

```
Location: src/components/signature/FormField.tsx
Purpose: Form field with inline validation (icon+text)

Requirements:
✓ Label always visible
✓ Input field (text or dropdown)
✓ Inline validation (no floating popups)
✓ Error: Icon ⓘ + Text (not color-only!)
✓ Success: Icon ✓ + Text (optional)
✓ Dark mode support
✓ Accessibility: aria-label, role, semantic structure
✓ Integration with Zustand store for state

Props:
<FormField
  label="Celebrity Name"
  value={celebrity}
  onChange={setCelebrity}
  onBlur={() => validate()}
  error={celebError}
  required={true}
  type="text"
  isDarkMode={isDarkMode}
/>
```

#### Component 4: AnimatedButton.tsx

```
Location: src/components/signature/AnimatedButton.tsx
Purpose: Button with modern micro-interactions

Requirements:
✓ Press animation: Scale 0.98 (100ms ease-out)
✓ Focus state: Visible ring (2pt, sage green)
✓ Loading state: Spinner + disabled
✓ Success state: Checkmark animation + color change
✓ Haptic feedback (iOS light/medium impact)
✓ Error state: Visual feedback + error message
✓ Accessible: aria-label, role="button"
✓ Dark mode support

Props:
<AnimatedButton
  title="Save Signature"
  onPress={handleSave}
  variant="primary" // or "secondary"
  loading={isLoading}
  disabled={!signature}
  error={error}
  icon="💾"
  isDarkMode={isDarkMode}
/>
```

#### Component 5: SyncStatusIndicator.tsx (NEW)

```
Location: src/components/signature/SyncStatusIndicator.tsx
Purpose: Show sync status (pending, syncing, synced, failed)

Requirements:
✓ Visual feedback for sync state
✓ Tooltip on hover/long-press
✓ Animated spinner for "syncing"
✓ Success checkmark for "synced"
✓ Error indicator for "failed"
✓ Accessibility: aria-label for each state
✓ Dark mode support

Props:
<SyncStatusIndicator
  status="syncing" // 'pending' | 'syncing' | 'synced' | 'failed'
  error={error}
  isDarkMode={isDarkMode}
/>
```

#### Component 6: theme.ts (Design Tokens)

```
Location: src/components/signature/theme.ts
Purpose: Centralized design tokens

Exports:
- colors (light + dark modes)
- spacing (8pt grid)
- typography (scales)
- animations (timing)
- shadows (depth)
- zIndices (layer management)
```

### 2.2 Hook Updates Required

#### useSignatureCapture.ts (Refactored from useSignature)

```
Location: src/hooks/useSignatureCapture.ts
Purpose: Manage signature capture logic

Responsibilities:
✓ Coordinate canvas drawing & form input
✓ Call Zustand store actions (addSignature)
✓ Handle image capture & FileSystem save
✓ Manage form validation state
✓ Track loading/error states
✓ Handle cloud sync initiation
✓ Haptic feedback on key events

Dependencies:
- SignaturesStore (Zustand)
- useManualSync hook
- storage.service (FileSystem)
- api.service (for save API)
- Sentry for error logging

Returns:
{
  signature: null | SignatureData,
  strokeColor: string,
  setStrokeColor: (color: string) => void,
  celebrity: string,
  setCelebrity: (name: string) => void,
  celebError: string,
  location: boolean,
  setLocation: (enabled: boolean) => void,
  loading: boolean,
  error: string | null,
  saveSignature: () => Promise<void>,
  canvasRef: React.Ref<SkiaCanvasRef>,
}
```

#### useFormValidation.ts (NEW)

```
Location: src/hooks/useFormValidation.ts
Purpose: Centralized form validation logic

Handles:
✓ Signature validation (not empty)
✓ Celebrity name validation (required, min 2 chars)
✓ Location permission check (if enabled)
✓ Error messaging (icon + text)
✓ Submit readiness check

Returns:
{
  errors: { celebrity?: string; location?: string },
  isValid: boolean,
  validateField: (field: string, value: any) => void,
  clearErrors: () => void,
  getFieldError: (field: string) => string | undefined,
}
```

### 2.3 Zustand Store Modifications

#### SignaturesStore Enhancements

```
New state fields:
- savingSignatureId: string | null (for UI feedback)
- saveError: string | null
- syncStatus: Map<string, 'pending' | 'syncing' | 'synced' | 'failed'>
- lastError: AppError | null

New actions:
- startSavingSignature(id: string): void
- setSaveError(error: string | null): void
- updateSyncStatus(id: string, status: string): void
- clearErrors(): void

Middleware updates:
- Persist sync status (so it survives app restart)
- Subscribe to sync service for real-time updates
```

### 2.4 Prompt pour Phase 2 (Components & Stores)

```
⚠️ CLAUDE CODE - PHASE 2 PROMPT:

You are now building the core modern components for SignatureApp.
All components must integrate with existing Zustand stores and services.

Based on the approved architecture from Phase 1, create/update:

COMPONENTS TO CREATE/MODIFY (in src/components/signature/):

1. SignatureCanvas.tsx (REFACTOR EXISTING)
   - Keep Skia implementation
   - Add hint animation (pulsing "✍️ Draw here")
   - Add affordances (initial/active/completed states)
   - Add haptic feedback on iOS
   - Dark mode support (white canvas, sage border)
   - Accessibility annotations
   - Canvas resource cleanup

2. ColorPickerDropdown.tsx (NEW)
   Specification: /docs/MODERNIZATION-GUIDE.md section "B.4"
   - Dropdown with color swatches + names
   - Expand animation (300ms)
   - Live preview on canvas
   - Dark mode support
   - Accessibility (keyboard nav, aria-labels)
   - Integration with form state

3. FormField.tsx (NEW)
   Specification: /docs/MODERNIZATION-GUIDE.md section "D.9"
   - Input + Label + Error message
   - Error state: Icon + Text (not color-only)
   - Inline validation on blur
   - Accessible: aria-label, semantic HTML
   - Dark mode support
   - Support different input types (text, email, etc.)

4. AnimatedButton.tsx (NEW)
   Specification: /docs/MODERNIZATION-GUIDE.md section "C.6"
   - Press animation (scale 0.98, 100ms)
   - Focus ring visible (2pt, #8A9A5B)
   - States: default, hover, pressed, loading, success, error
   - Haptic feedback (iOS UIImpactFeedback via expo-haptics)
   - Variants: primary (sage), secondary (outline)
   - Loading spinner
   - Error display

5. SyncStatusIndicator.tsx (NEW)
   - Visual indicators for sync states
   - Animated spinner for "syncing"
   - Checkmark for "synced"
   - Error icon for "failed"
   - Accessibility labels
   - Dark mode support
   - Optional tooltip

6. theme.ts (NEW - DESIGN TOKENS)
   - Export all colors (light + dark modes)
   - Export spacing (8pt grid: 4,8,12,16,24,32,48)
   - Export typography (h1,h2,h3,body,caption)
   - Export animations (timing, easing functions)
   - Export shadows (multi-layer depth)
   - Export zIndices

HOOKS TO CREATE/REFACTOR (in src/hooks/):

1. useSignatureCapture.ts (NEW - Refactor from useSignature logic)
   - Manage canvas drawing + form input coordination
   - Call SignaturesStore.addSignature()
   - Handle FileSystem image save
   - Form validation state
   - Loading/error states
   - Trigger useManualSync on save
   - Return all needed state + actions
   - Sentry error logging

2. useFormValidation.ts (NEW)
   - Validate signature (not empty)
   - Validate celebrity name (required, min 2)
   - Check location permission (if enabled)
   - Return errors + validation state
   - Field-level validation support

ZUSTAND STORE UPDATES (src/stores/signature.store.ts):

Add these state fields:
- savingSignatureId: string | null
- saveError: string | null
- syncStatus: Record<string, SyncStatus>
- lastError: AppError | null

Add these actions:
- startSavingSignature(id: string)
- setSaveError(error: string | null)
- updateSyncStatus(id, status)
- clearErrors()

Ensure:
- Persist new fields (via middleware)
- Subscribe to sync service updates
- Proper TypeScript types

TECHNICAL REQUIREMENTS:

State Management:
- Use Zustand for all state (no useState for shared state)
- Use local useState only for UI-only state (form UI, animations)
- Proper TypeScript types for all state

Animations:
- Use React Native Animated or Reanimated (check existing)
- 60fps target on all devices
- Support prefers-reduced-motion
- No blocking animations

Accessibility:
- WCAG 3.0 AA minimum
- aria-labels on all components
- Color-independent information
- Keyboard navigation
- Screen reader support

Dark Mode:
- Full dark mode support
- prefers-color-scheme hook usage
- Smooth 0.5s transition
- All text readable in both modes

Performance:
- No unnecessary re-renders (useMemo, useCallback)
- Skia canvas cleanup on unmount
- Proper TypeScript strict mode

DELIVERABLES:
- All components production-ready
- Full TypeScript strict mode
- JSDoc comments on all exports
- Accessibility annotations (aria-*, roles)
- Dark mode fully implemented
- Integration with Zustand stores
- Integration with existing services

OUTPUT:
Provide complete, production-ready code for each component & hook.
Include usage examples in JSDoc.
Include store modifications clearly marked.
```

---

## 🎯 PHASE 3: PAGE REFACTORIZATION (Claude Code - Step 3)

### 3.1 Refactorisation src/app/signature-canvas.tsx

**Integration Points with Zustand & Services:**

```
Current State Flow:
canvas drawing → useSignature hook → FileSystem save → Zustand store → AsyncStorage

New State Flow with Modern Patterns:
canvas drawing → useSignatureCapture hook → FormField validation
  ↓
  Animation feedback (loading spinner)
  ↓
  FileSystem save + Zustand store update + cloud sync trigger
  ↓
  Success animation → navigate back

Key Integration Points:
1. useSignatureCapture hook (manages all logic)
2. SignaturesStore (Zustand) for data persistence
3. useManualSync hook (trigger sync on save)
4. analytics.track() for user events
5. Sentry.captureException() for errors
6. SecureStore (for auth tokens, if refresh needed)
```

### 3.2 Layout Target (NO SCROLL)

```
┌─────────────────────────────────────────┐ (56pt)
│ ← Back | Capture Signature | ⓘ         │
├─────────────────────────────────────────┤ (Divider)
│                                         │
│ ✍️ Draw the signature (hint, 14pt)      │ (16pt space + hint)
│ ┌─────────────────────────────────────┐ │
│ │     [SIGNATURE CANVAS - Skia]       │ │ (280pt)
│ │                                     │ │
│ │ Color: [Dropdown ▼] | Undo | Clear │ │ (48pt controls)
│ │ Status: [SyncIndicator]             │ │ (24pt sync status)
│ └─────────────────────────────────────┘ │
│                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ (Divider)
│                                         │
│ Celebrity Name * (required)             │
│ ┌─────────────────────────────────────┐ │ (40pt field)
│ │ [Input or Dropdown]                 │ │
│ └─────────────────────────────────────┘ │
│ ⓘ Celebrity name is required (error)   │ (14pt)
│                                         │
│ ▼ Additional Details (Optional)        │ (32pt toggle)
│   └─ Location [Toggle] 📍              │ (40pt when expanded)
│                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ (Divider)
│                                         │
│ [Clear] [💾 Save Signature →]          │ (56pt buttons)
│                                         │
└─────────────────────────────────────────┘

Total: ~600pt (NO scroll on iPhone 14 Pro: 812pt available)
```

### 3.3 State Management with Zustand

```typescript
// In signature-canvas.tsx
const {
  // From useSignatureCapture hook
  signature,
  strokeColor,
  setStrokeColor,
  celebrity,
  setCelebrity,
  celebError,
  location,
  setLocation,
  loading,
  error,
  saveSignature,
  canvasRef,
} = useSignatureCapture();

const {
  // From useFormValidation hook
  errors,
  isValid,
  validateField,
} = useFormValidation();

const {
  // From SignaturesStore (Zustand)
  signatures,
  savingSignatureId,
  saveError,
  syncStatus,
} = useSignaturesStore();

const {
  // For sync initiation
  triggerSync,
} = useManualSync();
```

### 3.4 Prompt pour Phase 3 (Page Integration)

```
⚠️ CLAUDE CODE - PHASE 3 PROMPT:

You are now refactoring the main page at src/app/signature-canvas.tsx

TASK: Refactor page with new components & Zustand integration

INPUTS:
- New components: ColorPickerDropdown, FormField, AnimatedButton, SyncStatusIndicator
- Enhanced component: SignatureCanvas.tsx (Skia-based)
- New hooks: useSignatureCapture, useFormValidation
- Updated store: SignaturesStore (Zustand)
- Design tokens: theme.ts
- Reference: /docs/MODERNIZATION-GUIDE.md sections "B. PAGE CAPTURE SIGNATURE"

ARCHITECTURE REQUIREMENTS:

1. State Management (Zustand Integration)
   ✓ Use useSignatureCapture hook for main logic
   ✓ Use useFormValidation for form validation
   ✓ Subscribe to SignaturesStore for sync status
   ✓ Track loading states (saving, syncing)
   ✓ Show error states with user messages
   ✓ No local state except UI-only state

2. Layout: Single-page (NO scroll)
   ✓ Total height: ~600pt (iPhone 14: 812pt available)
   ✓ Canvas: Hero element, 280pt height
   ✓ Form fields: Compact, progressive disclosure
   ✓ Buttons: Sticky footer (56pt)
   ✓ Hint animation: Pulse opacity on initial state
   ✓ Additional Details: Expand on tap (height animation 300ms)
   ✓ Sync status indicator: Shows current state

3. Animations
   ✓ Canvas hint: Pulse (opacity 0.3→1, 3s cycle)
   ✓ Color picker: Expand height animation (300ms ease-in-out)
   ✓ Additional Details: Same expand animation
   ✓ Button press: Scale 0.98 (100ms)
   ✓ Success checkmark: Scale animation (300ms)
   ✓ Loading spinner: Rotation animation
   ✓ All animations: 60fps smooth, prefers-reduced-motion respected

4. Accessibility
   ✓ WCAG 3.0 AA minimum (target: AAA)
   ✓ Color-independent validation (icon + text)
   ✓ Focus states: 2pt ring, visible always
   ✓ Keyboard navigation: Tab through all fields
   ✓ Screen reader: aria-labels, semantic structure
   ✓ Error announcements for screen readers
   ✓ No dependency on color alone

5. Dark Mode
   ✓ Entire page in dark mode
   ✓ Transition smooth (0.5s fade-through-gray)
   ✓ Canvas: White (same), border adapts
   ✓ Form: Dark background, light text
   ✓ All text readable (contrast check)
   ✓ Use theme.ts tokens

6. Performance
   ✓ 60fps animations (no jank)
   ✓ No excessive re-renders (memoization with Zustand)
   ✓ Canvas cleanup on unmount (Skia resource management)
   ✓ LCP: < 2.5s target
   ✓ Proper dependency arrays in useEffects

7. Error Handling & Sync
   ✓ Show sync status (pending, syncing, synced, failed)
   ✓ Retry failed saves with exponential backoff
   ✓ Display error messages (not just logs)
   ✓ Sentry logging for critical errors
   ✓ User-friendly error messages (not technical)
   ✓ Trigger sync after successful local save

8. Navigation Integration (Expo Router)
   ✓ Back button works (router.back() or useRouter().push)
   ✓ Saves signature and navigates to home or gallery
   ✓ Preserves navigation stack
   ✓ Handle unsaved changes (warn user if leaving with unsaved data)

PRESERVE EXISTING:
- Expo Router navigation
- API service integration
- FileSystem image saving
- Zustand store patterns
- Sentry error logging
- Analytics tracking
- SecureStore token management

KEY FUNCTIONS TO IMPLEMENT:

1. handleSaveSignature()
   - Call useSignatureCapture.saveSignature()
   - Handle loading state (show spinner)
   - Call triggerSync() after success
   - Navigate on success
   - Show error toast on failure

2. handleClearCanvas()
   - Clear canvas (canvasRef)
   - Reset form fields
   - Keep color picker state (UX friendly)

3. handleValidateForm()
   - Use useFormValidation.validateField()
   - Update error states
   - Show inline error messages
   - Update form.isValid

4. handleDarkModeToggle()
   - Use useColorScheme() hook
   - Smooth transition (via theme.ts)
   - Update all component themes

DELIVERABLES:

1. Refactored src/app/signature-canvas.tsx
   - Clean component structure
   - All state from Zustand (not local)
   - Animations smooth (60fps)
   - Accessibility complete
   - Error handling robust
   - Sync status visible

2. Integration validation
   - Layout verified (no scroll)
   - Dark mode working
   - Animations smooth (60fps)
   - Accessibility complete
   - Sync working

3. Before/After documentation
   - Visual comparison
   - Feature checklist
   - Improvements summary

OUTPUT FORMAT:
- Production-ready code
- TypeScript strict mode
- Comprehensive comments
- JSDoc for all functions
- Proper error boundaries
- Ready to merge and test
```

---

## 🎯 PHASE 4: VALIDATION & TESTING (Claude Code - Step 4)

### 4.1 Validation Checklist

```markdown
## Zustand Integration Validation

- [ ] SignaturesStore actions called correctly
- [ ] Sync status tracked and displayed
- [ ] Error states from store displayed to user
- [ ] Store properly persisted (AsyncStorage)
- [ ] No memory leaks on unmount

## Canvas Validation (Skia)

- [ ] Canvas draws smoothly (60fps)
- [ ] Skia resources cleaned up
- [ ] Images captured to FileSystem correctly
- [ ] Undo/Clear work properly
- [ ] Affordances visible (hint animation)

## Accessibility Audit

- [ ] WCAG 3.0 AA minimum compliance
- [ ] Color contrast: All text ≥ 4.5:1
- [ ] Focus states: Visible 2pt ring on all interactive elements
- [ ] Keyboard navigation: Tab through entire page
- [ ] Screen reader: All elements have aria-labels
- [ ] Color independence: No info from color alone
- [ ] Error messages: Icon + Text (not color-only)
- [ ] Dynamic text scaling: Test 85%, 100%, 130%

## Dark Mode Validation

- [ ] All colors adapted for dark background
- [ ] Text readability verified
- [ ] Canvas visible (white on dark background)
- [ ] Transition smooth (0.5s fade)
- [ ] prefers-reduced-motion respected
- [ ] All UI elements visible

## Performance Validation

- [ ] Animation frame rate: 60fps smooth
- [ ] No jank or stuttering
- [ ] Haptic feedback working (iOS)
- [ ] Canvas resources released on unmount
- [ ] LCP: < 2.5s
- [ ] Re-renders optimized (no excessive updates)
- [ ] Skia memory usage reasonable

## Feature Validation

- [ ] Layout single-page (no scroll)
- [ ] Color picker dropdown works
- [ ] Canvas drawing functional
- [ ] Form validation on blur
- [ ] Signature saves correctly
- [ ] Sync triggered after save
- [ ] Sync status displayed
- [ ] Navigation works (back button, tabs)
- [ ] Additional Details expand/collapse
- [ ] Hint animation plays once

## Integration Validation

- [ ] Zustand store updates correctly
- [ ] FileSystem save working
- [ ] Sync service integration working
- [ ] API calls using correct service
- [ ] Auth tokens handled (SecureStore)
- [ ] Error logging to Sentry working
- [ ] Analytics events tracked

## Code Quality

- [ ] TypeScript strict mode
- [ ] No console errors/warnings
- [ ] Proper error handling
- [ ] Comments on complex logic
- [ ] No unused imports/variables
- [ ] Consistent code style
- [ ] JSDoc complete
```

### 4.2 Prompt pour Phase 4 (Validation)

```
⚠️ CLAUDE CODE - PHASE 4 PROMPT:

Final validation and testing of refactored signature-canvas.tsx page.

TASK: Run comprehensive validation across all dimensions

ZUSTAND VALIDATION:
✓ Verify SignaturesStore properly integrated
✓ Check sync status tracking
✓ Verify error handling from store
✓ Test store persistence (AsyncStorage)
✓ Check for memory leaks

CANVAS VALIDATION (Skia):
✓ Verify 60fps drawing performance
✓ Check resource cleanup
✓ Test image capture
✓ Verify Undo/Clear functionality

ACCESSIBILITY AUDIT:
✓ WCAG 3.0 AA compliance check
✓ Color contrast verification (all ≥4.5:1)
✓ Focus states visible everywhere
✓ Keyboard navigation test
✓ Screen reader compatibility
✓ Color independence verification
✓ Dynamic text scaling (85%, 100%, 130%)

DARK MODE VALIDATION:
✓ All colors adapted
✓ Text readability confirmed
✓ Transition tested
✓ prefers-reduced-motion supported

PERFORMANCE VALIDATION:
✓ Animation frame rates (60fps)
✓ Re-render analysis
✓ Canvas resource cleanup
✓ Bundle size impact

FEATURE VALIDATION:
✓ Single-page layout (no scroll)
✓ Color picker works
✓ Canvas functional
✓ Form validation works
✓ Signature saves correctly
✓ Sync triggered + status shown
✓ Navigation works

GENERATE REPORT:

Provide:
1. Zustand Integration Report
   - Store integration verified ✓/✗
   - Actions called correctly ✓/✗
   - Persistence working ✓/✗
   - Error handling ✓/✗

2. Canvas & Skia Report
   - Drawing smooth ✓/✗
   - Resource cleanup ✓/✗
   - Performance targets met ✓/✗

3. Accessibility Report
   - WCAG 3.0 AA compliance ✓/✗
   - Contrast ratios table
   - Issues found (if any)
   - Recommendations

4. Dark Mode Validation
   - Color mapping verified ✓/✗
   - Text readability confirmed ✓/✗
   - Transition smooth ✓/✗

5. Performance Metrics
   - Animation frame rates
   - Re-render count analysis
   - Bundle size impact
   - Canvas resource usage

6. Feature Matrix
   - Feature checklist ✓/✗
   - Known limitations (if any)
   - Edge cases tested

7. Before/After Comparison
   - Scroll elimination ✓
   - Layout improvements ✓
   - Interaction enhancements ✓
   - Accessibility gains ✓
   - Performance impact ✓

OUTPUT:
Provide complete validation report + any final code fixes needed
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### Tech Stack (Confirmed)

```javascript
{
  "react-native": "0.73+",
  "react": "18+",
  "expo": "50+",
  "expo-router": "3+",
  "zustand": "4+",
  "react-native-skia": "0.1+", // Canvas drawing
  "expo-file-system": "latest", // Image storage
  "expo-haptics": "13+", // Haptic feedback
  "expo-secure-store": "latest", // Token storage
  "expo-application": "latest", // Sentry integration
  "@sentry/react-native": "latest", // Error tracking
  "amplitude-js": "latest", // Analytics
}
```

### Zustand Store Pattern (Existing)

```typescript
// src/stores/signature.store.ts structure:
import create from 'zustand';

interface SignaturesStore {
  // State
  signatures: Signature[];
  isLoading: boolean;
  error: string | null;
  savingSignatureId: string | null;
  syncStatus: Record<string, SyncStatus>;

  // Actions
  loadSignatures: () => Promise<void>;
  addSignature: (signature: Signature) => void;
  updateSignature: (id: string, updates: Partial<Signature>) => void;
  removeSignature: (id: string) => void;
  markAsSynced: (id: string, cloudUrl: string) => void;
  markAsSyncFailed: (id: string) => void;
  getPendingSyncSignatures: () => Signature[];
}

export const useSignaturesStore = create<SignaturesStore>((set, get) => ({
  // implementation...
}));
```

### Color Tokens (from Charte Graphique)

```javascript
// src/components/signature/theme.ts
export const COLORS_LIGHT = {
  primary: '#8A9A5B', // Sage Green
  accent: '#A8C3BC', // Water Green
  background: '#F2F4ED', // Off-white warm
  secondary: '#D4C5B1', // Warm Beige
  neutral: '#E6E6E6', // Pearl Gray
  text: '#2C2C2C', // Near Black
  textSecondary: '#707070', // Gray
  error: '#D32F2F', // Error Red
  success: '#4CAF50', // Success Green
};

export const COLORS_DARK = {
  primary: '#8A9A5B', // Same sage
  accent: '#A8C3BC', // Same water green
  background: '#1A1A1A', // Dark neutral
  secondaryBg: '#242424', // Slightly lighter
  canvasBg: '#121212', // For canvas
  text: '#F5F5F5', // Off-white
  textSecondary: '#B0B0B0', // Muted
  border: '#404040', // Dark gray borders
};
```

### Services Integration

```typescript
// Available services to use:
import { apiService } from '@/services/api.service';
import { storageService } from '@/services/storage.service';
import { syncService } from '@/services/sync.service';

// API calls pattern:
const response = await apiService.post('/signatures', signatureData, {
  headers: { Authorization: `Bearer ${token}` },
});

// FileSystem save pattern:
const filePath = await storageService.saveSignatureImage(imageUri, signatureId);

// Sync pattern:
const result = await syncService.syncPending(pendingSignatures);

// Sentry logging pattern:
import * as Sentry from '@sentry/react-native';
Sentry.captureException(error, { extra: { signatureId } });
```

---

## ✅ ACCEPTANCE CRITERIA

### Phase 1 (Architecture)

- [ ] Component breakdown aligned with Zustand + Skia
- [ ] Store modifications identified
- [ ] Hook refactoring strategy defined
- [ ] Service layer integration points clear

### Phase 2 (Components & Stores)

- [ ] All 6 components created in src/components/signature/
- [ ] 2 new hooks created (useSignatureCapture, useFormValidation)
- [ ] SignaturesStore updated with new actions/state
- [ ] TypeScript strict mode, no errors
- [ ] Dark mode support built-in
- [ ] Accessibility annotations present
- [ ] JSDoc comments complete
- [ ] Zustand integration working

### Phase 3 (Integration)

- [ ] src/app/signature-canvas.tsx refactored
- [ ] Single-page layout verified (NO scroll)
- [ ] All animations smooth (60fps)
- [ ] Form validation accessible (icon+text)
- [ ] Zustand store properly integrated
- [ ] Sync status displayed
- [ ] Expo Router navigation preserved

### Phase 4 (Validation)

- [ ] Accessibility audit: WCAG 3.0 AA passed
- [ ] Dark mode: All elements visible and readable
- [ ] Performance: 60fps animations, LCP < 2.5s
- [ ] Features: All working as designed
- [ ] Zustand: Store updates working
- [ ] Canvas: Skia resources cleaned up
- [ ] Sync: Triggered + status shown
- [ ] Code quality: TypeScript strict, no warnings

---

## 🚀 EXECUTION FLOW

### Week 1

- **Day 1-2:** Phase 1 - Architecture analysis & proposal
- **Day 3:** Stakeholder review & approval
- **Day 4-5:** Phase 2 - Build components & hooks & stores

### Week 2

- **Day 1-2:** Phase 3 - Page refactorization
- **Day 3:** Phase 4 - Comprehensive validation
- **Day 4-5:** Bug fixes & final polish
- **Day 5 EOD:** Ready for QA testing

---

## 📋 CRITICAL INTEGRATION POINTS

```
ZUSTAND STORE INTEGRATION:
1. useSignatureCapture hook calls SignaturesStore.addSignature()
2. Sign page subscribes to savingSignatureId + syncStatus
3. Display SyncStatusIndicator based on syncStatus[id]
4. On successful save, trigger useManualSync
5. Handle saveError from store display

SKIA CANVAS INTEGRATION:
1. SignatureCanvas component uses React Native Skia
2. Strokes accumulated in component state
3. On save, captureRef() returns PNG URI
4. URI passed to storageService.saveSignatureImage()
5. File path stored in Signature object

SERVICE INTEGRATION:
1. useSignatureCapture uses api.service for save
2. FileSystem service manages image storage
3. Sync service triggered after local save
4. Sentry captures errors with context
5. Analytics tracks user events
```

---

## 📝 NOTES IMPORTANTES

1. **Zustand est le pilier** - Toutes les données partagées via store
2. **Skia est utilisé** - Utiliser l'API Skia pour canvas
3. **Services existent** - Utiliser les services API/Storage/Sync
4. **Erreurs: Sentry** - Logger avec Sentry, pas console.log
5. **Dark mode via theme.ts** - Tous les tokens centralisés

---

**Created:** 1er novembre 2025  
**Adapted for:** Architecture réelle (Zustand + Skia + Services)  
**Status:** ✅ Ready for Claude Code Execution  
**Priority:** 🔴 HIGH - MVP Critical Path

_This briefing is perfectly aligned with your actual architecture._
