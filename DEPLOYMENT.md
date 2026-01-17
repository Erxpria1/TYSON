# 🚀 Netlify Deployment Guide

Bu guide, TY-HAIR DESIGN Flutter uygulamasını Netlify'a deploy etmek için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

- GitHub/GitLab/Bitbucket hesabı
- Netlify hesabı ([netlify.com](https://netlify.com) - ücretsiz)
- Firebase projesi (Firebase Console'dan)

## 🔥 Firebase Kurulumu

1. **Firebase Console'a gidin:** https://console.firebase.google.com
2. Projenizi seçin veya yeni proje oluşturun
3. **Project Settings** > **Your apps** > **Web app** ekleyin
4. Firebase config değerlerini not alın:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

## 🌐 Netlify'a Deploy

### Yöntem 1: Netlify UI ile (Önerilen)

1. **Netlify'a Giriş Yapın**
   - https://app.netlify.com adresine gidin
   - GitHub/GitLab/Bitbucket ile giriş yapın

2. **Yeni Site Ekle**
   - "Add new site" > "Import an existing project" tıklayın
   - Git provider'ınızı seçin (GitHub, GitLab, vb.)
   - Bu repo'yu seçin

3. **Build Settings**
   - **Base directory:** (boş bırakın)
   - **Build command:** `./build.sh` veya:
     ```bash
     flutter/bin/flutter build web --release --dart-define=FIREBASE_API_KEY=$FIREBASE_API_KEY --dart-define=FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN --dart-define=FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID --dart-define=FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET --dart-define=FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID --dart-define=FIREBASE_APP_ID=$FIREBASE_APP_ID
     ```
   - **Publish directory:** `build/web`

4. **Environment Variables Ekle**

   Site Settings > Environment variables bölümüne gidin ve şunları ekleyin:

   ```
   FIREBASE_API_KEY = your_api_key
   FIREBASE_AUTH_DOMAIN = your_auth_domain
   FIREBASE_PROJECT_ID = your_project_id
   FIREBASE_STORAGE_BUCKET = your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID = your_sender_id
   FIREBASE_APP_ID = your_app_id
   ```

5. **Deploy**
   - "Deploy site" butonuna tıklayın
   - Build loglarını takip edin
   - Deploy tamamlandığında otomatik URL alacaksınız (örn: `random-name-123.netlify.app`)

### Yöntem 2: Netlify CLI ile

1. **Netlify CLI Kurun**
   ```bash
   npm install -g netlify-cli
   ```

2. **Netlify'a Login**
   ```bash
   netlify login
   ```

3. **Site Oluştur**
   ```bash
   netlify init
   ```

4. **Environment Variables Ayarla**
   ```bash
   netlify env:set FIREBASE_API_KEY "your_api_key"
   netlify env:set FIREBASE_AUTH_DOMAIN "your_auth_domain"
   netlify env:set FIREBASE_PROJECT_ID "your_project_id"
   netlify env:set FIREBASE_STORAGE_BUCKET "your_storage_bucket"
   netlify env:set FIREBASE_MESSAGING_SENDER_ID "your_sender_id"
   netlify env:set FIREBASE_APP_ID "your_app_id"
   ```

5. **Deploy**
   ```bash
   # Test deploy
   netlify build --context deploy-preview

   # Production deploy
   netlify deploy --prod
   ```

## 🔧 Build Troubleshooting

### Build Başarısız Olursa

1. **Flutter Version Kontrolü**

   `netlify.toml` dosyasında Flutter version'ı güncelleyin:
   ```toml
   [build.environment]
     FLUTTER_VERSION = "3.24.0"
   ```

2. **Build Loglarını Kontrol Edin**
   - Netlify dashboard > Site > Deploys > Build log

3. **Cache Temizle**
   - Netlify dashboard > Site > Deploys > Deploy settings > Clear cache and retry deploy

### Yaygın Hatalar

**Hata: "Flutter command not found"**
- Çözüm: `build.sh` script'inin Flutter'ı otomatik indirmesini bekleyin
- Veya build command'e tam path ekleyin

**Hata: "Firebase not configured"**
- Çözüm: Environment variables'ın doğru ayarlandığından emin olun

**Hata: "Build took too long"**
- Çözüm: Daha hızlı build için `--web-renderer html` kullanın:
  ```bash
  flutter build web --web-renderer html
  ```

## 🌍 Custom Domain Ekleme

1. Netlify Dashboard > Site > Domain settings
2. "Add custom domain" tıklayın
3. Domain'inizi girin (örn: `tyhairdesign.com`)
4. DNS kayıtlarını güncelleyin:
   - Netlify'ın verdiği nameserver'ları kullanın
   - Veya A record ve CNAME ekleyin

## 🔒 SSL/HTTPS

Netlify otomatik olarak Let's Encrypt SSL certificate sağlar. Genellikle deploy'dan sonra 1-2 dakika içinde aktif olur.

## 📊 Analytics & Monitoring

### Netlify Analytics (Opsiyonel, Ücretli)
- Site Settings > Analytics > Enable analytics

### Google Analytics
Firebase Analytics otomatik olarak entegre edilmiştir (Firebase config ile).

## 🔄 Otomatik Deploy

### Git Push ile Otomatik Deploy

Netlify varsayılan olarak her git push'ta otomatik build yapar:

```bash
git add .
git commit -m "feat: Update feature"
git push origin main
```

### Branch Deploy

Farklı branch'ler için preview deploy:
- Feature branch push edildiğinde otomatik preview URL oluşur
- Örnek: `feature-branch--site-name.netlify.app`

## 🧪 Preview & Production

### Deploy Preview
- Pull request açıldığında otomatik preview deploy oluşur
- PR'daki "View deployment" linkinden erişilebilir

### Production Deploy
- `main` veya `master` branch'e merge edildiğinde production'a deploy olur

## 📝 Deploy Checklist

- [ ] Firebase projesi oluşturuldu
- [ ] Firebase config değerleri alındı
- [ ] Netlify hesabı oluşturuldu
- [ ] Repo Netlify'a bağlandı
- [ ] Environment variables eklendi
- [ ] Build settings yapılandırıldı
- [ ] İlk deploy başarılı
- [ ] SSL aktif
- [ ] Custom domain eklendi (opsiyonel)
- [ ] DNS kayıtları güncellendi (opsiyonel)

## 🐛 Debug Mode

Local'de production build'i test etmek için:

```bash
# Build
flutter build web --release

# Serve locally
cd build/web
python3 -m http.server 8000
# veya
npx serve .

# http://localhost:8000 adresinde test edin
```

## 📱 PWA Features

Uygulama Progressive Web App (PWA) olarak çalışır:
- Offline support
- Install prompt (mobil)
- App-like experience
- Push notifications (gelecekte)

Manifest dosyası: `web/manifest.json`

## 🔐 Güvenlik

### Firebase Security Rules

Firestore güvenlik kurallarını Firebase Console'dan ayarlayın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'barber' ||
         resource.data.customerUid == request.auth.uid);
    }

    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'barber';
    }
  }
}
```

### Environment Variables Güvenliği

- Asla environment variables'ı git'e commit etmeyin
- Netlify UI üzerinden ayarlayın
- Production ve preview için farklı values kullanabilirsiniz

## 📞 Destek

Sorun yaşarsanız:
1. Netlify Community Forums: https://answers.netlify.com
2. Flutter Discord: https://discord.gg/flutter
3. GitHub Issues: Repo'daki issues bölümü

## 🎉 Deployment Sonrası

Deploy başarılı olduğunda:
- URL'inizi test edin
- Mobile'da test edin
- Tüm özelliklerin çalıştığından emin olun
- Firebase Authentication ve Firestore'un çalıştığından emin olun
- WhatsApp linklerinin çalıştığından emin olun

**Tebrikler! Uygulamanız artık canlıda! 🚀**
