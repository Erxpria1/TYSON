import '../models/service.dart';
import '../models/barber.dart';

class AppConstants {
  // Salon Info
  static const String salonName = 'TY-HAİR DESIGN';
  static const String barberName = 'Tarık Yalçın';
  static const String whatsappNumber = '905335494014';
  static const String whatsappUrl = 'https://wa.me/$whatsappNumber';

  // App Version
  static const String appVersion = '1.0.0';

  // Services
  static final List<Service> services = [
    Service(
      id: 'sac-kesimi',
      name: 'Saç Kesimi',
      description: 'Profesyonel saç kesimi hizmeti',
      price: 150,
      duration: 30,
      isActive: true,
      sortOrder: 1,
    ),
    Service(
      id: 'sakal-kesimi',
      name: 'Sakal Kesimi',
      description: 'Özenli sakal tıraşı ve düzenleme',
      price: 80,
      duration: 20,
      isActive: true,
      sortOrder: 2,
    ),
    Service(
      id: 'sac-sakal-paket',
      name: 'Saç + Sakal Paket',
      description: 'Saç kesimi ve sakal tıraşı paketi',
      price: 200,
      duration: 45,
      isActive: true,
      sortOrder: 3,
    ),
    Service(
      id: 'cilt-bakimi',
      name: 'Cilt Bakımı',
      description: 'Yüz temizliği ve cilt bakımı',
      price: 100,
      duration: 25,
      isActive: true,
      sortOrder: 4,
    ),
    Service(
      id: 'tam-bakim-paket',
      name: 'Tam Bakım Paket',
      description: 'Saç, sakal ve cilt bakımı paketi',
      price: 280,
      duration: 60,
      isActive: true,
      sortOrder: 5,
    ),
  ];

  // Barbers
  static final List<Barber> barbers = [
    Barber(
      id: 'tarik-bey',
      name: 'Tarık Bey',
      isOwner: true,
      whatsappNumber: whatsappNumber,
    ),
    Barber(
      id: 'omer-jr',
      name: 'Ömer Jr',
      isOwner: false,
    ),
  ];

  // Time Slots
  static final List<String> timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  // Working Hours
  static const String workingHoursStart = '09:00';
  static const String workingHoursEnd = '18:00';

  // Date Format
  static const String dateFormat = 'dd MMMM yyyy EEEE';
  static const String timeFormat = 'HH:mm';
  static const String dateTimeFormat = 'dd.MM.yyyy HH:mm';
}
