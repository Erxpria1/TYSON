import React, { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Animated,
  Platform,
  Text,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/lib/context/ThemeContext';

interface PremiumButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  disabled?: boolean;
  style?: ViewStyle;
}

export function PremiumButton({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: PremiumButtonProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const renderContent = () => {
    switch (variant) {
      case 'primary':
        return (
          <LinearGradient
            colors={theme.gradients.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            {children}
          </LinearGradient>
        );

      case 'secondary':
        return (
          <View
            style={[styles.buttonOutline, { borderColor: theme.colors.secondary }]}
          >
            {children}
          </View>
        );

      case 'whatsapp':
        return (
          <View
            style={[
              styles.whatsappButton,
              {
                backgroundColor:
                  theme.mode === 'dark' ? '#2a2a2a' : '#f0f0f0',
                borderColor: '#25D366',
              },
            ]}
          >
            {children}
          </View>
        );

      default:
        return children;
    }
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
      >
        {renderContent()}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#d4af37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonOutline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 16,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
  },
});
