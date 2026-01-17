import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SERVICES } from '@/constants/services';
import { Gradients } from '@/constants/colors';

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

export default function NewAppointmentScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const dates = generateDates();

  const handleConfirm = () => {
    if (!selectedService || !selectedTime) {
      Alert.alert('Hata', 'Lütfen hizmet ve saat seçiniz');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleCreateAppointment = async () => {
    setLoading(true);
    setShowConfirmModal(false);

    // TODO: Firestore'a randevu kaydetme buraya gelecek
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Başarılı',
        'Randevu oluşturuldu',
        [
          { text: 'Tamam', onPress: () => router.push('/(customer)/appointments') }
        ]
      );
    }, 1000);
  };

  const getSelectedDateStr = () => {
    const date = dates[selectedDate];
    return `${date.day}, ${date.dateNum} ${date.month} ${date.year}`;
  };

  const getSelectedServiceName = () => {
    if (!selectedService) return '';
    return SERVICES.find(s => s.id === selectedService)?.name || '';
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Yeni Randevu</Text>
          <Text style={styles.subtitle}>Hizmet, tarih ve saat seçin</Text>
        </View>

        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hizmet Seçin</Text>
          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <Pressable
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedService === service.id && styles.serviceCardSelected,
                ]}
                onPress={() => setSelectedService(service.id)}
              >
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>{service.price} ₺</Text>
                </View>
                <Text style={styles.serviceDuration}>{service.duration} dakika</Text>
                {service.description && (
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarih Seçin</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {dates.map((date, index) => (
              <Pressable
                key={index}
                style={[
                  styles.dateCard,
                  selectedDate === index && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text style={[
                  styles.dateDay,
                  selectedDate === index && styles.dateTextSelected,
                ]}>
                  {date.day}
                </Text>
                <Text style={[
                  styles.dateNum,
                  selectedDate === index && styles.dateTextSelected,
                ]}>
                  {date.dateNum}
                </Text>
                <Text style={[
                  styles.dateMonth,
                  selectedDate === index && styles.dateTextSelected,
                ]}>
                  {date.month}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saat Seçin</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <Pressable
                key={time}
                style={[
                  styles.timeCard,
                  selectedTime === time && styles.timeCardSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}>
                  {time}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleConfirm}
          disabled={loading}
        >
          <LinearGradient
            colors={loading ? ['#666', '#666'] : Gradients.gold}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Kaydediliyor...' : 'Randevu Oluştur'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* Confirm Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <Ionicons name="checkmark-circle" size={32} color="#c9a962" />
              </View>
              <Text style={styles.modalTitle}>Randevu Özeti</Text>
            </View>

            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Hizmet:</Text>
                <Text style={styles.summaryValue}>{getSelectedServiceName()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tarih:</Text>
                <Text style={styles.summaryValue}>{getSelectedDateStr()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Saat:</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButtonSecondary}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonPrimary}
                onPress={handleCreateAppointment}
              >
                <Text style={styles.modalButtonPrimaryText}>Onayla</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
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
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    width: '30%',
    height: 56,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  timeCardSelected: {
    borderColor: '#c9a962',
    backgroundColor: '#c9a96220',
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
  confirmButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#c9a96220',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  summary: {
    gap: 16,
    marginBottom: 24,
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
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  modalButtonPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#c9a962',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
