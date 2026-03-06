/**
 * Asilia - Disease card (afyabora: compact + full variants)
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { truncate } from '../utils/helpers';
import { COLORS, RADIUS, SPACING, FONTS, SHADOW } from '../utils/constants';

export default function DiseaseCard({ name, description, image, onPress, compact }) {
  const img = image;
  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.85}>
        {img ? (
          <Image source={{ uri: img }} style={styles.compactImage} resizeMode="cover" />
        ) : (
          <View style={styles.compactPlaceholder}>
            <Ionicons name="medkit-outline" size={28} color={COLORS.primary} />
          </View>
        )}
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
          <Text style={styles.compactDesc} numberOfLines={2}>{truncate(description || '', 50)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {img ? (
        <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="medkit-outline" size={32} color={COLORS.primary} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{truncate(description || '', 60)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.mutedForeground} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  compactCard: {
    width: 144,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  compactImage: { width: '100%', height: 80 },
  compactPlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactContent: { padding: 10 },
  compactName: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.cardForeground },
  compactDesc: { fontSize: 11, color: COLORS.mutedForeground, marginTop: 2 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    ...SHADOW.card,
  },
  image: { width: 64, height: 64, borderRadius: RADIUS.md },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, marginLeft: SPACING.sm, justifyContent: 'center' },
  name: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.text },
  desc: { fontSize: 12, color: COLORS.mutedForeground, marginTop: 2 },
});
