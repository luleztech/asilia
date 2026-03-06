/**
 * Asilia - Audios (afyabora: primary header "Sauti za Afya", play/lock cards)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AudioCard from '../components/AudioCard';
import Loading from '../components/Loading';
import { apiGetAudios } from '../services/api';
import { COLORS, SPACING, FONTS } from '../utils/constants';

export default function AudiosScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    apiGetAudios()
      .then((data) => setList(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Inapakia..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primaryForeground} />
        </TouchableOpacity>
        <Text style={styles.title}>Sauti za Afya</Text>
        <View style={styles.backBtn} />
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {list.map((a) => (
          <AudioCard
            key={a.id}
            title={a.title}
            isPlaying={playingId === a.id}
            onPress={() => setPlayingId((prev) => (prev === a.id ? null : a.id))}
            duration={a.duration}
            isPremium={a.is_premium}
          />
        ))}
        {list.length === 0 && (
          <Text style={styles.empty}>Hakuna somo la sauti.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground },
  scroll: { flex: 1 },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  empty: { fontSize: FONTS.size.base, color: COLORS.mutedForeground },
});
