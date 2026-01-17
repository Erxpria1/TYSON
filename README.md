# TY-HAİR DESIGN

## Tarık Yalçın Hair Design - Berber Randevu Uygulaması

---

## 📋 Proje Özeti

Tam özellikli berber randevu sistemi. Müşteriler randevu oluşturabilir, berber randevuları yönetir.

### Kullanıcı Türleri

| Tür | Açıklama | Randevu Yöntemi |
|-----|----------|-----------------|
| **Anonim Müşteri** | Kayıt yok | WhatsApp → Berber manuel girer |
| **Kayıtlı Müşteri** | App üyeliği | App içi randevu |
| **Berber** | Admin paneli | Tüm randevuları yönetir |

---

## 🛠 Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | Expo SDK 54 (React Native) |
| **Backend** | Firebase |
| ├── Veritabanı | Firestore |
| ├── Kimlik | Firebase Auth |
| └── Bildirimler | FCM (Cloud Messaging) |
| **Bağımlılıklar** | React Navigation, Expo Router |

---

## 📱 Özellikler

### Müşteri Tarafı
- [ ] Randevu tarih/saat seçimi
- [ ] Berber/hizmet seçimi
- [ ] Kayıtlı kullanıcı girişi
- [ ] Randevu geçmişi
- [ ] Anonim kullanıcılar için WhatsApp yönlendirmesi

### Berber Tarafı (Admin Panel)
- [ ] Tüm randevuları görüntüleme
- [ ] Randevu onay/iptal işlemi
- [ ] Takvim görünümü
- [ ] Müşteri listesi
- [ ] Çalışma saatleri yönetimi

### Bildirimler
- [ ] Randevu onay bildirimi
- [ ] 24 saat önce hatırlatma
- [ ] 1 saat önce hatırlatma
- [ ] İptal bildirimi

---

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Expo CLI başlat (normal)
npx expo start

# Lokal `.env` kullanarak başlat (dotenv ile)
npm run start:env

# iOS Simulator (Mac'te)
# i tuşuna bas

# Android Emulator
# a tuşuna bas

# QR ile fiziksel cihaz
# Expo Go uygulamasını aç ve tara
```

## Güvenlik & Ortam Değişkenleri
- **Asla** gerçek anahtarları repoya commit etme. `.env` dosyası zaten `.gitignore` ile hariç tutulur; bir şablon olarak `.env.example` bulunur.
- Lokal geliştirme için `.env` dosyasına Firebase anahtarlarını koy ve `npm run start:env` ile başlat (yukarıda). Dokuma/production için CI/hosting sağlayıcısının ortam değişkenleri kullanılmalıdır (Vercel/Expo Application Services vb.).

---

## 📝 Todo

- [x] Proje yapısını oluştur
- [ ] Firebase kurulumu
- [ ] Giriş (Welcome) sayfası
- [ ] Auth ekranları (giriş/kayıt)
- [ ] Müşteri randevu formu
- [ ] Berber admin paneli
- [ ] Takvim bileşeni
- [ ] Bildirim entegrasyonu
- [ ] WhatsApp link yönlendirmesi

---

*Generated with Claude Code*
