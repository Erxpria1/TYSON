import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const router = useRouter();

  const handleBack = () => {
    // Ana ekrana dön (index.tsx)
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#c9a962',
          headerTitleStyle: { fontWeight: '600' },
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBack}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#c9a962" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="barber-login" />
      </Stack>
    </>
  );
}
