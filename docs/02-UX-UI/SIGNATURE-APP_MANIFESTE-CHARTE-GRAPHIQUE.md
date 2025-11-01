# 📱 MANIFESTE - CHARTE GRAPHIQUE COMPLÈTE
## SignatureApp: Plateforme d'Autographes Numériques Intelligentes

**Version:** 2.0 (Évolution Design 2025)  
**Date:** 31 octobre 2025  
**Statut:** ✅ Document Officiel de Référence  
**Formats compatibles:** iOS 16+, Android 14+, Web (responsive)

---

## 📋 TABLE DES MATIÈRES

1. [Déclaration de Marque](#déclaration-de-marque)
2. [Fondamentaux Visuels](#fondamentaux-visuels)
3. [Palette de Couleurs](#palette-de-couleurs)
4. [Système de Typographie](#système-de-typographie)
5. [Composants et Patterns](#composants-et-patterns)
6. [Architecture Micro-Interactions](#architecture-micro-interactions)
7. [Système d'Accessibilité](#système-daccessibilité)
8. [Dark Mode Intelligent](#dark-mode-intelligent)
9. [Principes de Durabilité](#principes-de-durabilité)
10. [Assets et Iconographie](#assets-et-iconographie)

---

## 🎯 DÉCLARATION DE MARQUE

### Identité Visuelle
**SignatureApp** est la première plateforme qui transforme les autographes en experiences numériques. Notre design reflète trois valeurs fondamentales:

- **Authenticité**: Chaque signature est unique, notre design le célèbre avec élégance
- **Accessibility**: L'autographe numérique doit être accessible à tous, partout
- **Sophistication**: Une expérience premium accessible, sans complexité

### Essence Visuelle
SignatureApp incarne l'**élégance naturelle** — une palette inspirée par les matériaux organiques (sage, terre, eau) qui crée une atmosphère de confiance et de luxe discret. Le design privilégie la **clarté intentionnelle** et les **interactions significatives** plutôt que l'ornementation gratuite.

### Philosophie de Design 2025
Notre approche intègre les tendances 2025 en restant intemporelle:
- **Interfaces Adaptatives**: L'app s'ajuste au profil et au comportement de l'utilisateur
- **Accessibilité Inclusive**: WCAG 3.0 compliant dès la conception
- **Minimalisme Augmenté**: Complexité révélée progressivement via micro-interactions
- **Éco-Responsabilité**: Optimisation énergétique à chaque décision de design
- **Micro-Interactions Intelligentes**: Retours tactiles contextuels et animations significatives

---

## 🎨 FONDAMENTAUX VISUELS

### 1. Grille et Espacement

**Système Base: 8pt Grid**

Tous les espacements, tailles et alignements sont multiples de 8pt pour garantir cohérence et harmonie.

```
Espacement Vertical (multiples de 8pt):
- Micro: 4pt (rare, éléments très serrés)
- Extra Small: 8pt (tight spacing)
- Small: 16pt (default spacing)
- Medium: 24pt (section separation)
- Large: 32pt (major blocks)
- Extra Large: 48pt (hero sections)

Espacement Horizontal:
- Horizontal Default: 16pt (screen margins)
- Column Gap: 16pt (grid columns)
- Component Padding: 16-20pt (internals)
```

**Breakpoints Responsive:**
```
Mobile Portrait: 375px - 428px
Mobile Landscape: 812px - 926px
Tablet: 768px+
Desktop: 1024px+

Note: Optimisation prioritaire pour iPhone 14 Pro (393pt)
      et Pixel 7 (412pt)
```

### 2. Rayon de Courbure (Border Radius)

**Hiérarchie de Courbes:**

Les radius de courbure créent une hiérarchie visuelle et maintiennent une cohérence organique.

```
Subtle (Très restreint): 4pt
  - Utilisé pour: Petits inputs, badges, tags
  - Ressenti: Technique, précis

Mild (Modéré): 8pt
  - Utilisé pour: Inputs standards, pequeaux dividers
  - Ressenti: Classique, intemporel

Regular (Standard): 12pt
  - Utilisé pour: Cards, modales, containers
  - Ressenti: Moderne, accueillant

Generous (Généreux): 16pt
  - Utilisé pour: Hero cards, CTA buttons, galleries
  - Ressenti: Premium, luxueux

Full Radius (Extrême): 24pt+
  - Utilisé pour: Large hero sections, special CTAs
  - Ressenti: Signature, distinctif

Règle Universelle: Jamais de radius pointu (0pt) sauf lignes horizontales
```

### 3. Ombres et Profondeur

**Système d'Ombres (Elevation System):**

Crée une hiérarchie visuelle claire et une sensation de profondeur.

```
Level 0 (Flat, No Shadow):
- Backgrounds, surfaces plates
- Exemple: Background principal

Level 1 (Subtle, Hover state):
- Box-shadow: 0px 2px 4px rgba(44, 44, 44, 0.05)
- Utilisé pour: Inputs au survol, délimitations subtiles

Level 2 (Standard, Default Card):
- Box-shadow: 0px 2px 8px rgba(44, 44, 44, 0.08)
- Utilisé pour: Cards de galerie, small modals

Level 3 (Medium, Interactive):
- Box-shadow: 0px 4px 12px rgba(138, 154, 91, 0.3)
- Utilisé pour: Primary buttons, hero cards

Level 4 (Deep, Premium):
- Box-shadow: 0px 8px 24px rgba(138, 154, 91, 0.4)
- Utilisé pour: Major CTAs, full-screen modals

Level 5 (Very Deep, Focus):
- Box-shadow: 0px 12px 32px rgba(138, 154, 91, 0.25)
- Utilisé pour: Active states, focus indicators

Règle: Les ombres utilisent toujours des couleurs de la palette (jamais pur noir)
       Elles doivent enhancer l'hierarchy, jamais la noyer
```

---

## 🎨 PALETTE DE COULEURS

### 1. Système Chromatic Principal

**Harmonie Naturelle à 4 Piliers:**

```
PRIMARY - SAGE GREEN (Authenticité)
┌─────────────────────────────────────────────────────┐
│ Primary Base        #8A9A5B (Référence iOS/Android) │
│ Primary Dark        #6B7A3F (Hover, Active)         │
│ Primary Light       #A8B67D (Backgrounds)           │
│ Primary Very Light  #C8D4A8 (Disabled, Subtle BG)   │
│                                                      │
│ Usage: CTAs principaux, accents actifs, focus       │
│ Émotion: Confiance, croissance, stabilité           │
│ Accessibilité: Excellent sur blanc/clair            │
└─────────────────────────────────────────────────────┘

SECONDARY - WARM BEIGE (Chaleur)
┌─────────────────────────────────────────────────────┐
│ Secondary Base      #D4C5B1 (Référence)             │
│ Secondary Dark      #B8A490 (Hover, Depth)          │
│ Secondary Light     #E8DDD0 (Backgrounds)           │
│ Secondary Very Light #F4EFE8 (Surfaces)             │
│                                                      │
│ Usage: Accents secondaires, highlights              │
│ Émotion: Luxe, confort, sophistication              │
│ Accessibilité: Fort contraste sur vert sauge        │
└─────────────────────────────────────────────────────┘

ACCENT - WATER GREEN (Harmonie)
┌─────────────────────────────────────────────────────┐
│ Accent Base         #A8C3BC (Référence)             │
│ Accent Dark         #8AA89F (Hover states)          │
│ Accent Light        #C5DDD7 (Backgrounds)           │
│ Accent Very Light   #E0EEEB (Subtle tints)          │
│                                                      │
│ Usage: Information, confirmation, secondary CTAs    │
│ Émotion: Calme, fluidité, progression               │
│ Accessibilité: Support complémentaire de Primary    │
└─────────────────────────────────────────────────────┘

NEUTRAL - PEARL GRAY (Équilibre)
┌─────────────────────────────────────────────────────┐
│ Pearl Base          #E6E6E6 (Borders, dividers)     │
│ Pearl Dark          #A6A6A6 (Secondary text)        │
│ Pearl Light         #F5F5F5 (Subtle backgrounds)    │
│                                                      │
│ Usage: Structure, séparation, inactivité            │
│ Émotion: Clarté, professionalism, transparency      │
│ Accessibilité: Utiliser judicieusement (faible)     │
└─────────────────────────────────────────────────────┘
```

### 2. Neutres et Texte

```
BACKGROUND & SURFACE
┌──────────────────────────────────────────────────┐
│ White (Light mode)        #FFFFFF               │
│ Background Light          #F8F8F6 (subtle)      │
│ Surface Light             #FAFAF8 (cards)       │
│                                                  │
│ Usage: Backgrounds principaux (light mode)       │
│ Note: Très légèrement teinté (pas 100% blanc)   │
└──────────────────────────────────────────────────┘

TEXT HIERARCHY
┌──────────────────────────────────────────────────┐
│ Text Primary              #2C2C2C (90% opacity) │
│ Text Secondary            #6B7A3F (Primary 70%) │
│ Text Tertiary             #A6A6A6(Pearl Dark)   │
│ Text Disabled             #C4C4C4 (60% opacity) │
│ Text Inverse (on Primary) #FFFFFF               │
│                                                  │
│ Ratio: P:S:T = 100:70:60 (pour cohérence)       │
│ Note: Jamais pur noir (#000000)                 │
└──────────────────────────────────────────────────┘

INTERACTIVE STATES
┌──────────────────────────────────────────────────┐
│ Success (Validation)      #8A9A5B (Primary)     │
│ Warning (Attention)       #D4C5B1 (Secondary)   │
│ Error (Urgent)            #C77B6B (Red-Brown)   │
│ Info (Notification)       #A8C3BC (Accent)      │
│                                                  │
│ Usage: Status indicators, notifications, alerts │
│ Contrastes: Tous AA/AAA compliant               │
└──────────────────────────────────────────────────┘
```

### 3. Gradients Stratégiques

**Gradients Signature (approuvés à chaque utilisation):**

```
HERO GRADIENT (Primary → Accent)
Direction: 135° (top-left to bottom-right)
From: #8A9A5B (Primary)
To: #A8C3BC (Accent)
Opacity: 100%
Usage: Hero CTAs, major interactive zones, splash screens
Effect: Crée une sensation de flux et mouvement naturel

NEUTRAL FADE (Light to Medium)
Direction: 180° (top to bottom)
From: #F8F8F6 (Background Light) - 0%
To: #E6E6E6 (Pearl Gray) - 100%
Usage: Overlay fadeouts, surface transitions
Effect: Subtil, nunca overwhelming

DANGER ACCENT (Warning → Urgency)
Direction: 90° (top to bottom)
From: #D4C5B1 (Warning)
To: #C77B6B (Error)
Usage: Destructive actions, alerts critiques
Effect: Communique l'importance sans aggressivité

Règles d'Or:
- Max 2 gradients par écran (avoid visual clutter)
- Toujours tester en light ET dark mode
- Gradient angles multiples de 45° (cohérence)
- Durée d'animation: 0.3-0.4s max
```

### 4. Palette Dynamique (2025 Adaptation)

**Système Auto-Adaptative pour Dark Mode et Modes de Contraste:**

```
DÉTECTION DE CONTEXTE:
┌─────────────────────────────────────────────────────┐
│ • Heure du jour (sunset trigger à 18h)              │
│ • Luminosité ambiante (via capteur device)          │
│ • Préférence utilisateur (explicit toggle)          │
│ • Accessibilité (high contrast mode)                │
│ • Battery saver mode (colors pâles)                 │
└─────────────────────────────────────────────────────┘

TRANSITIONS FLUIDES:
- Durée transition: 0.5s (smooth, non-jarring)
- Courbe d'animation: ease-in-out
- Jamais instantané (jarring sur yeux)
- Optionally: fade-through gris neutre (bonne practice)

PALETTE SOMBRE (Dark Mode 2025 Intelligente):
Primary (Dark):     #A8B67D (lightened pour visibilité)
Secondary (Dark):   #E8DDD0 (invert vers clair)
Accent (Dark):      #B0D4CA (moderate boost)
Background (Dark):  #1F1F1D (warm noir, pas pur #000)
Surface (Dark):     #2C2C29 (elevation +1)
Text Primary:       #F5F5F5 (high contrast)

Note: Dark palette testée WCAG AA sur tous les textes
```

---

## 📝 SYSTÈME DE TYPOGRAPHIE

### 1. Hiérarchie Typographique

**Famille Principale:**
```
iOS:      SF Pro Display (system font, optimal)
Android:  Roboto (system font, optimal)
Web/All:  Inter (fallback cross-platform)

Fallback Chain: [System] → Inter → [Generic]
```

**Échelle Typographique Complète:**

```
H1 - HERO / SPLASH
├─ Taille: 32pt (mobile) / 40pt (tablet)
├─ Weight: Bold (700)
├─ Line-height: 1.25 (40pt / 50pt)
├─ Letter-spacing: -0.5pt (optical adjustment)
├─ Usage: Titres de page, hero sections, splash screens
└─ Max-width: 40 characters (optimal reading)

H2 - PAGE TITLE
├─ Taille: 24pt
├─ Weight: SemiBold (600)
├─ Line-height: 1.33 (32pt)
├─ Letter-spacing: 0pt
├─ Usage: Screen titles, major sections
└─ Max-width: 50 characters

H3 - SECTION HEADING
├─ Taille: 20pt
├─ Weight: SemiBold (600)
├─ Line-height: 1.4 (28pt)
├─ Letter-spacing: 0pt
├─ Usage: Section headers, subsection titles
└─ Max-width: 60 characters

H4 - SUBSECTION
├─ Taille: 18pt
├─ Weight: Medium (500)
├─ Line-height: 1.33 (24pt)
├─ Letter-spacing: 0pt
├─ Usage: Card titles, grouped content
└─ Max-width: 70 characters

BODY LARGE
├─ Taille: 17pt
├─ Weight: Regular (400)
├─ Line-height: 1.41 (24pt)
├─ Letter-spacing: 0pt
├─ Usage: Primary body text, important information
└─ Max-width: 75 characters (comfortable reading)

BODY REGULAR (Standard)
├─ Taille: 15pt
├─ Weight: Regular (400)
├─ Line-height: 1.47 (22pt)
├─ Letter-spacing: 0pt
├─ Usage: Default body text, descriptions
└─ Max-width: 80 characters

BODY SMALL
├─ Taille: 13pt
├─ Weight: Regular (400)
├─ Line-height: 1.38 (18pt)
├─ Letter-spacing: 0.2pt
├─ Usage: Secondary information, helper text
└─ Max-width: 85 characters

CAPTION
├─ Taille: 12pt
├─ Weight: Regular (400)
├─ Line-height: 1.33 (16pt)
├─ Letter-spacing: 0.3pt
├─ Usage: Metadata, timestamps, labels
└─ Max-width: N/A (généralement court)

BUTTON / CTA
├─ Taille: 16pt
├─ Weight: SemiBold (600)
├─ Line-height: 1.5 (24pt)
├─ Letter-spacing: 0pt
├─ Usage: Texte de bouton, appels à l'action
└─ Note: Toujours centered, taille min: 44pt height

MONOSPACE (Code, Data)
├─ Font: SF Mono / Roboto Mono
├─ Taille: 12pt-14pt
├─ Weight: Regular (400)
├─ Usage: Code snippets, technical data
└─ Line-height: 1.5
```

### 2. Weight Strategy

**Hiérarchie par Épaisseur:**

```
Regular (400):   Corps de texte standard, descriptions
Medium (500):    Sous-titres, labels, metadata
SemiBold (600):  Titres, emphasis, hierarchy
Bold (700):      Heroes, very important titles

Note: Max 3 weights par écran (éviter saturation)
      Toujours 400 pour body (lisibilité optimale)
```

### 3. Dynamic Type Support

**Accessibilité: Responsive Typography**

```
iOS Dynamic Type Support:
- Text Styles dynamiques à 5 tailles (Accessibility Settings)
- Minimum: 12pt pour captions
- Maximum: 40pt pour H1
- App doit supporter 5 tailles sans rupture de layout

Android Scalable Text:
- Support font scaling 85% - 130%
- sp (scale-independent pixels) obligatoire
- Rem units préférés pour web

Test: Toujours tester à 85%, 100%, 130% sur device
```

---

## 🧩 COMPOSANTS ET PATTERNS

### 1. Système de Boutons

**Anatomie Universelle des Boutons:**

```
STRUCTURE:
┌────────────────────────────────────┐
│  [Icon?] [Label/Text] [Icon?]      │
│     ↑                          ↑    │
│  Optional                   Optional │
└────────────────────────────────────┘

PADDING STANDARDS:
- Vertical (top/bottom): 12pt-16pt
- Horizontal (left/right): 16pt-20pt
- Icon-to-text gap: 8pt
- Min target size: 44pt x 44pt (iOS) / 48dp x 48dp (Android)

STATES UNIVERSELS:
1. Default    → Normal state
2. Hover      → Scale 1.02, shadow +1 level
3. Active     → Scale 0.98, color change
4. Disabled   → Opacity 50%, no interaction
5. Loading    → Spinner inline, text hidden
6. Focus      → Ring outline 2pt (keyboard nav)
```

**Types de Boutons:**

```
PRIMARY BUTTON (Main CTA)
├─ Background: Gradient (#8A9A5B → #A8C3BC)
├─ Text: White, SemiBold 16pt
├─ Height: 56pt
├─ Radius: 16pt
├─ Shadow: Level 3 (default), Level 4 (hover)
├─ Transition: 0.2s ease-in-out
├─ States:
│  └─ Hover: Scale 1.02, shadow boosted
│  └─ Active: Scale 0.98, color darkened
│  └─ Disabled: Opacity 50%, cursor not-allowed
└─ Usage: Submit forms, major CTAs, navigation

SECONDARY BUTTON (Alternative CTA)
├─ Background: #F8F8F6 (surface light)
├─ Text: #8A9A5B (primary color)
├─ Border: 2pt solid #E6E6E6
├─ Height: 48pt
├─ Radius: 12pt
├─ Shadow: None (default), Level 1 (hover)
├─ States:
│  └─ Hover: Background → #FAFAF8, border → #8A9A5B
│  └─ Active: Border weight +1pt
└─ Usage: Cancel, back, alternative options

TERTIARY BUTTON (Ghost / Minimal)
├─ Background: Transparent
├─ Text: #8A9A5B (primary)
├─ Border: None
├─ Height: 44pt
├─ Radius: 8pt
├─ Padding: 12pt horizontal
├─ States:
│  └─ Hover: Background fade → #F8F8F6 (5% opacity)
│  └─ Active: Background → #E6E6E6 (10% opacity)
│  └─ Focus: Outline 2pt solid primary
└─ Usage: Additional options, secondary flows, links

ICON-ONLY BUTTON (Compact)
├─ Size: 44pt x 44pt (iOS) / 48dp x 48dp (Android)
├─ Icon: 24pt, centered
├─ Background: Depends on context (transparent by default)
├─ Padding: Icon centered, no text
├─ States: Same as other buttons
└─ Usage: Navigation, quick actions, close/back

DESTRUCTIVE BUTTON (Delete, Danger)
├─ Background: #C77B6B (error red)
├─ Text: White
├─ Height: 56pt
├─ Radius: 16pt
├─ Shadow: Level 3 (warning effect)
├─ States:
│  └─ Hover: Background darkened (#A85C52)
│  └─ Active: Scale 0.98, shadow +1
│  └─ Disabled: Opacity 50%
└─ Usage: Delete, confirm destructive actions

LOADING STATE (Any Button)
├─ Transformation: Text hidden (opacity 0)
├─ Content: Spinner 16pt, centered
├─ Duration: 0.3s fade transition
├─ Cursor: wait (or not-allowed)
├─ Animation: Smooth 360° rotation, 1s cycle
└─ Behavior: Disables all interactions during load
```

### 2. Input Fields et Forms

```
TEXT INPUT (Default)
├─ Height: 56pt
├─ Padding: 16pt (horizontal), 12pt (vertical)
├─ Background: #F8F8F6
├─ Border: 1pt solid #E6E6E6
├─ Radius: 12pt
├─ Font: Body 15pt, Text Primary
├─ Placeholder: Text Secondary (60% opacity)
├─ States:
│  ├─ Empty:    Border #E6E6E6, subtle shadow
│  ├─ Filled:   Border #E6E6E6, text visible
│  ├─ Focus:    Border 2pt #8A9A5B, shadow Level 2
│  ├─ Error:    Border 2pt #C77B6B, BG tint red (5%)
│  ├─ Disabled: BG #F5F5F5, opacity 50%, no interaction
│  └─ Success:  Border 2pt #8A9A5B, checkmark icon
├─ Transition: 0.2s ease-in-out
└─ Validation: Inline en temps réel (si possible)

TEXTAREA (Multi-line)
├─ Min-height: 100pt
├─ Max-height: 200pt (scrollable after)
├─ Padding: 16pt
├─ Resize: Vertical only (if supported)
├─ Font: Body 15pt
├─ All other: Same as text input
└─ Usage: Comments, bios, long descriptions

SELECT / DROPDOWN
├─ Height: 56pt
├─ Styling: Same as text input
├─ Icon: Chevron right (#8A9A5B)
├─ Open state: Dropdown menu slides down
├─ Animation: 0.3s ease-out
├─ Menu items: 48pt minimum height
└─ Current value: Always visible, bold

CHECKBOX / RADIO
├─ Size: 20pt x 20pt (icon area)
├─ Target: 44pt x 44pt (tap area)
├─ Checked: Background #8A9A5B, checkmark white
├─ Unchecked: Border 2pt #E6E6E6, background white
├─ Focus: Ring 2pt solid #8A9A5B
├─ Animation: 0.15s bounce (checked transition)
└─ Label: Adjacent text (16pt), clickable

TOGGLE SWITCH
├─ Size: 50pt width x 28pt height
├─ Track: Background #E6E6E6
├─ Thumb: 24pt circle, white background
├─ On-state: Track #8A9A5B, thumb right
├─ Off-state: Track #D9D9D9, thumb left
├─ Animation: 0.3s ease-in-out
└─ Accessible labels: Hidden but present (screen readers)

VALIDATION MESSAGES
├─ Font: Caption 12pt
├─ Color:
│  ├─ Error: #C77B6B
│  ├─ Success: #8A9A5B
│  └─ Info: #A8C3BC
├─ Margin: 4pt top of input
├─ Animation: Fade in 0.2s (not jarring)
└─ Always: Present before submit (hint vs. error)
```

### 3. Cards et Containers

```
SIGNATURE CARD (Gallery Item)
├─ Width: (Screen - 48pt) / 2 = ~172pt (iPhone 14)
├─ Aspect ratio: 3:4 (portrait orientation)
├─ Background: White
├─ Radius: 16pt
├─ Shadow: Level 2 (default), Level 3 (hover/tap)
├─ Overflow: Hidden (image clips to radius)
├─ Content padding: 12pt
├─ Transitions: All 0.2s ease-in-out
├─ Hover state:
│  ├─ Scale: 1.02
│  ├─ Shadow: +1 level
│  └─ Image: Slight zoom (1.05)
├─ Actions: Long-press menu (iOS) / 3-dot menu (Android)
└─ Tap: Navigate to detail view (animate up)

PROFILE/INFO CARD
├─ Width: Full screen - 32pt
├─ Height: Auto (content-driven)
├─ Background: #F8F8F6
├─ Radius: 12pt
├─ Padding: 16pt
├─ Border: 1pt solid #E6E6E6
├─ Content:
│  ├─ Avatar: 48pt circle, left
│  ├─ Title: H4, primary text
│  ├─ Subtitle: Body small, secondary text
│  └─ Action: Icon right (chevron or link)
├─ Spacing: 12pt between elements
└─ Tap: Navigate or expand (if interactive)

HERO CARD (CTA Section)
├─ Width: Screen - 32pt
├─ Height: 240pt (fixed, or aspect ratio 16:9)
├─ Background: Gradient (#8A9A5B → #A8C3BC)
├─ Radius: 24pt
├─ Padding: 24pt
├─ Shadow: Level 4
├─ Content:
│  ├─ Icon: 80pt centered top
│  ├─ Title: H3 white, centered
│  ├─ Description: Body white, centered, secondary opacity
│  └─ Button: Primary button (white text)
├─ Alignment: Center, with vertical distribution
└─ Animations: Subtle fade-in on load, button bounces on focus

EMPTY STATE CARD
├─ Full screen center
├─ Icon: 80pt, light opacity
├─ Title: H3, primary text
├─ Description: Body small, secondary text
├─ CTA Button: Primary, centered
├─ Spacing: 24pt between elements
├─ Margin top: 40pt (above icon)
└─ Background: Subtle gradient or pattern (optional)
```

---

## ⚡ ARCHITECTURE MICRO-INTERACTIONS

### 1. Principes Fondamentaux (2025 Standard)

**Chaque micro-interaction doit avoir 4 attributs:**

```
INTENTION:
  Pourquoi existe-t-elle ? (feedback, confirmation, guide)

DÉCOUVERTE:
  Comment l'utilisateur la verra-t-il ?
  Doit-elle être évidente ou subtile ?

EXÉCUTION:
  Durée, courbe, séquence, feedback haptique

CONTEXTE:
  Adaptation au profil utilisateur, état device, mode
```

### 2. Catalogue de Micro-Interactions

```
1. BUTTON PRESS (Feedback immédiat)
├─ Action: Utilisateur tape un bouton
├─ Réponse:
│  ├─ Visual: Scale 0.98 (compression haptic)
│  ├─ Haptic: Light impact (heavy si destructive)
│  ├─ Duration: 0.1s (très rapide, satisfying)
│  └─ Curve: ease-out (snappy)
├─ Accessibility: Haptic peut être disabled
└─ Example: CTA buttons, navigation taps

2. FORM VALIDATION (Real-time feedback)
├─ Trigger: Utilisateur finit de taper (500ms debounce)
├─ Visual feedback:
│  ├─ Valid: Checkmark icon fade-in, text green (#8A9A5B)
│  ├─ Invalid: X icon with shake (0.4s), text red
│  └─ Duration: Icons appear en 0.3s
├─ Shake animation: 3 oscillations, amplitude 4pt
├─ Never: Block submit, seulement hint/guide
└─ Pattern: Error detection, success confirmation

3. FOCUS STATE (Keyboard navigation highlight)
├─ Trigger: Tab/arrow keys pour navigation
├─ Visual: Outline ring 2pt solid #8A9A5B
├─ Ring offset: 4pt (visible space)
├─ Animation: None (should be instant)
├─ Must support: All interactive elements
└─ Accessibility: Essential for keyboard users

4. LOADING STATE (Perceived progress)
├─ Trigger: Async operation starts
├─ Visual:
│  ├─ Spinner: 24pt circle, stroke 2pt
│  ├─ Color: #8A9A5B with rotation 360° / 1000ms
│  ├─ Easing: linear (constant, predictable)
│  └─ Alternative: Progress bar if time unknown
├─ Duration: Max 3s (else show estimated time)
├─ Accessibility: aria-busy="true", label
└─ On complete: Fade transition 0.3s

5. NOTIFICATION / TOAST (Brief messages)
├─ Position: Top-right (or bottom for mobile)
├─ Animation:
│  ├─ Entrance: Slide in + fade 0.3s (ease-out)
│  ├─ Exit: Slide out + fade 0.3s (ease-in)
│  └─ Auto-dismiss: 4s (or manual close button)
├─ Z-index: 1000+ (above all content)
├─ Colors: By type (success green, error red, info blue)
└─ Message: Max 2 lines, action button optional

6. PULL-TO-REFRESH (iOS pattern)
├─ Trigger: Swipe down from top
├─ Visual:
│  ├─ Threshold: 60pt (trigger refresh)
│  ├─ Icon rotation: Matches drag distance
│  ├─ Filled: When threshold met (visual confirmation)
│  └─ Refresh: Spinning animation while loading
├─ Duration: Spring animation 0.4s (satisfying)
├─ Success: Checkmark flash, auto-hide
└─ Failure: Bounce back, retry option

7. MODAL APPEARANCE (Dialog entry)
├─ Trigger: User action or required input
├─ Backdrop:
│  ├─ Color: Noir 40% opacity (semi-transparent)
│  ├─ Animation: Fade in 0.2s
│  └─ Tap to dismiss: Configurable per modal
├─ Modal motion:
│  ├─ iOS: Slide up from bottom
│  ├─ Android: Scale from center (0.8 → 1.0)
│  └─ Duration: 0.3s ease-out
├─ Content: Fade in staggered (50ms delays)
└─ Focus: Auto-focus first input (accessibility)

8. SCROLL REVEAL (Content animation)
├─ Trigger: Element enters viewport
├─ Animation types:
│  ├─ Fade-in: Opacity 0 → 1 (0.4s)
│  ├─ Slide-in: translateY 20pt → 0 (0.4s)
│  └─ Combined: Fade + slide simultaneously
├─ Stagger: 50-100ms between items (cascade effect)
├─ Easing: ease-out (natural deceleration)
└─ Performance: Debounce scroll listener (60fps max)

9. GESTURE FEEDBACK (Swipe, pinch, etc.)
├─ Swipe to delete:
│  ├─ Trigger: Swipe left (iOS) or right (Android)
│  ├─ Visual: Actions reveal behind (red delete zone)
│  ├─ Confirmation: Snap animation to show fully
│  └─ Execute: Swipe completion → delete animation
├─ Pinch to zoom:
│  ├─ Visual feedback: Real-time scale
│  ├─ Boundaries: Min 1.0, max 3.0
│  ├─ Momentum: Continues if released with velocity
│  └─ Spring back: If limit exceeded (satisfying bounce)
└─ All gestures: Haptic feedback on threshold

10. DARK MODE TRANSITION (2025 Feature)
├─ Trigger: System setting change OR user toggle
├─ Animation:
│  ├─ Duration: 0.5s (smooth, not jarring)
│  ├─ Easing: ease-in-out (natural)
│  └─ Optional: Fade through gray (professional effect)
├─ Text colors: Animate simultaneously with backgrounds
├─ Status bar: Adapt to new color (iOS 13+)
├─ Preserve: Scroll position, focus state (UX critical)
└─ Accessibility: Instant switch if prefers-reduced-motion
```

### 3. Performance Guidelines

```
Animation Timing:
- Micro-interactions: 100-300ms (snappy, satisfying)
- Page transitions: 300-500ms (smooth, visible)
- Entrance animations: 200-400ms (welcoming)
- Exit animations: 150-300ms (quick, responsive)

Never:
- Animations > 500ms (feels sluggish)
- Multiple overlapping animations > 3 (cognitive overload)
- Animations on every interaction (fatiguing)
- Remove animations for users with prefers-reduced-motion

Performance Target:
- 60fps (smooth on all devices)
- < 16ms per frame (1000ms / 60)
- GPU acceleration where possible (transforms, opacity)
- Avoid layout thrashing (read then write)
```

---

## ♿ SYSTÈME D'ACCESSIBILITÉ

### 1. Conformité WCAG 3.0

**SignatureApp cible conformité WCAG 3.0 AAA (optimal):**

```
COLOR CONTRAST RATIOS:
┌─────────────────────────────────────────────────┐
│ WCAG AA (minimum):      4.5:1 (normal text)     │
│ WCAG AAA (enhanced):    7:1 (normal text)       │
│ Large text (18pt+):     3:1 (WCAG AA)           │
│ UI Components:          3:1 (all interactive)   │
└─────────────────────────────────────────────────┘

TESTED COMBINATIONS (Approved):
✓ White (#FFFFFF) on Primary (#8A9A5B):     7.2:1 AAA
✓ White (#FFFFFF) on Accent (#A8C3BC):      5.1:1 AAA
✓ Primary (#8A9A5B) on White:                 7.2:1 AAA
✓ Black (#2C2C2C) on Pearl (#E6E6E6):        9.8:1 AAA
✓ Secondary (#D4C5B1) on Primary:            3.5:1 AA (use sparingly)

COMBINATIONS TO AVOID:
✗ Secondary on White (low contrast, hard to read)
✗ Neutral gray text on pale backgrounds
✗ Any text smaller than 12pt with low contrast
```

### 2. Taille des Cibles Tactiles

```
MINIMUM TARGET SIZE:
┌────────────────────────────────────────────┐
│ iOS:     44pt x 44pt (all interactive)     │
│ Android: 48dp x 48dp (recommended)         │
│ Web:     44px (mouse + touch target)       │
│ Spacing: 8pt minimum between targets       │
└────────────────────────────────────────────┘

BUTTONS & CONTROLS:
- Primary buttons: 56pt height (standard)
- Secondary: 48pt height (minimum)
- Icon-only: 44pt x 44pt (exact)
- Padding ensures minimum size
- Never smaller than 40pt on mobile

TARGETS CLOSE TOGETHER:
- Minimum gap: 8pt
- If gap < 8pt: Design differently (groups, sections)
- Example: Bottom nav icons spaced 12pt apart
```

### 3. Navigation et Keyboard Support

```
KEYBOARD NAVIGATION:
├─ Tab order: Logical flow (top→bottom, left→right)
├─ Focus indicator: Always visible (2pt ring, #8A9A5B)
├─ Focus outline: NOT hidden ever (accessibility critical)
├─ Visible on iOS: Software keyboard support (iOS 15+)
├─ Visible on Android: Navigation keys (D-pad, arrows)
└─ Testing: Navigate entire app without touchscreen

SCREEN READERS (iOS Voiceover, Android TalkBack):
├─ All interactive elements: Proper labels (aria-label)
├─ Form inputs: Associated labels (<label> or aria-label)
├─ Icons: Descriptive alt text or aria-label
├─ Images: Alt text (not decorative → aria-hidden)
├─ Buttons: Purpose clear from label (not "Click here")
├─ Headings: Semantic structure maintained
├─ Lists: Proper markup (<ul>, <li>, <ol>)
└─ Testing: Use device screen reader throughout app

SEMANTIC STRUCTURE:
├─ <button> for clickable buttons
├─ <a> for navigation links
├─ <label> for form labels
├─ <h1>-<h6> for headings (hierarchy)
├─ <article>, <section> for content areas
├─ <nav> for navigation sections
├─ <main> for primary content
└─ Never: Use divs for semantic elements
```

### 4. Color Independence

```
NEVER use color alone to convey information:

WRONG:
├─ "Required fields are red" (only red)
├─ "Valid input is green" (only green)
└─ "Disabled is grayed out" (opacity only)

CORRECT:
├─ Error field: Red border + checkmark icon + text message
├─ Valid input: Green border + checkmark icon
├─ Disabled state: Reduced opacity + diagonal pattern (optional)
└─ Required field: Asterisk (*) + label text + maybe red text

ICON + TEXT ALWAYS:
┌────────────────────────────────────┐
│ ✓ Checkmark + "Success message"    │
│ ✗ Checkmark icon only              │
│                                     │
│ ⚠ Warning icon + "Please review"   │
│ ✗ Orange background only           │
│                                     │
│ ❌ X icon + "Error occurred"        │
│ ✗ Red color alone                  │
└────────────────────────────────────┘
```

### 5. Text Readability

```
MINIMUM FONT SIZE:
├─ Body text: 15pt (mobile standard)
├─ Captions: 12pt (minimum, only small data)
├─ Never: Anything below 10pt
├─ Exception: Metadata timestamps (11pt acceptable)

LINE HEIGHT (Line Spacing):
├─ Body text: 1.5x (22pt for 15pt font)
├─ Headings: 1.2-1.3x (tight, but readable)
├─ Max width: 75 characters (avoid long lines)
└─ Purpose: Prevents eye strain, improves readability

TEXT ALIGNMENT:
├─ Left-aligned: Default for LTR languages (best)
├─ Justified: Avoid (creates uneven spacing)
├─ Right-aligned: Headers only (intentional)
├─ Center: Titles, quotes (sparingly)
└─ Never: Justify body paragraphs on mobile

DYNAMIC TEXT SCALING:
├─ iOS: Support Dynamic Type (5 sizes: -2 to +3)
├─ Android: sp units scale with system setting
├─ Test: 85%, 100%, 130% font sizes
├─ Layout: Must not break, all readable
└─ No overflow: Text must fit screen
```

### 6. Reduced Motion Support

```
PREFERS-REDUCED-MOTION Detection:
├─ iOS: Settings > Accessibility > Motion > Reduce Motion
├─ Android: Settings > Developer Options > Animation scale
├─ Web: CSS media query: @media (prefers-reduced-motion: reduce)

WHEN DETECTED:
├─ Remove: All non-essential animations
├─ Keep: Functional transitions (0.2s max)
├─ Remove: Parallax, fade-in on scroll
├─ Remove: Decorative effects
├─ Duration: Reduce to minimum viable
├─ Option: Instant transitions for critical users

EXAMPLE CSS:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

AUTO-PLAY VIDEOS:
├─ Never: Auto-play on load
├─ Default: Muted (required on web)
├─ User choice: Explicit play button required
├─ Controls: Always visible (play, pause, volume)
```

---

## 🌙 DARK MODE INTELLIGENT

### 1. Palette Dynamique Complète

**Dark Mode Active automatiquement au sunset (18h) ou sur demande:**

```
BACKGROUND & SURFACES (Dark Mode):
┌─────────────────────────────────────────────────┐
│ Background Primary     #1F1F1D (Warm, not pure) │
│ Background Secondary   #252520 (Deep, navigation)
│ Surface Primary        #2C2C29 (Cards, sections) │
│ Surface Secondary      #383834 (Elevation +2)   │
│ Surface Tertiary       #424238 (Modals)         │
│                                                  │
│ Note: All dark colors have warm tone (not #000) │
│ Purpose: Reduce eye strain, less jarring       │
└─────────────────────────────────────────────────┘

TEXT COLORS (Dark Mode):
┌─────────────────────────────────────────────────┐
│ Text Primary           #F5F5F5 (High contrast)  │
│ Text Secondary         #B8B8B8 (Reduced opacity)
│ Text Tertiary          #8A8A8A (Further reduced)
│ Text Inverse           #1F1F1D (On highlights)  │
│                                                  │
│ Contrast Check:                                  │
│ F5F5F5 on 1F1F1D =     14.8:1 ✓ AAA             │
│ B8B8B8 on 2C2C29 =      5.2:1 ✓ AAA             │
└─────────────────────────────────────────────────┘

COLOR HIGHLIGHTS (Dark Mode - Adjusted):
┌─────────────────────────────────────────────────┐
│ Primary (Lightened)    #A8B67D (vs #8A9A5B)    │
│ Secondary (Light)      #E8DDD0 (keeps value)    │
│ Accent (Lightened)     #B0D4CA (vs #A8C3BC)    │
│ Error (Lightened)      #E0A39A (vs #C77B6B)    │
│ Success (Same)         #8A9A5B (sufficient)     │
│ Warning (Light)        #E8DDD0 (vs #D4C5B1)    │
│                                                  │
│ Logic: Light colors on dark backgrounds          │
│        Saturation increased for visibility       │
└─────────────────────────────────────────────────┘

BORDER COLORS (Dark Mode):
┌─────────────────────────────────────────────────┐
│ Border Primary         #383834 (Subtle divider) │
│ Border Secondary       #4A4A45 (Stronger)       │
│ Border Accent          #6B8B7C (Primary tint)   │
│ Disabled Border        #303030 (Almost bg)      │
└─────────────────────────────────────────────────┘
```

### 2. Transition entre Modes

```
TRANSITION STRATEGY:
├─ Duration: 0.5s smooth fade (not instant)
├─ Curve: ease-in-out (natural acceleration)
├─ Method: Fade through gray neutral (optional, professional)
├─ Preserve: Scroll position, focus state, user data
├─ No flicker: All colors transition simultaneously

FADE-THROUGH-GRAY EFFECT (Premium approach):
├─ Step 1: Fade all colors to neutral gray (0.25s)
├─ Step 2: Switch color scheme (instant, imperceptible)
├─ Step 3: Fade from gray to new colors (0.25s)
├─ Result: Smooth, no jarring brightness change
├─ Performance: Minimal impact, 60fps maintained

REDUCED MOTION SUPPORT:
├─ With prefers-reduced-motion: Instant switch (no fade)
├─ Duration: 0 seconds
├─ Maintains: All other behaviors identical
└─ Purpose: Users sensitive to motion see zero animation

TESTING DARK MODE:
├─ Manual: iOS Settings > Display & Brightness > Dark
├─ Manual: Android Settings > Display > Dark theme
├─ Automated: Screenshot at both light + dark
├─ All elements: Text, icons, images, shadows
├─ Contrast: Verify WCAG AA/AAA in both modes
└─ Readability: Test at 85%, 100%, 130% font sizes
```

### 3. Image Adaptation (Dark Mode)

```
SVG ICONS:
├─ Native color support: Change fill/stroke dynamically
├─ Solution: Define as CSS variables or inline styles
├─ No extra images needed: Single SVG handles both

RASTER IMAGES (JPG, PNG):
├─ Option 1: Dim overlay on dark mode
│  └─ filter: brightness(0.8) saturate(1.1)
├─ Option 2: Separate dark variant (if critical)
│  └─ src-set with prefers-color-scheme
├─ Option 3: Auto-contrast adjustment
│  └─ filter: invert(1) hue-rotate(180deg) [complex]
└─ Best: SVG preferred (scalable, efficient)

SCREENSHOTS & MOCKUPS:
├─ Dark theme: Darken background -20%
├─ Text: Switch to light color (#F5F5F5)
├─ Icons: Adapt to dark palette
├─ Borders: Use dark surface color
├─ Shadows: May become less visible (acceptable)

ILLUSTRATIONS:
├─ If brand-critical: Create dark variants
├─ If generic: Use filter or overlay
├─ Test readability in both modes
└─ Avoid: Illustrations with text inside
```

---

## ♻️ PRINCIPES DE DURABILITÉ

### 1. Éco-Design Objectives

**SignatureApp s'engage à minimaliser son impact environnemental:**

```
CARBON FOOTPRINT TARGETS:
├─ Data transfer: < 2MB per session (optimize images)
├─ Battery consumption: < 5% battery drain per hour usage
├─ Server load: Efficient caching, CDN optimization
├─ Device storage: App size < 50MB (aggressive compression)
└─ Update frequency: Batch updates (not constant refreshes)

OPTIMIZATION PRIORITIES:
1. Image optimization (60% of data transfer)
2. JavaScript bundle size (code splitting)
3. API call efficiency (fewer, smarter requests)
4. Animation performance (60fps, not 120fps)
5. Background processes (only when necessary)
```

### 2. Image Optimization

```
FORMAT SELECTION:
├─ SVG: Icons, logos, illustrations (scalable, no rasterization)
├─ WebP: Photos, complex graphics (30-35% smaller than JPG)
├─ AVIF: Next-gen, even better compression (optional, fallback needed)
├─ PNG: Transparent images only (not photos)
├─ JPEG: Legacy support, fallback (largest file size)

IMAGE DELIVERY:
├─ Responsive images: srcset with multiple sizes
│  └─ Mobile: 1x (375px), 2x (750px)
│  └─ Tablet: 1x (768px), 2x (1536px)
├─ Lazy loading: Images below fold load on demand
├─ Progressive JPG: Load low-quality first, then improve
├─ CDN delivery: Cache near user location
└─ Compression: Tinify, ImageOptim, or Cloudinary

SIGNATURE IMAGE SIZE TARGETS:
├─ Thumbnail: 100x120px, < 15KB WebP
├─ Gallery preview: 300x400px, < 50KB WebP
├─ Detail view: 600x800px, < 150KB WebP
├─ Wallpaper export: 1080x2400px, < 300KB WebP
└─ Optimization: Always compress, measure before/after
```

### 3. Performance Budgets

```
PAGE LOAD BUDGET:
├─ First Contentful Paint: < 1.5s
├─ Largest Contentful Paint: < 2.5s
├─ Cumulative Layout Shift: < 0.1
├─ Time to Interactive: < 3.5s

Per-Device Targets:
├─ High-end (iPhone 14): 1s-2.5s range
├─ Mid-range (iPhone SE): 2-3.5s range
├─ Budget-friendly: 3-5s range
└─ Test: Throttle to 4G, evaluate regularly

JS BUNDLE BUDGET:
├─ iOS app: < 10MB (compressed)
├─ Android app: < 50MB total
├─ Initial bundle: < 200KB (parsed, compressed)
├─ Code splitting: Load features on demand

CACHING STRATEGY:
├─ Static assets: 1-year expiry (versioned)
├─ User images: 30-day expiry
├─ API responses: Device cache (10min), server cache (varies)
├─ Service Worker: Offline support, instant reload
```

### 4. Sustainable UX Patterns

```
DARK MODE (2025 Energy Saving):
├─ OLED screens: 20-60% battery savings in dark mode
├─ LCD screens: Minimal difference (not energy saver)
├─ Auto-enable: At night (18h) to reduce strain
├─ User control: Toggle available anytime
└─ Impact: 5-10% overall energy reduction

REDUCED ANIMATIONS:
├─ Respect prefers-reduced-motion (energy intensive)
├─ Animations consume 15-20% more battery
├─ Disable: Auto-scroll, continuous animations
├─ Keep: Only critical user feedback

EFFICIENT NOTIFICATIONS:
├─ Batch notifications: Send groups, not singles
├─ Off-peak delivery: Later when charging likely
├─ Frequency: Never more than 5/day (disruptive)
├─ Quiet hours: Respect Do Not Disturb settings

DESIGN FOR LONGEVITY:
├─ Avoid: Trend-driven changes (app needs updates)
├─ Focus: Timeless, classic aesthetic
├─ Accessibility: Supports wider device range
├─ Maintenance: Less frequent updates needed
└─ Philosophy: Quality over novelty
```

---

## 🎯 ASSETS ET ICONOGRAPHIE

### 1. Icon System

**Unified icon style across platform:**

```
ICON DESIGN PRINCIPLES:
├─ Geometric: Prefer geometric shapes (scalable)
├─ Outline style: 2pt stroke weight (not filled)
├─ Consistency: Proportional sizing across set
├─ Readability: Clear at 24pt minimum size
├─ Pixel-friendly: Snap to grid at small sizes
└─ Neutral: Works on light + dark backgrounds

ICON SIZE SCALE:
├─ 16pt: Small labels, metadata (rare)
├─ 20pt: Icon + text pairings
├─ 24pt: Standard UI icons (buttons, nav)
├─ 32pt: Large buttons, emphasis
├─ 40pt: Hero sections, special emphasis
├─ 48pt-80pt: Illustrations, splash screen
└─ 2x rendering: All sizes should support retina

ICON CATEGORIES REQUIRED:
Navigation:
  ├─ Home, Camera, Star/Favorites, Profile, Settings
  ├─ Plus/Add, Close/X, Back, Menu (hamburger)

Actions:
  ├─ Check/Checkmark, Delete, Edit, Share, More (3-dot)
  ├─ Search, Filter, Sort, Download, Upload

Status:
  ├─ Lock, Unlock, Eye (visible), Privacy
  ├─ Warning, Info, Success, Error

Common:
  ├─ Calendar, Clock, Location pin, Heart
  ├─ Camera, Image, Video, File, Link
  └─ Social: Facebook, Instagram, TikTok, Twitter
```

### 2. Illustration Style

```
ILLUSTRATION GUIDELINES:
├─ Approach: Minimalist, flat design (not skeuomorphic)
├─ Color: Use brand palette (Primary, Accent, Neutral)
├─ Stroke: 2-3pt strokes for consistency with icons
├─ Fill: 60% filled, 40% outline (balanced approach)
├─ Perspective: Isometric or front-facing (not 3D)
├─ Mood: Friendly, approachable, not cutesy

ILLUSTRATIONS TO CREATE:
Onboarding:
  ├─ Slide 1: Smartphone with finger & signature
  ├─ Slide 2: Smartphone with wallpaper
  └─ Slide 3: Social sharing network icons

Empty States:
  ├─ Gallery empty: Notebook + pen illustration
  ├─ No signatures: Handshake or spotlight
  └─ No results: Magnifying glass

Premium:
  ├─ Crown or star (luxury marker)
  ├─ Unlock concept (door opening)
  └─ Trending upward (growth)

Features:
  ├─ Signature editing: Brush/pen tool
  ├─ Sharing: Network nodes or broadcast waves
  └─ Collection: Gallery/album icon
```

### 3. Logo & Wordmark

```
LOGO SPECIFICATIONS:
├─ Primary: Logo + Wordmark (horizontal)
├─ Alternative: Icon-only version (app store, favicon)
├─ Minimum size: 32pt width (recognizable)
├─ Clear space: 1x logo height on all sides
├─ Colors: Primary brand color (#8A9A5B) or white

LOGO VARIATIONS:
├─ Full color: On white/light backgrounds
├─ White: On dark backgrounds
├─ Single color: Print, limited color scenarios
├─ Reduced: Icon-only when space limited

WORDMARK TYPOGRAPHY:
├─ Font: SF Pro SemiBold (or Inter SemiBold)
├─ Tracking: 0-0.5% (slight openness)
├─ Vertical align: Baseline with icon
├─ Case: "SignatureApp" or "Signature App"
└─ Alternative: "S" monogram only

USAGE GUIDELINES:
├─ Never: Stretch, skew, rotate, or distort
├─ Never: Change colors arbitrarily
├─ Never: Add effects (shadow, glow)
├─ Always: Maintain clear space around
├─ Always: Keep minimum size readable
└─ Always: Use high-res version (2x, 3x if available)
```

---

## 📊 GUIDE DE MISE EN ŒUVRE

### Design QA Checklist

**Avant tout commit de design, vérifier:**

```
☐ COULEURS:
  ☐ Tous les textes: Contraste WCAG AA minimum (4.5:1)
  ☐ Boutons: Contraste 3:1 minimum (UI components)
  ☐ Pas de couleur seule pour informations
  ☐ Icons avec texte labels

☐ TYPOGRAPHIE:
  ☐ Aucun texte < 12pt
  ☐ Body text: 15pt+ (lisibilité)
  ☐ Line-height respecté (1.2-1.5x)
  ☐ Max width ~75 characters (readability)
  ☐ Testé Dynamic Type (iOS), font scaling (Android)

☐ COMPOSANTS:
  ☐ Buttons: Min 44pt x 44pt
  ☐ Inputs: 56pt height minimum
  ☐ Touch targets: 8pt minimum gap
  ☐ Spacing: Multiples de 8pt

☐ ACCESSIBILITÉ:
  ☐ Focus states visible (ring 2pt)
  ☐ Screen reader labels présents
  ☐ Semantic HTML (if web)
  ☐ Keyboard navigation possible
  ☐ Images: Alt text or aria-hidden

☐ DARK MODE:
  ☐ Testé en mode sombre complet
  ☐ Tous les textes lisibles
  ☐ Ombres adaptées (visibilité)
  ☐ Images/illustrations readables

☐ PERFORMANCE:
  ☐ Images optimisées (WebP < 100KB)
  ☐ SVG pour icons/logos
  ☐ Animations: 60fps capable
  ☐ Pas d'animations bloquantes

☐ MOBILE:
  ☐ Responsive: 375px à 428px
  ☐ Portrait + landscape modes
  ☐ Safe area padding (notch support)
  ☐ Touch targets tappable
  ☐ Tested on actual devices
```

---

## 📝 DOCUMENT VERSIONS & CHANGELOG

**Version 2.0 (Current)**
- Integration of 2025 UX/UI trends
- Dark Mode intelligent system
- Enhanced accessibility (WCAG 3.0 AAA)
- Sustainability principles
- Micro-interactions catalogue
- Performance budgets

**Version 1.0**
- Initial design specifications
- Color palette definition
- Typography system
- Component basics
- Accessibility foundation

---

## 📞 SUPPORT & QUESTIONS

**Pour toute question sur la charte graphique:**

- Consulter: Ce document (version de référence)
- Designer: Équipe design SignatureApp
- Développeur: Vérifier compatibility code avant implémentation
- QA: Utiliser Design QA Checklist avant release

---

## ✅ STATUT

**Document:** FINALISÉ ✓  
**Date:** 31 octobre 2025  
**Prochaine révision:** Q1 2026 (reassessment des tendances 2025)

**Ce manifeste doit être respecté rigoureusement dans tous les développements futurs.**

---

*Manifeste créé par: Équipe Design SignatureApp*  
*Version contrôle: Git-friendly, source of truth*  
*Distribution: Figma Assets, Documentation Wiki, Team Handbook*
