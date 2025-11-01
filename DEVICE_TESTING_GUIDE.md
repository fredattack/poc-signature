# Device Testing Guide - SignatureApp

Complete testing checklist for validating the Phase 1-3 UI/UX modernization across iOS and Android devices.

## 🚀 Pre-Testing Setup

### 1. Install Required Dependencies

```bash
# Install haptic feedback support
npm install expo-haptics

# Rebuild native code
npx expo prebuild --clean
```

### 2. Activate Haptic Feedback

Edit `/src/hooks/useHaptics.ts` and uncomment:

- Line 22: `import * as Haptics from 'expo-haptics';`
- Lines 51-55, 64-68, 77-81, 90-96, 105-111, 120-124, 133-137 (all haptic calls)

### 3. Build for Devices

**iOS:**

```bash
npx expo run:ios --device
```

**Android:**

```bash
npx expo run:android --device
```

---

## 📱 Target Devices

### Priority Devices:

- **iPhone 14** (reference device, 6.1", 390x844pt)
- **iPhone SE 3rd Gen** (small screen, 4.7", 375x667pt)
- **iPad** (large screen, 10.9", 820x1180pt)
- **Samsung Galaxy S21+** (Android reference, 6.7")

### Minimum Requirements:

- iOS 13.0+ (React Native 0.74 requirement)
- Android 6.0+ (API 23+)

---

## ✅ Testing Checklist

### **Design System & Theme**

#### Light Mode (Default)

- [ ] Sage green palette visible on all pages (#8A9A5B primary)
- [ ] Warm beige accents (#D4C5B1)
- [ ] Water green highlights (#A8C3BC)
- [ ] Background: #F2F4ED (sage tint, not white)
- [ ] Cards: #FFFFFF
- [ ] Text readable against all backgrounds

#### Dark Mode

- [ ] Toggle switch works smoothly
- [ ] All pages switch correctly (Home, Gallery, Settings, Signature Canvas)
- [ ] Background: #1A1A1A
- [ ] Adjusted brand colors visible
- [ ] Text inverted properly (white on dark)
- [ ] StatusBar switches to light icons
- [ ] Theme preference persists after app restart

#### Accessibility (WCAG 3.0 AA)

- [ ] All text has minimum 4.5:1 contrast ratio
- [ ] Interactive elements have 3:1 contrast
- [ ] Focus states visible on all inputs
- [ ] Tap targets ≥ 44x44pt
- [ ] VoiceOver/TalkBack announces all UI elements correctly

---

### **Page: Home (/(tabs)/index)**

#### Visual

- [ ] Sage green header visible
- [ ] Cards have proper shadows (elevation)
- [ ] Quick action buttons properly styled

#### Interactions

- [ ] Buttons show press animation (scale 0.95)
- [ ] Haptic feedback on button press (medium intensity)
- [ ] Navigation to Signature Canvas works
- [ ] Smooth 60fps animations

---

### **Page: Gallery (/(tabs)/gallery)**

#### Visual (Light Mode)

- [ ] Background is #F2F4ED (sage tint, NOT white)
- [ ] Signature cards have proper spacing (16pt padding)
- [ ] Cards have subtle shadows
- [ ] 2-column grid layout

#### Visual (Dark Mode)

- [ ] Background switches to #1A1A1A
- [ ] Cards have dark background
- [ ] Text is white/light gray
- [ ] Brand colors adjusted

#### Interactions

- [ ] Pull-to-refresh works with spinner in sage green
- [ ] Sort button opens dropdown with animation
- [ ] Sort menu items slide down staggered (50ms delay each)
- [ ] Checkmark appears on selected sort option
- [ ] Haptic feedback on sort option selection
- [ ] Tapping card navigates to detail with haptic
- [ ] Cards have press animation (scale 0.98)
- [ ] Cards fade in when loading (entrance animation)

#### Empty State

- [ ] Appears when no signatures
- [ ] Icon, title, description visible
- [ ] CTA button works and has press animation
- [ ] EmptyState fades in on mount

---

### **Page: Settings (/(tabs)/settings)**

#### Visual

- [ ] Header with "Settings" title
- [ ] Section titles (APPEARANCE, ABOUT, DEBUG)
- [ ] Setting rows with proper spacing
- [ ] Toggle switch styled correctly

#### Dark Mode Toggle

- [ ] Toggle switch shows correct state (on = dark, off = light)
- [ ] Tapping toggle changes theme instantly
- [ ] Haptic feedback on toggle (selection type)
- [ ] Toggle animates smoothly (slide + scale)
- [ ] Description text updates ("Dark theme enabled" / "Light theme enabled")
- [ ] StatusBar updates (dark icons in light mode, light icons in dark mode)

#### Debug Section

- [ ] Shows current mode (light/dark)
- [ ] Shows background color hex
- [ ] Shows primary color hex

---

### **Page: Signature Canvas (/signature-canvas)**

#### Visual (Single-Page Layout)

- [ ] **NO SCROLLING** - entire page fits on screen (~550pt total)
- [ ] Custom header with back button, title, info icon
- [ ] Canvas height is 280pt (compact)
- [ ] Controls inline under canvas (not floating)
- [ ] Compact form with horizontal location toggle
- [ ] Sticky footer buttons always visible

#### Canvas Affordances

- [ ] Hint overlay "✍️ Draw here" visible initially
- [ ] Hint pulses (opacity 0.5 ↔ 0.8, 1.5s duration)
- [ ] Hint disappears on first touch (fade out 300ms)
- [ ] Checkmark ✓ appears when signature complete
- [ ] Haptic feedback on first touch (light intensity)

#### Color Picker Dropdown

- [ ] Opens as modal overlay on button press
- [ ] 4 colors visible: Black, Blue, Red, Sage Green
- [ ] Color swatches match actual colors
- [ ] Selected color has checkmark
- [ ] Haptic on open, selection, and close (light intensity)
- [ ] Dropdown fades in/out
- [ ] Color options slide down staggered (50ms delay each)

#### Drawing

- [ ] Drawing is smooth and responsive
- [ ] Selected color applies correctly
- [ ] Lines have consistent thickness
- [ ] No lag or jitter at 60fps

#### Buttons

- [ ] Undo button (currently shows "Coming soon" alert)
- [ ] Clear button works, shows confirmation
- [ ] Clear triggers haptic (medium intensity)
- [ ] Save button validates and saves
- [ ] Save triggers success haptic + feedback
- [ ] All buttons have press animation (scale 0.95)

#### Form Validation

- [ ] Celebrity name is required (red border if empty on save)
- [ ] Location toggle works
- [ ] Toggle triggers haptic (selection type)
- [ ] Toggle animates smoothly

#### Page Animation

- [ ] Content fades in on mount (translateY from 20px)
- [ ] Footer buttons slide up with 300ms delay

---

### **Component: Button**

Test in multiple contexts (Home, Gallery, Signature Canvas):

- [ ] Primary variant: sage green background (#8A9A5B)
- [ ] Secondary variant: outlined with sage green
- [ ] Ghost variant: text only
- [ ] Disabled state: grayed out, not pressable
- [ ] Press animation: scale to 0.95 with spring (damping 15, stiffness 250)
- [ ] Haptic: medium for primary, light for secondary/ghost
- [ ] Loading state: spinner appears, button disabled
- [ ] 60fps animation on native thread

---

### **Component: Input**

Test in Signature Canvas form:

- [ ] Label visible above input
- [ ] Focus state: border color changes, scale 1.02
- [ ] Error state: red border, error message below
- [ ] Focus animation smooth (spring physics)
- [ ] Label slides up on focus
- [ ] Input retains value on blur
- [ ] Keyboard dismisses correctly

---

### **Component: Toggle**

Test in Settings (Dark Mode) and Signature Canvas (Location):

- [ ] Off state: gray background, knob on left
- [ ] On state: sage green background, knob on right
- [ ] Knob slides smoothly with spring animation
- [ ] Scale animation on press (1 → 1.1 → 1)
- [ ] Haptic on toggle (selection type)
- [ ] 60fps animation on native thread
- [ ] Value changes immediately

---

### **Component: Checkbox**

Test if implemented in any forms:

- [ ] Unchecked: empty box with border
- [ ] Checked: sage green background with white checkmark
- [ ] Press animation: scale to 1.2 then back
- [ ] Haptic on check/uncheck (selection type)
- [ ] 60fps animation

---

### **Component: Card (SignatureCard)**

Test in Gallery:

- [ ] Signature image displayed correctly
- [ ] Celebrity name visible
- [ ] Date/location metadata visible
- [ ] Shadow/elevation visible
- [ ] Press animation: scale to 0.98
- [ ] Haptic on press (light intensity)
- [ ] Entrance animation: fade + scale from 0.9
- [ ] Navigation on tap works

---

## 🎯 Performance Testing

### Frame Rate

- [ ] Animations run at 60fps (use React DevTools Profiler or Flipper)
- [ ] No dropped frames during:
  - Theme switching
  - Gallery scrolling
  - Canvas drawing
  - Sort menu opening
  - Color picker opening

### Memory

- [ ] No memory leaks after switching themes 10x
- [ ] Gallery handles 50+ signatures smoothly
- [ ] Canvas operations don't cause crashes

### Battery

- [ ] App doesn't drain battery excessively
- [ ] Animations don't cause heating

---

## 🐛 Known Limitations

### Haptics

- **Simulators:** Haptics don't work in iOS Simulator or Android Emulator - test on physical devices only
- **Web:** Haptics disabled on web platform (graceful no-op)

### Undo Functionality

- **Status:** Shows "Coming soon" alert
- **Workaround:** Use Clear button to reset

### Canvas Height

- **iPhone SE:** 280pt canvas might feel cramped - monitor user feedback
- **iPad:** Consider increasing canvas height for larger screens

---

## 📊 Test Report Template

Copy and fill out after testing:

```
# Test Report - [Device Name] - [iOS/Android Version]

**Date:** YYYY-MM-DD
**Tester:** [Your Name]
**Device:** [Model]
**OS Version:** [iOS 17.2 / Android 13]
**App Version:** [1.0.0]

## Summary
- [ ] All tests passed
- [ ] Minor issues found (list below)
- [ ] Major issues found (list below)

## Issues Found

### Issue #1
- **Severity:** [Critical/High/Medium/Low]
- **Page/Component:** [Gallery/Button/etc]
- **Description:** [What went wrong]
- **Steps to Reproduce:** [1. Do this, 2. Then this...]
- **Expected:** [What should happen]
- **Actual:** [What actually happened]
- **Screenshot:** [Attach if possible]

## Performance Notes
- Frame rate: [Smooth/Some drops/Laggy]
- Memory usage: [Normal/High]
- Battery impact: [Low/Medium/High]

## Recommendations
- [Any suggestions for improvements]
```

---

## 🔄 Regression Testing

After any code changes, re-test:

1. **Theme switching** (light ↔ dark) on all pages
2. **Signature Canvas** layout (ensure no scroll)
3. **Gallery** in dark mode (ensure not white background)
4. **Haptics** on all interactive elements
5. **Animations** are smooth at 60fps

---

## 📸 Screenshot Checklist

Capture and review:

- [ ] Home (light mode)
- [ ] Home (dark mode)
- [ ] Gallery with signatures (light mode)
- [ ] Gallery with signatures (dark mode)
- [ ] Gallery empty state
- [ ] Settings (light mode)
- [ ] Settings (dark mode)
- [ ] Signature Canvas initial state (with hint)
- [ ] Signature Canvas with drawing
- [ ] Signature Canvas color picker open
- [ ] Signature Canvas with complete signature + checkmark

---

## ✅ Final Validation

Before marking testing complete:

- [ ] All critical paths tested on at least 2 devices (1 iOS, 1 Android)
- [ ] Dark mode works flawlessly on all pages
- [ ] Haptics work on physical devices (if expo-haptics installed)
- [ ] 60fps animations confirmed with profiling tools
- [ ] Accessibility validated with VoiceOver/TalkBack
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] App builds successfully for production

---

## 🎉 Success Criteria

The UI/UX modernization is complete when:

✅ Sage green palette applied consistently across all pages
✅ Dark mode works perfectly on all pages (especially Gallery!)
✅ Single-page Signature Canvas layout with no scroll
✅ Modern color picker with 4 colors
✅ Canvas affordances (hint + checkmark) working
✅ Haptic feedback on all interactive elements
✅ 60fps micro-interactions throughout
✅ WCAG 3.0 AA accessibility standards met
✅ Zero TypeScript/ESLint errors
✅ Tested on real devices (iPhone + Android)

---

**Need Help?**

If you encounter issues during testing:

1. Check console logs for errors
2. Verify expo-haptics is installed and imported correctly
3. Ensure native rebuild after dependency changes (`npx expo prebuild --clean`)
4. Test on physical devices, not simulators (for haptics)
5. Use React DevTools Profiler to diagnose performance issues
