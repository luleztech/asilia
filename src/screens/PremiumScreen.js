import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useUser } from '../context';
import { PREMIUM_PRICE_LABEL, COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../utils/constants';

export default function PremiumScreen() {
  const nav = useNavigation();
  const { isPremium } = useUser();

  return (
    <View style={styles.container}>
      <Header title="Premium" onBack={() => nav.goBack()} />
      <View style={styles.card}>
        <View style={styles.badgeWrap}>
          <Ionicons name="diamond" size={28} color={COLORS.primary} />
        </View>
        <Text style={styles.badge}>PREMIUM</Text>
        <Text style={styles.title}>Fungua maudhui ya ziada</Text>
        <Text style={styles.desc}>Video, somo la sauti na kagua dalili za hali ya juu.</Text>
        <View style={styles.priceWrap}>
          <Text style={styles.price}>{PREMIUM_PRICE_LABEL}</Text>
        </View>
        {isPremium ? (
          <View style={styles.activeWrap}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.active}>Umefungua tayari.</Text>
          </View>
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
  card: {
    margin: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOW.card,
  },
  badgeWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  badge: { fontSize: 12, fontWeight: FONTS.weight.extrabold, color: COLORS.primary, letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: FONTS.size.xl, fontWeight: FONTS.weight.bold, color: COLORS.text, marginBottom: SPACING.sm, textAlign: 'center' },
  desc: { fontSize: FONTS.size.sm, color: COLORS.mutedForeground, textAlign: 'center', marginBottom: SPACING.lg },
  priceWrap: { marginBottom: SPACING.lg },
  price: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.primary },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    ...SHADOW.button,
  },
  btnText: { fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, color: '#fff' },
  activeWrap: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  active: { fontSize: FONTS.size.base, color: COLORS.success, fontWeight: FONTS.weight.semibold },
});
