/**
 * Asilia - Herb card (afyabora: compact card with image on top)
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { truncate } from '../utils/helpers';
import { COLORS, RADIUS, SPACING, FONTS, SHADOW } from '../utils/constants';

export default function HerbCard({ name, benefits, image, onPress, grid }) {
  return (
    <TouchableOpacity style={[styles.card, grid && styles.cardGrid]} onPress={onPress} activeOpacity={0.85}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="leaf-outline" size={28} color={COLORS.primary} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{truncate(benefits || '', 50)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 144,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  cardGrid: {
    width: '100%',
    marginRight: 0,
  },
  image: { width: '100%', height: 80 },
  placeholder: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 10 },
  name: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.cardForeground },
  desc: { fontSize: 11, color: COLORS.mutedForeground, marginTop: 2 },
});
