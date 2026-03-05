/**
 * Dr.Job - Selectable symptom button
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  btnSelected: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  textSelected: {
    color: COLORS.primaryDark,
  },
});
