import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BARBER_NAME, SALON_NAME } from '@/constants/services';
import { Gradients } from '@/constants/colors';

export default function BarberDashboard() {
  // Mock data - TODO: Firestore'dan çekilecek
  const stats = {
    today: 4,
    week: 18,
    pending: 2,
    revenue: 1200,
  };

  const todayAppointments = [
    { id: '1', customer: 'Ahmet Yılmaz', service: 'Saç Kesimi', time: '10:00', status: 'completed' },
    { id: '2', customer: 'Mehmet Demir', service: 'Saç + Sakal', time: '11:30', status: 'completed' },
    { id: '3', customer: 'Can Özkan', service: 'Cilt Bakımı', time: '14:00', status: 'pending' },
    { id: '4', customer: 'Emre Kaya', service: 'Saç Kesimi', time: '16:30', status: 'pending' },
  ];

  const recentActivity = [
    { id: '1', action: 'Yeni randevu', text: 'Ali Yılmaz randevu oluşturdu', time: '5 dk önce' },
    { id: '2', action: 'İptal', text: 'Veli Kara randevuyu iptal etti', time: '1 saat önce' },
    { id: '3', action: 'Tamamlandı', text: 'Ahmet Yılmaz randevusu tamamlandı', time: '2 saat önce' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: '#ff9800', label: 'Beklemede', bgColor: '#ff980020' };
      case 'completed':
        return { color: '#4caf50', label: 'Tamamlandı', bgColor: '#4caf5020' };
      case 'cancelled':
        return { color: '#f44336', label: 'İptal', bgColor: '#f4433620' };
      default:
        return { color: '#999', label: 'Bilinmiyor', bgColor: '#99920' };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={Gradients.dark} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Merhaba 👋</Text>
              <Text style={styles.barberName}>{BARBER_NAME}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#4caf5020', '#4caf5010']} style={styles.statGradient}>
              <Ionicons name="checkmark-circle" size={28} color="#4caf50" />
              <Text style={styles.statValue}>{stats.today}</Text>
              <Text style={styles.statLabel}>Bugün</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={['#2196f320', '#2196f310']} style={styles.statGradient}>
              <Ionicons name="calendar" size={28} color="#2196f3" />
              <Text style={styles.statValue}>{stats.week}</Text>
              <Text style={styles.statLabel}>Bu Hafta</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={['#ff980020', '#ff980010']} style={styles.statGradient}>
              <Ionicons name="time" size={28} color="#ff9800" />
              <Text style={styles.statValue}>{stats.pending}</Text>
              <Text style={styles.statLabel}>Beklemede</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={['#c9a96220', '#c9a96210']} style={styles.statGradient}>
              <Ionicons name="cash" size={28} color="#c9a962" />
              <Text style={styles.statValue}>{stats.revenue}₺</Text>
              <Text style={styles.statLabel}>Haftalık</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Today's Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bugünkü Randevular</Text>
            <Pressable onPress={() => router.push('/(barber)/appointments')}>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </Pressable>
          </View>
          <View style={styles.appointmentsList}>
            {todayAppointments.map((apt) => {
              const statusConfig = getStatusConfig(apt.status);
              return (
                <View key={apt.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentTime}>
                    <Text style={styles.timeText}>{apt.time}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.customerName}>{apt.customer}</Text>
                    <Text style={styles.serviceText}>{apt.service}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Ionicons name="notifications" size={20} color="#c9a962" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityText}>{activity.text}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 24 }} />
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
  barberName: {
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
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  seeAll: {
    fontSize: 14,
    color: '#c9a962',
    fontWeight: '500',
  },
  appointmentsList: {
    gap: 12,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  appointmentTime: {
    width: 60,
    paddingVertical: 8,
    backgroundColor: '#c9a96220',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9a962',
  },
  appointmentInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 12,
    color: '#999',
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
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c9a96220',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 12,
    color: '#c9a962',
    marginBottom: 2,
  },
  activityText: {
    fontSize: 14,
    color: '#ffffff',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});
