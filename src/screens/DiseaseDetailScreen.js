/**
 * Dr.Job - Disease detail (description, symptoms, causes, treatment, herbal)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { apiGetDisease } from '../services/api';
import { COLORS } from '../utils/constants';

function Block({ title, children }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      <Text style={styles.blockText}>{children}</Text>
    </View>
  );
}

export default function DiseaseDetailScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiGetDisease(id)
      .then((data) => setItem(data?.data || data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Inapakia..." />;
  if (!item) {
    return (
      <View style={styles.container}>
        <Header title="Maelezo" onBack={() => nav.goBack()} />
        <Text style={styles.empty}>Hakuna maelezo.</Text>
      </View>
    );
  }

  const name = item.name || 'Mgonjwa';
  const description = item.description || '';
  const symptoms = item.symptoms || '';
  const causes = item.causes || '';
  const treatment = item.treatment || item.hospital_treatment || '';
  const herbal = item.herbal_treatment || '';

  return (
    <View style={styles.container}>
      <Header title={name} onBack={() => nav.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
        ) : null}
        <Block title="Maelezo">{description || 'Hakuna maelezo.'}</Block>
        {symptoms ? <Block title="Dalili">{symptoms}</Block> : null}
        {causes ? <Block title="Sababu">{causes}</Block> : null}
        {treatment ? <Block title="Matibabu hospitalini">{treatment}</Block> : null}
        {herbal ? <Block title="Matibabu ya dawa za asili">{herbal}</Block> : null}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  heroImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 },
  block: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  blockText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  empty: { padding: 16, fontSize: 15, color: COLORS.textSecondary },
});
