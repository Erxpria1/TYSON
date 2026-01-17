import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SALON_NAME, BARBER_NAME, SERVICES } from '@/constants/services';
import { Gradients } from '@/constants/colors';
import { useAuth } from '@/lib/context/AuthContext';
import { Service } from '@/types';

export default function CustomerDashboard() {
  const { user, userData } = useAuth();
  const upcomingAppointments = [
    {
      id: '1',
      service: 'Saç Kesimi',
      date: '20 Ocak 2026',
      time: '14:00',
      status: 'confirmed',
    },
  ];

  const quickActions = [
    {
      id: '1',
      title: 'Yeni Randevu',
      icon: 'add-circle' as const,
      color: '#c9a962',
      route: '/(customer)/new-appointment',
    },
    {
      id: '2',
      title: 'Randevularım',
      icon: 'calendar' as const,
      color: '#4caf50',
      route: '/(customer)/appointments',
    },
    {
      id: '3',
      title: 'Hizmetler',
      icon: 'list' as const,
      color: '#2196f3',
      route: '/(customer)/services',
    },
    {
      id: '4',
      title: 'WhatsApp',
      icon: 'logo-whatsapp' as const,
      color: '#25D366',
      route: '/whatsapp',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={Gradients.dark} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Merhaba 👋</Text>
              <Text style={styles.userName}>{userData?.name || 'Hoş Geldiniz'}</Text>
            </View>
            <Pressable onPress={() => router.push('/(customer)/profile')}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#999" />
              </View>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Upcoming Appointment Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sıradaki Randevu</Text>
          {upcomingAppointments.length > 0 ? (
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View>
                  {(() => {
                    const svc = SERVICES.find((s: Service) => s.name === upcomingAppointments[0].service);
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
                          onError={(e) => console.warn('Dashboard image failed:', e.nativeEvent?.error)}
                        />
                      ) : (
                        <Image
                          source={svc.image as any}
                          style={styles.appointmentImage}
                          resizeMode="cover"
                          fadeDuration={300}
                          onError={(e) => console.warn('Dashboard local image failed:', e.nativeEvent?.error)}
                          {...(Platform.OS === 'ios' ? {
                            defaultSource: require('@/assets/icon.png'),
                          } : {})}
                        />
                      )
                    ) : (
                      <View style={styles.appointmentIcon}>
                        <Ionicons name="calendar" size={24} color="#c9a962" />
                      </View>
                    );
                  })()}
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Onaylandı</Text>
                </View>
              </View>
              <Text style={styles.appointmentService}>
                {upcomingAppointments[0].service}
              </Text>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#999" />
                  <Text style={styles.detailText}>{upcomingAppointments[0].date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#999" />
                  <Text style={styles.detailText}>{upcomingAppointments[0].time}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.noAppointment}>
              <Ionicons name="calendar-outline" size={48} color="#666" />
              <Text style={styles.noAppointmentText}>Yaklaşan randevu yok</Text>
              <Pressable
                style={styles.newAppointmentButton}
                onPress={() => router.push('/(customer)/new-appointment')}
              >
                <Text style={styles.newAppointmentButtonText}>Randevu Oluştur</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Salon Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salonumuz</Text>
          <View style={styles.salonCard}>
            <LinearGradient colors={Gradients.gold} style={styles.salonLogo}>
              <Ionicons name="cut" size={32} color="#1a1a1a" />
            </LinearGradient>
            <View style={styles.salonInfo}>
              <Text style={styles.salonName}>{SALON_NAME}</Text>
              <Text style={styles.barberName}>{BARBER_NAME}</Text>
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color="#c9a962" />
                <Ionicons name="star" size={16} color="#c9a962" />
                <Ionicons name="star" size={16} color="#c9a962" />
                <Ionicons name="star" size={16} color="#c9a962" />
                <Ionicons name="star" size={16} color="#c9a962" />
              </View>
            </View>
          </View>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#c9a96220',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#4caf5020',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4caf50',
  },
  appointmentService: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  appointmentDetails: {
    gap: 8,
  },
  appointmentImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#333',
    marginBottom: 8,
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
  noAppointment: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  noAppointmentText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    marginBottom: 16,
  },
  newAppointmentButton: {
    backgroundColor: '#c9a962',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  newAppointmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  salonCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  salonLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salonInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  barberName: {
    fontSize: 14,
    color: '#c9a962',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    gap: 4,
  },
});
