import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useUser } from '../context';
import { PREMIUM_PRICE_LABEL, COLORS } from '../utils/constants';

export default function PremiumScreen() {
  const nav = useNavigation();
  const { isPremium } = useUser();

  return (
    <View style={styles.container}>
      <Header title="Premium" onBack={() => nav.goBack()} />
      <View style={styles.card}>
        <Text style={styles.badge}>PREMIUM</Text>
        <Text style={styles.title}>Fungua maudhui ya ziada</Text>
        <Text style={styles.desc}>Video, somo la sauti na kagua dalili za hali ya juu.</Text>
        <View style={styles.priceWrap}>
          <Text style={styles.price}>{PREMIUM_PRICE_LABEL}</Text>
        </View>
        {isPremium ? (
          <Text style={styles.active}>Umefungua tayari.</Text>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => {}} activeOpacity={0.85}>
            <Text style={styles.btnText}>Lipa sasa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: { margin: 16, backgroundColor: COLORS.card, borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  badge: { fontSize: 12, fontWeight: '800', color: COLORS.primary, letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginBottom: 8, textAlign: 'center' },
  desc: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 20 },
  priceWrap: { marginBottom: 20 },
  price: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  btnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  active: { fontSize: 15, color: COLORS.success, fontWeight: '600' },
});
