import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { BARBERS, SERVICES } from '@/constants/services';
import { Gradients } from '@/constants/colors';
import { Barber, Service, Appointment } from '@/types';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const generateDates = () => {
  const dates = [];
  const today = new Date();
  const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      fullDate: date,
      day: days[date.getDay()],
      dateNum: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    });
  }
  return dates;
};

type Step = 1 | 2 | 3 | 4 | 5;

export default function WhatsAppScreen() {
  const [step, setStep] = useState<Step>(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingAppointments, setFetchingAppointments] = useState(false);

  const dates = generateDates();
  const selectedDate = dates[selectedDateIdx];

  // Tarihteki randevuları çek
  useEffect(() => {
    if (selectedBarber && step >= 3) {
      fetchAppointments();
    }
  }, [selectedBarber, selectedDateIdx]);

  const fetchAppointments = async () => {
    if (!selectedBarber) return;

    setFetchingAppointments(true);
    try {
      const dateStr = `${selectedDate.dateNum} ${selectedDate.month} ${selectedDate.year}`;

      const q = query(
        collection(db, 'appointments'),
        where('barberId', '==', selectedBarber.id),
        where('date', '==', dateStr),
        where('status', '!=', 'cancelled')
      );

      const querySnapshot = await getDocs(q);
      const aptList: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        aptList.push({ id: doc.id, ...doc.data() } as Appointment);
      });

      setAppointments(aptList);
    } catch (error) {
      console.error('Randevular çekilemedi:', error);
      // Hata durumunda boş liste ile devam et
      setAppointments([]);
    } finally {
      setFetchingAppointments(false);
    }
  };

  const isTimeAvailable = (time: string) => {
    return !appointments.some(
      apt => apt.time === time && apt.status !== 'cancelled'
    );
  };

  const getNextStep = () => {
    if (step === 1 && selectedBarber) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3 && selectedTime) setStep(4);
    else if (step === 4 && selectedService) setStep(5);
    else if (step === 5 && customerName.trim()) openWhatsApp();
  };

  const getPreviousStep = () => {
    if (step === 1) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push('/(customer)/dashboard');
      }
    } else if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const openWhatsApp = () => {
    const dateStr = `${selectedDate.day}, ${selectedDate.dateNum} ${selectedDate.month} ${selectedDate.year}`;

    const message = `Merhaba ${selectedBarber!.name},

Randevu talebi:
📅 Tarih: ${dateStr}
⏰ Saat: ${selectedTime}
✂️ Hizmet: ${selectedService!.name} (${selectedService!.price} TL)
👤 Müşteri: ${customerName.trim()}

Randevunuzu onaylayabilir misiniz?`;

    const url = `https://wa.me/905xxxxxxxxx?text=${encodeURIComponent(message)}`;

    Alert.alert(
      'WhatsApp\'a Yönlendiriliyorsunuz',
      'Randevu talebiniz WhatsApp üzerinden iletilecek.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Tamam',
          onPress: () => {
            import('expo-linking').then((mod) => {
              const openURL = (mod as any).default?.openURL ?? (mod as any).openURL;
              if (openURL) {
                (openURL as (u: string) => Promise<any>)(url).catch((err: unknown) => {
                  console.error('WhatsApp açılamadı:', err);
                  Alert.alert('Hata', 'WhatsApp açılamadı. Lütfen manuel olarak deneyin.');
                });
              } else {
                Alert.alert('Hata', 'WhatsApp açılamadı. Lütfen manuel olarak deneyin.');
              }
            });
          }
        }
      ]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderBarberSelection();
      case 2:
        return renderDateSelection();
      case 3:
        return renderTimeSelection();
      case 4:
        return renderServiceSelection();
      case 5:
        return renderCustomerInfo();
      default:
        return null;
    }
  };

  const renderBarberSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Berber Seçin</Text>
      <Text style={styles.stepSubtitle}>Randevu almak istediğiniz berberi seçin</Text>

      <View style={styles.barberGrid}>
        {BARBERS.map((barber) => (
          <Pressable
            key={barber.id}
            style={({ pressed }) => [
              styles.barberCard,
              selectedBarber?.id === barber.id && styles.barberCardSelected,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setSelectedBarber(barber)}
          >
            <View style={styles.barberIcon}>
              <FontAwesome name="user" size={32} color={selectedBarber?.id === barber.id ? '#c9a962' : '#999'} />
            </View>
            <Text style={styles.barberName}>{barber.name}</Text>
            <Text style={styles.barberRole}>{barber.isOwner ? 'İşletme Sahibi' : 'Berber'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderDateSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Tarih Seçin</Text>
      <Text style={styles.stepSubtitle}>Randevu tarihinizi seçin</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesScroll}
      >
        {dates.map((date, idx) => (
          <Pressable
            key={idx}
            style={({ pressed }) => [
              styles.dateCard,
              selectedDateIdx === idx && styles.dateCardSelected,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setSelectedDateIdx(idx)}
          >
            <Text style={[styles.dateDay, selectedDateIdx === idx && styles.dateTextSelected]}>
              {date.day}
            </Text>
            <Text style={[styles.dateNum, selectedDateIdx === idx && styles.dateTextSelected]}>
              {date.dateNum}
            </Text>
            <Text style={[styles.dateMonth, selectedDateIdx === idx && styles.dateTextSelected]}>
              {date.month}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.selectedDateInfo}>
        <FontAwesome name="calendar" size={16} color="#c9a962" />
        <Text style={styles.selectedDateText}>
          Seçili: {selectedDate.day}, {selectedDate.dateNum} {selectedDate.month} {selectedDate.year}
        </Text>
      </View>
    </View>
  );

  const renderTimeSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Saat Seçin</Text>
      <Text style={styles.stepSubtitle}>
        {selectedDate.day}, {selectedDate.dateNum} {selectedDate.month} için uygun saat
      </Text>

      {fetchingAppointments ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c9a962" />
          <Text style={styles.loadingText}>Müsaitlik kontrol ediliyor...</Text>
        </View>
      ) : (
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => {
            const available = isTimeAvailable(time);
            return (
              <Pressable
                key={time}
                style={({ pressed }) => [
                  styles.timeCard,
                  selectedTime === time && styles.timeCardSelected,
                  !available && styles.timeCardDisabled,
                  pressed && available && styles.buttonPressed,
                ]}
                onPress={() => available && setSelectedTime(time)}
                disabled={!available}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.timeTextSelected]}>
                  {time}
                </Text>
                {!available && (
                  <View style={styles.timeBadge}>
                    <FontAwesome name="close" size={12} color="#ff4444" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      {!fetchingAppointments && appointments.filter(a => a.status !== 'cancelled').length > 0 && (
        <Text style={styles.appointmentsHint}>
          {appointments.filter(a => a.status !== 'cancelled').length} randevu dolu
        </Text>
      )}
    </View>
  );

  const renderServiceSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Hizmet Seçin</Text>
      <Text style={styles.stepSubtitle}>Hangi hizmeti almak istersiniz?</Text>

      <ScrollView style={styles.servicesScroll}>
        <View style={styles.servicesGrid}>
          {SERVICES.map((service: Service) => (
            <Pressable
              key={service.id}
              style={({ pressed }) => [
                styles.serviceCard,
                selectedService?.id === service.id && styles.serviceCardSelected,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price} TL</Text>
              </View>
              <Text style={styles.serviceDuration}>⏱ {service.duration} dakika</Text>
              {service.description && (
                <Text style={styles.serviceDescription}>{service.description}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderCustomerInfo = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Bilgileriniz</Text>
      <Text style={styles.stepSubtitle}>Randevu için adınızı girin</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#c9a962" />
        <TextInput
          style={styles.input}
          placeholder="Adınız Soyadınız"
          placeholderTextColor="#666"
          value={customerName}
          onChangeText={setCustomerName}
          autoFocus
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Randevu Özeti</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Berber:</Text>
          <Text style={styles.summaryValue}>{selectedBarber!.name}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tarih:</Text>
          <Text style={styles.summaryValue}>
            {selectedDate.day}, {selectedDate.dateNum} {selectedDate.month}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Saat:</Text>
          <Text style={styles.summaryValue}>{selectedTime}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Hizmet:</Text>
          <Text style={styles.summaryValue}>{selectedService!.name}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tutar:</Text>
          <Text style={styles.summaryValue}>{selectedService!.price} TL</Text>
        </View>
      </View>
    </View>
  );

  const getStepTitle = () => {
    const titles = {
      1: 'Berber Seçimi',
      2: 'Tarih Seçimi',
      3: 'Saat Seçimi',
      4: 'Hizmet Seçimi',
      5: 'Bilgiler',
    };
    return titles[step];
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedBarber;
      case 2:
        return true;
      case 3:
        return !!selectedTime;
      case 4:
        return !!selectedService;
      case 5:
        return customerName.trim().length > 0;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    if (step === 5) return 'WhatsApp\'a Git';
    return 'Devam';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.dark} style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={getPreviousStep} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.progressIndicator}>
            {[1, 2, 3, 4, 5].map((s) => (
              <View
                key={s}
                style={[
                  styles.progressDot,
                  s === step && styles.progressDotActive,
                  s < step && styles.progressDotCompleted,
                ]}
              />
            ))}
          </View>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.whatsappIcon}>
            <FontAwesome name="whatsapp" size={32} color="#25D366" />
          </View>
        </View>

        <Text style={styles.title}>WhatsApp ile Randevu</Text>
        <Text style={styles.currentStep}>{getStepTitle()}</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            !canProceed() && styles.continueButtonDisabled,
            pressed && canProceed() && styles.buttonPressed,
          ]}
          onPress={getNextStep}
          disabled={!canProceed() || loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'İşleniyor...' : getButtonText()}
          </Text>
          {step !== 5 && (
            <Ionicons name="arrow-forward" size={20} color="#1a1a1a" />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
  },
  progressIndicator: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  progressDotActive: {
    backgroundColor: '#c9a962',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#c9a962',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  whatsappIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#25D36620',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  currentStep: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },

  // Barber Selection
  barberGrid: {
    gap: 16,
  },
  barberCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  barberCardSelected: {
    borderColor: '#c9a962',
    backgroundColor: '#c9a96210',
  },
  barberIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  barberName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  barberRole: {
    fontSize: 14,
    color: '#999',
  },

  // Date Selection
  datesScroll: {
    gap: 12,
    paddingHorizontal: 4,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  dateCardSelected: {
    borderColor: '#c9a962',
    backgroundColor: '#c9a96220',
  },
  dateDay: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  dateNum: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  dateMonth: {
    fontSize: 12,
    color: '#999',
  },
  dateTextSelected: {
    color: '#c9a962',
  },
  selectedDateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c9a962',
  },
  selectedDateText: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },

  // Time Selection
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    width: '31%',
    height: 56,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  timeCardSelected: {
    borderColor: '#c9a962',
    backgroundColor: '#c9a96220',
  },
  timeCardDisabled: {
    opacity: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  timeTextSelected: {
    color: '#c9a962',
    fontWeight: '600',
  },
  timeBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff444420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentsHint: {
    fontSize: 12,
    color: '#ff4444',
    marginTop: 12,
    textAlign: 'center',
  },

  // Service Selection
  servicesScroll: {
    maxHeight: 400,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  serviceCardSelected: {
    borderColor: '#c9a962',
    backgroundColor: '#c9a96210',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#c9a962',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },

  // Customer Info
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  summaryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#c9a962',
    gap: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#999',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  continueButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#c9a962',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
