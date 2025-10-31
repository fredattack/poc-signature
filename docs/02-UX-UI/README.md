# 🎨 GUIDE UX/UI 2025
## SignatureApp — Mise en application de la charte graphique

**Version**: 2.0  
**Date**: 31 octobre 2025  
**Référence maîtresse**: `docs/02-UX-UI/SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md`

> Ce document traduit le manifeste graphique en directives opérationnelles pour l'équipe produit (designers, développeurs, QA). Il ne remplace pas la charte complète ; il en résume les décisions majeures et précise comment les implémenter dans les parcours mobiles et web de SignatureApp.

---

## 📋 Table des matières

1. [Essence de marque & principes directeurs](#essence-de-marque--principes-directeurs)
2. [Palette de couleurs et contrastes](#palette-de-couleurs-et-contrastes)
3. [Système typographique](#système-typographique)
4. [Grille, espaces & surfaces](#grille-espaces--surfaces)
5. [Composants essentiels](#composants-essentiels)
6. [États, micro-interactions & animations](#états-micro-interactions--animations)
7. [Accessibilité & inclusivité](#accessibilité--inclusivité)
8. [Dark mode intelligent](#dark-mode-intelligent)
9. [Iconographie, illustrations & médias](#iconographie-illustrations--médias)
10. [Processus design ↔ dev & QA](#processus-design--dev--qa)
11. [Annexes & ressources](#annexes--ressources)

---

## ✨ Essence de marque & principes directeurs

- **Authenticité, Accessibilité, Sophistication** : toutes les décisions de design doivent exprimer ces trois valeurs fondatrices.
- **Élégance naturelle** : palette inspirée de matériaux organiques, sobriété premium, pas de surcharge décorative.
- **Clarté intentionnelle** : chaque écran révèle l'information par paliers (progressive disclosure) et conserve une hiérarchie lisible.
- **Interfaces adaptatives** : anticiper les variations d'état (profil utilisateur, contexte d'usage, préférences système).
- **Éco-responsabilité** : privilégier les médias optimisés, animations sobres et assets mutualisés pour réduire l'empreinte carbone.

---

## 🎨 Palette de couleurs et contrastes

| Rôle principal | Couleur | Hex | Usage clé |
| -------------- | ------- | --- | --------- |
| Primaire        | Sauge Élégante | `#8A9A5B` | CTA principaux, éléments interactifs majeurs, icône app |
| Secondaire      | Beige Terre     | `#D4C5B1` | Backgrounds secondaires, cartes neutres, onboarding |
| Accent          | Eau Minérale    | `#A8C3BC` | Feedback positif, badges informatifs, actions secondaires |
| Fond clair      | Gris Perlé      | `#E6E6E6` | Surface background, zones respirantes |
| Fond profond    | Graphite Doux   | `#232323` | Dark mode surfaces, hero inversés |
| Feedback succès | Sauge Profonde  | `#6F7F43` | Alertes succès, checkmarks |
| Feedback alerte | Ambre Doux      | `#D9A441` | Alertes douces, warnings non-bloquants |
| Feedback erreur | Argile Brique   | `#B86445` | Erreurs critiques, validation |

**Règles de contraste**
- Texte sur fond clair : ratio minimum 7:1 pour le contenu, 4.5:1 toléré uniquement pour éléments discrets (labels secondaires).
- Texte sur fond sombre : utiliser `#FFFFFF` (100%) ou `#F4F4F4` (87%) selon le niveau de contraste requis.
- Jamais d'information portée uniquement par la couleur : associer icône, label ou pattern.
- Prévoir variations `--tint` et `--shade` (±8%) pour hover/focus sans casser les contrastes.

---

## 🔤 Système typographique

- **Famille principale** : SF Pro (iOS), Inter (Android & Web), fallback Roboto.
- **Poids disponibles** : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Échelle mobile** (multiples d'1 pt arrondi, line-height 1.3 à 1.45) :

| Style | Usage | Taille / Line-height | Tracking |
| ----- | ----- | -------------------- | -------- |
| Display L | Hero, onboarding | 32 / 40 | -1% |
| Display M | Titres d'écran | 28 / 36 | -0.5% |
| Heading L | Sections majeures | 24 / 32 | 0% |
| Heading M | Sous-sections | 20 / 28 | 0% |
| Heading S | Titres de cartes | 18 / 26 | 0% |
| Body L | Textes riches | 17 / 26 | +0.5% |
| Body | Paragraphe standard | 15 / 24 | +1% |
| Caption | Libellés, statuts | 13 / 20 | +2% |
| Legal | Mentions légales | 12 / 18 | +3% (jamais en dessous) |

**Bonnes pratiques**
- Limiter à 3 styles par écran pour garantir la hiérarchie.
- Utiliser `Dynamic Type` (iOS) et `Font Scaling` (Android) : respecter la plage 85% — 130%.
- Conserver un `max-width` de 72 caractères sur les paragraphes pour améliorer la lecture.

---

## 📐 Grille, espaces & surfaces

- **Grille 8pt** : tous les espacements, marges et tailles suivent des multiples de 8. Exception 4pt uniquement pour micro-ajustements.
- **Marges globales** : 16pt sur mobile, 24pt sur tablette, 32pt sur desktop.
- **Radii** :
  - 4pt (Subtle) : tags, badges.
  - 8pt (Mild) : inputs standards, chip filtrage.
  - 12pt (Regular) : cartes, modales, feuilles.
  - 16pt (Generous) : CTA principaux, hero cards.
  - 24pt+ (Full) : surfaces immersives, header hero.
- **Ombres** (rgba(44, 44, 44, opacité)) :
  - Level 0 : pas d'ombre (backgrounds).
  - Level 1 : `0px 2px 4px 0px @0.05` (hover léger).
  - Level 2 : `0px 2px 8px 0px @0.08` (carte standard).
  - Level 3 : `0px 6px 12px 0px @0.12` (modale secondaire).
  - Level 4 : `0px 12px 24px 0px @0.18` (éléments focus premium).
- **Safe areas** : intégrer `react-native-safe-area-context` et aligner les compos avec notches (iPhone 14 Pro, Pixel 7).

---

## 🧩 Composants essentiels

### Boutons
- **Primary CTA** : fond `#8A9A5B`, radius 16pt, hauteur 56pt, label SemiBold 17pt.
- **Secondary CTA** : fond transparent, contour 1.5pt `#8A9A5B`, radius 16pt, hover en `rgba(138,154,91,0.08)`.
- **Tertiary** : texte + icône, couleur `#6F7F43`, soulignement uniquement sur lien inline.
- **Loading** : spinner `FlashList`/`ActivityIndicator` aligné à droite du label (20pt).

### Inputs
- Hauteur 56pt, radius 12pt, padding horizontal 16pt.
- Fond `#F7F4F0` (clair) ou `#2C2C2C` (sombre), bordure 1pt `rgba(138,154,91,0.16)` en repos.
- Label flottant 13pt Medium, placeholder 15pt Regular `rgba(35,35,35,0.4)`.
- États : focus (bordure 1.5pt `#8A9A5B` + shadow Level 1), erreur (bordure `#B86445` + helper text 13pt).

### Cartes
- Padding interne 16pt, radius 12pt, shadow Level 2.
- Titres 18pt SemiBold, body 15pt.
- Prévoir espaces modulaires (16/24/32pt) pour aligner contenu riche (signatures, badges).

### Navigation
- **Tab Bar** : 5 items max, icône 24pt, label 13pt. Indicateur actif `#8A9A5B`.
- **Header** : hauteur 88pt incluant safe area, titre centré, boutons d'action 44pt min.
- **Drawer / Sheet** : radius top 24pt, handle 48x4pt `#C9D3C1`.

---

## ⚡ États, micro-interactions & animations

- **Durée standard** : 180ms (ease-out). Max 260ms pour transitions de contexte.
- **Courbes** : `cubic-bezier(0.16, 1, 0.3, 1)` pour entrées, `cubic-bezier(0.7, 0, 0.3, 1)` pour sorties.
- **Haptique** : légère (impact light) sur validations, medium sur erreurs critiques.
- **Transitions** :
  - Hover/Press : opacité +2%, scale 1.02 max (jamais plus).
  - Skeleton loading : shimmer 1200ms, gradient `rgba(212,197,177,0.24)`.
- **Feedback** : toast 3s max, radius 12pt, icon 20pt, ancre bottom safe area.
- **Réduction animée** : détecter `prefers-reduced-motion` et fallback fade 100ms.

---

## ♿ Accessibilité & inclusivité

- **Contraste** : respecter WCAG 3.0 AAA par défaut (4.5:1 minimum acceptée uniquement en état désactivé).
- **Tailles minimales** : zones tactiles 44x44pt, gap 8pt.
- **Navigation clavier** (web) : ordre logique, focus visible (ring 2pt `#A8C3BC` + offset 2pt).
- **Screen readers** : libellés explicites, `accessibilityRole` et `accessibilityHint` renseignés.
- **Langues** : contenu localisable, pas de texte dans les images.
- **Tests** : intégrer `@testing-library/react-native` avec scénarios VoiceOver/TalkBack simulés.

---

## 🌙 Dark mode intelligent

- Surfaces principales `#232323`, cartes `#2C2C2C`, séparateurs `rgba(255,255,255,0.08)`.
- Couleurs de marque désaturées de 8% pour limiter la luminance (`#819055` primaire).
- Texte principal `#F4F4F4`, texte secondaire `rgba(244,244,244,0.72)`, désactivé `rgba(244,244,244,0.40)`.
- Ombres remplacées par `elevation` et overlays translucides (`rgba(0,0,0,0.32)`).
- Composants sensibles (input, modales) : conserver ratio contrastes identiques au thème clair.
- **Activation** : suivre préférences système, proposer toggle manuel (persisté `AsyncStorage`), mode adaptatif énergie (batterie <20% → dark par défaut).

---

## 🖼️ Iconographie, illustrations & médias

- **Style** : ligne continue 1.5pt, coins doux, angles arrondis.
- **Formats** : SVG (web), Vector (React Native) via `react-native-svg`.
- **Pictogrammes** : cohérence avec `Phosphor Icons` (set recommandé), recolorables via palette.
- **Illustrations** : textures organiques, gradients subtils `#D4C5B1 → #A8C3BC`.
- **Images** : WebP ≤ 100KB, 2x/3x pour écrans retina. Prévoir version dark (luminance ajustée).
- **Logotype** : respecter zones de respiration (1x hauteur logo), jamais modifier la proportion ni ajouter d'effets.

---

## 🔄 Processus design ↔ dev & QA

1. **Brief & cadrage**  
   - Point d'entrée obligatoire : lecture du manifeste + ce guide.  
   - Définir la valeur brand + impact utilisateur recherché.
2. **Design system**  
   - Créer/mettre à jour les composants dans Figma en partant de la librairie SignatureApp 2025.  
   - Vérifier tokens (couleurs, radius, ombres) avant export.
3. **Handoff**  
   - Exporter via Figma Inspect + Storybook/Expo Snack si besoin.  
   - Documenter interactions dans la section `Prototype` ou `FigJam`.
4. **Implémentation**  
   - Utiliser TypeScript + Expo Router.  
   - Centraliser tokens dans `src/theme` (JSON + hooks).  
   - Respecter la structure 8pt, vérifier responsive (375, 393, 412, 768).
5. **QA design & accessibilité**  
   - Checklists `Design QA` (voir charte) + `Accessibility` (section dédiée).  
   - Tests instrumentés (Detox/E2E) sur iOS 16+, Android 14+.
6. **Validation finale**  
   - Revue conjointe Designer + Développeur + QA.  
   - Mettre à jour ce README ou la charte si un pattern est officialisé.

---

## 📎 Annexes & ressources

- **Charte complète** : `docs/02-UX-UI/SIGNATURE-APP_MANIFESTE-CHARTE-GRAPHIQUE.md`
- **Maquettes Figma** : voir `DESIGN-SPECS-maquettes-figma.md`
- **Checklist Design QA** : section dédiée dans la charte (copiée en annexe projet Notion)
- **Tokens recommandés** : créer un fichier `src/theme/tokens.ts` en suivant les valeurs de ce guide
- **Contact** : Design Lead SignatureApp (Slack #design-system), QA lead pour audits accessibilité

---

> Ce guide doit évoluer avec les retours utilisateurs, audits d'accessibilité et itérations produit. Toute divergence avec la charte officielle doit être signalée immédiatement pour validation.
