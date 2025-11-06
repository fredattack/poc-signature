# 🔧 Installation du Système d'Authentification

Guide d'installation étape par étape pour intégrer le système d'authentification complet dans SignatureApp.

## 📦 Dépendances Requises

### 1. Installer les packages npm manquants

```bash
# Dépendances requises pour le système d'authentification
npm install expo-clipboard
npm install expo-application
npm install expo-device
npm install expo-linear-gradient

# Si vous voulez implémenter OAuth (optionnel pour l'instant)
npm install expo-auth-session
npm install expo-crypto
npm install expo-web-browser

# Pour Apple Sign-In (optionnel)
npm install expo-apple-authentication

# Pour Google Sign-In (optionnel)
# npm install @react-native-google-signin/google-signin
```

### 2. Vérifier les dépendances existantes

Ces packages doivent déjà être installés (vérifiez dans `package.json`) :

```json
{
  "dependencies": {
    "zustand": "^5.0.8",
    "expo-secure-store": "~15.0.7",
    "expo-haptics": "~13.0.0",
    "@react-native-async-storage/async-storage": "2.2.0",
    "react-native-reanimated": "~4.1.3",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-safe-area-context": "~5.6.0"
  }
}
```

Si manquants, installez-les :

```bash
npm install zustand expo-secure-store expo-haptics
```

---

## ⚙️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env` à la racine :

```env
# API Backend URL
EXPO_PUBLIC_API_URL=https://api.signatureapp.com/api/v1

# OAuth Credentials (optionnel pour l'instant)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id
```

### 2. Configuration app.json

Ajoutez la configuration deep linking dans `app.json` :

```json
{
  "expo": {
    "scheme": "signatureapp",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "signatureapp",
              "host": "auth"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "ios": {
      "bundleIdentifier": "com.signatureapp",
      "associatedDomains": [
        "applinks:signatureapp.com",
        "applinks:www.signatureapp.com"
      ]
    },
    "plugins": [
      "expo-secure-store",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

### 3. Initialisation du Store

Dans votre `app/_layout.tsx` (root layout), ajoutez :

```typescript
import { useEffect } from 'react';
import { hydrateAuthStore } from '@/store/authStore';

export default function RootLayout() {
  useEffect(() => {
    // Hydrate auth store from secure storage
    void hydrateAuthStore();
  }, []);

  // ... rest of layout
}
```

---

## 🚀 Mise à Jour du Backend

### API Endpoints Requis

Votre backend Laravel doit implémenter ces endpoints :

#### Auth Endpoints

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh

# OAuth (Google et Apple fonctionnent, autres à implémenter)
POST /api/v1/auth/google
POST /api/v1/auth/apple
POST /api/v1/auth/facebook    # À implémenter
POST /api/v1/auth/twitter     # À implémenter
POST /api/v1/auth/instagram   # À implémenter
POST /api/v1/auth/tiktok      # À implémenter

# Password Reset
POST /api/v1/auth/password/forgot
POST /api/v1/auth/password/reset

# MFA
POST /api/v1/auth/mfa/setup
POST /api/v1/auth/mfa/verify
POST /api/v1/auth/mfa/enable
POST /api/v1/auth/mfa/disable

# User
GET  /api/v1/user/me
```

#### Format des Requêtes

Voir `AUTH_SYSTEM_README.md` section "Backend API Requirements" pour les formats détaillés.

---

## 🔗 Configuration OAuth (Optionnel)

### Google Sign-In

1. Créez un projet sur [Google Cloud Console](https://console.cloud.google.com)
2. Activez l'API Google Sign-In
3. Créez des identifiants OAuth 2.0 pour iOS, Android et Web
4. Ajoutez les Client IDs dans `.env`

### Apple Sign-In

1. Configurez Sign in with Apple dans [Apple Developer](https://developer.apple.com)
2. Ajoutez la capability dans Xcode
3. Configurez le Service ID

### Implémentation OAuth

Pour implémenter OAuth fonctionnel, utilisez `expo-auth-session` :

```typescript
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
});

// Use in component
<OAuthButton
  provider="google"
  onPress={() => void promptAsync()}
/>
```

---

## 🧪 Test de l'Installation

### 1. Vérifier que le projet compile

```bash
npm run type-check
```

### 2. Lancer l'application

```bash
npm start
```

### 3. Tester les écrans d'authentification

- Naviguez vers `/(auth)/login`
- Testez les validations en temps réel
- Vérifiez les animations et haptic feedback
- Testez avec VoiceOver/TalkBack pour l'accessibilité

### 4. Tester le flow complet

1. **Inscription** : Créez un compte
2. **Login** : Connectez-vous
3. **Logout** : Déconnectez-vous
4. **Password Reset** : Testez le reset password
5. **MFA** : Activez MFA et testez

---

## 🔍 Vérifications Post-Installation

### Checklist

- [ ] Toutes les dépendances npm installées
- [ ] `.env` créé avec `EXPO_PUBLIC_API_URL`
- [ ] `app.json` configuré avec deep linking
- [ ] Store initialisé dans `_layout.tsx`
- [ ] Backend API endpoints implémentés
- [ ] Compilation sans erreurs TypeScript
- [ ] Application lance sans crash
- [ ] Écrans d'auth accessibles
- [ ] Validations fonctionnent
- [ ] Animations fluides (60fps)
- [ ] Haptic feedback fonctionne (device physique)
- [ ] Tokens persistent après redémarrage

---

## 📝 Fichiers Modifiés/Créés

### Nouveaux Fichiers (22 fichiers)

```
src/
├── constants/
│   └── auth-design.ts           # Design tokens complets
├── types/
│   ├── auth.types.ts           # Types auth (modifié)
│   └── api.types.ts            # Types API (modifié)
├── utils/
│   ├── validation.ts           # Fonctions de validation
│   ├── device.ts               # Device info collection
│   └── storage.ts              # Secure storage helpers
├── components/auth/
│   ├── AuthInput.tsx           # Input avec animations
│   ├── AuthButton.tsx          # Button avec gradient
│   ├── OAuthButton.tsx         # OAuth provider buttons
│   ├── LoadingOverlay.tsx      # Full-screen loading
│   ├── ErrorMessage.tsx        # Toast error
│   ├── PasswordStrengthIndicator.tsx
│   ├── MFACodeInput.tsx        # 6-digit code input
│   └── index.ts                # Exports
├── services/api/
│   ├── httpClient.ts           # HTTP client robuste
│   └── authApi.ts              # Auth API service
├── store/
│   └── authStore.ts            # Zustand store (remplace ancien)
└── app/(auth)/
    ├── login.tsx               # Login screen (mis à jour)
    ├── signup.tsx              # Signup screen (nouveau)
    ├── forgot-password.tsx     # Forgot password (mis à jour)
    ├── reset-password.tsx      # Reset password (nouveau)
    ├── mfa/
    │   ├── setup.tsx           # MFA setup (nouveau)
    │   └── verify.tsx          # MFA verify (nouveau)
    └── oauth/
        └── callback.tsx        # OAuth callback (nouveau)
```

### Documentation

```
AUTH_SYSTEM_README.md       # Guide complet du système
AUTH_INSTALLATION.md        # Ce fichier
```

---

## 🆘 Troubleshooting

### Erreur: "Cannot find module '@/components/auth'"

**Solution** : Vérifiez que les path aliases sont configurés dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Erreur: "expo-clipboard is not installed"

**Solution** :
```bash
npm install expo-clipboard
npx expo install expo-clipboard  # Pour expo-managed workflow
```

### Erreur: "SecureStore is not available"

**Solution** : SecureStore ne fonctionne que sur device/simulateur, pas sur web.

```typescript
// src/utils/storage.ts déjà gère ce cas
```

### Les animations ne sont pas fluides

**Solution** :

1. Vérifiez que `react-native-reanimated` est bien configuré
2. Dans `babel.config.js` :

```javascript
module.exports = {
  plugins: ['react-native-reanimated/plugin'], // Doit être le dernier
};
```

3. Rebuild :

```bash
npx expo start -c
```

### Haptic feedback ne fonctionne pas

**Solution** : Haptic ne fonctionne que sur device physique, pas sur simulateur.

### Backend retourne 401 Unauthorized

**Solution** :

1. Vérifiez que `EXPO_PUBLIC_API_URL` est correct
2. Vérifiez que le backend accepte les requêtes CORS
3. Vérifiez le format des tokens dans le backend

---

## 📞 Support

Pour toute question :

1. Consultez `AUTH_SYSTEM_README.md` pour la documentation complète
2. Vérifiez les types dans `src/types/auth.types.ts` et `api.types.ts`
3. Examinez les exemples dans les écrans créés
4. Consultez la console pour les erreurs détaillées

---

## ✨ Prochaines Étapes

Après installation :

1. **Implémenter OAuth** : Configurez Google/Apple Sign-In
2. **Backend** : Implémentez tous les endpoints API
3. **Email Templates** : Créez les templates pour password reset
4. **Tests** : Ajoutez des tests unitaires/intégration
5. **Monitoring** : Ajoutez analytics pour les erreurs auth
6. **Biometric** : Ajoutez authentification biométrique (optionnel)

---

## 🎉 Félicitations !

Si toutes les vérifications passent, votre système d'authentification est **prêt à l'emploi** ! 🚀

N'oubliez pas de tester sur :
- ✅ iOS Simulator
- ✅ Android Emulator
- ✅ Physical Device (pour haptics)
- ✅ VoiceOver/TalkBack (accessibilité)
- ✅ Dark Mode
