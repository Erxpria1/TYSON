import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/lib/context/AuthContext';
import { ActivityIndicator, View, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BarberLayout() {
  const { user, role, loading, initialCheckDone } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (initialCheckDone && !loading) {
      if (!user) {
        router.replace('/(auth)/barber-login');
      } else if (role !== 'barber') {
        router.replace('/(auth)/login');
      }
    }
  }, [initialCheckDone, loading, user, role]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c9a962" />
      </View>
    );
  }

  if (!user || role !== 'barber') {
    return null;
  }

  // iOS 18 Tab Bar styling - modern, refined
  const tabBarStyle = Platform.select({
    ios: {
      backgroundColor: 'rgba(28, 28, 30, 0.98)',
      borderTopColor: 'rgba(255, 255, 255, 0.06)',
      borderTopWidth: StyleSheet.hairlineWidth,
      height: 50 + insets.bottom,
      paddingBottom: insets.bottom,
      paddingTop: 6,
      paddingHorizontal: 8,
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
      paddingHorizontal: 8,
      elevation: 8,
    },
  });

  const labelStyle = Platform.select({
    ios: {
      fontSize: 10,
      fontWeight: '500' as const,
      marginTop: 2,
      letterSpacing: -0.2,
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
          tabBarActiveTintColor: '#c9a962',
          tabBarInactiveTintColor: Platform.select({
            ios: 'rgba(255, 255, 255, 0.3)',
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
            title: 'Dashboard',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
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
          name="customers"
          options={{
            title: 'Müşteriler',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'people' : 'people-outline'}
                size={Platform.OS === 'ios' ? 22 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Ayarlar',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
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
