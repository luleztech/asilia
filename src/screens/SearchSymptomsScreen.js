import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SymptomButton from '../components/SymptomButton';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { apiGetSymptoms, apiSymptomCheck } from '../services/api';
import { COLORS } from '../utils/constants';

export default function SearchSymptomsScreen() {
  const nav = useNavigation();
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
    <View style={styles.container}>
      <Header title="Kagua dalili" onBack={() => nav.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SearchBar placeholder="Tafuta dalili" value={searchQuery} onChangeText={setSearchQuery} />
        <Text style={styles.hint}>Chagua dalili kisha bonyeza Kagua</Text>
        <View style={styles.chips}>
          {filtered.map((s) => (
            <SymptomButton key={s.id} label={s.name} selected={selectedIds.has(s.id)} onPress={() => toggleSymptom(s.id)} />
          ))}
        </View>
        <TouchableOpacity style={[styles.submitBtn, (selectedIds.size === 0 || checking) && styles.submitDisabled]} onPress={handleCheck} disabled={selectedIds.size === 0 || checking} activeOpacity={0.85}>
          <Text style={styles.submitText}>{checking ? 'Inakagua...' : 'Kagua magonjwa'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  hint: { fontSize: 13, color: COLORS.textSecondary, marginTop: 12, marginBottom: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  submitDisabled: { backgroundColor: COLORS.textSecondary, opacity: 0.7 },
  submitText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
