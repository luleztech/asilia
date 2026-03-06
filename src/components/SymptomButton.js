/**
 * Dr.Job - Selectable symptom button
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, FONTS } from '../utils/constants';

export default function SymptomButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.btn, selected && styles.btnSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  btnSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
  },
  textSelected: {
    color: COLORS.primaryForeground,
  },
});
