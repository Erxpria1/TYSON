import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '@/constants/colors';

export default function BarberAppointmentsScreen() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');

  // Mock data - TODO: Firestore'dan çekilecek
  const appointments = [
    {
      id: '1',
      customer: 'Ahmet Yılmaz',
      phone: '0555 123 4567',
      service: 'Saç Kesimi',
      date: '20 Ocak 2026',
      time: '10:00',
      status: 'confirmed' as const,
    },
    {
      id: '2',
      customer: 'Mehmet Demir',
      phone: '0555 987 6543',
      service: 'Saç + Sakal Paket',
      date: '20 Ocak 2026',
      time: '11:30',
      status: 'completed' as const,
    },
    {
      id: '3',
      customer: 'Can Özkan',
      phone: '0532 111 2233',
      service: 'Cilt Bakımı',
      date: '20 Ocak 2026',
      time: '14:00',
      status: 'pending' as const,
    },
    {
      id: '4',
      customer: 'Emre Kaya',
      phone: '0544 555 6677',
      service: 'Saç Kesimi',
      date: '21 Ocak 2026',
      time: '16:30',
      status: 'pending' as const,
    },
  ];

  const filters: Array<{ key: typeof filter; label: string }> = [
    { key: 'all', label: 'Tümü' },
    { key: 'pending', label: 'Beklemede' },
    { key: 'confirmed', label: 'Onaylı' },
    { key: 'completed', label: 'Tamamlanan' },
    { key: 'cancelled', label: 'İptal' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: '#ff9800', label: 'Beklemede', bgColor: '#ff980020' };
      case 'confirmed':
        return { color: '#4caf50', label: 'Onaylandı', bgColor: '#4caf5020' };
      case 'completed':
        return { color: '#2196f3', label: 'Tamamlandı', bgColor: '#2196f320' };
      case 'cancelled':
        return { color: '#f44336', label: 'İptal', bgColor: '#f4433620' };
      default:
        return { color: '#999', label: 'Bilinmiyor', bgColor: '#99920' };
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    // TODO: Firestore'da güncelleme
    Alert.alert('Başarılı', `Durum güncellendi: ${newStatus}`);
  };

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Randevular</Text>
        <Text style={styles.subtitle}>Tüm randevuları yönetin</Text>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScroll}
      >
        {filters.map((f) => (
          <Pressable
            key={f.key}
            style={[
              styles.filterChip,
              filter === f.key && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[
              styles.filterText,
              filter === f.key && styles.filterTextActive,
            ]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Appointments List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => {
            const statusConfig = getStatusConfig(apt.status);
            return (
              <View key={apt.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{apt.customer}</Text>
                    <Text style={styles.customerPhone}>{apt.phone}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.detailRow}>
                    <Ionicons name="cut" size={16} color="#999" />
                    <Text style={styles.detailText}>{apt.service}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>{apt.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>{apt.time}</Text>
                  </View>
                </View>

                {/* Actions */}
                {apt.status === 'pending' && (
                  <View style={styles.actions}>
                    <Pressable
                      style={styles.actionButtonReject}
                      onPress={() => handleStatusChange(apt.id, 'cancelled')}
                    >
                      <Ionicons name="close" size={20} color="#f44336" />
                      <Text style={styles.actionTextReject}>Reddet</Text>
                    </Pressable>
                    <Pressable
                      style={styles.actionButtonConfirm}
                      onPress={() => handleStatusChange(apt.id, 'confirmed')}
                    >
                      <LinearGradient
                        colors={Gradients.gold}
                        style={styles.confirmGradient}
                      >
                        <Ionicons name="checkmark" size={20} color="#1a1a1a" />
                        <Text style={styles.actionTextConfirm}>Onayla</Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                )}

                {apt.status === 'confirmed' && (
                  <View style={styles.actions}>
                    <Pressable
                      style={[styles.actionButtonComplete, { width: '100%' }]}
                      onPress={() => handleStatusChange(apt.id, 'completed')}
                    >
                      <Ionicons name="checkmark-done" size={20} color="#4caf50" />
                      <Text style={styles.actionTextComplete}>Tamamlandı</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#666" />
            <Text style={styles.emptyTitle}>Randevu bulunamadı</Text>
            <Text style={styles.emptyText}>Seçilen filtrede randevu yok</Text>
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
    paddingBottom: 16,
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
  filtersScroll: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterChipActive: {
    backgroundColor: '#c9a962',
    borderColor: '#c9a962',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  filterTextActive: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
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
  cardBody: {
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#ffffff',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButtonReject: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#f4433620',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  actionTextReject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f44336',
  },
  actionButtonConfirm: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  actionTextConfirm: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  actionButtonComplete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#4caf5020',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  actionTextComplete: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
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
