/**
 * Dr.Job - Audio lesson card
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function AudioCard({ title, onPress, isPlaying }) {
  return (
    <TouchableOpacity
      style={[styles.card, isPlaying && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{isPlaying ? '⏸' : '▶'}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '25',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});
