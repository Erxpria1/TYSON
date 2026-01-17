# TY-HAIR DESIGN - Flutter Version

Bu proje, React Native Expo'dan Flutter'a dönüştürülmüş bir kuaför randevu sistemi uygulamasıdır.

## 🎯 Proje Özeti

**TY-HAIR DESIGN**, iki kullanıcı türüne hizmet veren bir mobil uygulama:

- **Müşteriler**: Randevu oluşturma, randevu geçmişini görüntüleme
- **Berberler (Admin)**: Tüm randevuları yönetme, müşteri listesini görüntüleme

Anonim kullanıcılar da WhatsApp üzerinden randevu alabilir (berber bu randevuları manuel olarak girer).

## 🚀 Kurulum

### Gereksinimler

- Flutter SDK (3.0 veya üzeri)
- Dart SDK
- Android Studio / Xcode (platform geliştirme için)
- Firebase projesi

### Adımlar

1. **Flutter SDK'yı kurun**
   ```bash
   # Flutter kurulumunu kontrol edin
   flutter doctor
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   flutter pub get
   ```

3. **Firebase Yapılandırması**

   Firebase Console'dan alacağınız bilgilerle `lib/config/firebase_config.dart` dosyasını güncelleyin:
   ```dart
   static const FirebaseOptions android = FirebaseOptions(
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   );
   ```

   **Alternatif olarak**, environment variables kullanarak çalıştırın:
   ```bash
   flutter run --dart-define=FIREBASE_API_KEY=your_api_key \
     --dart-define=FIREBASE_AUTH_DOMAIN=your_auth_domain \
     --dart-define=FIREBASE_PROJECT_ID=your_project_id \
     --dart-define=FIREBASE_STORAGE_BUCKET=your_storage_bucket \
     --dart-define=FIREBASE_MESSAGING_SENDER_ID=your_sender_id \
     --dart-define=FIREBASE_APP_ID=your_app_id
   ```

4. **Uygulamayı çalıştırın**
   ```bash
   # Android için
   flutter run

   # iOS için (Mac gerekli)
   flutter run -d ios

   # Web için
   flutter run -d chrome
   ```

## 📁 Proje Yapısı

```
lib/
├── main.dart                      # Uygulama giriş noktası
├── config/
│   ├── firebase_config.dart       # Firebase yapılandırması
│   └── theme.dart                 # Tema tanımlamaları
├── constants/
│   ├── colors.dart                # Renk sabitleri
│   └── services.dart              # Hizmet ve sabitler
├── models/
│   ├── user.dart                  # Kullanıcı modeli
│   ├── appointment.dart           # Randevu modeli
│   ├── service.dart               # Hizmet modeli
│   └── barber.dart                # Berber modeli
├── providers/
│   ├── auth_provider.dart         # Kimlik doğrulama state yönetimi
│   └── theme_provider.dart        # Tema state yönetimi
├── router/
│   └── app_router.dart            # Yönlendirme yapılandırması
├── screens/
│   ├── welcome_screen.dart        # Karşılama ekranı
│   ├── auth/                      # Kimlik doğrulama ekranları
│   │   ├── login_screen.dart
│   │   ├── register_screen.dart
│   │   └── barber_login_screen.dart
│   ├── customer/                  # Müşteri ekranları
│   │   ├── customer_dashboard_screen.dart
│   │   ├── customer_appointments_screen.dart
│   │   ├── new_appointment_screen.dart
│   │   ├── services_screen.dart
│   │   ├── whatsapp_booking_screen.dart
│   │   └── profile_screen.dart
│   └── barber/                    # Berber/Admin ekranları
│       ├── barber_dashboard_screen.dart
│       ├── barber_appointments_screen.dart
│       └── customers_screen.dart
└── widgets/
    ├── premium_button.dart        # Özel buton widget'ı
    ├── premium_logo.dart          # Logo widget'ı
    ├── theme_toggle.dart          # Tema değiştirici
    └── status_badge.dart          # Durum rozeti
```

## 🎨 Özellikler

### Müşteri Özellikleri
- ✅ Kullanıcı kaydı ve girişi
- ✅ Randevu oluşturma (hizmet, tarih, saat seçimi)
- ✅ Randevu listesini görüntüleme
- ✅ Hizmetleri görüntüleme
- ✅ WhatsApp ile randevu alma
- ✅ Profil yönetimi
- ✅ Açık/koyu tema desteği

### Berber/Admin Özellikleri
- ✅ Admin paneli
- ✅ Tüm randevuları görüntüleme ve filtreleme
- ✅ Müşteri listesi
- ✅ İstatistikler (bugün, bu hafta, bekleyen, gelir)
- ✅ Randevu durumu yönetimi

### Teknik Özellikler
- ✅ Firebase Authentication (e-posta/şifre)
- ✅ Cloud Firestore entegrasyonu
- ✅ Provider state yönetimi
- ✅ Go Router ile yönlendirme
- ✅ Responsive tasarım
- ✅ Türkçe dil desteği
- ✅ Material Design 3

## 🔥 Firebase Koleksiyonları

### `users`
```dart
{
  uid: string,
  email: string,
  name: string,
  phone: string,
  role: 'customer' | 'barber',
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

### `appointments`
```dart
{
  id: string,
  customerId: string,
  customerName: string,
  customerPhone: string,
  customerUid: string?,
  barberId: string,
  barberName: string,
  serviceId: string,
  serviceName: string,
  servicePrice: double,
  serviceDuration: int,
  date: timestamp,
  time: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  notes: string?,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

### `services`
```dart
{
  id: string,
  name: string,
  description: string?,
  price: double,
  duration: int,
  image: string?,
  isActive: bool,
  sortOrder: int,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: `#1a1a1a` (koyu)
- **Secondary/Gold**: `#c9a962` (altın vurgusu)
- **Background**: `#ffffff` (beyaz)
- **WhatsApp**: `#25D366`

### Fontlar
- **Başlıklar**: Playfair Display (Bold)
- **Gövde**: Montserrat (Regular, Semi-Bold)

## 🔧 Geliştirme Komutları

```bash
# Uygulamayı çalıştır
flutter run

# Release build (Android)
flutter build apk --release

# Release build (iOS)
flutter build ios --release

# Web build
flutter build web

# Test çalıştır
flutter test

# Kod analizi
flutter analyze

# Format kodu
flutter format .
```

## 📱 Platform Desteği

- ✅ Android
- ✅ iOS
- ✅ Web

## 🔒 Güvenlik

- Firebase Authentication ile güvenli kimlik doğrulama
- Rol tabanlı erişim kontrolü (müşteri/berber)
- Firestore güvenlik kuralları kullanın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // Appointments collection
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'barber' ||
         resource.data.customerUid == request.auth.uid);
    }

    // Services collection
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'barber';
    }
  }
}
```

## 🐛 Bilinen Sorunlar ve TODO

- [ ] Firestore entegrasyonunu tamamla (şu anda mock data kullanılıyor)
- [ ] Bildirim sistemi ekle
- [ ] Şifremi unuttum özelliği
- [ ] Randevu iptali ve güncelleme
- [ ] Push notifications
- [ ] Profil fotoğrafı yükleme
- [ ] Çoklu dil desteği (şu anda sadece Türkçe)

## 📄 Lisans

© 2024 TY-HAIR DESIGN. Tüm hakları saklıdır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce:

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Sorularınız için: [iletişim bilgileri]

## 🙏 Teşekkürler

Bu proje, orijinal React Native Expo uygulamasından Flutter'a dönüştürülmüştür.
