import React, { useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Svg, Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/lib/context/ThemeContext';

interface PremiumLogoProps {
  size?: number;
}

// Generate unique IDs for each logo instance to prevent SVG gradient conflicts
let logoIdCounter = 0;
const getUniqueIds = () => {
  const id = logoIdCounter++;
  return {
    goldGradient: `goldGradient_${id}`,
    shineGradient: `shineGradient_${id}`,
  };
};

export function PremiumLogo({ size = 140 }: PremiumLogoProps) {
  const { theme } = useTheme();

  const ids = useMemo(getUniqueIds, []);

  const isDark = theme.mode === 'dark';
  const primaryGold = '#d4af37';
  const secondaryGold = '#c9a962';
  const darkBg = '#1a1a1a';

  return (
    <View style={[styles.container, Platform.select({
      ios: {
        shadowColor: primaryGold,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    })]}>
      <Svg width={size} height={size} viewBox="0 0 140 140">
        <Defs>
          {/* Gold gradient for scissors blade */}
          <SvgLinearGradient id={ids.goldGradient} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryGold} />
            <Stop offset="50%" stopColor={secondaryGold} />
            <Stop offset="100%" stopColor={primaryGold} />
          </SvgLinearGradient>

          {/* Subtle shine gradient */}
          <SvgLinearGradient id={ids.shineGradient} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </SvgLinearGradient>
        </Defs>

        {/* Background circle with ring */}
        <Circle
          cx="70"
          cy="70"
          r="65"
          fill="none"
          stroke={`url(#${ids.goldGradient})`}
          strokeWidth="2"
          opacity="0.3"
        />

        <Circle
          cx="70"
          cy="70"
          r="58"
          fill={isDark ? darkBg : '#ffffff'}
          stroke={`url(#${ids.goldGradient})`}
          strokeWidth="3"
        />

        {/* Premium Scissors Design */}
        {/* Left blade */}
        <Path
          d="M55 45 Q45 55 42 75 Q40 85 48 88 Q56 91 60 82 Q62 75 58 65 Q56 55 55 45"
          fill={`url(#${ids.goldGradient})`}
          stroke={primaryGold}
          strokeWidth="1"
        />

        {/* Right blade */}
        <Path
          d="M85 45 Q95 55 98 75 Q100 85 92 88 Q84 91 80 82 Q78 75 82 65 Q84 55 85 45"
          fill={`url(#${ids.goldGradient})`}
          stroke={primaryGold}
          strokeWidth="1"
        />

        {/* Pivot screw */}
        <Circle
          cx="70"
          cy="55"
          r="6"
          fill={darkBg}
          stroke={primaryGold}
          strokeWidth="2"
        />

        {/* Screw head detail */}
        <Circle
          cx="70"
          cy="55"
          r="2"
          fill={primaryGold}
        />

        {/* Left handle */}
        <Path
          d="M48 92 Q35 95 30 110 Q28 120 35 125 Q45 128 52 118 Q56 108 54 98 Q52 93 48 92"
          fill="none"
          stroke={`url(#${ids.goldGradient})`}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Right handle */}
        <Path
          d="M92 92 Q105 95 110 110 Q112 120 105 125 Q95 128 88 118 Q84 108 86 98 Q88 93 92 92"
          fill="none"
          stroke={`url(#${ids.goldGradient})`}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Handle finger holes */}
        <Circle
          cx="40"
          cy="115"
          r="8"
          fill="none"
          stroke={primaryGold}
          strokeWidth="2"
        />

        <Circle
          cx="100"
          cy="115"
          r="8"
          fill="none"
          stroke={primaryGold}
          strokeWidth="2"
        />

        {/* Decorative accent lines */}
        <Path
          d="M50 30 L70 25 L90 30"
          fill="none"
          stroke={primaryGold}
          strokeWidth="1.5"
          opacity="0.6"
        />

        <Path
          d="M55 25 L70 20 L85 25"
          fill="none"
          stroke={primaryGold}
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Shine overlay */}
        <Circle
          cx="70"
          cy="70"
          r="58"
          fill={`url(#${ids.shineGradient})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
