/**
 * Dr.Job - Herb detail (benefits, usage)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { apiGetHerb } from '../services/api';
import { COLORS } from '../utils/constants';

function Block({ title, children }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      <Text style={styles.blockText}>{children}</Text>
    </View>
  );
}

export default function HerbDetailScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiGetHerb(id)
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

  const name = item.name || 'Mmea';
  const benefits = item.benefits || '';
  const usage = item.usage_method || item.usage || '';

  return (
    <View style={styles.container}>
      <Header title={name} onBack={() => nav.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🌿</Text>
          </View>
        )}
        <Block title="Faida za kiafya">{benefits || 'Hakuna maelezo.'}</Block>
        {usage ? <Block title="Jinsi ya kutumia">{usage}</Block> : null}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  heroImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  placeholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  placeholderText: { fontSize: 64 },
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
