import React, { useMemo, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  PlayfairDisplay_700Bold
} from '@expo-google-fonts/playfair-display';
import {
  useFonts as useMontserratFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/montserrat';

import { useTheme } from '@/lib/context/ThemeContext';
import { useAuth } from '@/lib/context/AuthContext';
import { PremiumLogo } from '@/components/ui/PremiumLogo';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SALON_NAME, BARBER_NAME } from '@/constants/services';

export default function WelcomeScreen() {
  const { theme, isDark } = useTheme();
  const { user, loading, role } = useAuth();
  const { width, height } = useWindowDimensions();

  const logoSize = useMemo(() => Math.min(width, height) * 0.22, [width, height]);

  const [playfairLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });
  const [montserratLoaded] = useMontserratFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });
  const fontsLoaded = playfairLoaded && montserratLoaded;

  useEffect(() => {
    if (!loading && user) {
      const redirectPath = role === 'barber' ? '/(barber)/dashboard' : '/(customer)/dashboard';
      router.replace(redirectPath as any);
    }
  }, [loading, user, role]);

  const handleLoginPress = useCallback(() => router.replace('/(auth)/login' as any), []);
  const handleRegisterPress = useCallback(() => router.replace('/(auth)/register' as any), []);
  const handleWhatsAppPress = useCallback(() => router.replace('/whatsapp' as any), []);
  const handleBarberLoginPress = useCallback(() => router.replace('/(auth)/barber-login' as any), []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#1a1a1a' }]} edges={['top']}>
        <StatusBar style="light" />
        <LinearGradient colors={['#1a1a1a', '#0a0a0a']} style={styles.background} />
        <View style={styles.loadingContainer}>
          <View style={styles.loadingLogo}>
            <Ionicons name="cut" size={40} color="#d4af37" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <LinearGradient
        colors={theme.gradients.background}
        style={styles.background}
      />

      <ThemeToggle />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <PremiumLogo size={logoSize} />
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          {SALON_NAME}
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
          {BARBER_NAME}
        </Text>

        <Text style={[styles.tagline, { color: theme.colors.textLight }]}>
          Premium Hair Experience
        </Text>

        {/* Butonlar */}
        <View style={styles.buttonContainer}>
          <View>
            <PremiumButton
              variant="primary"
              onPress={handleLoginPress}
            >
              <Text style={[styles.buttonText, { color: '#1a1a1a' }]}>Giriş Yap</Text>
            </PremiumButton>
          </View>

          <View>
            <PremiumButton
              variant="secondary"
              onPress={handleRegisterPress}
            >
              <Text style={[styles.buttonText, { color: theme.colors.secondary }]}>Kayıt Ol</Text>
            </PremiumButton>
          </View>

          <View style={[styles.divider, { borderColor: theme.colors.border }]}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Text style={[styles.dividerText, { color: theme.colors.textLight }]}>veya</Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          <View>
            <PremiumButton
              variant="whatsapp"
              onPress={handleWhatsAppPress}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
              <Text style={styles.whatsappButtonText}>WhatsApp ile Randevu</Text>
            </PremiumButton>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.barberLink}>
          <Pressable
            style={({ pressed }) => [
              styles.barberLink,
              pressed && styles.barberLinkPressed,
            ]}
            onPress={handleBarberLoginPress}
          >
            <Ionicons name="shield-checkmark" size={16} color={theme.colors.secondary} />
            <Text style={[styles.barberLinkText, { color: theme.colors.secondary }]}>Berber Girişi</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: 2,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Montserrat_500Medium',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Montserrat_600SemiBold',
  },
  whatsappButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#25D366',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    fontFamily: 'Montserrat_500Medium',
  },
  barberLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  barberLinkPressed: {
    opacity: 0.7,
  },
  barberLinkText: {
    fontSize: 14,
    fontFamily: 'Montserrat_500Medium',
  },
});
