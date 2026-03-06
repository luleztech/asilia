/**
 * Asilia - Herb detail (afyabora: hero image, card with Faida / Jinsi ya kutumia)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import { apiGetHerb } from '../services/api';
import { COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../utils/constants';

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
        <View style={styles.headerMinimal}>
          <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.cardForeground} />
          </TouchableOpacity>
        </View>
        <Text style={styles.empty}>Hakuna maelezo.</Text>
      </View>
    );
  }

  const name = item.name || 'Mmea';
  const benefits = item.benefits || '';
  const usage = item.usage_method || item.usage || '';

  return (
    <View style={styles.container}>
      <View style={styles.heroWrap}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Ionicons name="leaf-outline" size={48} color={COLORS.primary} />
          </View>
        )}
        <View style={styles.heroOverlay} />
        <TouchableOpacity style={styles.backFloating} onPress={() => nav.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.cardForeground} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Block title="Faida za kiafya">{benefits || 'Hakuna maelezo.'}</Block>
          {usage ? <Block title="Jinsi ya kutumia">{usage}</Block> : null}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  heroWrap: { position: 'relative', height: 208 },
  heroImage: { width: '100%', height: '100%' },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  backFloating: {
    position: 'absolute',
    top: 48,
    left: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMinimal: { paddingTop: 48, paddingHorizontal: SPACING.md },
  scroll: { flex: 1 },
  content: { paddingHorizontal: SPACING.md, marginTop: -24 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOW.card,
  },
  cardTitle: { fontSize: FONTS.size.xl, fontWeight: FONTS.weight.bold, color: COLORS.cardForeground, marginBottom: SPACING.md },
  block: { marginBottom: SPACING.md },
  blockTitle: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold, color: COLORS.cardForeground, marginBottom: SPACING.sm },
  blockText: { fontSize: FONTS.size.sm, color: COLORS.mutedForeground, lineHeight: 22 },
  empty: { padding: SPACING.md, fontSize: FONTS.size.base, color: COLORS.mutedForeground },
});
