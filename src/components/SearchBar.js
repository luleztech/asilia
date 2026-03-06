/**
 * Asilia - Search bar (afyabora: card/15 on primary or default)
 */

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONTS, SHADOW } from '../utils/constants';

export default function SearchBar({
  placeholder = 'Tafuta...',
  value,
  onChangeText,
  onSubmit,
  onFocus,
  editable = true,
  variant = 'default',
}) {
  const isOnPrimary = variant === 'onPrimary';
  return (
    <View style={[styles.wrapper, isOnPrimary && styles.wrapperOnPrimary]}>
      <Ionicons
        name="search"
        size={18}
        color={isOnPrimary ? 'rgba(255,255,255,0.7)' : COLORS.mutedForeground}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, isOnPrimary && styles.inputOnPrimary]}
        placeholder={placeholder}
        placeholderTextColor={isOnPrimary ? 'rgba(255,255,255,0.5)' : COLORS.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        editable={editable}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 48,
    ...SHADOW.card,
  },
  wrapperOnPrimary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowOpacity: 0,
    elevation: 0,
  },
  icon: { marginRight: SPACING.sm },
  input: {
    flex: 1,
    fontSize: FONTS.size.sm,
    color: COLORS.text,
    paddingVertical: 0,
  },
  inputOnPrimary: { color: COLORS.primaryForeground },
});
