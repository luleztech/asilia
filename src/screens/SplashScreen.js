/**
 * Asilia - Splash (afyabora style: primary bg, logo, tagline)
 * Uses View + Text to avoid @expo/vector-icons load order issues.
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, APP_NAME, SPACING, FONTS } from '../utils/constants';

export default function SplashScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const t = setTimeout(() => nav.replace('Main'), 2500);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.logoWrap}>
        <View style={styles.logoIconWrap}>
          <Text style={styles.logoEmoji}>🩺</Text>
        </View>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Afya yako mikononi mwako</Text>
      </View>
      <ActivityIndicator size="small" color={COLORS.primaryForeground} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: { alignItems: 'center' },
  logoIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  logoEmoji: { fontSize: 40 },
  title: {
    fontSize: 30,
    fontWeight: FONTS.weight.extrabold,
    color: COLORS.primaryForeground,
    letterSpacing: 0.5,
  },
  tagline: { fontSize: FONTS.size.sm, color: 'rgba(255,255,255,0.7)', marginTop: SPACING.sm },
  spinner: { position: 'absolute', bottom: 48 },
});
