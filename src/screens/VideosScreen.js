/**
 * Asilia - Videos list (afyabora: primary header "Video za Afya")
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { apiGetVideos } from '../services/api';
import { COLORS, SPACING, FONTS } from '../utils/constants';

export default function VideosScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetVideos()
      .then((data) => setList(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Inapakia..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.navigate('HomeTab')} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primaryForeground} />
        </TouchableOpacity>
        <Text style={styles.title}>Video za Afya</Text>
        <View style={styles.backBtn} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {list.map((v) => (
            <View key={v.id} style={styles.gridItem}>
              <VideoCard
                title={v.title}
                description={v.description}
                thumbnail={v.thumbnail}
                isPremium={v.is_premium}
                onPress={() => {}}
                grid
              />
            </View>
          ))}
        </View>
        {list.length === 0 && <Text style={styles.empty}>Hakuna video.</Text>}
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  gridItem: { width: '50%', padding: 6 },
  empty: { fontSize: FONTS.size.base, color: COLORS.mutedForeground },
});
