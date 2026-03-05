/**
 * Dr.Job - Symptom check result (possible diseases list)
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import DiseaseCard from '../components/DiseaseCard';
import { COLORS } from '../utils/constants';

export default function SymptomsResultScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const { diseases = [], error } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title="Matokeo ya dalili" onBack={() => nav.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : diseases.length === 0 ? (
          <Text style={styles.empty}>Hakuna matokeo. Ongeza dalili zaidi na jaribu tena.</Text>
        ) : (
          <>
            <Text style={styles.subtitle}>Magonjwa yanayowezekana (kwa mpangilio wa ufanano)</Text>
            {diseases.map((d) => (
              <DiseaseCard
                key={d.id || d.disease_id}
                name={d.name || d.disease_name}
                description={d.description || `Ufanano: ${d.match_score ?? d.score ?? '-'}%`}
                image={d.image}
                onPress={() => nav.navigate('DiseaseDetail', { id: d.id || d.disease_id })}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  empty: { fontSize: 15, color: COLORS.textSecondary },
  error: { fontSize: 15, color: COLORS.error },
});
