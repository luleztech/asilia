/**
 * Asilia - Video card (afyabora: thumbnail, play/lock overlay, premium badge)
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONTS, SHADOW } from '../utils/constants';

export default function VideoCard({ title, description, thumbnail, onPress, isPremium, grid }) {
  return (
    <TouchableOpacity style={[styles.card, grid && styles.cardGrid]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.thumbWrap}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumb} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="play-circle" size={40} color={COLORS.primaryForeground} />
          </View>
        )}
        <View style={styles.overlay}>
          {isPremium ? (
            <View style={styles.iconCircleAccent}>
              <Ionicons name="lock-closed" size={20} color={COLORS.accentForeground} />
            </View>
          ) : (
            <View style={styles.iconCircle}>
              <Ionicons name="play" size={20} color={COLORS.primaryForeground} />
            </View>
          )}
        </View>
        {isPremium ? (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 224,
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
  thumbWrap: { height: 112, position: 'relative' },
  thumb: { width: '100%', height: '100%' },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(22, 163, 74, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleAccent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  premiumText: { fontSize: 10, fontWeight: FONTS.weight.bold, color: COLORS.accentForeground },
  content: { padding: 10 },
  title: { fontSize: 12, fontWeight: FONTS.weight.semibold, color: COLORS.cardForeground },
});
