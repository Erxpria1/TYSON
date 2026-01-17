import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/lib/context/AuthContext';
import { ActivityIndicator, View, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ServicesIcon, ServicesIconOutline, WhatsAppIcon, WhatsAppIconOutline } from '@/components/ui/TabIcons';

export default function CustomerLayout() {
  const { user, loading, initialCheckDone } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (initialCheckDone && !loading && !user) {
      router.replace('/(auth)/login');
    }
  }, [initialCheckDone, loading, user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c9a962" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  // iOS 18 Tab Bar styling - modern, refined
  const tabBarStyle = Platform.select({
    ios: {
      backgroundColor: 'rgba(28, 28, 30, 0.98)', // Slightly lighter, more opaque
      borderTopColor: 'rgba(255, 255, 255, 0.06)', // More subtle separator
      borderTopWidth: StyleSheet.hairlineWidth,
      height: 50 + insets.bottom, // Slightly taller for better touch targets
      paddingBottom: insets.bottom,
      paddingTop: 6,
      paddingHorizontal: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -1 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 0,
    },
    android: {
      backgroundColor: '#1a1a1a',
      borderTopColor: 'rgba(255, 255, 255, 0.06)',
      borderTopWidth: 1,
      height: 56 + insets.bottom,
      paddingBottom: insets.bottom,
      paddingTop: 8,
      paddingHorizontal: 4,
      elevation: 8,
    },
  });

  const labelStyle = Platform.select({
    ios: {
      fontSize: 10, // iOS standard caption 1
      fontWeight: '500' as const,
      marginTop: 2,
      letterSpacing: -0.2, // Slight letter spacing for modern look
    },
    android: {
      fontSize: 11,
      fontWeight: '500' as const,
      marginTop: 3,
      letterSpacing: 0,
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#c9a962', // Gold brand color
          tabBarInactiveTintColor: Platform.select({
            ios: 'rgba(255, 255, 255, 0.3)', // iOS secondary label (30% for modern look)
            android: 'rgba(255, 255, 255, 0.4)',
          }),
          tabBarStyle,
          tabBarLabelStyle: labelStyle,
          tabBarIconStyle: {
            marginTop: Platform.OS === 'ios' ? 2 : 0,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Ana Sayfa',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={Platform.OS === 'ios' ? 22 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: 'Randevular',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={Platform.OS === 'ios' ? 22 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new-appointment"
          options={{
            title: 'Yeni Randevu',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={Platform.OS === 'ios' ? 22 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: 'Hizmetler',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
              focused ? (
                <ServicesIcon size={Platform.OS === 'ios' ? 22 : 24} color={color} />
              ) : (
                <ServicesIconOutline size={Platform.OS === 'ios' ? 22 : 24} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="whatsapp"
          options={{
            title: 'WhatsApp',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
              focused ? (
                <WhatsAppIcon size={Platform.OS === 'ios' ? 22 : 24} color={color} />
              ) : (
                <WhatsAppIconOutline size={Platform.OS === 'ios' ? 22 : 24} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={Platform.OS === 'ios' ? 22 : 24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
