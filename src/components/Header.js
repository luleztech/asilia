/**
 * Asilia - Header (default card style or primary variant for list/detail)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../utils/constants';

export default function Header({ title, onBack, rightAction, variant = 'default' }) {
  const insets = useSafeAreaInsets();
  const top = Math.max(insets.top, Platform.OS === 'android' ? 12 : 0);
  const isPrimary = variant === 'primary';

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + SPACING.sm },
        isPrimary && styles.containerPrimary,
      ]}
    >
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={[styles.backBtn, isPrimary && styles.backBtnPrimary]} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={isPrimary ? COLORS.primaryForeground : COLORS.text} />
          </TouchableOpacity>
        ) : <View style={styles.backPlaceholder} />}
        <Text style={[styles.title, isPrimary && styles.titlePrimary]} numberOfLines={1}>{title}</Text>
        {rightAction ? rightAction : <View style={styles.backPlaceholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  containerPrimary: {
    backgroundColor: COLORS.primary,
    borderBottomColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnPrimary: {
    backgroundColor: 'transparent',
  },
  backPlaceholder: { width: 40 },
  title: {
    flex: 1,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    textAlign: 'center',
  },
  titlePrimary: {
    color: COLORS.primaryForeground,
  },
});
