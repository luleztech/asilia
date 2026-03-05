/**
 * Dr.Job - Herb / plant card
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { truncate } from '../utils/helpers';
import { COLORS } from '../utils/constants';

export default function HerbCard({ name, benefits, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrap}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🌿</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{truncate(benefits || '', 60)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrap: { width: 80, height: 80 },
  image: { width: '100%', height: '100%' },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { fontSize: 28 },
  content: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  desc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
});
