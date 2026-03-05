/**
 * Dr.Job - Audio lessons (play in-app)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AudioCard from '../components/AudioCard';
import Loading from '../components/Loading';
import { apiGetAudios } from '../services/api';
import { COLORS } from '../utils/constants';

export default function AudiosScreen() {
  const nav = useNavigation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    apiGetAudios()
      .then((data) => setList(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Inapakia somo la sauti..." />;

  return (
    <View style={styles.container}>
      <Header title="Somo la sauti" onBack={() => nav.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {list.map((a) => (
          <AudioCard
            key={a.id}
            title={a.title}
            isPlaying={playingId === a.id}
            onPress={() => setPlayingId((prev) => (prev === a.id ? null : a.id))}
          />
        ))}
        {list.length === 0 && <Text style={styles.empty}>Hakuna somo la sauti.</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  empty: { fontSize: 15, color: COLORS.textSecondary },
});
