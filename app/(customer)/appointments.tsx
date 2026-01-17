import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SERVICES } from '@/constants/services';
import { Service } from '@/types';

export default function AppointmentsScreen() {
  const appointments = [
    {
      id: '1',
      service: 'Saç Kesimi',
      date: '20 Ocak 2026',
      time: '14:00',
      status: 'confirmed' as const,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { color: '#4caf50', label: 'Onaylandı', bgColor: '#4caf5020' };
      case 'pending':
        return { color: '#ff9800', label: 'Beklemede', bgColor: '#ff980020' };
      case 'cancelled':
        return { color: '#f44336', label: 'İptal', bgColor: '#f4433620' };
      case 'completed':
        return { color: '#2196f3', label: 'Tamamlandı', bgColor: '#2196f320' };
      default:
        return { color: '#999', label: 'Bilinmiyor', bgColor: '#99920' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Randevularım</Text>
        <Text style={styles.subtitle}>Geçmiş ve yaklaşan randevularınız</Text>
      </View>

      {/* Appointments List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const statusConfig = getStatusConfig(appointment.status);
            return (
              <View key={appointment.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    {(() => {
                      const svc = SERVICES.find((s: Service) => s.name === appointment.service);
                      return svc?.image ? (
                        typeof svc.image === 'string' ? (
                          <Image
                            source={{
                              uri: svc.image,
                              cache: 'default',
                              headers: {
                                'Accept': 'image/*',
                                'User-Agent': 'Expo/1.0',
                              }
                            }}
                            style={styles.appointmentImage}
                            resizeMode="cover"
                            fadeDuration={300}
                            onError={(e) => console.warn('Appointments image failed:', e.nativeEvent?.error)}
                          />
                        ) : (
                          <Image
                            source={svc.image as any}
                            style={styles.appointmentImage}
                            resizeMode="cover"
                            fadeDuration={300}
                            onError={(e) => console.warn('Appointments local image failed:', e.nativeEvent?.error)}
                            {...(Platform.OS === 'ios' ? {
                              defaultSource: require('@/assets/icon.png'),
                            } : {})}
                          />
                        )
                      ) : (
                        <View style={styles.cardIcon}>
                          <Ionicons name="calendar" size={24} color="#c9a962" />
                        </View>
                      );
                    })()}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>
                <Text style={styles.service}>{appointment.service}</Text>
                <View style={styles.details}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>{appointment.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#666" />
            <Text style={styles.emptyTitle}>Henüz randevu yok</Text>
            <Text style={styles.emptyText}>İlk randevunuzu oluşturun</Text>
          </View>
        )}
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#c9a96220',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  service: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#999',
  },
  appointmentImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
