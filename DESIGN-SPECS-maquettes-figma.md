# Spécifications de Design - Maquettes Figma
## Plateforme d'Autographes Numériques

**Version:** 1.0  
**Date:** 26 octobre 2025  
**Écrans:** 8 écrans principaux  
**Plateformes:** iOS + Android

---

## 📐 Spécifications Générales

### Dimensions des Artboards
- **iPhone 14 Pro** : 393 x 852 pt (référence iOS)
- **Pixel 7** : 412 x 915 dp (référence Android)
- **Grille** : 8pt grid system
- **Marges** : 16pt (gauche/droite), 24pt (top)

### Palette de Couleurs

#### Couleurs Principales (Harmonie Naturelle & Élégante)
```
Primary (Vert sauge moderne) : #8A9A5B
Primary Dark : #6B7A3F
Primary Light : #A8B67D

Secondary (Beige chaleureux) : #D4C5B1
Secondary Dark : #B8A490
Secondary Light : #E8DDD0

Accent (Vert d'eau) : #A8C3BC
Accent Dark : #8AA89F
Accent Light : #C5DDD7

Gris Perle : #E6E6E6
```

#### Couleurs Neutres
```
Background : #FFFFFF
Background Dark : #2C2C2C
Surface : #F8F8F6
Surface Dark : #3A3A36

Text Primary : #2C2C2C
Text Secondary : #6B7A3F
Text Disabled : #C4C4C4

Border : #E6E6E6
Border Dark : #8A9A5B
```

#### Couleurs Système
```
Success : #8A9A5B (utilise le Primary)
Warning : #D4C5B1 (utilise le Secondary)
Error : #C77B6B
Info : #A8C3BC (utilise l'Accent)
```

### Typographie

#### Famille de Police
- **Primary** : SF Pro (iOS) / Roboto (Android)
- **Alternative** : Inter (cross-platform)

#### Échelle Typographique
```
H1 (Hero) : 32pt / Bold / Line height 40pt
H2 (Title) : 24pt / SemiBold / Line height 32pt
H3 (Subtitle) : 20pt / SemiBold / Line height 28pt
H4 (Section) : 18pt / Medium / Line height 24pt

Body Large : 17pt / Regular / Line height 24pt
Body : 15pt / Regular / Line height 22pt
Body Small : 13pt / Regular / Line height 18pt

Caption : 12pt / Regular / Line height 16pt
Button : 16pt / SemiBold / Line height 24pt
```

### Composants Réutilisables

#### Boutons
```
Primary Button:
- Height: 56pt
- Padding: 16pt horizontal
- Border radius: 16pt
- Background: Primary gradient (#7C3AED → #EC4899)
- Text: White / Button style
- Shadow: 0px 4px 12px rgba(124, 58, 237, 0.3)

Secondary Button:
- Height: 48pt
- Padding: 16pt horizontal
- Border radius: 12pt
- Background: Surface
- Text: Primary / Button style
- Border: 2pt solid Border

Ghost Button:
- Height: 44pt
- Padding: 12pt horizontal
- Border radius: 8pt
- Background: Transparent
- Text: Primary / Button style
```

#### Input Fields
```
Text Input:
- Height: 56pt
- Padding: 16pt
- Border radius: 12pt
- Background: Surface
- Border: 1pt solid Border (focus: 2pt solid Primary)
- Placeholder: Text Secondary
```

#### Cards
```
Signature Card:
- Width: (Screen width - 48pt) / 2
- Aspect ratio: 3:4
- Border radius: 16pt
- Background: White
- Shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
- Padding: 12pt
```

---

## 🎨 Écrans Principaux

### 1. Onboarding (3 Slides)

#### Wireframe Slide 1
```
┌─────────────────────────────────────┐
│                                     │
│        [Skip] ─────────────────────│
│                                     │
│          🎨 [Illustration]          │
│       (Smartphone + Signature)      │
│                                     │
│                                     │
│        Capture des signatures       │
│        authentiques en direct       │
│                                     │
│    Ta star signe directement sur    │
│    ton écran avec son doigt         │
│                                     │
│                                     │
│         ⚪ ⚪ ⚪                     │
│                                     │
│      [Suivant ──────────────>]      │
│                                     │
└─────────────────────────────────────┘
```

**Spécifications:**
- **Illustration** : 300pt x 300pt, centrée
- **Title (H1)** : 32pt Bold, Text Primary, centered, max 2 lignes
- **Description (Body)** : 17pt Regular, Text Secondary, centered, max 3 lignes
- **Pagination** : Dots 8pt, espacement 8pt
- **Bouton "Suivant"** : Primary Button, width 100%

#### Slide 2 : "Crée des fonds d'écran"
- Illustration : Mockup de smartphone avec fond d'écran de signature
- Titre : "Transforme en fond d'écran unique"
- Description : "Choisis parmi 20+ templates et personnalise avec tes couleurs"

#### Slide 3 : "Partage avec le monde"
- Illustration : Icônes réseaux sociaux + mockup partage
- Titre : "Partage ta rencontre magique"
- Description : "Montre ta collection à tes amis sur Instagram, TikTok, Twitter..."
- Bouton : "Commencer" (au lieu de "Suivant")

---

### 2. Home Screen (Point d'Entrée)

#### Wireframe
```
┌─────────────────────────────────────┐
│ [👤]  SignatureApp        [⚙️]     │
├─────────────────────────────────────┤
│                                     │
│         Salut Fred ! 👋             │
│                                     │
│    ┌───────────────────────────┐   │
│    │                           │   │
│    │    🎨 [Grande Icône]      │   │
│    │    Canvas de Signature    │   │
│    │                           │   │
│    │  [Nouvelle Signature ✨]  │   │
│    │                           │   │
│    └───────────────────────────┘   │
│                                     │
│         Ta Collection (12)          │
│    ┌─────────┐ ┌─────────┐         │
│    │ [Img1]  │ │ [Img2]  │         │
│    │ Beyoncé │ │ Messi   │         │
│    │ 20 Oct  │ │ 15 Oct  │         │
│    └─────────┘ └─────────┘         │
│    ┌─────────┐ ┌─────────┐         │
│    │ [Img3]  │ │ [Img4]  │         │
│    │ Adele   │ │ Neymar  │         │
│    └─────────┘ └─────────┘         │
│                                     │
│         [Voir tout →]               │
│                                     │
├─────────────────────────────────────┤
│  [🏠]  [📸]  [⭐]  [👤]           │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Height : 60pt
- Avatar : 32pt circle, left
- Logo/Title : 18pt SemiBold, centered
- Settings icon : 24pt, right
- Padding : 16pt horizontal

**Hero Card (CTA Principal):**
- Width : Screen width - 32pt
- Height : 240pt
- Border radius : 24pt
- Background : Primary gradient
- Shadow : 0px 8px 24px rgba(124, 58, 237, 0.4)
- Icon : 80pt x 80pt
- Button : Primary Button (blanc sur gradient)
- Margin bottom : 32pt

**Section "Ta Collection":**
- Title (H3) : 20pt SemiBold, margin bottom 16pt
- Grid : 2 colonnes, gap 16pt
- Card : (voir Composants réutilisables)
- Image aspect ratio : 3:4
- Nom célébrité : 15pt SemiBold, truncate 1 ligne
- Date : 13pt Regular, Text Secondary

**Bottom Navigation:**
- Height : 72pt (iOS) / 64pt (Android)
- Icons : 24pt
- Active color : Primary
- Inactive color : Text Secondary
- Labels : 11pt Regular

---

### 3. Canvas de Signature (ÉCRAN CORE ⭐)

#### Wireframe
```
┌─────────────────────────────────────┐
│ [←]      Nouvelle Signature         │
├─────────────────────────────────────┤
│                                     │
│                                     │
│                                     │
│                                     │
│       ┌─────────────────────┐       │
│       │                     │       │
│       │   [Zone Tactile]    │       │
│       │    Signature ici    │       │
│       │                     │       │
│       │                     │       │
│       │      \_______       │       │
│       │               \/    │       │
│       │                     │       │
│       └─────────────────────┘       │
│                                     │
│                                     │
│  Nom de la star                     │
│  [_________________________]        │
│                                     │
│  Couleur  ⚫ 🔵 🔴 ⚪               │
│                                     │
│  📍 Capturer le lieu [Toggle ON]   │
│                                     │
│  [🗑️ Effacer]    [✓ Valider]      │
│                                     │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Height : 56pt
- Back button : 24pt icon, left
- Title : 18pt SemiBold, centered
- Background : White (ou transparent)

**Zone Canvas:**
- Width : Screen width - 32pt
- Height : 400pt
- Background : White
- Border : 2pt dashed Border (quand vide)
- Border radius : 16pt
- Placeholder : "Signature ici" (centré, Text Secondary)
- Shadow : 0px 2px 8px rgba(0, 0, 0, 0.06)
- Margin : 24pt vertical

**Input "Nom de la star":**
- Label : 13pt Medium, Text Secondary, margin bottom 8pt
- Input : Text Input standard (voir Composants)
- Placeholder : "Ex: Beyoncé"
- Required : Oui (validation)

**Sélecteur de Couleur:**
- Label : 13pt Medium, Text Secondary
- Dots : 32pt circles, gap 12pt
- Colors : Noir #000000, Bleu #3B82F6, Rouge #EF4444, Blanc #FFFFFF (border noir 2pt)
- Selected : Border 3pt Primary + scale 1.1
- Layout : Horizontal scroll si nécessaire

**Toggle Géolocalisation:**
- Label : "Capturer le lieu" 15pt Regular
- Icon : 📍 20pt
- Toggle : iOS/Android native style
- Helper text : "Affichera la ville sur ton fond d'écran" (Caption, Text Secondary)

**Actions Buttons:**
- Layout : Horizontal, 2 colonnes, gap 12pt
- "Effacer" : Secondary Button, width 50% - 6pt
- "Valider" : Primary Button, width 50% - 6pt
- Margin top : 32pt

**États:**
1. **Vide** : Placeholder visible, border dashed
2. **En cours de signature** : Border disparaît, trace visible
3. **Signature complétée** : Border solid, preview visible

---

### 4. Éditeur de Fond d'Écran

#### Wireframe
```
┌─────────────────────────────────────┐
│ [←]    Créer Fond d'Écran      [💾] │
├─────────────────────────────────────┤
│                                     │
│      ┌─────────────────┐            │
│      │                 │            │
│      │  [Preview]      │            │
│      │  Mockup iPhone  │            │
│      │  avec Template  │            │
│      │  + Signature    │            │
│      │                 │            │
│      │  Signature Fred │            │
│      │  20 Oct 2025    │            │
│      │  Paris          │            │
│      │                 │            │
│      └─────────────────┘            │
│                                     │
│     ← Template 2/5 →                │
│     ⚪ ⚪ ● ⚪ ⚪                   │
│                                     │
├─────────────────────────────────────┤
│  🎨 Couleur de fond                 │
│  ┌───┬───┬───┬───┬───┬───┐         │
│  │ ● │   │   │   │   │ + │         │
│  └───┴───┴───┴───┴───┴───┘         │
│                                     │
│  📅 Afficher la date      [ON] ●    │
│  📍 Afficher le lieu      [ON] ●    │
│                                     │
├─────────────────────────────────────┤
│  [📥 Définir comme fond d'écran]    │
│  [💾 Enregistrer dans galerie]      │
│  [📤 Partager]                      │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Height : 56pt
- Back button : left
- Save icon : right (enregistrer config pour plus tard)
- Title : centered

**Preview Mockup:**
- Width : 180pt (proportions iPhone)
- Height : 360pt
- Border radius : 24pt (simule smartphone)
- Background : #111827 (simule bezel)
- Inner screen : Border radius 20pt
- Shadow : 0px 8px 24px rgba(0, 0, 0, 0.2)
- Position : Centrée, margin top 24pt

**Template Carousel:**
- Height : 40pt
- Arrows : 32pt circles, Background Surface, icon 20pt
- Pagination dots : 8pt, gap 8pt
- Spacing : 16pt entre arrows et dots

**Palette de Couleurs:**
- Label : 15pt SemiBold, margin bottom 12pt
- Swatches : 48pt x 48pt, border radius 12pt
- Gap : 12pt
- Selected : Border 3pt Primary
- "+ button" : Dashed border, ouvre color picker
- Layout : Horizontal scroll

**Toggles:**
- Row height : 48pt
- Label + icon : left, 15pt Regular
- Toggle : right
- Divider : 1pt Border entre les rows

**Action Buttons:**
- Spacing : 12pt vertical
- Width : 100%
- Order : 
  1. Primary action (Définir fond d'écran)
  2. Secondary action (Enregistrer)
  3. Ghost action (Partager)

---

### 5. Galerie de Signatures

#### Wireframe
```
┌─────────────────────────────────────┐
│  [👤]  Ma Collection (12)  [🔍]    │
├─────────────────────────────────────┤
│                                     │
│  Trier par: [Récent ▼]             │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │  [IMG]   │  │  [IMG]   │        │
│  │          │  │          │        │
│  │ Beyoncé  │  │  Messi   │        │
│  │ 20/10/25 │  │ 15/10/25 │        │
│  │ Paris    │  │ Barcelone│        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │  [IMG]   │  │  [IMG]   │        │
│  │          │  │          │        │
│  │  Adele   │  │  Neymar  │        │
│  │ 12/10/25 │  │ 08/10/25 │        │
│  │ Londres  │  │ Paris    │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │  [IMG]   │  │  [IMG]   │        │
│  │          │  │          │        │
│  │  Mbappe  │  │ Rihanna  │        │
│  │ 05/10/25 │  │ 01/10/25 │        │
│  └──────────┘  └──────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Height : 60pt
- Avatar : left
- Title + count : center (20pt SemiBold)
- Search icon : right

**Filtres/Tri:**
- Height : 40pt
- Dropdown : Secondary Button style
- Margin : 16pt vertical
- Options : Récent, Ancien, A-Z, Z-A

**Grid:**
- Columns : 2
- Gap : 16pt
- Padding : 16pt horizontal

**Card:**
- Aspect ratio : 3:4
- Border radius : 16pt
- Shadow : 0px 2px 8px rgba(0, 0, 0, 0.08)
- Image : Cover, aspect ratio 16:9
- Content padding : 12pt
- Nom : 15pt SemiBold, truncate 1 ligne
- Date : 13pt Regular, Text Secondary
- Lieu : 12pt Regular, Text Secondary, avec icône 📍

**État Vide:**
```
┌─────────────────────────────────────┐
│                                     │
│         🎨 [Illustration]           │
│                                     │
│     Aucune signature pour le        │
│            moment                   │
│                                     │
│  Rencontre une star et capture sa   │
│  signature pour commencer ta        │
│         collection !                │
│                                     │
│    [+ Nouvelle Signature]           │
│                                     │
└─────────────────────────────────────┘
```

---

### 6. Détail Signature

#### Wireframe
```
┌─────────────────────────────────────┐
│ [←]                            [⋮]  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │                             │   │
│  │      [Signature Image]      │   │
│  │        Full Screen          │   │
│  │                             │   │
│  │         \_______            │   │
│  │                 \/          │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Beyoncé                            │
│  ⭐⭐⭐⭐⭐                        │
│                                     │
│  📅 Capturé le 20 octobre 2025      │
│  📍 Paris, France                   │
│  🕐 18:30                            │
│                                     │
│  💬 "Rencontre incroyable après     │
│      son concert au Stade de        │
│      France !"                      │
│                                     │
├─────────────────────────────────────┤
│  [🎨 Créer un Fond d'Écran]         │
│  [📤 Partager la Signature]         │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Transparent overlay sur l'image
- Back button : White avec shadow
- Menu (⋮) : right, white avec shadow

**Signature Image:**
- Full width
- Height : 400pt
- Background : White
- Pinch to zoom : Enabled
- Border bottom : 1pt Border

**Info Section:**
- Padding : 24pt

**Nom Célébrité:**
- 28pt Bold, Text Primary
- Margin bottom : 8pt

**Rating (optionnel MVP):**
- Stars : 20pt, color Accent
- Spacing : 4pt
- Margin bottom : 16pt

**Métadonnées:**
- Icon + Text layout : Horizontal
- Icon : 20pt, color Primary
- Text : 15pt Regular, Text Secondary
- Spacing : 12pt entre chaque ligne
- Margin bottom : 24pt

**Note Personnelle (optionnel):**
- Icon 💬 : 20pt
- Text : 15pt Regular, Text Primary, italic
- Background : Surface
- Padding : 16pt
- Border radius : 12pt
- Max lines : 4 (expand on tap)

**Actions:**
- Primary button : "Créer un Fond d'Écran"
- Secondary button : "Partager"
- Margin : 12pt vertical

**Menu (⋮) Options:**
```
┌─────────────────────────┐
│ ✏️ Modifier la note     │
│ 🗑️ Supprimer           │
│ ⚠️ Signaler             │
└─────────────────────────┘
```

---

### 7. Connexion / Inscription

#### Wireframe (Connexion)
```
┌─────────────────────────────────────┐
│ [←]                                 │
│                                     │
│                                     │
│         [Logo App]                  │
│                                     │
│      Bienvenue ! 👋                 │
│   Connecte-toi pour sauvegarder     │
│       tes signatures                │
│                                     │
│  Email                              │
│  [_________________________]        │
│                                     │
│  Mot de passe                       │
│  [_________________________] [👁️]   │
│                                     │
│  [Mot de passe oublié ?]            │
│                                     │
│  [Se Connecter]                     │
│                                     │
│  ──────── ou ────────               │
│                                     │
│  [🍎 Continuer avec Apple]          │
│  [📧 Continuer avec Google]         │
│                                     │
│  Pas de compte ?                    │
│  [Inscris-toi]                      │
│                                     │
│  [Continuer sans compte]            │
│                                     │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Minimal, back button only
- Margin top : 24pt

**Logo:**
- Size : 80pt x 80pt
- Position : Centered
- Margin bottom : 32pt

**Title:**
- H2 : 24pt SemiBold
- Centered
- Margin bottom : 8pt

**Subtitle:**
- Body : 15pt Regular, Text Secondary
- Centered
- Margin bottom : 32pt

**Form Inputs:**
- Label : 13pt Medium, Text Secondary
- Input : Standard (voir Composants)
- Spacing : 16pt entre chaque input
- Password show/hide : Eye icon 20pt, right

**Forgot Password Link:**
- 13pt Regular, Primary color
- Align right
- Margin bottom : 24pt

**Primary Button:**
- "Se Connecter" : Primary Button
- Width : 100%
- Margin bottom : 24pt

**Divider:**
- Text : "ou" 13pt Regular, Text Secondary
- Lines : 1pt Border, flex
- Margin : 24pt vertical

**Social Buttons:**
- Height : 52pt
- Background : White
- Border : 1pt Border
- Icon : 24pt, left
- Text : 15pt SemiBold, centered
- Spacing : 12pt entre boutons
- Margin bottom : 32pt

**Footer Links:**
- Text : 15pt Regular, Text Secondary
- Link : Primary color, SemiBold
- Centered
- "Continuer sans compte" : Ghost button, margin top 16pt

#### Inscription (Variante)
- Mêmes composants
- Champs supplémentaires : "Prénom" (optionnel)
- Checkbox : "J'accepte les CGU et Politique de confidentialité"
- Button : "S'inscrire"
- Footer : "Déjà un compte ? [Se connecter]"

---

### 8. Premium / Paywall

#### Wireframe
```
┌─────────────────────────────────────┐
│ [×]                                 │
│                                     │
│         ⭐ [Illustration]            │
│                                     │
│     Passe en Premium et             │
│   débloque tout le potentiel        │
│                                     │
│  ✓ Signatures illimitées            │
│  ✓ 20+ templates exclusifs          │
│  ✓ Export HD sans watermark         │
│  ✓ Effets spéciaux avancés          │
│  ✓ Support prioritaire              │
│                                     │
├─────────────────────────────────────┤
│  ┌────────┐  ┌────────────────────┐ │
│  │ Mensuel│  │     Annuel         │ │
│  │        │  │   -30% 🔥          │ │
│  │ 2,99€  │  │   24,99€           │ │
│  │ /mois  │  │   /an              │ │
│  └────────┘  └────────────────────┘ │
│                                     │
│  [Essai Gratuit 7 Jours]            │
│                                     │
│  Puis 2,99€/mois. Annule quand      │
│  tu veux. Pas d'engagement.         │
│                                     │
│  [Restaurer les achats]             │
│                                     │
└─────────────────────────────────────┘
```

**Spécifications:**

**Header:**
- Close button (×) : top right, 32pt
- Margin : 16pt

**Illustration:**
- Size : 160pt x 160pt
- Centered
- Margin top : 40pt

**Title:**
- H2 : 24pt SemiBold
- Centered
- Margin : 24pt vertical

**Features List:**
- Icon : ✓ 20pt, color Success
- Text : 17pt Regular, Text Primary
- Layout : Vertical, left aligned
- Spacing : 16pt entre chaque item
- Margin bottom : 32pt

**Pricing Cards:**
- Layout : Horizontal, 2 cards, gap 12pt
- Card height : 140pt
- Border radius : 16pt
- Selected : Border 2pt Primary, background Primary light (5%)
- Unselected : Border 1pt Border, background Surface

**Card Content:**
- Badge "Populaire" / "Économise 30%" : top right, 10pt Bold, background Accent
- Label : 15pt SemiBold (Mensuel / Annuel)
- Price : 28pt Bold, Primary
- Period : 13pt Regular, Text Secondary

**CTA Button:**
- Primary Button
- Text : "Essai Gratuit 7 Jours" ou "Souscrire"
- Width : 100%
- Margin : 24pt vertical

**Legal Text:**
- 12pt Regular, Text Secondary
- Centered
- Max width : 300pt
- Margin bottom : 16pt

**Restore Link:**
- 13pt Regular, Primary color
- Centered
- Underlined

---

## 🎨 Templates de Fonds d'Écran (5 pour MVP)

### Template 1 : Minimaliste Blanc
```
┌─────────────────┐
│                 │
│                 │
│                 │
│   \_________    │
│            \/   │ ← Signature (noir)
│                 │
│                 │
│  Signé le       │ ← Texte (gris, petit)
│  20 Oct 2025    │
│  Paris          │
│                 │
└─────────────────┘
```
- Background : #FFFFFF
- Signature color : #000000
- Text : 14pt Regular, #6B7280
- Position signature : Centré vertical

---

### Template 2 : Élégant Noir
```
┌─────────────────┐
│████████████████ │
│████████████████ │
│████████████████ │
│████             │
│████ \_________  │ ← Signature (or)
│████        \/   │
│████             │
│████             │
│████ Signé le    │ ← Texte (gris clair)
│████ 20 Oct 2025 │
│████             │
└─────────────────┘
```
- Background : #111827
- Signature color : #FCD34D (or)
- Text : 14pt Regular, #D1D5DB
- Style : Luxe, premium

---

### Template 3 : Moderne Gradient
```
┌─────────────────┐
│ 🟣🟣🟣🟣🟣🟣🟣 │
│ 🟣🟣🟣🟣🟣🟣🟣 │ ← Gradient violet→rose
│ 🟣🟣🟣🟣🟣🟣🟣 │
│                 │
│   \_________    │ ← Signature (blanc)
│            \/   │
│                 │
│ 20 OCT 2025     │ ← Texte (blanc, caps)
│ PARIS           │
│                 │
│ 🔴🔴🔴🔴🔴🔴🔴 │
└─────────────────┘
```
- Background : Gradient #7C3AED → #EC4899
- Signature color : #FFFFFF
- Text : 16pt Bold, #FFFFFF, uppercase
- Style : Jeune, vibrant

---

### Template 4 : Coloré Pop
```
┌─────────────────┐
│ ┌─────────────┐ │ ← Cadre coloré
│ │             │ │
│ │ \_________  │ │ ← Signature
│ │         \/  │ │
│ │             │ │
│ └─────────────┘ │
│                 │
│ 💫 Beyoncé      │ ← Nom + emoji
│ 20 Oct • Paris  │
│                 │
└─────────────────┘
```
- Background : Couleur vive (personnalisable)
- Frame : Blanc, padding 20pt
- Signature color : Noir
- Text : 15pt SemiBold, noir
- Style : Fun, énergique

---

### Template 5 : Dark Mode
```
┌─────────────────┐
│█████████████████│
│█████████████████│
│███           ███│
│███ \_______  ███│ ← Signature (or)
│███         \/███│
│███           ███│
│███ ────────  ███│ ← Ligne séparatrice
│███ 20 OCT    ███│
│███ PARIS     ███│
│█████████████████│
└─────────────────┘
```
- Background : #1F2937
- Signature color : #FCD34D
- Separator : 2pt, #374151
- Text : 13pt Medium, #9CA3AF, uppercase
- Style : Sobre, élégant

---

## 🔄 Flows Utilisateur

### Flow 1 : Première Signature (Onboarding)
```
[Onboarding Slides] 
    ↓
[Home Screen] 
    ↓ Tap "Nouvelle Signature"
[Canvas Signature] 
    ↓ Signer + Valider
[Éditeur Fond d'Écran] 
    ↓ Choisir template + Personnaliser
[Options de Sortie]
    ├→ Définir comme fond d'écran
    ├→ Enregistrer dans galerie
    └→ Partager sur réseaux
        ↓
[Retour Home] avec signature dans galerie
```

---

### Flow 2 : Consultation de la Collection
```
[Home Screen] 
    ↓ Tap sur galerie ou "Voir tout"
[Galerie] (Grid view)
    ↓ Tap sur une signature
[Détail Signature]
    ├→ Créer un nouveau fond d'écran
    │   ↓
    │   [Éditeur Fond d'Écran]
    │
    ├→ Partager signature
    │   ↓
    │   [Share Sheet natif]
    │
    └→ Menu (⋮)
        ├→ Modifier note
        ├→ Supprimer (confirmation)
        └→ Signaler
```

---

### Flow 3 : Upgrade Premium
```
[Anywhere in App]
    ↓ Tap sur template Premium (locked)
    OU limite 10 signatures atteinte
[Modal Paywall]
    ↓ Choisir plan (Mensuel / Annuel)
    ↓ Tap "Essai Gratuit" ou "Souscrire"
[Stripe Checkout] (WebView)
    ↓ Paiement confirmé
[Success Screen]
    ↓
[Retour à l'app] avec statut Premium actif
```

---

## 📱 Interactions & Animations

### Animations Clés

#### 1. Splash Screen
```
Duration: 2 secondes
- Logo fade in + scale (0.8 → 1.0)
- Tagline fade in avec delay 0.3s
- Transition vers Onboarding ou Home
```

#### 2. Canvas de Signature
```
- Trace du doigt : Smooth rendering 60fps
- Validation : Signature zoom out + fade (0.3s)
- Transition vers éditeur : Slide up (0.4s)
```

#### 3. Carousel Templates
```
- Swipe : Horizontal scroll avec momentum
- Pagination : Active dot scale 1.2 + color transition
- Preview : Update en temps réel (< 100ms)
```

#### 4. Partage
```
- Bouton tap : Scale 0.95 → haptic feedback
- Export : Loading spinner (2s max)
- Success : Checkmark animation + toast
```

#### 5. Navigation Bottom Bar
```
- Tap icon : Scale 1.0 → 1.2 → 1.0 (0.2s)
- Active state : Color transition + icon fill
```

---

## ♿ Accessibilité

### Contraintes à Respecter

#### Contraste
- Texte sur fond : Minimum WCAG AA (4.5:1)
- Boutons : Minimum 3:1
- Outils : Contrast Checker Figma plugin

#### Taille des Targets
- Boutons : Minimum 44pt x 44pt (iOS) / 48dp x 48dp (Android)
- Icônes cliquables : Minimum 24pt avec padding

#### Texte
- Minimum : 12pt (Caption)
- Body standard : 15pt
- Support Dynamic Type (iOS)

#### Navigation
- Screen reader friendly labels
- Focus states visibles (border Primary 2pt)
- Keyboard navigation (Android)

---

## 🎁 Assets à Créer

### Icônes Nécessaires
```
Navigation:
- Home (outline + filled)
- Camera (outline + filled)  
- Star (outline + filled)
- Profile (outline + filled)

Actions:
- Plus / Add
- Close / X
- Back / Arrow left
- Menu / Three dots
- Settings / Gear
- Search
- Filter
- Share
- Delete / Trash
- Edit / Pencil
- Check / Validate
- Clear / Eraser

Features:
- Location pin
- Calendar
- Clock
- Eye (show/hide password)
- Lock (premium)
- Star (rating)
- Heart (favorite - future)
```

### Illustrations
```
1. Onboarding Slide 1 : Smartphone + doigt + signature
2. Onboarding Slide 2 : Smartphone avec fond d'écran
3. Onboarding Slide 3 : Icônes réseaux sociaux + partage
4. Empty state galerie : Carnet vide + stylo
5. Premium modal : Couronne ou étoiles
```

### Images de Démo
```
- 5 signatures fictives (célébrités connues)
- 5 mockups de fonds d'écran
- Avatar utilisateur par défaut
```

---

## 📦 Exports Figma

### Paramètres d'Export

#### Pour Développement
```
Images:
- Format : PNG
- Scale : @1x, @2x, @3x
- Naming : lowercase-with-dashes

Icônes:
- Format : SVG (vectoriel)
- Naming : icon-name.svg

Assets iOS:
- Export vers Assets.xcassets
- Avec @2x et @3x

Assets Android:
- Export vers res/drawable-xxx
- mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi
```

#### Code Export (Dev Handoff)
```
- Copier CSS/React Native styles
- Exporter specs (dimensions, spacing, colors)
- Générer style guide (Figma → Zeroheight)
```

---

## ✅ Checklist Figma

### Setup Initial
- [ ] Créer nouveau projet Figma
- [ ] Nommer : "SignatureApp - MVP Design"
- [ ] Créer pages : Cover, Styles, Components, Screens, Flows
- [ ] Setup grille 8pt
- [ ] Créer color styles (Primary, Secondary, Neutral, System)
- [ ] Créer text styles (H1, H2, Body, Caption, etc.)

### Composants à Créer
- [ ] Boutons (Primary, Secondary, Ghost)
- [ ] Input fields (Text, Password avec toggle)
- [ ] Cards (Signature card)
- [ ] Bottom navigation
- [ ] Header (variants : transparent, white, with back)
- [ ] Toggle iOS/Android
- [ ] Modal/Bottom sheet
- [ ] Toast notifications
- [ ] Loading states
- [ ] Empty states

### Écrans à Maquetter
- [ ] Onboarding (3 slides)
- [ ] Home Screen
- [ ] Canvas Signature
- [ ] Éditeur Fond d'Écran
- [ ] Galerie
- [ ] Détail Signature
- [ ] Connexion/Inscription
- [ ] Premium/Paywall

### Prototypage
- [ ] Lier les écrans avec Smart Animate
- [ ] Ajouter transitions (Slide, Fade)
- [ ] Tester flow complet sur mobile
- [ ] Enregistrer vidéo demo (30 sec)

### Handoff Développeur
- [ ] Vérifier toutes les contraintes (padding, margin)
- [ ] Exporter tous les assets (@1x, @2x, @3x)
- [ ] Générer style guide
- [ ] Partager lien Figma en mode Develop

---

## 🎬 Ordre de Création Recommandé

### Phase 1 : Foundation (2-3 heures)
1. Setup projet + pages
2. Créer color palette
3. Créer text styles
4. Créer composants de base (boutons, inputs)

### Phase 2 : Core Screens (3-4 heures)
5. Maquetter Canvas Signature (écran le plus important)
6. Maquetter Éditeur Fond d'Écran
7. Maquetter Home Screen

### Phase 3 : Secondary Screens (2-3 heures)
8. Maquetter Galerie
9. Maquetter Détail Signature
10. Maquetter Auth (Connexion/Inscription)

### Phase 4 : Polish (1-2 heures)
11. Maquetter Onboarding
12. Maquetter Premium
13. États vides et erreurs

### Phase 5 : Prototype (1 heure)
14. Lier tous les écrans
15. Ajouter animations
16. Tester sur device

**Total estimé : 9-13 heures de design**

---

## 💡 Tips Figma

### Plugins Utiles
- **Unsplash** : Photos gratuites pour illustrations
- **Iconify** : Bibliothèque d'icônes (Lucide, Feather)
- **Stark** : Vérifier accessibilité et contrastes
- **Content Reel** : Générer faux contenu (noms, textes)
- **Auto Layout** : Utiliser partout pour composants responsives
- **Component** : Organiser en variants (hover, active, disabled)

### Raccourcis Clés
- `A` : Auto Layout
- `K` : Scale tool
- `Cmd + D` : Dupliquer
- `Cmd + G` : Grouper
- `Cmd + /` : Rechercher action
- `Shift + A` : Add auto layout
- `Option + Drag` : Duplicate spacing

### Bonnes Pratiques
- ✅ Utiliser Auto Layout partout
- ✅ Créer des composants pour éléments répétitifs
- ✅ Nommer les layers clairement (pas "Rectangle 42")
- ✅ Organiser en frames logiques
- ✅ Utiliser constraints (left, right, top, center)
- ✅ Tester sur vrais devices (Figma Mirror app)

---

## 📞 Support & Questions

Si tu as des questions pendant la création des maquettes, je peux t'aider avec :
- Choix de couleurs spécifiques
- Ajustement de layouts
- Création d'animations custom
- Export pour développement
- Feedback sur les maquettes finales

---

**Document Design v1.0**  
Créé le : 26 octobre 2025  
Statut : 🎨 Ready to Design

🚀 **Commence par le Canvas de Signature - c'est l'écran le plus critique !**
