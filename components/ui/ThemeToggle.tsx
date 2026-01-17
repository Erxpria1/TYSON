import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, View, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/lib/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TOGGLE_WIDTH = 70;
const TOGGLE_HEIGHT = 36;
const THUMB_SIZE = 28;

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const translateX = useRef(
    new Animated.Value(isDark ? 0 : TOGGLE_WIDTH - THUMB_SIZE - 4)
  ).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isDark ? 0 : TOGGLE_WIDTH - THUMB_SIZE - 4,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [isDark]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    toggleTheme();
  };

  return (
    <Pressable onPress={handlePress} style={[styles.container, { top: insets.top + 12 }]}>
      <Animated.View style={[styles.toggle, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={
            isDark
              ? ['#1a1a1a', '#0a0a0a']
              : ['#f0f0f0', '#e0e0e0']
          }
          style={[styles.track, { borderColor: theme.colors.border }]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: isDark ? '#d4af37' : '#c9a962',
            },
          ]}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={16}
            color={isDark ? '#1a1a1a' : '#ffffff'}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
  },
  toggle: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: TOGGLE_HEIGHT / 2,
    borderWidth: 1,
  },
  thumb: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
