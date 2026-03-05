/**
 * Dr.Job - Videos list
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { apiGetVideos } from '../services/api';
import { COLORS } from '../utils/constants';

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

  if (loading) return <Loading message="Inapakia video..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Video za afya</Text>
        <Text style={styles.subtitle}>Mafunzo ya video</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {list.map((v) => (
          <VideoCard
            key={v.id}
            title={v.title}
            description={v.description}
            thumbnail={v.thumbnail}
            onPress={() => {}}
          />
        ))}
        {list.length === 0 && <Text style={styles.empty}>Hakuna video.</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.card },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  empty: { fontSize: 15, color: COLORS.textSecondary },
});
