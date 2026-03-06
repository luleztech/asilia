/**
 * Asilia - Symptom checker (afyabora: primary header, search, chips, Kagua button)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SymptomButton from '../components/SymptomButton';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { apiGetSymptoms, apiSymptomCheck } from '../services/api';
import { COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../utils/constants';

export default function SearchSymptomsScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    apiGetSymptoms()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data && data.data) ? data.data : (data && data.symptoms) ? data.symptoms : [];
        setSymptoms(list);
      })
      .catch(() => setSymptoms([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleSymptom = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCheck = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setChecking(true);
    try {
      const res = await apiSymptomCheck({ symptom_ids: ids });
      const list = (res && res.diseases) ? res.diseases : (res && res.data) ? res.data : [];
      nav.navigate('SymptomsResult', { diseases: list });
    } catch (e) {
      nav.navigate('SymptomsResult', { diseases: [], error: e.message });
    } finally {
      setChecking(false);
    }
  };

  const filtered = searchQuery.trim() ? symptoms.filter((s) => (s.name || '').toLowerCase().includes(searchQuery.toLowerCase())) : symptoms;

  if (loading) return <Loading message="Inapakia dalili..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primaryForeground} />
          </TouchableOpacity>
          <Text style={styles.title}>Angalia Dalili</Text>
          <View style={styles.backBtn} />
        </View>
        <View style={styles.searchWrap}>
          <SearchBar
            placeholder="Tafuta dalili..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            variant="onPrimary"
          />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.hint}>Chagua dalili zako ({selectedIds.size} zimechaguliwa)</Text>
        <View style={styles.chips}>
          {filtered.map((s) => (
            <SymptomButton key={s.id} label={s.name} selected={selectedIds.has(s.id)} onPress={() => toggleSymptom(s.id)} />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.submitBtn, (selectedIds.size === 0 || checking) && styles.submitDisabled]}
          onPress={handleCheck}
          disabled={selectedIds.size === 0 || checking}
          activeOpacity={0.85}
        >
          <Ionicons name="medkit" size={18} color={COLORS.primaryForeground} style={styles.submitIcon} />
          <Text style={styles.submitText}>{checking ? 'Inakagua...' : 'Kagua magonjwa yanayowezekana'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground },
  searchWrap: { marginTop: SPACING.sm },
  scroll: { flex: 1 },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  hint: { fontSize: FONTS.size.sm, color: COLORS.mutedForeground, marginBottom: SPACING.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.lg },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    ...SHADOW.button,
  },
  submitDisabled: { opacity: 0.5 },
  submitIcon: { marginRight: 8 },
  submitText: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.primaryForeground },
});
