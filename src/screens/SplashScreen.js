/**
 * Dr.Job - Splash screen (logo + 3s then Home)
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, APP_NAME } from '../utils/constants';

export default function SplashScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const t = setTimeout(() => nav.replace('Main'), 3000);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>🩺</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Elimu ya afya - Dawa za asili</Text>
      </View>
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: { alignItems: 'center' },
  logo: { fontSize: 72, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.primary, letterSpacing: 0.5 },
  tagline: { fontSize: 14, color: COLORS.textSecondary, marginTop: 8 },
  spinner: { position: 'absolute', bottom: 48 },
});
