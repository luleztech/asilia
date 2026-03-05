/**
 * Dr.Job - Diseases list
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiseaseCard from '../components/DiseaseCard';
import Loading from '../components/Loading';
import { apiGetDiseases } from '../services/api';
import { COLORS } from '../utils/constants';

export default function DiseasesScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetDiseases()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data?.data || [];
        setList(arr);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Inapakia magonjwa..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Magonjwa</Text>
        <Text style={styles.subtitle}>Gusa kwa maelezo zaidi</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {list.map((d) => (
          <DiseaseCard
            key={d.id}
            name={d.name}
            description={d.description}
            image={d.image}
            onPress={() => nav.navigate('DiseaseDetail', { id: d.id })}
          />
        ))}
        {list.length === 0 && (
          <Text style={styles.empty}>Hakuna magonjwa kwa sasa.</Text>
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
