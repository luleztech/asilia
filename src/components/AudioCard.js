/**
 * Asilia - Audio card (afyabora: play/lock icon, title, duration, PREMIUM badge)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONTS, SHADOW } from '../utils/constants';

export default function AudioCard({ title, onPress, isPlaying, duration, isPremium }) {
  return (
    <TouchableOpacity
      style={[styles.card, isPlaying && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrap}>
        {isPremium ? (
          <Ionicons name="lock-closed" size={18} color={COLORS.accentForeground} />
        ) : (
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={COLORS.primaryForeground}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.meta}>
          {duration ? (
            <View style={styles.durationRow}>
              <Ionicons name="time-outline" size={12} color={COLORS.mutedForeground} />
              <Text style={styles.duration}>{duration}</Text>
            </View>
          ) : null}
          {isPremium ? (
            <View style={styles.premBadge}>
              <Text style={styles.premText}>PREMIUM</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.card,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  content: { flex: 1 },
  title: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.cardForeground },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  duration: { fontSize: 12, color: COLORS.mutedForeground },
  premBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  premText: { fontSize: 10, fontWeight: FONTS.weight.bold, color: COLORS.accentForeground },
});
