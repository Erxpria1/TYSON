import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function BarberCustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - TODO: Firestore'dan çekilecek
  const customers = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      phone: '0555 123 4567',
      email: 'ahmet@email.com',
      totalAppointments: 8,
      lastVisit: '15 Ocak 2026',
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      phone: '0555 987 6543',
      email: 'mehmet@email.com',
      totalAppointments: 5,
      lastVisit: '18 Ocak 2026',
    },
    {
      id: '3',
      name: 'Can Özkan',
      phone: '0532 111 2233',
      email: 'can@email.com',
      totalAppointments: 12,
      lastVisit: '10 Ocak 2026',
    },
    {
      id: '4',
      name: 'Emre Kaya',
      phone: '0544 555 6677',
      email: 'emre@email.com',
      totalAppointments: 3,
      lastVisit: '8 Ocak 2026',
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Müşteriler</Text>
        <Text style={styles.subtitle}>Toplam {customers.length} müşteri</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="İsim veya telefon ile ara..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={20}
            color="#999"
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      {/* Customers List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <View key={customer.id} style={styles.customerCard}>
              <View style={styles.customerHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <Text style={styles.customerPhone}>{customer.phone}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
              <View style={styles.customerStats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{customer.totalAppointments}</Text>
                  <Text style={styles.statLabel}>Randevu</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{customer.lastVisit}</Text>
                  <Text style={styles.statLabel}>Son Ziyaret</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#666" />
            <Text style={styles.emptyTitle}>Müşteri bulunamadı</Text>
            <Text style={styles.emptyText}>Başka bir arama terimi deneyin</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  customerCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#c9a962',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: '#999',
  },
  customerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#333',
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
