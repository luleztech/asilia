/**
 * Asilia - Home (afyabora: primary header, search, Angalia Dalili CTA, sections)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar, DiseaseCard, HerbCard, VideoCard, SectionTitle } from '../components';
import Loading from '../components/Loading';
import { apiGetDiseases, apiGetHerbs, apiGetVideos } from '../services/api';
import { COLORS, SPACING, FONTS, RADIUS, SHADOW } from '../utils/constants';

export default function HomeScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [diseases, setDiseases] = useState([]);
  const [herbs, setHerbs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    Promise.all([
      apiGetDiseases().catch(() => []),
      apiGetHerbs().catch(() => []),
      apiGetVideos().catch(() => []),
    ]).then(([d, h, v]) => {
      if (c) return;
      setDiseases(Array.isArray(d) ? d : (d && d.data) ? d.data : []);
      setHerbs(Array.isArray(h) ? h : (h && h.data) ? h.data : []);
      setVideos(Array.isArray(v) ? v : (v && v.data) ? v.data : []);
    }).finally(() => { if (!c) setLoading(false); });
    return () => { c = true; };
  }, []);

  if (loading) return <Loading message="Inapakia..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Text style={styles.heroIcon}>🩺</Text>
            <Text style={styles.heroTitle}>Dr.Job</Text>
          </View>
          <Text style={styles.heroSub}>Msaada wako wa afya kila siku</Text>
          <TouchableOpacity onPress={() => nav.navigate('SearchSymptoms')} activeOpacity={0.9} style={styles.searchTouch}>
            <SearchBar placeholder="Tafuta dalili au ugonjwa..." editable={false} variant="onPrimary" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => nav.navigate('SearchSymptoms')} activeOpacity={0.9}>
          <View style={styles.ctaIconWrap}>
            <Text style={styles.ctaEmoji}>🩺</Text>
          </View>
          <View style={styles.ctaTxt}>
            <Text style={styles.ctaTitle}>Angalia Dalili</Text>
            <Text style={styles.ctaSub}>Chagua dalili zako, pata majibu haraka</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <SectionTitle title="Magonjwa Maarufu" onSeeAll={() => nav.navigate('DiseasesTab')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {diseases.slice(0, 8).map((d) => (
            <DiseaseCard
              key={d.id}
              name={d.name}
              description={d.description}
              image={d.image}
              onPress={() => nav.navigate('DiseaseDetail', { id: d.id })}
              compact
            />
          ))}
        </ScrollView>

        <SectionTitle title="Mitishamba" onSeeAll={() => nav.navigate('HerbsTab')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {herbs.slice(0, 6).map((h) => (
            <HerbCard
              key={h.id}
              name={h.name}
              benefits={h.benefits}
              image={h.image}
              onPress={() => nav.navigate('HerbDetail', { id: h.id })}
            />
          ))}
        </ScrollView>

        <SectionTitle title="Video za Afya" onSeeAll={() => nav.navigate('VideosTab')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {videos.slice(0, 4).map((v) => (
            <VideoCard
              key={v.id}
              title={v.title}
              description={v.description}
              thumbnail={v.thumbnail}
              isPremium={v.is_premium}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.audioCta} onPress={() => nav.navigate('Audios')} activeOpacity={0.9}>
          <View style={styles.audioIconWrap}>
            <Text style={styles.ctaEmoji}>🎧</Text>
          </View>
          <View style={styles.ctaTxt}>
            <Text style={styles.ctaTitle}>Sauti za Afya</Text>
            <Text style={styles.ctaSub}>Sikiliza mafunzo ya afya</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.premium} onPress={() => nav.navigate('Premium')} activeOpacity={0.9}>
          <Text style={styles.premEmoji}>💎</Text>
          <Text style={styles.premBadge}>PREMIUM</Text>
          <Text style={styles.premTitle}>Fungua maudhui ya ziada</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingBottom: SPACING.lg },
  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  heroIcon: { fontSize: 24 },
  heroTitle: { fontSize: FONTS.size.xl, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground },
  heroSub: { fontSize: FONTS.size.sm, color: 'rgba(255,255,255,0.8)', marginBottom: SPACING.md },
  searchTouch: { marginTop: 4 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  ctaIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  ctaTxt: { flex: 1 },
  ctaEmoji: { fontSize: 24 },
  chevron: { fontSize: 24, color: COLORS.primary, fontWeight: 'bold' },
  ctaTitle: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.text },
  ctaSub: { fontSize: 12, color: COLORS.mutedForeground, marginTop: 2 },
  hList: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.sm },
  audioCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOW.card,
  },
  audioIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  premium: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOW.button,
  },
  premEmoji: { fontSize: 20, marginBottom: SPACING.sm },
  premBadge: { fontSize: 11, fontWeight: FONTS.weight.extrabold, color: COLORS.accentForeground, letterSpacing: 1 },
  premTitle: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.accentForeground, marginTop: 2 },
});
