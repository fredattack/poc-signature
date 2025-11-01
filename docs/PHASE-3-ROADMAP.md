# PHASE 3 ROADMAP - Signature Canvas Restructuring

**Status**: 🔜 PLANNED
**Priority**: HIGH
**Estimated Duration**: 4-6 hours
**Dependencies**: Phase 2 completed ✅

---

## OBJECTIF PRINCIPAL

Restructurer la page **Capture Signature** (`/src/app/signature-canvas.tsx`) pour éliminer le scroll vertical et améliorer l'UX avec:

1. **Single-page layout** (no scroll sur iPhone 14)
2. **Canvas affordances** (hints, animations, feedback)
3. **Color picker moderne** (dropdown au lieu de 4 gros boutons)
4. **Form compact** (réduction cognitive load)

---

## PROBLÈMES ACTUELS (AUDIT)

### 1. Scroll vertical excessif (800px+)

**Symptômes**:

- Utilisateur doit scroller pour voir tous les contrôles
- Perte du contexte (canvas hors vue quand on remplit le formulaire)
- UX fragmentée (4 sections séparées)

**Impact UX**: ⚠️ Cognitive load élevé, frustration

### 2. Canvas sans affordances

**Symptômes**:

- Aucune indication visuelle "dessinez ici"
- Utilisateur confus au premier lancement
- Pas de feedback "signature complétée"

**Impact UX**: ⚠️ Onboarding difficile, taux d'abandon élevé

### 3. Color picker primitif

**Symptômes**:

- 4 gros boutons circulaires (design 2015)
- Pas extensible (difficile d'ajouter des couleurs)
- Occupe trop d'espace vertical

**Impact UX**: ⚠️ Design daté, peu flexible

### 4. Validation asynchrone frustrante

**Symptômes**:

- Messages d'erreur apparaissent après soumission
- Pas de feedback en temps réel
- Bouton "Save" enabled même avec données invalides

**Impact UX**: ⚠️ Frustration, erreurs évitables

---

## SOLUTION: SINGLE-PAGE LAYOUT

### Architecture cible

```
┌─────────────────────────────────────┐
│  Header (Back | Title | Info)       │  88px
├─────────────────────────────────────┤
│  Canvas Hint: "✍️ Draw signature"   │  24px
│  Sub-hint: "Touch & drag..."        │  16px
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │     Signature Canvas          │  │  280px
│  │     (Skia drawing area)       │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│  │ Color ▼ | ↶ Undo | ✕ Clear   │  │  44px (inline controls)
├─────────────────────────────────────┤
│  Celebrity Name *                   │  56px
│  [Input field.....................]  │
├─────────────────────────────────────┤
│  Location: [Toggle] 📍 Save         │  44px
├─────────────────────────────────────┤
│  [Clear]        [💾 Save Signature] │  56px
└─────────────────────────────────────┘

TOTAL HEIGHT: ~608px (fits iPhone 14 without scroll)
```

### Hauteurs cibles

- **Header**: 88px (fixe)
- **Canvas section**: 280px (réduction de 320px actuel)
- **Form section**: ~100px (compact)
- **Button section**: 56px + padding
- **Total**: ~608px (marge confortable sur iPhone 14 de 844px)

---

## COMPOSANTS À CRÉER/MODIFIER

### 1. ColorPickerDropdown.tsx (NOUVEAU)

**Fichier**: `/src/components/signature/ColorPickerDropdown.tsx`

**Features**:

- ✅ Dropdown modal avec 6 couleurs (au lieu de 4 boutons)
- ✅ Preview du swatch + nom de couleur
- ✅ Animation fade-in/out
- ✅ Sélection rapide (tap sur couleur)
- ✅ Checkmark sur couleur sélectionnée

**API**:

```typescript
interface ColorPickerDropdownProps {
  value: string;
  onChange: (color: string) => void;
}

const COLOR_OPTIONS = [
  { name: 'Black', value: '#000000', swatch: '#000000' },
  { name: 'Blue', value: '#2196F3', swatch: '#2196F3' },
  { name: 'Red', value: '#D32F2F', swatch: '#D32F2F' },
  { name: 'Sage Green', value: '#8A9A5B', swatch: '#8A9A5B' },
  { name: 'Water Green', value: '#A8C3BC', swatch: '#A8C3BC' },
  { name: 'Warm Beige', value: '#D4C5B1', swatch: '#D4C5B1' },
];
```

**Design**:

```
┌─────────────────────────┐
│ [●] Black          [✓]  │ ← Selected
├─────────────────────────┤
│ [●] Blue                │
├─────────────────────────┤
│ [●] Sage Green          │
└─────────────────────────┘
```

### 2. SignatureCanvas.tsx (AMÉLIORATION)

**Fichier**: `/src/components/signature/SignatureCanvas.tsx`

**Features à ajouter**:

#### A. Canvas Hint (état INITIAL)

```typescript
// État vide: hint visible avec pulse animation
<Animated.View style={[styles.hintOverlay, hintStyle]}>
  <Text style={styles.hintText}>✍️ Draw here</Text>
  <Text style={styles.hintSubtext}>Touch & drag with finger</Text>
</Animated.View>
```

**Animation**: Pulse (opacity 0.5 → 0.8, duration 1.5s, repeat infinite)

#### B. Canvas Active (état DRAWING)

```typescript
// Hint disparaît dès le premier touch
useEffect(() => {
  if (hasStartedDrawing) {
    hintOpacity.value = withTiming(0, { duration: 300 });
  }
}, [hasStartedDrawing]);
```

#### C. Completion Checkmark (état COMPLETED)

```typescript
// Checkmark apparaît quand signature valide
{isComplete && (
  <Animated.View
    style={styles.checkmark}
    entering={FadeIn.duration(300)}
  >
    <Text style={styles.checkmarkText}>✓</Text>
  </Animated.View>
)}
```

**Position**: Bottom-right du canvas (12px margin)

### 3. signature-canvas.tsx (REFACTOR COMPLET)

**Fichier**: `/src/app/signature-canvas.tsx`

**Changements architecturaux**:

#### AVANT (actuel)

```typescript
<SafeAreaView>
  <Header />
  <KeyboardAvoidingView>
    <ScrollView> {/* ❌ SCROLL VERTICAL */}
      <Text>Instructions</Text>
      <View>Canvas (320px)</View>
      <View>Color Picker (4 boutons)</View>
      <View>Celebrity Input</View>
      <View>Location Toggle</View>
      <View>Buttons</View>
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
```

#### APRÈS (cible)

```typescript
<SafeAreaView style={{ backgroundColor: theme.bgPrimary }}>
  <Header />

  {/* NO SCROLL - tout tient dans la hauteur */}
  <View style={styles.content}>
    {/* Canvas hints */}
    <Text style={styles.canvasHint}>✍️ Draw the signature</Text>
    <Text style={styles.canvasSubHint}>Touch & drag with finger</Text>

    {/* Canvas with inline controls */}
    <View style={styles.canvasContainer}>
      <SignatureCanvas
        ref={canvasRef}
        strokeColor={strokeColor}
        onSignatureChange={setSignature}
        style={styles.canvas}
      />

      {/* Inline controls (pas séparés) */}
      <View style={styles.canvasControls}>
        <ColorPickerDropdown
          value={strokeColor}
          onChange={setStrokeColor}
        />
        <TouchableOpacity onPress={handleUndo}>
          <Text>↶ Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear}>
          <Text>✕ Clear</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Form compact */}
    <View style={styles.formSection}>
      <Input
        label="Celebrity Name *"
        placeholder="Type or select..."
        value={celebrity}
        onChangeText={setCelebrity}
        error={celebError}
      />

      {/* Location toggle inline */}
      <View style={styles.locationRow}>
        <Text>Location:</Text>
        <Toggle value={locationEnabled} onChange={setLocationEnabled} />
        <Text>{locationEnabled ? '📍 Save location' : 'Don\'t save'}</Text>
      </View>
    </View>
  </View>

  {/* Sticky footer buttons */}
  <View style={styles.buttonContainer}>
    <Button variant="secondary" onPress={handleClear}>Clear</Button>
    <Button variant="primary" onPress={handleSave} disabled={!isValid}>
      💾 Save Signature
    </Button>
  </View>
</SafeAreaView>
```

---

## STYLES CIBLES

### Canvas container

```typescript
canvasContainer: {
  borderRadius: 20, // generous (tokens.radii.generous)
  borderWidth: 1.5,
  borderColor: theme.sage, // #8A9A5B
  overflow: 'hidden',
  marginVertical: spacing.md,
  backgroundColor: '#FFFFFF', // Blanc SEULEMENT pour le canvas
  ...shadows.sageShadow, // Shadow avec couleur sage
}
```

### Canvas controls (inline)

```typescript
canvasControls: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: spacing.sm,
  backgroundColor: '#F8F8F6', // Card background subtil
  borderTopWidth: 1,
  borderTopColor: 'rgba(138, 154, 91, 0.1)',
}
```

### Form section (compact)

```typescript
formSection: {
  gap: spacing.md,
  paddingHorizontal: spacing.md,
}

locationRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.sm,
}
```

### Sticky footer

```typescript
buttonContainer: {
  flexDirection: 'row',
  gap: spacing.sm,
  padding: spacing.md,
  borderTopWidth: 1,
  borderTopColor: 'rgba(138, 154, 91, 0.1)',
  backgroundColor: theme.bgPrimary,
}
```

---

## ANIMATIONS & MICRO-INTERACTIONS

### 1. Canvas Hint Pulse

```typescript
// Animation subtile pour attirer l'attention
useEffect(() => {
  if (!hasStartedDrawing) {
    hintOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500 }),
        withTiming(0.5, { duration: 1500 })
      ),
      -1, // infinite
      true
    );
  }
}, [hasStartedDrawing]);
```

### 2. Checkmark Fade-in

```typescript
// Apparition douce quand signature complète
{isComplete && (
  <Animated.View
    style={styles.checkmark}
    entering={FadeIn.duration(300)}
  >
    <Text style={styles.checkmarkText}>✓</Text>
  </Animated.View>
)}
```

### 3. Button State

```typescript
// Bouton Save devient highlighted quand signature valide
<Button
  variant="primary"
  onPress={handleSave}
  disabled={!signature || !celebrity.trim()}
  loading={isSaving}
  style={[
    styles.saveButton,
    isValid && styles.saveButtonHighlighted, // Subtle scale ou glow
  ]}
>
  💾 Save Signature
</Button>
```

---

## VALIDATION EN TEMPS RÉEL

### Celebrity Name

```typescript
// Validation instantanée (pas après soumission)
const [celebError, setCelebError] = useState<string | null>(null);

const handleCelebrityChange = (value: string) => {
  setCelebrity(value);

  // Validation en temps réel
  if (value.trim().length === 0) {
    setCelebError('Celebrity name is required');
  } else if (value.trim().length < 2) {
    setCelebError('Name must be at least 2 characters');
  } else {
    setCelebError(null);
  }
};
```

### Signature Canvas

```typescript
// Validation automatique
const [signatureError, setSignatureError] = useState<string | null>(null);

const handleSignatureChange = (paths: Path[]) => {
  setSignature(paths);

  if (paths.length === 0) {
    setSignatureError('Please draw a signature');
  } else {
    setSignatureError(null);
  }
};
```

### Bouton Save

```typescript
// Disabled si données invalides
const isValid = useMemo(() => {
  return (
    signature.length > 0 &&
    celebrity.trim().length >= 2 &&
    !celebError &&
    !signatureError
  );
}, [signature, celebrity, celebError, signatureError]);

<Button
  disabled={!isValid || isSaving}
  loading={isSaving}
  onPress={handleSave}
>
  💾 Save Signature
</Button>
```

---

## PLAN D'EXÉCUTION PHASE 3

### ÉTAPE 1: Créer ColorPickerDropdown (1h)

1. Créer `/src/components/signature/ColorPickerDropdown.tsx`
2. Implémenter modal avec FlatList
3. Ajouter animation fade-in/out
4. Tester sélection + checkmark
5. Tester fermeture au tap outside

### ÉTAPE 2: Améliorer SignatureCanvas (1.5h)

1. Ajouter state `hasStartedDrawing` et `isComplete`
2. Implémenter hint overlay avec pulse animation
3. Implémenter checkmark avec fade-in
4. Tester disparition du hint au premier touch
5. Tester apparition checkmark quand signature complète

### ÉTAPE 3: Refactor signature-canvas.tsx (2h)

1. Supprimer ScrollView
2. Réduire hauteur canvas (320px → 280px)
3. Déplacer color picker inline (dans canvasControls)
4. Compacter form section (Input + location row)
5. Créer sticky footer avec buttons
6. Tester sur iPhone 14 (no scroll)

### ÉTAPE 4: Validation temps réel (0.5h)

1. Implémenter handleCelebrityChange avec validation
2. Implémenter handleSignatureChange avec validation
3. Calculer `isValid` avec useMemo
4. Connecter `isValid` au bouton Save

### ÉTAPE 5: Tests & polish (1h)

1. Tester sur iPhone 14 (844px height)
2. Tester sur iPhone SE (667px height) - ajuster si nécessaire
3. Tester dark mode
4. Tester accessibilité (screen reader)
5. Vérifier contrastes WCAG 3.0

---

## CRITÈRES DE SUCCÈS PHASE 3

| Critère                  | Description                                    | Priorité |
| ------------------------ | ---------------------------------------------- | -------- |
| ✅ No scroll iPhone 14   | Toute l'interface tient dans 844px (iPhone 14) | HIGH     |
| ✅ Canvas affordances    | Hint + checkmark implémentés                   | HIGH     |
| ✅ ColorPickerDropdown   | Dropdown moderne (6 couleurs)                  | HIGH     |
| ✅ Validation temps réel | Erreurs affichées instantanément               | MEDIUM   |
| ✅ Animations 60fps      | Pulse, fade-in fluides                         | MEDIUM   |
| ✅ Accessibilité AA      | WCAG 3.0 maintenu                              | HIGH     |
| ✅ Dark mode             | Fonctionne correctement                        | HIGH     |
| ✅ TypeScript 0 erreurs  | Compilation clean                              | HIGH     |

---

## RISQUES & MITIGATIONS

### Risque 1: Canvas trop petit (280px)

**Impact**: Difficile de dessiner signatures complexes
**Mitigation**:

- Tester avec utilisateurs réels
- Permettre zoom si nécessaire
- Alternative: Réduire form section plutôt que canvas

### Risque 2: Ne pas tenir sur iPhone SE (667px)

**Impact**: Scroll nécessaire sur petits écrans
**Mitigation**:

- Détecter taille écran avec `Dimensions.get('window').height`
- Réduire dynamiquement canvas si < 700px
- Alternative: Accepter scroll minimal sur SE uniquement

### Risque 3: Breaking changes sur useSignature hook

**Impact**: Régression features existantes
**Mitigation**:

- Ne pas modifier API du hook
- Ajouter nouveaux props optionnels
- Tester backward compatibility

---

## LIVRABLES PHASE 3

1. `/src/components/signature/ColorPickerDropdown.tsx` (nouveau)
2. `/src/components/signature/SignatureCanvas.tsx` (amélioré)
3. `/src/app/signature-canvas.tsx` (refactoré)
4. `/docs/PHASE-3-COMPLETION-REPORT.md` (rapport)
5. Screenshots before/after (light + dark mode)

---

## APRÈS PHASE 3

Une fois Phase 3 terminée, l'application sera **100% conforme** à la charte graphique v2.0 ET aura une UX moderne sans friction.

**Phases suivantes** (optionnelles):

- Phase 4: Galerie améliorée (filtres, recherche, tri avancé)
- Phase 5: Wallpaper editor amélioré (plus de templates)
- Phase 6: Animations avancées (splash screen, transitions)

---

**Roadmap maintained by**: Claude Code
**Status**: 🔜 READY TO START
**Dependencies**: ✅ Phase 2 completed
