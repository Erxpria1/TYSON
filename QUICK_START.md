# 🚀 Quick Start Guide - TY-HAIR DESIGN

Bu rehber, projeyi hızlıca başlatmanız için basitleştirilmiş adımları içerir.

## 📦 Hızlı Kurulum (5 Dakika)

### 1. Firebase Hazırlığı (2 dakika)

1. https://console.firebase.google.com adresine gidin
2. "Add project" tıklayın
3. Proje adı girin: `ty-hair-design` (veya istediğiniz ad)
4. Google Analytics'i devre dışı bırakın (opsiyonel)
5. "Create project" tıklayın
6. Project'e girin
7. Sol menüden **Authentication** > "Get Started" > "Email/Password" aktif edin
8. Sol menüden **Firestore Database** > "Create database" > "Start in test mode"
9. Yukarıda ⚙️ (Settings) > "Project settings" > "Your apps" bölümüne gidin
10. Web icon (`</>`) tıklayın
11. App nickname: "TY-HAIR WEB"
12. Firebase config'i kopyalayın

### 2. Firebase Config'i Ekle (1 dakika)

`lib/config/firebase_config.dart` dosyasını açın ve değerleri yapıştırın:

```dart
static const FirebaseOptions web = FirebaseOptions(
  apiKey: "AIza...",              // Buraya yapıştır
  authDomain: "project.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc",
);
```

Android ve iOS için aynı değerleri kopyalayın.

### 3. Projeyi Çalıştır (2 dakika)

```bash
# Bağımlılıkları yükle
flutter pub get

# Web'de çalıştır
flutter run -d chrome

# veya Android/iOS
flutter run
```

## 🌐 Netlify'a Deploy (5 Dakika)

### Yöntem 1: UI ile (En Kolay)

1. **Netlify'a Git:** https://app.netlify.com
2. **Login:** GitHub ile giriş yap
3. **Add Site:** "Import from Git" > GitHub'ı seç > Bu repo'yu seç
4. **Build Settings:**
   - Build command: `./build.sh`
   - Publish directory: `build/web`
5. **Environment Variables Ekle:**
   - Site settings > Environment variables
   - Ekle:
     ```
     FIREBASE_API_KEY = AIza...
     FIREBASE_AUTH_DOMAIN = project.firebaseapp.com
     FIREBASE_PROJECT_ID = project-id
     FIREBASE_STORAGE_BUCKET = project.appspot.com
     FIREBASE_MESSAGING_SENDER_ID = 123456789
     FIREBASE_APP_ID = 1:123:web:abc
     ```
6. **Deploy:** "Deploy site" tıkla
7. **Bekle:** 5-10 dakika (ilk build)
8. **✅ Bitti!** URL'ni al (örn: `random-name.netlify.app`)

### Yöntem 2: CLI ile (Hızlı)

```bash
# Netlify CLI kur (bir kere)
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify init
# Site seç veya yeni oluştur
# Build command: ./build.sh
# Publish directory: build/web

# Environment variables ekle
netlify env:set FIREBASE_API_KEY "AIza..."
netlify env:set FIREBASE_AUTH_DOMAIN "project.firebaseapp.com"
netlify env:set FIREBASE_PROJECT_ID "project-id"
netlify env:set FIREBASE_STORAGE_BUCKET "project.appspot.com"
netlify env:set FIREBASE_MESSAGING_SENDER_ID "123456789"
netlify env:set FIREBASE_APP_ID "1:123:web:abc"

# Production deploy
netlify deploy --prod
```

## ✅ Deploy Sonrası Kontrol

1. **URL'i aç:** `https://your-site.netlify.app`
2. **Kayıt ol:** Yeni hesap oluştur
3. **Login:** Giriş yap
4. **Test et:**
   - Randevu oluşturma
   - Hizmetleri görüntüleme
   - WhatsApp linki
   - Profil sayfası

## 🔧 Sorun Giderme

### "Firebase not configured"
- Environment variables'ı kontrol et
- Netlify dashboard > Site settings > Environment variables

### "Build failed"
- Build log'u kontrol et
- Flutter version'ı güncelle: `netlify.toml` > `FLUTTER_VERSION`

### "404 on refresh"
- `netlify.toml` dosyası var mı kontrol et
- Redirects ayarlandı mı kontrol et

## 📚 Detaylı Dokümantasyon

- **Flutter README:** `FLUTTER_README.md`
- **Deployment Guide:** `DEPLOYMENT.md`

## 🎉 Başarılı!

Projeniz artık canlıda! Herhangi bir sorun yaşarsanız:
- GitHub Issues
- Netlify Support
- Firebase Console

**URL'inizi paylaşın ve test edin! 🚀**
