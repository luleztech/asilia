import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar, DiseaseCard, HerbCard, VideoCard, SectionTitle, Loading } from '../components';
import { apiGetDiseases, apiGetHerbs, apiGetVideos } from '../services/api';
import { COLORS } from '../utils/constants';

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
        <TouchableOpacity onPress={() => nav.navigate('SearchSymptoms')} activeOpacity={0.9}>
          <SearchBar placeholder="Tafuta dalili..." editable={false} />
        </TouchableOpacity>
        <SectionTitle title="Magonjwa maarufu" onSeeAll={() => nav.navigate('DiseasesTab')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {diseases.slice(0, 8).map((d) => (
            <View key={d.id} style={styles.hCard}>
              <DiseaseCard name={d.name} description={d.description} image={d.image} onPress={() => nav.navigate('DiseaseDetail', { id: d.id })} />
            </View>
          ))}
        </ScrollView>
        <SectionTitle title="Dawa za asili" onSeeAll={() => nav.navigate('HerbsTab')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {herbs.slice(0, 6).map((h) => (
            <View key={h.id} style={styles.hCard}>
              <HerbCard name={h.name} benefits={h.benefits} image={h.image} onPress={() => nav.navigate('HerbDetail', { id: h.id })} />
            </View>
          ))}
        </ScrollView>
        <SectionTitle title="Video za afya" onSeeAll={() => nav.navigate('VideosTab')} />
        <View style={styles.section}>
          {videos.slice(0, 2).map((v) => (
            <VideoCard key={v.id} title={v.title} description={v.description} thumbnail={v.thumbnail} onPress={() => {}} />
          ))}
        </View>
        <TouchableOpacity style={styles.cta} onPress={() => nav.navigate('Audios')} activeOpacity={0.9}>
          <Text style={styles.ctaEmoji}>🎧</Text>
          <View style={styles.ctaTxt}>
            <Text style={styles.ctaTitle}>Somo la sauti</Text>
            <Text style={styles.ctaSub}>Sikiliza mafunzo ya afya</Text>
          </View>
          <Text style={styles.ctaArr}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.premium} onPress={() => nav.navigate('Premium')} activeOpacity={0.9}>
          <Text style={styles.premBadge}>PREMIUM</Text>
          <Text style={styles.premTitle}>Fungua maudhui ya ziada</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  hList: { paddingRight: 16, paddingBottom: 8 },
  hCard: { width: 280, marginRight: 12 },
  section: { marginBottom: 16 },
  cta: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  ctaEmoji: { fontSize: 32, marginRight: 14 },
  ctaTxt: { flex: 1 },
  ctaTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  ctaSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  ctaArr: { fontSize: 20, color: COLORS.primary, fontWeight: '700' },
  premium: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  premBadge: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.9)', letterSpacing: 1, marginBottom: 6 },
  premTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },
});
