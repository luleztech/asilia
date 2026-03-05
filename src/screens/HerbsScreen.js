/**
 * Dr.Job - Herbs list
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HerbCard from '../components/HerbCard';
import Loading from '../components/Loading';
import { apiGetHerbs } from '../services/api';
import { COLORS } from '../utils/constants';

export default function HerbsScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetHerbs()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data?.data || [];
        setList(arr);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Inapakia dawa za asili..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Dawa za asili</Text>
        <Text style={styles.subtitle}>Mimea na matumizi yake</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {list.map((h) => (
          <HerbCard
            key={h.id}
            name={h.name}
            benefits={h.benefits}
            image={h.image}
            onPress={() => nav.navigate('HerbDetail', { id: h.id })}
          />
        ))}
        {list.length === 0 && (
          <Text style={styles.empty}>Hakuna dawa za asili kwa sasa.</Text>
        )}
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
