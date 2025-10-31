# 🎨 GUIDE COMPLET - MISE À NIVEAU DESIGN 2025
## SignatureApp: Transformation vers la Nouvelle Charte Graphique

**Version:** 1.0  
**Date:** 31 octobre 2025  
**Durée estimée:** 2-3 sprints (6 semaines)  
**Priorité:** HIGH - Critical for brand consistency

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'Ensemble Stratégique](#vue-densemble-stratégique)
2. [Audit Comparatif Design](#audit-comparatif-design)
3. [Plan de Migration Par Phase](#plan-de-migration-par-phase)
4. [Changements Détaillés Par Écran](#changements-détaillés-par-écran)
5. [Implémentation Technique](#implémentation-technique)
6. [Checklist de Validation](#checklist-de-validation)
7. [Timeline et Ressources](#timeline-et-ressources)

---

## 🎯 VUE D'ENSEMBLE STRATÉGIQUE

### Objective de la Mise à Niveau

**Transformer SignatureApp d'un design fonctionnel à un design premium et accessible**, intégrant les tendances 2025 tout en maintenant la cohérence de marque et la performance.

### Piliers de la Transformation

```
1. VISUELS (Palette, Typographie)
   ├─ Couleurs: Palette actuelle complètement cohérente ✓
   ├─ Typographie: Amélioration des sizes et hierarchy
   └─ Contraste: Conformité WCAG 3.0 AAA

2. INTERACTIONS (Micro-interactions, animations)
   ├─ Feedback utilisateur: Plus intelligent et contextuels
   ├─ Animations: 2025 standards (smooth, purposeful)
   └─ Accessibilité: prefers-reduced-motion support

3. ACCESSIBILITÉ (WCAG 3.0, inclusivité)
   ├─ Tailles cibles: Augmentation minimums
   ├─ Focus states: Toujours visibles
   └─ Contrast ratios: AA/AAA minimum

4. PERFORMANCE (Durabilité, optimisation)
   ├─ Images: WebP/AVIF standard
   ├─ Animations: 60fps, pas de jank
   └─ Bundle size: Moins de 50MB app

5. DARK MODE (2025 Feature, inclusif)
   ├─ Automatic: Sunset trigger (18h)
   ├─ Manuel: User toggle available
   └─ Smart: Adapt to device battery/ambient light
```

### Impact Utilisateur (Avant / Après)

```
BEFORE (Current Design):
- Design fonctionnel mais simple
- Couleurs correctes mais utilisation basique
- Animations limitées
- Accessibilité OK but not optimized
- No dark mode support
- Limited micro-interactions

AFTER (2025 Brand):
- Design premium et sophistiqué
- Palette harmonieuse et intelligente
- Animations fluides et significatives
- WCAG 3.0 AAA compliant
- Dark mode automatic + manual
- Rich micro-interactions with context
- Better performance + sustainability
- More engaging, memorable experience
```

---

## 📊 AUDIT COMPARATIF DESIGN

### Éléments Conservés (Sans Changement)

```
✓ COULEURS DE BASE (Identical):
  ├─ Primary Green: #8A9A5B (KEEP)
  ├─ Secondary Beige: #D4C5B1 (KEEP)
  ├─ Accent Water: #A8C3BC (KEEP)
  └─ Pearl Gray: #E6E6E6 (KEEP)

✓ TYPOGRAPHIE FAMILY:
  ├─ SF Pro / Roboto / Inter (KEEP)
  └─ Weights: 400, 500, 600, 700 (KEEP)

✓ COMPOSANTS CORE:
  ├─ Button styles fundamentals (UPGRADE)
  ├─ Input field basics (REFINE)
  ├─ Card structure (ENHANCE)
  └─ Navigation pattern (OPTIMIZE)

✓ SPACING GRID:
  ├─ 8pt grid system (KEEP)
  └─ Margin/padding standards (REFINE for clarity)
```

### Éléments À Améliorer (Upgrades)

```
⚡ TYPOGRAPHIE SCALING:
  BEFORE: Standard iOS/Android sizes
  AFTER:  Enhanced hierarchy, better readability
  
  Changes:
  ├─ Body: 15pt (keep, ideal)
  ├─ Body Large: 17pt (keep, good)
  ├─ Captions: 12pt minimum (ensure, not smaller)
  ├─ Dynamic Type: Must support 85%-130% scaling
  └─ Line-height: Verified optimal for each size

⚡ CONTRASTE & ACCESSIBILITÉ:
  BEFORE: WCAG AA compliance
  AFTER:  WCAG 3.0 AAA target
  
  Changes:
  ├─ Text on colors: 7:1 minimum (vs 4.5:1)
  ├─ Verify all combinations: Light + Dark mode
  ├─ Focus states: Always visible 2pt ring
  ├─ Keyboard nav: Fully functional on all platforms
  └─ Screen readers: Proper labels + semantics

⚡ SHADOW SYSTEM:
  BEFORE: Basic shadows, inconsistent
  AFTER:  5-level elevation system
  
  Changes:
  ├─ Level 0: Flat (no shadow)
  ├─ Level 1: Subtle hover (0px 2px 4px)
  ├─ Level 2: Cards default (0px 2px 8px)
  ├─ Level 3: Interactive (0px 4px 12px with Primary)
  ├─ Level 4: Hero sections (0px 8px 24px with Primary)
  └─ Level 5: Focus/Emphasis (0px 12px 32px with Primary)

⚡ ANIMATIONS:
  BEFORE: Limited, mostly transitions
  AFTER:  Rich micro-interactions (2025 standard)
  
  New additions:
  ├─ Button press: 0.1s scale effect
  ├─ Form validation: Real-time feedback
  ├─ Loading states: Smooth spinners
  ├─ Scroll reveals: Fade-in + slide
  ├─ Dark mode transition: 0.5s smooth fade
  └─ Pull-to-refresh: Spring animation
  
  All animations:
  ├─ Respect prefers-reduced-motion
  ├─ 60fps maintained (no jank)
  ├─ Duration 100-500ms (never > 500ms)
  └─ Easing: ease-in-out or ease-out

⚡ DARK MODE:
  BEFORE: No dark mode support
  AFTER:  Intelligent dark mode system
  
  Implementation:
  ├─ Automatic detection (sunset 18h)
  ├─ Manual toggle in settings
  ├─ Adapted palette for all elements
  ├─ Smooth 0.5s transition animation
  ├─ All text contrasts verified AAA
  └─ Accessibility: Instant for reduced-motion users

⚡ RESPONSIVE DESIGN:
  BEFORE: Mobile-first but basic
  AFTER:  Enhanced tablet/landscape support
  
  Improvements:
  ├─ Landscape orientation handling
  ├─ Tablet layout optimization
  ├─ Notch/Safe area handling
  ├─ Better breakpoint management
  └─ Multi-screen testing
```

### Éléments À Remplacer Complètement (Redesign)

```
🔄 MICRO-INTERACTIONS:
  BEFORE: Minimal feedback
  AFTER:  Rich, contextual interactions (2025 style)
  
  New system:
  ├─ Haptic feedback (iOS/Android)
  ├─ Contextual animations
  ├─ Smart loading states
  ├─ Confirmation patterns
  └─ Gesture feedback

🔄 ILLUSTRATIONS:
  BEFORE: Simple, basic illustrations
  AFTER:  Cohesive illustration system
  
  Redesign:
  ├─ Onboarding slides (3 new illustrations)
  ├─ Empty states (gallery, profile, etc)
  ├─ Premium section (luxury indicators)
  ├─ Consistency with icon style
  └─ Minimaliste aesthetic

🔄 ICON SYSTEM:
  BEFORE: Basic icons, inconsistent
  AFTER:  Unified, scalable icon system
  
  Create:
  ├─ 24-icon set (navigation + actions)
  ├─ Consistent 2pt stroke weight
  ├─ Geometric, clean style
  ├─ Works on light + dark
  └─ Renderable at 16pt-80pt sizes

🔄 GRADIENTS:
  BEFORE: Single gradient used sporadically
  AFTER:  Strategic gradient system
  
  Define:
  ├─ Hero gradient (Primary → Accent)
  ├─ Fade overlays (for images)
  ├─ Danger/warning gradients
  ├─ Optional theme gradients
  └─ All tested dark mode compatibility
```

---

## 📈 PLAN DE MIGRATION PAR PHASE

### PHASE 1: FONDAMENTAUX (Weeks 1-2)

**Deliverables:** Design system tokens, component library updates

```
SEMAINE 1: SETUP & TOKENS

Task 1.1: Design System Audit
├─ Document: Current state of all components
├─ Screenshot: All UI states (light + dark)
├─ Assessment: Contrast ratios, spacing compliance
├─ Output: Audit report (Google Doc)
└─ Owner: Design lead

Task 1.2: Create Color Tokens (Design + Dev)
├─ Figma: Create color styles with new dark mode variants
├─ Variables: Define CSS/SCSS variables
│  ├─ Light mode palette (unchanged mostly)
│  ├─ Dark mode palette (8 new color definitions)
│  └─ System colors (success, warning, error, info)
├─ Documentation: Color library guide
├─ Testing: Contrast verification all combinations
└─ Output: Figma color library + CSS variables

Task 1.3: Typography System Refinement
├─ Figma: Create text styles (H1-Caption, weights)
├─ Sizes: Verify optimal readability at each level
├─ Line-heights: Implement 1.2-1.5x depending on context
├─ Letter-spacing: Optical adjustment where needed
├─ CSS: Generate typography scale
└─ Test: Dynamic Type (iOS), font scaling (Android)

Task 1.4: Shadow System Implementation
├─ Define: 5-level elevation system (as per manifesto)
├─ Figma: Create shadow styles (drop-shadow effects)
├─ CSS: Box-shadow variable definitions
├─ Documentation: When to use each level
├─ Verification: Shadows work on light + dark
└─ Output: Figma library + CSS

DELIVERABLES (Week 1):
✓ Figma color library (light + dark modes)
✓ Figma text styles (complete hierarchy)
✓ Figma shadow library (5 levels)
✓ CSS/SCSS variables file
✓ Design system documentation
✓ Contrast verification report

SEMAINE 2: COMPONENTS UPDATE

Task 2.1: Button Component Redesign
├─ Figma: Update all button variants
│  ├─ Primary (with gradient)
│  ├─ Secondary (surface + border)
│  ├─ Tertiary (transparent)
│  ├─ Icon-only (compact)
│  └─ Destructive (red variant)
├─ States: Default, hover, active, disabled, loading, focus
├─ Accessibility: Min 44pt x 44pt (verified)
├─ Micro-interactions: Add hover scale + shadow boost
├─ Documentation: Usage guidelines for each variant
└─ Dev: Component code with new states

Task 2.2: Input Fields & Form Elements
├─ Figma: Redesign all input variants
│  ├─ Text input (height 56pt)
│  ├─ Textarea (min 100pt, scrollable)
│  ├─ Select dropdown
│  ├─ Checkbox (20pt size, 44pt tap target)
│  ├─ Radio buttons
│  ├─ Toggle switches
│  └─ Validation messages (error, success)
├─ Focus states: 2pt ring outline always visible
├─ Validation: Real-time feedback with icons
├─ Accessibility: All labeled properly (ARIA)
└─ Dev: Update component library

Task 2.3: Cards & Containers
├─ Figma: Update card designs
│  ├─ Signature card (gallery item)
│  ├─ Profile card
│  ├─ Hero card (CTA)
│  ├─ Empty state card
│  └─ Generic content card
├─ Shadow: Apply new elevation system
├─ Spacing: Verify 8pt grid compliance
├─ Interactivity: Define hover states, transitions
├─ Dark mode: Preview in dark background
└─ Dev: Update card component

Task 2.4: Navigation Components
├─ Figma: Update bottom navigation
│  ├─ Icon size: 24pt
│  ├─ Tab height: 72pt (iOS) / 64pt (Android)
│  ├─ Active states: Color + icon fill
│  └─ Accessibility: Labels + focus ring
├─ Figma: Top navigation bar
│  ├─ Avatar: 32pt circle
│  ├─ Title: H4 centered
│  ├─ Actions: Right-aligned icons
│  └─ Safe area: notch/punch-hole support
├─ Transitions: Smooth color/opacity changes
└─ Dev: Update navigation components

DELIVERABLES (Week 2):
✓ Updated button component library
✓ Updated form elements & inputs
✓ Updated cards & containers
✓ Updated navigation components
✓ All components: Light + dark mode variants
✓ Component documentation & usage guide
✓ Figma component file (source of truth)
```

### PHASE 2: MICRO-INTERACTIONS & ANIMATIONS (Weeks 3-4)

**Deliverables:** Animation system, interaction patterns, micro-interactions library

```
SEMAINE 3: ANIMATION SYSTEM

Task 3.1: Define Animation Patterns
├─ Durations: 100ms, 200ms, 300ms, 500ms (no longer)
├─ Easing curves:
│  ├─ ease-out: Quick entrance (responsive feel)
│  ├─ ease-in-out: Smooth transitions (premium)
│  └─ cubic-bezier: Custom for specific needs
├─ CSS/Dev: Implement animation utilities
└─ Documentation: Animation guidelines

Task 3.2: Button Micro-interactions
├─ Tap feedback:
│  ├─ Visual: Scale 0.98 (press-down feel)
│  ├─ Duration: 0.1s
│  ├─ Haptic: Light impact (if available)
│  └─ Easing: ease-out (snappy)
├─ Hover state:
│  ├─ Scale: 1.02
│  ├─ Shadow: +1 level
│  ├─ Duration: 0.2s
│  └─ Easing: ease-in-out
├─ Loading state:
│  ├─ Content: Fade out, spinner fade in
│  ├─ Duration: 0.3s
│  └─ Cursor: Loading spinner
├─ Disabled state:
│  ├─ Opacity: 50%
│  ├─ Cursor: not-allowed
│  └─ No interaction (no animation)
└─ Dev: Implement in component library

Task 3.3: Form Validation Feedback
├─ Real-time validation (on blur or after 500ms delay)
├─ Success state:
│  ├─ Visual: Checkmark icon appears
│  ├─ Color: Green (#8A9A5B)
│  ├─ Animation: Icon fade-in 0.3s
│  └─ Message: "Looks good!" (positive tone)
├─ Error state:
│  ├─ Visual: X icon + shake animation
│  ├─ Shake: 3 oscillations, 4pt amplitude
│  ├─ Color: Red (#C77B6B)
│  ├─ Animation: 0.4s shake duration
│  └─ Message: Error description (clear, helpful)
├─ Pending state:
│  ├─ Visual: Small spinner
│  ├─ Duration: While validating
│  └─ Message: "Checking..." or silent
└─ Dev: Implement in form components

Task 3.4: Loading Spinners
├─ Design: 24pt circle, 2pt stroke
├─ Color: Primary green (#8A9A5B)
├─ Animation: 360° rotation / 1000ms, linear
├─ States:
│  ├─ Loading: Continuous rotation
│  ├─ Success: Rotate to checkmark
│  └─ Error: Stop, show X icon
├─ Accessibility:
│  ├─ aria-busy="true" while loading
│  ├─ aria-label: "Loading content"
│  └─ Screen readers notified
└─ Dev: Create reusable spinner component

SEMAINE 4: RICH INTERACTIONS

Task 4.1: Scroll Reveal Animations
├─ Pattern: Elements fade-in + slide-up as they enter viewport
├─ Visual:
│  ├─ Initial: translateY +20pt, opacity 0
│  ├─ Final: translateY 0, opacity 1
│  ├─ Duration: 0.4s
│  └─ Easing: ease-out
├─ Stagger: 50-100ms delay between items
├─ Performance: Debounced scroll listener (60fps)
├─ Testing: Works on mid-range devices
└─ Dev: Implement with Intersection Observer

Task 4.2: Pull-to-Refresh Animation
├─ iPhone pattern:
│  ├─ Trigger: Swipe down from top
│  ├─ Visual feedback: Icon rotation matches drag
│  ├─ Threshold: 60pt distance
│  ├─ Spring animation: 0.4s bounce when triggered
│  ├─ Success: Checkmark flash + spinner
│  └─ Duration: 2s max before timeout
├─ Testing: Smooth on various devices
└─ Dev: iOS native + Android custom implementation

Task 4.3: Modal Transitions
├─ Backdrop:
│  ├─ Animation: Fade in 0.2s (black 40% opacity)
│  ├─ Easing: ease-out
│  └─ Tap to dismiss: Configurable
├─ Modal appearance:
│  ├─ iOS: Slide up from bottom (0.3s)
│  ├─ Android: Scale 0.8→1.0 (0.3s)
│  ├─ Easing: ease-out
│  └─ Content: Stagger fade-in (50ms delays)
├─ Closure:
│  ├─ Modal: Slide/scale down 0.2s
│  ├─ Backdrop: Fade out 0.2s
│  ├─ Total: 0.2s (quick disappear)
│  └─ Focus: Return to previous element
└─ Dev: Update modal component

Task 4.4: Gesture Feedback
├─ Swipe to delete:
│  ├─ Swipe animation: Actions reveal
│  ├─ Haptic: Medium impact on full swipe
│  ├─ Snap: Acceleration animation
│  └─ Delete: Slide-out + fade 0.3s
├─ Pinch to zoom:
│  ├─ Real-time: Scale follows gesture
│  ├─ Boundaries: 1.0x to 3.0x
│  ├─ Momentum: Continue if released with velocity
│  └─ Spring back: If limits exceeded
├─ Accessibility: All gestures have keyboard alternatives
└─ Dev: Implement gesture recognizers

DELIVERABLES (Week 3-4):
✓ Animation system defined (utilities, easing)
✓ Button micro-interactions (tap, hover, loading)
✓ Form validation feedback (real-time, visual)
✓ Loading spinner component (states, accessibility)
✓ Scroll reveal animations (debounced, performant)
✓ Pull-to-refresh implementation
✓ Modal transitions (appearance, closure)
✓ Gesture feedback system
✓ Documentation: Animation guidelines
✓ Dev: Reusable animation utilities
```

### PHASE 3: DARK MODE & ACCESSIBILITY (Weeks 5-6)

**Deliverables:** Dark mode system, accessibility audit, WCAG 3.0 AAA compliance

```
SEMAINE 5: DARK MODE IMPLEMENTATION

Task 5.1: Dark Mode Palette Definition
├─ Color mapping:
│  ├─ Background: #1F1F1D (warm, not pure black)
│  ├─ Surface: #2C2C29 (elevation system)
│  ├─ Text Primary: #F5F5F5 (high contrast)
│  ├─ Text Secondary: #B8B8B8 (reduced)
│  ├─ Accents: Lightened versions
│  └─ All with contrast verification
├─ Figma: Create dark mode color styles
├─ Dev: CSS variables for dark theme
└─ Testing: All combinations WCAG AA+

Task 5.2: Dark Mode Styles (All Components)
├─ Figma: Create dark variants of all components
│  ├─ Buttons (all types with dark backgrounds)
│  ├─ Inputs & forms
│  ├─ Cards & containers
│  ├─ Navigation
│  ├─ Modals & overlays
│  └─ Illustrations (adapt or filter)
├─ Documentation: Dark mode guidelines
├─ Shadows: Verify visibility in dark mode
├─ Images: Adapt with filters if needed
└─ Dev: Implement CSS dark mode media query

Task 5.3: Dark Mode Transition
├─ Duration: 0.5s smooth fade
├─ Curve: ease-in-out (natural)
├─ Optional: Fade through gray neutral
├─ Preserve: Scroll position, focus state
├─ No flicker: All simultaneous color changes
├─ Accessibility: Instant for prefers-reduced-motion
├─ Testing: Smooth transition on various devices
└─ Dev: Implement transition CSS

Task 5.4: Automatic Dark Mode Trigger
├─ System detection:
│  ├─ Hour-based: Sunset (18h) trigger
│  ├─ Sensor-based: Ambient light (if available)
│  ├─ User setting: Settings toggle override
│  └─ Device preference: System dark mode follow
├─ Smart behavior:
│  ├─ Disable auto at night (user control)
│  ├─ Battery saver: More aggressive theming
│  └─ Quiet hours: Respect Do Not Disturb
├─ Implementation: React Native + platform APIs
└─ Testing: All triggers work correctly

SEMAINE 6: ACCESSIBILITY AUDIT & COMPLIANCE

Task 6.1: Comprehensive Accessibility Audit
├─ Color contrast:
│  ├─ All text: Test against backgrounds
│  ├─ WCAG AA (4.5:1) minimum
│  ├─ WCAG AAA (7:1) target
│  ├─ UI components: 3:1 minimum
│  ├─ Tool: Figma Contrast Checker plugin
│  └─ Report: All combinations pass
├─ Focus states:
│  ├─ Keyboard nav: All interactive elements
│  ├─ Focus indicator: 2pt ring, #8A9A5B
│  ├─ Never hidden (CSS outline: none removal)
│  ├─ Visible in light + dark modes
│  └─ Testing: Tab through entire app
├─ Screen reader support:
│  ├─ Labels: All form inputs have labels
│  ├─ Alt text: Images with descriptions
│  ├─ Semantic: Proper HTML5 structure (if web)
│  ├─ Headings: H1-H6 hierarchy maintained
│  └─ Testing: iOS VoiceOver, Android TalkBack
├─ Touch targets:
│  ├─ Buttons: 44pt x 44pt (iOS), 48dp x 48dp (Android)
│  ├─ Inputs: 56pt height
│  ├─ Spacing: 8pt minimum between
│  ├─ Tap area: Verified in device
│  └─ Report: All targets compliant
└─ Output: Accessibility audit report

Task 6.2: Reduced Motion Support
├─ Detection: @media (prefers-reduced-motion: reduce)
├─ Changes:
│  ├─ Remove: Non-essential animations
│  ├─ Reduce: Duration to 100ms max
│  ├─ Keep: Only functional transitions
│  └─ Disable: parallax, decorative effects
├─ Testing:
│  ├─ iOS: Settings > Accessibility > Motion
│  ├─ Android: Developer Options > Animation scale 0x
│  └─ Verify: All interactions still work
├─ Dev: CSS media query implementation
└─ Performance: Should be faster for these users

Task 6.3: Text Scaling & Dynamic Type
├─ iOS Dynamic Type:
│  ├─ Support: All 5 sizes (+2 to +3)
│  ├─ Min: 12pt caption
│  ├─ Max: 40pt H1
│  ├─ Testing: App at 85%, 100%, 130%
│  └─ Layout: No text overflow, readable
├─ Android font scaling:
│  ├─ Support: sp units (scale-independent)
│  ├─ Range: System 85%-130%
│  ├─ Testing: Various device font settings
│  └─ Fallback: Proper font stack
├─ Dev: Implement using system font scales
└─ Verification: All sizes readable

Task 6.4: Semantic Markup & Navigation
├─ Keyboard navigation:
│  ├─ Tab order: Logical flow (top→bottom, left→right)
│  ├─ Testing: Navigate without mouse/touch
│  ├─ Skip links: Jump to main content (if web)
│  └─ Traps: Ensure focus can exit traps
├─ Voice control:
│  ├─ iOS Siri Shortcuts: Common actions
│  ├─ Android Voice Access: Label all buttons
│  ├─ Web: Labeled properly (not "Click here")
│  └─ Testing: Voice navigate app
├─ Color independence:
│  ├─ Audit: No information conveyed by color alone
│  ├─ Validation: Icon + text + color
│  ├─ Status: Icon + text + color
│  └─ State: Icon + text + color
└─ Documentation: Accessibility guidelines

Task 6.5: Final QA & Testing
├─ Manual testing:
│  ├─ Light mode: All screens, all interactions
│  ├─ Dark mode: All screens, all interactions
│  ├─ Various devices: iPhone 14, iPhone SE, Pixel 7, Pixel 6a
│  ├─ Various OS versions: iOS 16+, Android 13+
│  └─ Accessibility: VoiceOver, TalkBack, keyboard nav
├─ Automated testing:
│  ├─ Contrast checker: All color combinations
│  ├─ Performance: 60fps animations, no jank
│  ├─ Accessibility: Axe DevTools, Lighthouse
│  └─ Performance: Bundle size, load time
├─ Device testing:
│  ├─ Real devices: Not just simulators
│  ├─ Various network: WiFi, 4G, 3G
│  ├─ Battery: Test on low battery mode
│  └─ Orientation: Portrait, landscape
├─ Accessibility testing:
│  ├─ Screen readers: VoiceOver, TalkBack
│  ├─ Zoom: 200% zoom support (iOS)
│  ├─ High contrast: WCAG AAA+ compliance
│  └─ No seizure triggers: Flashing < 3/second
└─ Documentation: QA report with screenshots

DELIVERABLES (Week 5-6):
✓ Dark mode color palette (all elements)
✓ Dark mode component library (complete)
✓ Automatic dark mode trigger system
✓ 0.5s dark mode transition animation
✓ Accessibility audit report (comprehensive)
✓ WCAG 3.0 AAA compliance verification
✓ Reduced motion support (CSS media query)
✓ Dynamic Type support (tested 85%-130%)
✓ Keyboard navigation (fully functional)
✓ Screen reader support (VoiceOver, TalkBack)
✓ QA report with device testing
✓ Final design system documentation
```

---

## 🎨 CHANGEMENTS DÉTAILLÉS PAR ÉCRAN

### ÉCRAN 1: ONBOARDING (3 Slides)

```
SLIDE 1 - CAPTURE DES SIGNATURES

BEFORE:
├─ Basic illustration (exists but generic)
├─ Standard typography
├─ Simple button
├─ No micro-interactions

AFTER:
├─ NEW illustration (professional, cohesive)
├─ Improved typography hierarchy
│  ├─ Title: H1 32pt Bold, primary text
│  ├─ Description: Body 17pt, secondary text
│  └─ Max lines: Title 2, Description 3
├─ Button: Primary CTA with gradient + shadow Level 3
├─ Animations:
│  ├─ Enter: Fade-in + slide-up (0.4s, staggered)
│  ├─ Icon: Scale animation (0.8 → 1.0, 0.3s)
│  └─ Button: Hover scale 1.02, shadow +1
├─ Pagination: Dots 8pt, active color green (#8A9A5B)
└─ Dark mode: Background #1F1F1D, text #F5F5F5

---

SLIDE 2 - CRÉE DES FONDS D'ÉCRAN

BEFORE:
├─ Mockup illustration
├─ Standard layout
├─ No context animation

AFTER:
├─ ENHANCED illustration (device mockup updated)
├─ Typography: Same hierarchy as Slide 1
├─ Call-out elements:
│  ├─ "20+ templates" highlighted in accent green
│  ├─ Color customization preview
│  └─ Font options showcase
├─ Animation: Image parallax scroll (subtle, 2025 style)
├─ Button: Secondary "Next" button + Primary "Skip"
└─ Accessibility: All text readable at 130% scale

---

SLIDE 3 - PARTAGE AVEC LE MONDE

BEFORE:
├─ Social icons only
├─ Basic "Start" button
├─ No special emphasis

AFTER:
├─ REDESIGNED illustration (social sharing concept)
├─ Social icons: 40pt size, colored (if brand)
│  └─ Facebook, Instagram, TikTok, Twitter/X, LinkedIn
├─ Typography:
│  ├─ Title: "Partage ta rencontre magique"
│  ├─ Description: Social benefits + community angle
│  └─ Emphasis on connection/sharing values
├─ Button: Primary "Commencer" (high emphasis)
├─ Micro-interaction: Icon scale on focus/hover
└─ Accessibility: Screen reader labels for social icons

---

ACCESSIBILITY UPGRADES (All Slides):
✓ Minimum font sizes: 15pt body + captions
✓ Contrast: All text WCAG AAA (7:1)
✓ Touch targets: Buttons 44pt x 44pt
✓ VoiceOver: All elements labeled
✓ Dark mode: Full support with adapted palette
✓ Reduced motion: No parallax for these users
✓ Dynamic Type: Support 85%-130% scaling
```

### ÉCRAN 2: HOME SCREEN

```
CURRENT STATE ANALYSIS:
├─ Strengths: Clean layout, good hierarchy
├─ Weaknesses: Limited feedback, basic interactions
├─ Opportunities: Richer animations, better empty states

UPGRADES:

HEADER:
BEFORE:
├─ Basic avatar + title + settings icon

AFTER:
├─ Avatar: 32pt circle, shadow Level 1
├─ Title: H4 18pt, centered, SemiBold
├─ Settings icon: 24pt, tap target 44pt x 44pt
├─ Animation on tap: Scale 0.95, haptic feedback
├─ Focus state: 2pt ring around settings icon
└─ Dark mode: Icons adapt to text color

HERO CARD (CTA):
BEFORE:
├─ Basic gradient
├─ Standard button
├─ No interactive feedback

AFTER:
├─ Gradient: #8A9A5B → #A8C3BC (135° angle)
├─ Shadow: Level 4 (0px 8px 24px with Primary opacity 0.4)
├─ Icon: 80pt centered, animation on load
│  └─ Animation: Scale 0.5 → 1.0 (0.5s, ease-out)
├─ Button: 56pt height, white text, shadow Level 3 on hover
├─ Micro-interactions:
│  ├─ Hover: Scale 1.02 + shadow +1
│  ├─ Tap: Scale 0.98 (compression feel)
│  ├─ Loading: Spinner inside, text fade out
│  └─ Success: Checkmark animation
├─ Dark mode: Gradient adapted, text high contrast
└─ Accessibility: Button 44pt min tap target

TA COLLECTION SECTION:
BEFORE:
├─ Simple grid
├─ No hover states
├─ Basic card design

AFTER:
├─ Title: H3 20pt SemiBold, margin bottom 16pt
├─ Grid:
│  ├─ 2 columns (172pt each on iPhone 14)
│  ├─ Gap: 16pt (follows 8pt grid)
│  ├─ Responsive: Stacks on small screens
│  └─ Tablet: 3-4 columns (space permitting)
├─ Signature Cards:
│  ├─ New design with shadow Level 2 (default)
│  ├─ Image: 3:4 aspect ratio, radius 16pt
│  ├─ Content: Celebrity name (SemiBold) + date (caption)
│  ├─ Overflow: Hidden (image clips to border radius)
│  └─ Padding: 12pt internal
├─ Hover/Tap states:
│  ├─ Scale: 1.02
│  ├─ Shadow: +1 level (to Level 3)
│  ├─ Image zoom: 1.05
│  ├─ Transition: 0.2s ease-in-out
│  └─ Long press: Show actions menu
├─ Empty state:
│  ├─ Icon: 80pt illustration
│  ├─ Title: "Aucune signature yet"
│  ├─ Button: Primary CTA to capture
│  └─ Animation: Fade-in on load
├─ Dark mode: Cards adapt, shadow visible
└─ Accessibility: Cards tappable 44pt min

BOTTOM NAVIGATION:
BEFORE:
├─ Basic tab bar
├─ Limited feedback

AFTER:
├─ Height: 72pt (iOS) / 64pt (Android)
├─ Icons: 24pt, centered
├─ Labels: 11pt caption below icon
├─ Active state:
│  ├─ Color: Primary green (#8A9A5B)
│  ├─ Icon: Filled/bold effect
│  └─ Animation: Scale 1.0 → 1.2 → 1.0 (0.2s) on tap
├─ Inactive state:
│  ├─ Color: Text secondary (#6B7A3F)
│  ├─ Opacity: 70%
│  └─ No animation
├─ Focus state: Ring outline around icon
├─ Safe area: Respects bottom margin on iPhone X+
├─ Micro-interactions:
│  ├─ Tap feedback: Scale 0.95 (compression)
│  ├─ Haptic: Light impact on iOS
│  └─ Color transition: 0.2s smooth
├─ Dark mode: Background adapts, text contrast high
└─ Accessibility: Labels + focus indicators

ACCESSIBILITY FOR HOME SCREEN:
✓ All interactive elements: 44pt x 44pt minimum
✓ Text: WCAG AAA contrast (7:1)
✓ VoiceOver: Labels for all buttons + navigation
✓ Keyboard: Tab navigation through all elements
✓ Dark mode: Full support, all text readable
✓ Reduced motion: Card hover scale removed
✓ Dynamic Type: Support 85%-130% text scaling
```

### ÉCRAN 3: CANVAS DE SIGNATURE (Core Screen)

```
CRITICAL UPGRADE (Most important screen in app):

BACKGROUND & LAYOUT:
BEFORE:
├─ Simple white background
├─ Basic layout

AFTER:
├─ Background: Subtle gradient fade (white → pearl gray)
├─ Zone tactile: 85% height, white background (contrast)
├─ Padding: Safe area + 16pt margins
├─ Layout: Vertical flex, well-spaced

SIGNATURE CANVAS ZONE:
BEFORE:
├─ Drawing surface
├─ Basic stroke color

AFTER:
├─ Drawing surface: White background, 16pt radius corners
├─ Shadow: Level 2 (2px 8px with 8% opacity)
├─ Stroke configuration:
│  ├─ Default thickness: 3pt (optimal for fingers)
│  ├─ Color picker: 4 options (Primary + Accent + B/W)
│  ├─ Thickness slider: 1-6pt range
│  └─ Pressure sensitivity: Support if available (iOS)
├─ Micro-interactions:
│  ├─ Pen icon feedback: Scale 1.0 → 1.1 on tap
│  ├─ Color selection: Scale effect on choose
│  ├─ Thickness change: Real-time preview
│  └─ All 0.1-0.2s duration
├─ Undo/Redo: Button pair on top right
│  ├─ Disabled: Opacity 50% if no actions to undo
│  ├─ Tap: Scale effect + haptic
│  └─ Animation: Smooth 0.2s state transition
├─ Real-time preview: As user draws
└─ Accessibility: Canvas area labeled, button labels

FORM FIELDS:
BEFORE:
├─ Basic input
├─ No validation

AFTER:
├─ Celebrity name input:
│  ├─ Height: 56pt
│  ├─ Placeholder: "Enter celebrity name..."
│  ├─ Validation: Real-time on blur
│  ├─ Success state: Checkmark icon (green)
│  ├─ Error state: X icon (red) + message
│  ├─ Focus: 2pt primary border + shadow Level 2
│  └─ Icon transition: 0.3s fade-in
├─ Location toggle:
│  ├─ Standard iOS/Android toggle
│  ├─ Label: "Add location" (16pt)
│  ├─ Tap target: 44pt x 44pt
│  ├─ Micro-interaction: Scale 1.0 → 1.15 → 1.0
│  └─ Haptic: Medium impact on toggle
├─ Spacing: 16pt between form elements
└─ Dark mode: Input adapts (light surface on dark bg)

ACTION BUTTONS:
BEFORE:
├─ "Clear" and "Validate" buttons

AFTER:
├─ Layout: Horizontal stack, 16pt gap
├─ CLEAR button:
│  ├─ Type: Secondary
│  ├─ Height: 48pt
│  ├─ Width: Flexible (50% - 8pt)
│  ├─ Label: "Effacer" (SemiBold 16pt)
│  ├─ Tap state: Scale 0.98 + shadow +1
│  └─ Confirmation: Optional alert on tap
├─ VALIDATE button:
│  ├─ Type: Primary (gradient)
│  ├─ Height: 56pt
│  ├─ Width: Flexible (50% - 8pt)
│  ├─ Label: "Valider" (SemiBold 16pt white)
│  ├─ Shadow: Level 3 (default), Level 4 (hover)
│  ├─ Tap: Scale 0.98 + haptic feedback
│  ├─ Loading: Spinner appears, label fade-out
│  └─ Success: Checkmark animation + transition to next screen
├─ Disabled state:
│  ├─ If empty signature: Both buttons disabled opacity 50%
│  ├─ Cursor: Not-allowed (web)
│  └─ Tap: No response (disabled)
└─ Accessibility: Clear button labels, 44pt min size

VALIDATION FEEDBACK:
├─ Empty canvas: "Draw your signature first" (tooltip)
├─ Empty name: "Celebrity name required" (validation message)
├─ Valid signature + name: Enable validate button
├─ On validate click: Show spinner (loading state)
├─ Success: Checkmark animation (0.5s) → transition
├─ Error: Toast message (red, 4s auto-dismiss)
└─ All messages: WCAG AAA contrast

SCREEN READER / ACCESSIBILITY:
✓ Canvas: aria-label "Signature drawing area"
✓ All buttons: Descriptive labels (not just icons)
✓ Form inputs: Labels + aria-required + aria-invalid
✓ Validation messages: aria-live region (assertive for errors)
✓ Color choice: Also use icon indicators (not color alone)
✓ Stroke thickness: Slider accessible via keyboard
✓ Focus order: Top-to-bottom logical flow
✓ Touch targets: All 44pt x 44pt minimum

DARK MODE ADAPTATION:
├─ Canvas background: #F5F5F5 (light, for contrast)
├─ Canvas border: #383834 (subtle in dark)
├─ Buttons: Adjusted colors (light variant)
├─ Form inputs: Light surface on dark background
├─ Text: High contrast (#F5F5F5 on dark)
└─ Icon colors: Adjusted for dark background visibility

PERFORMANCE CONSIDERATIONS:
├─ Canvas rendering: 60fps required (smooth drawing)
├─ Touch latency: < 100ms (responsive feel)
├─ No jank: Optimize rendering pipeline
├─ Memory: Limit canvas size for older devices
└─ Test: Mid-range devices (iPhone SE, Pixel 6a)
```

### ÉCRAN 4: ÉDITEUR FOND D'ÉCRAN

```
TEMPLATE CAROUSEL:
BEFORE:
├─ Horizontal scroll
├─ Basic card design

AFTER:
├─ Scroll behavior: Smooth horizontal scroll, momentum
├─ Card width: Screen width - 32pt (full width effect)
├─ Card height: 300pt
├─ Radius: 16pt
├─ Shadow: Level 2 (default), Level 3 (near/active)
├─ Pagination:
│  ├─ Dots: 8pt circles, 8pt spacing
│  ├─ Active: Primary green (#8A9A5B), scale 1.2
│  ├─ Inactive: Pearl gray (#E6E6E6), opacity 60%
│  └─ Animation: Scale transition 0.2s on scroll
├─ Interaction: Tap card → select template
│  ├─ Visual feedback: Scale 1.02 + shadow +1
│  ├─ Animation: 0.2s ease-in-out
│  └─ Haptic: Light impact on selection
├─ Accessibility:
│  ├─ Carousel accessible via arrow keys
│  ├─ Each card: Tappable 44pt area
│  ├─ VoiceOver: "Template 1 of 20" announcement
│  └─ Focus: Ring around selected card
└─ Dark mode: Cards + text adapt

CUSTOMIZATION PANEL:
BEFORE:
├─ Basic color/font picker
├─ No real-time preview

AFTER:
├─ Layout: Vertical stack, 24pt gaps
├─ Accent color picker:
│  ├─ Label: "Accent color" (SemiBold 16pt)
│  ├─ Options: 6 color buttons (48pt each)
│  │  ├─ Colors: Primary, Accent, Secondary, + 3 more
│  │  ├─ Border: Selected has 2pt primary ring
│  │  └─ Tap: Scale 0.95 → 1.0 (satisfying response)
│  ├─ Icons: Preview in each button
│  └─ Spacing: 12pt between color buttons
├─ Text customizer:
│  ├─ Label: "Font style" (SemiBold 16pt)
│  ├─ Options: 3 buttons (Sans, Serif, Script)
│  │  ├─ Display: Preview text in each font
│  │  ├─ Size: 20pt in respective font
│  │  ├─ Selected: 2pt primary ring
│  │  └─ Tap: Scale effect with haptic
│  └─ Spacing: 12pt between buttons
├─ Preview section:
│  ├─ Live preview: Updates on every change (< 100ms)
│  ├─ Preview box: 400pt wide, 600pt tall (wallpaper aspect)
│  ├─ Shadow: Level 2 (subtle frame effect)
│  ├─ Radius: 16pt (preview elegance)
│  └─ Animation: Preview cross-fade on change (0.2s)
├─ Action buttons:
│  ├─ "Reset": Secondary button (restore defaults)
│  ├─ "Save": Primary button (apply + export)
│  ├─ Height: 56pt, full width - 32pt
│  ├─ Spacing: 12pt between buttons
│  └─ Loading: Show spinner inside "Save" button
├─ Accessibility:
│  ├─ All controls: Keyboard accessible
│  ├─ Color picker: Screen reader announces selection
│  ├─ Font selection: Names (not just visual)
│  ├─ Preview: aria-live region for changes
│  └─ Focus: Clear ring around all elements
└─ Dark mode: Panel + preview adapt

WALLPAPER PREVIEW (Expandable):
├─ Full screen preview:
│  ├─ Tap preview: Expand to full screen
│  ├─ Animation: Scale up + fade (0.3s)
│  ├─ Background: Wallpaper fills entire screen
│  ├─ Return: Tap anywhere or back button
│  └─ Animation: Scale down + fade (0.2s)
├─ Status bar: Adapt colors (iOS 13+)
├─ Safe area: Show if relevant to wallpaper
└─ Accessibility: All controls still functional

PERFORMANCE:
├─ Preview updates: < 100ms (smooth feel)
├─ Carousel: Smooth 60fps scrolling
├─ Image rendering: Optimized for device
├─ Memory: Efficient template storage
└─ Test: Real device, various speeds
```

### ÉCRAN 5: GALERIE (Collection)

```
GRID LAYOUT:
BEFORE:
├─ 2 column grid
├─ Basic cards

AFTER:
├─ Grid: 2 columns (iPad: 3-4 columns)
├─ Spacing: 16pt gap between cards
├─ Column width: (Screen - 32pt - 16pt) / 2 ≈ 172pt
├─ Card aspect ratio: 3:4 (portrait)
├─ Padding: 16pt left/right, 24pt top
└─ Responsive: Stacks on extra-small screens

SIGNATURE CARDS (Enhanced):
├─ Layout:
│  ├─ Image: 3:4 aspect, radius 16pt
│  ├─ Overlay fade: Bottom 0% → 60% black (for text)
│  ├─ Text: Centered bottom, padding 12pt
│  ├─ Celebrity name: SemiBold 15pt, white text
│  ├─ Truncate: 1 line (ellipsis if long)
│  └─ Date: Caption 12pt, secondary opacity
├─ Interactions:
│  ├─ Tap: Navigate to detail view (animate up)
│  ├─ Long press: Show action menu (iOS/Android)
│  ├─ Hover (web): Scale 1.02 + shadow +1
│  └─ Animation: 0.2s ease-in-out
├─ Actions menu:
│  ├─ Share: Social options
│  ├─ Edit: Open wallpaper editor
│  ├─ Delete: Destructive with confirmation
│  └─ Cancel: Close menu
├─ Shadow: Level 2 (default), Level 3 (interaction)
├─ Dark mode: Card + text adapt
└─ Accessibility:
│  ├─ Card: tappable 44pt area
│  ├─ Long-press: Alternative via context menu
│  ├─ Text: Readable at 130% scale
│  └─ Focus: Ring around selected card

EMPTY STATE:
├─ Centered content:
│  ├─ Icon: 80pt illustration (empty gallery)
│  ├─ Title: H3 "Your collection is empty"
│  ├─ Description: Body "Capture a signature to start"
│  └─ Button: Primary CTA "Capture now"
├─ Animation: Fade-in on load (0.4s)
├─ Spacing: 24pt between elements
├─ Accessibility:
│  ├─ Descriptive text (not vague)
│  ├─ CTA clear and actionable
│  ├─ VoiceOver: Full context provided
│  └─ Focus: Button accessible via keyboard
└─ Dark mode: Adapt colors

SORTING / FILTERING:
├─ Top bar:
│  ├─ Sort button: "Date ↓" (SemiBold 15pt)
│  ├─ Filter button: "All" (or select category)
│  ├─ Options: Sort by date, name; Filter by category
│  ├─ Tap: Show picker (modal or menu)
│  └─ Selection: Update grid in real-time (0.3s animation)
├─ Micro-interactions:
│  ├─ Sort button: Scale 0.95 on tap
│  ├─ Active sort: Show indicator (arrow)
│  ├─ Grid refresh: Fade out/in (0.2s)
│  └─ Haptic: Light impact on sort
└─ Accessibility: Options labeled, keyboard support

PULL-TO-REFRESH:
├─ Trigger: Swipe down from top
├─ Visual:
│  ├─ Icon rotates matching drag distance
│  ├─ Threshold: 60pt (visual feedback at threshold)
│  ├─ Spring animation: 0.4s bounce when triggered
│  ├─ Spinner: Continuous rotation while loading
│  └─ Success: Checkmark animation + auto-hide
├─ Timing: Simulated 2s load (adjust for real API)
├─ Error: Toast message (red, 4s auto-dismiss)
└─ Accessibility: aria-busy during refresh

BOTTOM NAVIGATION:
├─ Same as Home screen (consistent)
├─ Active tab: Gallery icon highlighted
├─ Transitions: 0.2s smooth color change
└─ Accessibility: Tab labels + focus ring

ACCESSIBILITY (Gallery Screen):
✓ Grid cards: All 44pt x 44pt tap targets
✓ Text: WCAG AAA contrast on overlay
✓ VoiceOver: "Signature of [name], [date]"
✓ Keyboard: Arrow keys navigate grid (web)
✓ Sorting/filtering: Fully keyboard accessible
✓ Empty state: Clear instructions + CTA
✓ Dark mode: All text readable
✓ Reduced motion: No card scale/hover effects

PERFORMANCE:
├─ Grid rendering: Optimized for 100+ items
├─ Image loading: Lazy load below viewport
├─ Scrolling: Smooth 60fps performance
├─ Memory: Efficient image caching
└─ Test: Large collection (100+ items)
```

### ÉCRAN 6: DÉTAIL SIGNATURE

```
IMAGE SECTION:
BEFORE:
├─ Basic full-width image

AFTER:
├─ Image:
│  ├─ Full width, aspect 3:4
│  ├─ Top: Respects safe area (notch, punch-hole)
│  ├─ Bottom: Fade overlay (black 0% → 60%)
│  ├─ Overlay gradient: Top to bottom (linear)
│  └─ Shadow: None (image is hero)
├─ Tap interactions:
│  ├─ Tap image: Toggle bottom info visibility
│  ├─ Animation: Fade in/out (0.3s)
│  └─ Haptic: Light impact on toggle
├─ Swipe down: Dismiss detail view (pop animation)
│  ├─ Animation: Slide down + fade (0.3s)
│  ├─ Easing: ease-in (deceleration)
│  └─ Gesture: Native swipe-to-dismiss feel
├─ Dark mode:
│  ├─ Overlay: Adjusted darkness (40% vs 60%)
│  ├─ Text: High contrast (#F5F5F5)
│  └─ Fade: Still visible against dark bg
└─ Accessibility:
│  ├─ Alt text: "[Celebrity name] signature, [date]"
│  ├─ Image not decorative (semantic)
│  └─ Bottom info: VoiceOver accessible

BOTTOM INFO CARD:
├─ Layout (when visible):
│  ├─ Position: Slides up from bottom
│  ├─ Animation: 0.3s ease-out (spring-like)
│  ├─ Background: White (light) / #2C2C29 (dark)
│  ├─ Radius: 24pt (top corners)
│  ├─ Padding: 24pt
│  └─ Safe area: 16pt bottom (iPhone X+)
├─ Content:
│  ├─ Celebrity name: H3 SemiBold 24pt
│  ├─ Capture date: Body small 13pt, secondary text
│  ├─ Location: "📍 [City, Country]" (if available)
│  │  └─ Icon + text, Body small, secondary
│  ├─ Share count: "👥 1.2K shares" (if available)
│  │  └─ Icon + number, Body small, secondary
│  └─ Spacing: 12pt between lines
├─ Shadow: Level 2 (subtle elevation)
├─ Dark mode: Background + text adapt
└─ Accessibility: All text readable, VoiceOver labeled

ACTION BUTTONS:
├─ Layout: Horizontal stack in info card
├─ SHARE button:
│  ├─ Icon + text: "Share" (SemiBold 16pt)
│  ├─ Type: Secondary style
│  ├─ Width: Flexible (equal share)
│  ├─ Height: 48pt
│  ├─ Gap: 12pt to next button
│  ├─ Tap:
│  │  ├─ Visual: Scale 0.98
│  │  ├─ Haptic: Medium impact
│  │  ├─ Action: Show share sheet (native)
│  │  └─ Animation: Spring up 0.2s
│  └─ Focus: Ring outline (2pt primary)
├─ EDIT button:
│  ├─ Icon + text: "Edit"
│  ├─ Type: Secondary style
│  ├─ Same styling as Share
│  ├─ Action: Open wallpaper editor
│  └─ Same micro-interactions
├─ DELETE button:
│  ├─ Icon + text: "Delete"
│  ├─ Type: Destructive (red/error color)
│  ├─ Same size as others
│  ├─ Tap:
│  │  ├─ Show confirmation modal:
│  │  │  ├─ Title: "Delete this signature?"
│  │  │  ├─ Message: "This action cannot be undone."
│  │  │  ├─ Cancel: Secondary button
│  │  │  └─ Delete: Destructive button (red)
│  │  ├─ Confirmation: Heavy haptic
│  │  └─ Delete animation: Slide out + fade
│  └─ Success: Toast "Signature deleted" → back to gallery
├─ Spacing: 8pt margin top + 16pt between buttons
└─ Accessibility: All buttons tappable 44pt min, labels clear

PHOTO ACTIONS (Optional):
├─ Save to Photos:
│  ├─ Action: Save full-res to device
│  ├─ Confirmation: "Saved to Photos" toast (3s)
│  └─ Accessibility: Proper button label
├─ Copy to clipboard:
│  ├─ Action: Copy image (web) or share (mobile)
│  └─ Confirmation: "Copied!" toast
└─ Print (web):
   ├─ Action: Open print dialog
   └─ Accessibility: Keyboard support

SCREEN READER / ACCESSIBILITY:
✓ Image: alt text descriptive
✓ Name: H3 heading properly marked
✓ Metadata: All read in logical order
✓ Buttons: Clear action labels
✓ Focus: Ring around all interactive elements
✓ Touch targets: All 44pt x 44pt minimum
✓ Readable: WCAG AAA contrast in both light + dark

DARK MODE:
├─ Image: No change (user-generated content)
├─ Info card: Dark background + light text
├─ Overlay: Adjusted darkness for visibility
├─ Buttons: Adapt to dark background
├─ Text: High contrast (#F5F5F5)
└─ Shadow: Still visible

PERFORMANCE:
├─ Image: Optimized size (300KB max for full-res)
├─ Lazy load: Bottom info loaded on-demand
├─ Animation: 60fps smooth
├─ Gesture: Native swipe handling
└─ Memory: Efficient image caching
```

### ÉCRAN 7: AUTHENTIFICATION

```
LOGIN SCREEN:

HEADER:
├─ Logo: Centered, 64pt size
├─ Tagline (optional): "Your digital autograph collection"
└─ Spacing: 40pt from top (after safe area)

FORM FIELDS:
├─ Email input:
│  ├─ Height: 56pt
│  ├─ Label: "Email address" (16pt, above field)
│  ├─ Placeholder: "you@example.com"
│  ├─ Icon: Mail icon (left, 16pt)
│  ├─ Keyboard: Email type (mobile)
│  ├─ Focus: 2pt primary border + shadow Level 2
│  ├─ Validation: Check on blur (show error or success)
│  └─ Error: Red border + message below
├─ Password input:
│  ├─ Same styling as email
│  ├─ Icon: Lock icon (left)
│  ├─ Reveal button: Eye icon (right)
│  ├─ Tap reveal: Toggle password visibility
│  ├─ State: Show password (eye-open) or hidden (eye-closed)
│  ├─ Animation: Icon scale 1.0 → 1.2 → 1.0 on reveal
│  └─ Secure: Mark as password input (system keyboard)
├─ Spacing: 16pt between fields
├─ Helper text: "We'll never share your password" (caption, secondary)
└─ Focus order: Email → Password (tab navigation)

BUTTONS:
├─ "Se connecter" (Login):
│  ├─ Type: Primary button (gradient)
│  ├─ Height: 56pt
│  ├─ Width: 100% (- 32pt margins)
│  ├─ Label: "Se connecter" (SemiBold 16pt, white)
│  ├─ Margin top: 24pt
│  ├─ Loading state:
│  │  ├─ Show spinner inside
│  │  ├─ Disable all interactions
│  │  └─ Show 2s loading animation
│  ├─ Success: Checkmark animation → navigate home
│  ├─ Error: Toast message (red), keep form intact
│  └─ Haptic: Heavy impact on error, light on success
├─ "Forgot password?" (Link):
│  ├─ Style: Tertiary (ghost) button or text link
│  ├─ Text: Primary color
│  ├─ Margin top: 12pt
│  ├─ Tap: Navigate to reset password flow
│  ├─ Underline: Visible on hover (web)
│  └─ Focus: Ring outline (accessibility)
└─ No account section:
   ├─ Text: "Pas de compte ?" (Body small)
   ├─ Link: "S'inscrire" (Primary color, underlined)
   ├─ Spacing: 24pt top
   └─ Tap: Navigate to signup screen

OAUTH BUTTONS:
├─ Divider: "Ou" centered text (Body small, secondary)
├─ Spacing: 24pt above + below
├─ OAuth options: Apple, Google, Facebook
│  ├─ Layout: Horizontal or vertical (fit to width)
│  ├─ Height: 48pt each
│  ├─ Icon: 20pt, left-aligned
│  ├─ Text: Provider name (SemiBold 16pt)
│  ├─ Border: 1pt solid, light gray
│  ├─ Radius: 12pt
│  ├─ Tap: Scale 0.95 + haptic
│  ├─ Loading: Spinner, text hidden
│  └─ Spacing: 12pt between buttons
├─ Dark mode: Border + text adapt
└─ Accessibility:
   ├─ Button labels: "Sign in with Apple" (not just icon)
   ├─ Focus: Ring around each button
   └─ Order: Consistent across all screens

VALIDATION MESSAGES:
├─ Email:
│  ├─ Empty: "Email required"
│  ├─ Invalid: "Please enter a valid email"
│  └─ Registered: "Email not found" (on submit attempt)
├─ Password:
│  ├─ Empty: "Password required"
│  ├─ Too short: "Password must be 8+ characters"
│  └─ Incorrect: "Incorrect password" (generic for security)
├─ Display:
│  ├─ Color: Red (#C77B6B) for errors
│  ├─ Icon: X icon for errors, checkmark for valid
│  ├─ Animation: Fade in 0.2s (not jarring)
│  └─ Position: Below input field

---

SIGNUP SCREEN (Similar to Login):

HEADER:
├─ Logo + "Create Account" heading
└─ Tagline: "Join the autograph community"

FORM FIELDS:
├─ Email input: Same as login
├─ Password input: Same as login
├─ Password confirm:
│  ├─ Label: "Confirm password"
│  ├─ Icon: Lock icon (left)
│  ├─ Reveal: Eye icon to toggle
│  ├─ Validation: Must match password
│  └─ Error if not: "Passwords don't match"
├─ Terms checkbox:
│  ├─ Size: 20pt checkbox + 44pt tap target
│  ├─ Label: "I agree to Terms of Service"
│  ├─ Link: "Terms" underlined, tappable
│  ├─ Required: Must be checked to enable signup
│  ├─ Animation: Check scale 1.0 → 1.15 → 1.0
│  └─ Focus: Ring around checkbox
└─ Spacing: 16pt between fields

BUTTON:
├─ "Create Account":
│  ├─ Type: Primary button (gradient)
│  ├─ Height: 56pt
│  ├─ Margin top: 24pt
│  ├─ Loading: Spinner inside
│  ├─ Success: Checkmark → navigate to onboarding or home
│  └─ Error: Show error toast, keep form intact
└─ Already have account: "Se connecter" link below

---

ACCESSIBILITY (Auth Screens):
✓ Form labels: All inputs have labels (above or hidden aria-label)
✓ Required fields: aria-required="true"
✓ Validation: aria-invalid="true" on error
✓ Error messages: aria-live="assertive" (immediately announced)
✓ Focus: Logical order (email → password → button)
✓ Keyboard: Full navigation support (tab, enter, escape)
✓ Color: Not only red for errors (also icons + text)
✓ Touch targets: All 44pt x 44pt minimum
✓ Text size: 16pt minimum (no auto-zoom on focus)
✓ Contrast: WCAG AAA on all text

DARK MODE:
├─ Background: #1F1F1D
├─ Inputs: Light surface on dark background
├─ Text: High contrast (#F5F5F5)
├─ Borders: Adapted color (#383834)
├─ Buttons: Gradient maintained, text white
├─ Links: Color maintained, visible
└─ All readable, no contrast issues
```

### ÉCRAN 8: PREMIUM / PAYWALL

```
MODAL LAYOUT:

HEADER:
├─ Icon: Crown or star (80pt)
├─ Title: "Unlock Premium" (H2 24pt)
├─ Subtitle: "Get access to exclusive features" (Body 15pt, secondary)
└─ Close button: X icon (top right, 24pt)

FEATURES LIST:
├─ Layout: Vertical stack
├─ Each item:
│  ├─ Icon: Check mark (20pt, primary green)
│  ├─ Text: Feature description (15pt)
│  ├─ Spacing: 16pt between items
│  ├─ Example items:
│  │  ├─ ✓ 20+ wallpaper templates
│  │  ├─ ✓ Advanced editing tools
│  │  ├─ ✓ Priority sharing
│  │  ├─ ✓ Ad-free experience
│  │  └─ ✓ Cloud backup
│  └─ All items: WCAG AAA contrast
├─ Total items: 4-6 (don't overwhelm)
└─ Spacing: 24pt top/bottom padding

PLAN SELECTOR:
├─ Layout: Tabs or toggle (Horizontal)
├─ Options:
│  ├─ "Monthly" button
│  │  ├─ Price: €4.99/month
│  │  ├─ Style: Secondary (inactive) or Primary (active)
│  │  └─ Tap: Switch to monthly pricing
│  ├─ Divider: 1pt vertical line
│  └─ "Yearly" button
│     ├─ Price: €49.99/year (€4.17/month)
│     ├─ Badge: "Save 20%" (optional, attention-grabbing)
│     ├─ Style: Primary (recommended, highlighted)
│     └─ Tap: Switch to yearly pricing
├─ Active indicator: Underline or background color
├─ Animation: Color transition 0.2s (smooth)
├─ Currency: Based on user location (€ for EU)
└─ Spacing: 24pt top/bottom, 16pt horizontal

PRICING DISPLAY:
├─ Selected plan:
│  ├─ Price: Large text (32pt, bold)
│  ├─ Billing: "per month" or "per year" (caption)
│  ├─ Total (if yearly): "(€49.99/year)" in secondary text
│  └─ Animation: Fade-in 0.3s on plan switch
├─ Alignment: Centered
└─ Contrast: WCAG AAA verified

MAIN CTA:
├─ Button text: "Try Free for 7 days"
├─ Style: Primary button (gradient)
├─ Height: 56pt
├─ Width: 100% (- 32pt margins)
├─ Label: SemiBold 16pt, white text
├─ Shadow: Level 4
├─ Margin top: 32pt
├─ Micro-interaction:
│  ├─ Hover: Scale 1.02 + shadow +1
│  ├─ Tap: Scale 0.98 + haptic
│  ├─ Loading: Spinner inside, label fade out
│  └─ Success: Checkmark animation → navigate to app
├─ Error handling: Toast message (red, 4s)
└─ Focus: Ring outline (2pt primary)

SECONDARY BUTTON:
├─ Button text: "Restore purchase"
├─ Style: Tertiary (ghost) or Secondary
├─ Height: 48pt
├─ Margin top: 12pt
├─ Usage: If user previously purchased
├─ Tap: Restore previous purchase (iOS in-app purchase)
├─ Loading: Same as primary button
└─ Accessibility: Clear label, 44pt tap target

FOOTER TEXT:
├─ Small text: "By subscribing, you agree to our Terms."
├─ Font: Caption 12pt
├─ Color: Text secondary / gray
├─ Links: "Terms" and "Privacy" underlined
├─ Alignment: Centered
├─ Margin top: 24pt
└─ Tappable: Links are 44pt tap target

---

MODAL STYLING:

APPEARANCE:
├─ Background: White (light) / #2C2C29 (dark)
├─ Radius: 24pt (premium effect)
├─ Shadow: Level 5 (deep, modal emphasis)
├─ Padding: 32pt all sides (generous spacing)
├─ Max width: 90vw (responsive)
└─ Safe area: Bottom margin on iPhone X+

BACKDROP:
├─ Color: Black 40% opacity
├─ Animation: Fade in 0.2s
├─ Tap to dismiss: Optional (config-dependent)
├─ Transition: Smooth 0.2s fade out

ENTRANCE ANIMATION:
├─ Modal appearance: Scale 0.8 → 1.0 (0.3s, ease-out)
├─ Backdrop: Fade in (0.2s simultaneously)
├─ Content stagger: Elements fade-in with 50ms delays
└─ Total: 0.3s smooth entrance

EXIT ANIMATION:
├─ On close: Scale 1.0 → 0.8 (0.2s, ease-in)
├─ Backdrop: Fade out (0.2s simultaneously)
└─ Total: 0.2s quick disappear

DARK MODE ADAPTATION:
├─ Background: #2C2C29 (surface, warm black)
├─ Text: #F5F5F5 (high contrast)
├─ Buttons: Primary color maintained
├─ Links: Color adapted for visibility
├─ Icons: Check marks visible
└─ Shadow: Visible against dark bg

ACCESSIBILITY:

✓ Modal focus: Focus trapped inside modal (tab cycles through elements)
✓ Close button: Always available, clear label
✓ Escape key: Closes modal on web
✓ Labels: All elements properly labeled
✓ Form fields: If any (prices, etc) are readable
✓ Color: Check marks not only visual indicator
✓ Contrast: WCAG AAA on all text
✓ Touch targets: All 44pt x 44pt minimum
✓ Screen reader: aria-modal="true", aria-labelledby on modal
✓ Keyboard: Full navigation without mouse

PERFORMANCE:
├─ Image: Optional background (lightweight if used)
├─ Animation: 60fps smooth
├─ Load: Modal appears instantly (no loading spinner needed)
└─ Memory: Efficient modal component

---

ADDITIONAL NOTES:

Trial period:
├─ Show clearly: "7-day free trial, then €4.99/month"
├─ Auto-renewal: Users know subscription starts after trial
├─ Cancellation: Link to cancel anytime (in settings)
└─ Transparent: Build trust with clear terms

Upgrade incentive:
├─ Limited-time offer: "First month 50% off" (if applicable)
├─ Social proof: "Join 50K+ users" (if available)
├─ Risk-free: "Cancel anytime, no questions asked"
└─ Guarantee: Add confidence to purchase decision

Post-purchase:
├─ Success screen: Confirmation + thank you message
├─ Email: Send confirmation to email address
├─ Activation: Immediate or wait for next app restart
└─ Access: Clear indication that features are unlocked
```

---

## 💻 IMPLÉMENTATION TECHNIQUE

### Stack & Tools

```
DESIGN TOOLS:
├─ Figma: Primary design source
├─ Figma Plugins:
│  ├─ Stark (contrast checker)
│  ├─ A11y (accessibility audit)
│  └─ Naming plugin (consistency)
├─ Storage: Figma Teams (version control, permissions)
└─ Handoff: Figma → Dev (specs + component library)

DEVELOPMENT TOOLS:
├─ iOS:
│  ├─ Xcode (native development)
│  ├─ SwiftUI (UI framework, modern)
│  └─ VoiceOver (accessibility testing)
├─ Android:
│  ├─ Android Studio (IDE)
│  ├─ Jetpack Compose (UI framework)
│  └─ TalkBack (accessibility testing)
├─ React Native / Expo:
│  ├─ React Native (shared codebase)
│  ├─ Expo (simplified development)
│  ├─ NativeWind (Tailwind-like styling)
│  └─ Reanimated (animation library)
└─ Web:
   ├─ React (component framework)
   ├─ Tailwind CSS (styling)
   ├─ Framer Motion (animations)
   └─ Storybook (component documentation)

TESTING & QA:
├─ Visual testing:
│  ├─ Percy (visual regression)
│  └─ Chromatic (design system tracking)
├─ Accessibility:
│  ├─ Axe DevTools (automated a11y audit)
│  ├─ WAVE (web accessibility evaluation)
│  ├─ Manual: iOS VoiceOver, Android TalkBack
│  └─ Keyboard navigation (tab through all)
├─ Performance:
│  ├─ Lighthouse (web performance)
│  ├─ Android Profiler (memory, battery)
│  └─ Instruments (iOS performance)
└─ Device testing:
   ├─ Real devices (iPhone 14, iPhone SE, Pixel 7)
   ├─ Emulators (secondary, simulators for speed)
   └─ Cloud services (BrowserStack, Sauce Labs)
```

### CSS/SCSS Variables Setup

```
-- COLOR VARIABLES --
:root {
  /* Light Mode (default) */
  --color-primary: #8A9A5B;
  --color-primary-dark: #6B7A3F;
  --color-primary-light: #A8B67D;
  
  --color-secondary: #D4C5B1;
  --color-secondary-dark: #B8A490;
  --color-secondary-light: #E8DDD0;
  
  --color-accent: #A8C3BC;
  --color-accent-dark: #8AA89F;
  --color-accent-light: #C5DDD7;
  
  --color-neutral: #E6E6E6;
  
  --color-bg: #FFFFFF;
  --color-surface: #F8F8F6;
  --color-text-primary: #2C2C2C;
  --color-text-secondary: #6B7A3F;
  --color-text-tertiary: #A6A6A6;
  
  --color-success: #8A9A5B;
  --color-warning: #D4C5B1;
  --color-error: #C77B6B;
  --color-info: #A8C3BC;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode */
    --color-bg: #1F1F1D;
    --color-surface: #2C2C29;
    --color-text-primary: #F5F5F5;
    --color-text-secondary: #B8B8B8;
    --color-text-tertiary: #8A8A8A;
    
    --color-primary: #A8B67D;
    --color-accent: #B0D4CA;
    --color-error: #E0A39A;
  }
}

-- TYPOGRAPHY VARIABLES --
:root {
  --font-h1: 32px / 40px / 700;
  --font-h2: 24px / 32px / 600;
  --font-h3: 20px / 28px / 600;
  --font-h4: 18px / 24px / 500;
  --font-body-large: 17px / 24px / 400;
  --font-body: 15px / 22px / 400;
  --font-body-small: 13px / 18px / 400;
  --font-caption: 12px / 16px / 400;
  --font-button: 16px / 24px / 600;
}

-- SHADOW VARIABLES --
:root {
  --shadow-0: none;
  --shadow-1: 0px 2px 4px rgba(44, 44, 44, 0.05);
  --shadow-2: 0px 2px 8px rgba(44, 44, 44, 0.08);
  --shadow-3: 0px 4px 12px rgba(138, 154, 91, 0.3);
  --shadow-4: 0px 8px 24px rgba(138, 154, 91, 0.4);
  --shadow-5: 0px 12px 32px rgba(138, 154, 91, 0.25);
}

-- SPACING VARIABLES --
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}

-- BORDER RADIUS VARIABLES --
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
}

-- ANIMATION VARIABLES --
:root {
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --easing-out: cubic-bezier(0.2, 1, 0.82, 0.85);
  --easing-in-out: cubic-bezier(0.42, 0, 0.58, 1);
}
```

### Component Architecture

```
BUTTON COMPONENT:
react-native/Button.tsx

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  isLoading,
  isDisabled,
  onPress,
  children,
  accessibilityLabel,
}) => {
  // Dynamic styling based on variant + theme (light/dark)
  // Loading state: show spinner, hide text
  // Haptic feedback: vibrate on tap
  // Accessibility: proper labels + focus ring
  // Animation: scale effect on tap
};

INPUT FIELD COMPONENT:
react-native/TextField.tsx

export interface TextFieldProps {
  variant: 'default' | 'email' | 'password';
  isRequired?: boolean;
  validationStatus?: 'idle' | 'valid' | 'error';
  errorMessage?: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  accessibilityLabel: string;
}

export const TextField: FC<TextFieldProps> = ({
  variant,
  isRequired,
  validationStatus,
  errorMessage,
  ...props
}) => {
  // Real-time validation
  // Error icon + message animation
  // Focus state: border + shadow
  // Accessibility: labels + required indication
  // Dark mode support
};

CARD COMPONENT:
react-native/Card.tsx

export interface CardProps {
  variant: 'default' | 'image' | 'hero' | 'empty';
  elevation?: 1 | 2 | 3 | 4 | 5;
  onPress?: () => void;
  onLongPress?: () => void;
  accessibilityRole?: string;
}

export const Card: FC<CardProps> = ({
  variant,
  elevation,
  onPress,
  children,
}) => {
  // Shadow elevation system
  // Hover/tap scale animation
  // Dark mode adaptation
  // Accessibility: proper roles + labels
};

Animation Utilities:
react-native/animations.ts

export const createScaleAnimation = (
  duration: 200,
  easing: Easing.out,
) => ({
  transform: [{ scale: useSharedValue(1) }],
  onTap: () => {
    // Scale 0.98 on press, 1.0 on release
  },
});

export const createFadeInAnimation = (duration = 300) => ({
  opacity: useSharedValue(0),
  animated: () => {
    // Fade in from 0 to 1
  },
});
```

---

## ✅ CHECKLIST DE VALIDATION

### Avant Release (Design Check)

```
GÉNÉRAL:
☐ Tous les écrans conçus en light + dark mode
☐ Design approuvé par stakeholders
☐ Figma components library finalisée
☐ Design specs document complètes

COULEURS:
☐ Toutes les combinaisons texte/background testées (7:1 AAA)
☐ Pas de coloration unique pour information (icons + text)
☐ Ombres utilisent couleurs palette (pas noir pur)
☐ Gradients testés light + dark mode

TYPOGRAPHIE:
☐ Tailles minimums respectées (12pt+ for captions)
☐ Line-heights: 1.2-1.5x selon contexte
☐ Max width: 75 characters pour body text
☐ Weights: Max 3 par écran (400, 600, 700)
☐ Dynamic Type support: Tailles testées 85%-130%

ESPACEMENT:
☐ Tous espaces: Multiples de 8pt
☐ Marges: 16pt standard (left/right)
☐ Touch targets: 44pt x 44pt minimum (44pt x 48pt)
☐ Spacing between targets: 8pt minimum

COMPOSANTS:
☐ Buttons: Tous les états testés (default, hover, active, disabled, loading, focus)
☐ Inputs: Validation states, focus rings, error messages
☐ Cards: Shadows, hover states, dark mode
☐ Navigation: Active states, transitions, accessibility

ACCESSIBILITÉ:
☐ Focus ring: Visible sur tous éléments interactifs (2pt, primary color)
☐ Keyboard navigation: Tab order logique (top→bottom, left→right)
☐ Screen reader labels: Tous éléments labellisés correctement
☐ Color independence: Information pas uniquement couleur
☐ Text scaling: Testé à 85%, 100%, 130% (pas overflow)
☐ Reduced motion: prefers-reduced-motion supported

ANIMATIONS:
☐ Durée: 100-300ms (responsive), jamais > 500ms
☐ Easing: ease-out ou ease-in-out (smooth)
☐ Performance: 60fps capable (no jank)
☐ Haptic feedback: Utilisé judicieusement
☐ Accessibility: Animations respectent prefers-reduced-motion

DARK MODE:
☐ Tous les écrans: Light mode visually correct
☐ Tous les écrans: Dark mode visually correct
☐ Transition: 0.5s smooth fade (prefers-reduced-motion: instant)
☐ Contraste: WCAG AAA dans les deux modes
☐ Images: Lisibles dans dark mode (filters si besoin)

PERFORMANCE:
☐ Images: Optimisées (WebP < 100KB, AVIF si possible)
☐ SVG: Icons utilisés partout (pas PNG)
☐ Bundle size: App < 50MB (aggressive compression)
☐ Animation rendering: 60fps sur mid-range devices
☐ No memory leaks: Tested on lower-end devices

DOCUMENTATION:
☐ Figma components: Documented usage
☐ Design specs: Complete, up-to-date
☐ Color palette: Published for developers
☐ Typography scale: CSS variables provided
☐ Animation guidelines: Documented
```

### During Development (Dev Check)

```
CODE QUALITY:
☐ CSS/SCSS: Variables utilisées (pas hardcoded)
☐ Component props: Types définis (TypeScript)
☐ Responsive: Mobile-first approach
☐ Dark mode: CSS media query implemented
☐ No console errors: Clean dev environment

TESTING:
☐ Unit tests: Components tested in isolation
☐ Visual tests: Screenshots compared (Percy)
☐ Accessibility tests: Axe DevTools run (0 critical)
☐ Performance tests: Lighthouse score > 80
☐ Device tests: iPhone SE, iPhone 14, Pixel 6a

ANIMATION PERFORMANCE:
☐ 60fps maintained: Profiler shows smooth
☐ No jank: Zero dropped frames
☐ GPU acceleration: Transform/opacity used
☐ Reduced motion: Instant for users
☐ Battery impact: Minimal (no continuous animations)

ACCESSIBILITY COMPLIANCE:
☐ Keyboard navigation: Tab/arrow keys work everywhere
☐ Screen readers: iOS VoiceOver navigates app
☐ Screen readers: Android TalkBack navigates app
☐ Focus indicators: Always visible (2pt ring)
☐ Color contrast: All combinations pass WCAG AAA
☐ Touch targets: All 44pt x 44pt minimum
☐ Text scaling: 130% scaling works (no overflow)
```

### Before Launch (Final QA)

```
DEVICE TESTING:
☐ iPhone 14 Pro (primary): All features work
☐ iPhone SE (budget): All features work, performance acceptable
☐ Pixel 7 (Android primary): All features work
☐ Pixel 6a (budget): All features work, performance acceptable
☐ iPad (tablet): Layout scales properly
☐ Landscape mode: All orientations supported

NETWORK CONDITIONS:
☐ WiFi: Fast, no issues
☐ 4G: Expected speed, smooth experience
☐ 3G (throttled): App usable, images load progressively
☐ Offline (simulated): Cached content works
☐ No loading spinners > 3 seconds visible

BATTERY & POWER:
☐ Normal mode: No excessive battery drain
☐ Low battery mode: Performance acceptable
☐ Dark mode enabled: Battery savings verified
☐ Animations: Not draining battery
☐ Continuous use (1 hour): < 15% battery drain

ACCESSIBILITY FINAL PASS:
☐ VoiceOver: Full app navigable without sight
☐ VoiceOver: All meaningful information conveyed
☐ TalkBack: Full app navigable without sight
☐ TalkBack: All meaningful information conveyed
☐ Keyboard only: Navigate to any feature (web)
☐ 200% zoom: Content readable, no horizontal scroll (web)
☐ High contrast mode: All text readable
☐ Font sizes: 85%, 100%, 130% all readable

DARK MODE FINAL:
☐ Automatic trigger: Sunset (18h) works
☐ Manual toggle: Works in settings
☐ Transition: Smooth 0.5s (or instant if needed)
☐ All screens: Visually correct, readable
☐ All text: WCAG AAA contrast

VISUAL POLISH:
☐ Animations: Smooth, purposeful, not jarring
☐ Shadows: Consistent elevation system
☐ Spacing: Consistent 8pt grid throughout
☐ Typography: Hierarchy clear, sizes appropriate
☐ Colors: Palette consistent, no deviations
☐ Borders: Radius consistent (no weird edges)
☐ Icons: All consistent style + sizing

PERFORMANCE FINAL:
☐ App launch: < 3 seconds
☐ Screen transitions: < 0.5 seconds
☐ Image loading: Progressive, not blocking
☐ Bundle size: < 50MB app size
☐ Memory: Stable, no leaks (monitored)
☐ CPU: Low usage during normal interaction

STORE SUBMISSION:
☐ App Store: Screenshots + descriptions complete
☐ Google Play: Screenshots + descriptions complete
☐ Accessibility statement: Published
☐ Privacy policy: Updated
☐ Terms of service: Reviewed
☐ GDPR compliance: Verified
```

---

## 📅 TIMELINE ET RESSOURCES

### Ressources Requises

```
DESIGN TEAM:
├─ Design Lead (1 FTE): Strategy, oversight, QA
├─ Product Designer (1 FTE): Screens, components
├─ UX Researcher (0.5 FTE): User testing, accessibility
└─ Design QA (0.5 FTE): Checklist, compliance

DEVELOPMENT TEAM:
├─ Frontend Lead (1 FTE): Architecture, oversight
├─ Mobile Developer (2 FTE): React Native, components
├─ Web Developer (1 FTE): Web responsive version
├─ QA Engineer (1 FTE): Testing, device verification
└─ DevOps (0.5 FTE): Performance monitoring

TIMELINE (6 weeks):

Week 1-2: PHASE 1 - FONDAMENTAUX
├─ Task allocation + kickoff
├─ Design system setup (colors, typography, shadows)
├─ Component library creation (design + code)
└─ Documentation started

Week 3-4: PHASE 2 - INTERACTIONS
├─ Micro-interactions designed + implemented
├─ Animation library created
├─ Real-time testing in Figma
└─ Developer integration

Week 5-6: PHASE 3 - ACCESSIBILITY & DARK MODE
├─ Dark mode full implementation
├─ Accessibility audit + fixes
├─ Device testing (iOS, Android)
├─ Final QA + Polish

PARALLEL ACTIVITIES:
├─ Weeks 1-6: Continuous code review
├─ Weeks 1-6: Performance monitoring
├─ Weeks 1-6: Documentation updates
└─ Weeks 1-6: Stakeholder communication

LAUNCH READINESS:
├─ Week 6 end: Design handoff complete
├─ Week 6 end: All QA checks passed
├─ Week 6 end: Performance targets met
├─ Week 6 end: Ready for deployment

ESTIMATED EFFORT:
├─ Design: 200 hours (32 person-days)
├─ Development: 300 hours (48 person-days)
├─ QA/Testing: 100 hours (16 person-days)
└─ Total: 600 hours (96 person-days, 6 weeks @ 1 team)
```

### Success Metrics

```
DESIGN SYSTEM:
✓ Component library: 95%+ usage adoption
✓ Design consistency: Zero style deviations
✓ Time to design new screen: < 4 hours
✓ Time to implement component: < 2 hours

ACCESSIBILITY:
✓ WCAG 3.0 AAA compliance: 100%
✓ Axe DevTools score: 0 critical issues
✓ Keyboard navigation: 100% functionality
✓ Screen reader support: Full coverage
✓ User feedback: Accessibility praise

PERFORMANCE:
✓ Page load: < 2.5s (LCP)
✓ First paint: < 1.5s (FCP)
✓ App size: < 50MB
✓ Frame rate: 60fps average
✓ Battery drain: < 5% per hour

USER EXPERIENCE:
✓ Satisfaction score: > 4.5/5
✓ Accessibility feedback: > 4.8/5
✓ Performance feedback: > 4.7/5
✓ Design feedback: > 4.6/5
✓ NPS: > 50

BUSINESS:
✓ App retention (Day 7): > 40%
✓ Premium conversion: > 8%
✓ User reviews: > 4.5 stars
✓ Crash rate: < 0.1%
✓ Support tickets (design-related): < 5/week
```

---

## 📞 SUPPORT & QUESTIONS

**Pour questions sur la mise à niveau:**

1. **Design questions**: Consulter le Manifeste Charte Graphique
2. **Implémentation technique**: Code examples dans ce guide
3. **Accessibility**: Accessibility checklist détaillée (Phase 3)
4. **Performance**: Performance budgets + testing guidelines
5. **Timeline**: Contactez design lead si blocages

---

## ✅ DOCUMENT FINAL

**Status:** APPROUVÉ ✓  
**Version:** 1.0  
**Date:** 31 octobre 2025  
**Prochaine révision:** Q1 2026

**Ce guide est le plan d'exécution complet pour transformer SignatureApp vers la nouvelle charte graphique 2025.**

---

*Guide créé par: Équipe Design & UX SignatureApp*  
*Version contrôle: Git-friendly, living document*  
*Mise à jour: Chaque sprint avec learnings*
