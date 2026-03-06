/**
 * Asilia - Section title (afyabora: title + "Ona Zote" link)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../utils/constants';

export default function SectionTitle({ title, onSeeAll }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll ? (
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} style={styles.seeAllBtn}>
          <Text style={styles.seeAll}>Ona Zote</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: FONTS.weight.medium,
    color: COLORS.primary,
  },
});
