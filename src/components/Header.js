/**
 * Dr.Job - Reusable header
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../utils/constants';

export default function Header({ title, onBack, rightAction }) {
  const insets = useSafeAreaInsets();
  const top = Math.max(insets.top, Platform.OS === 'android' ? 12 : 0);

  return (
    <View style={[styles.container, { paddingTop: top + 8 }]}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : <View style={styles.backPlaceholder} />}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {rightAction ? (
          rightAction
        ) : <View style={styles.backPlaceholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 12,
    paddingHorizontal: 16,
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
  backText: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '600',
  },
  backPlaceholder: { width: 40 },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
});
