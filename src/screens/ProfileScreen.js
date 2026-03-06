/**
 * Asilia - Profile (afyabora: Wasifu Wangu, avatar, login/premium/menu, logout)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../utils/constants';

function MenuItem({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <Ionicons name={icon} size={20} color={COLORS.mutedForeground} />
      <Text style={styles.menuLabel}>{label}</Text>
      {value ? <Text style={styles.menuValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color={COLORS.mutedForeground} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const auth = React.useContext(AuthContext);
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
    nav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Wasifu Wangu</Text>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={32} color={COLORS.primaryForeground} />
          </View>
          <View style={styles.avatarTxt}>
            <Text style={styles.userName}>{user?.name || 'Mgeni'}</Text>
            <Text style={styles.userSub}>
              {user ? user.phone || user.email || '—' : 'Bonyeza kuingia au kusajili'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        {!user && (
          <TouchableOpacity
            style={styles.loginCard}
            onPress={() => nav.navigate('Login')}
            activeOpacity={0.85}
          >
            <View style={styles.loginIconWrap}>
              <Ionicons name="log-in-outline" size={22} color={COLORS.primaryForeground} />
            </View>
            <View style={styles.loginTxt}>
              <Text style={styles.loginTitle}>Ingia au Sajili</Text>
              <Text style={styles.loginSub}>Fungua akaunti yako ya Dr.Job</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.mutedForeground} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => nav.navigate('Premium')}
          activeOpacity={0.85}
        >
          <View style={styles.premiumIconWrap}>
            <Ionicons name="diamond-outline" size={22} color={COLORS.accentForeground} />
          </View>
          <View style={styles.premiumTxt}>
            <Text style={styles.premiumTitle}>Jiunge na Premium</Text>
            <Text style={styles.premiumSub}>Tsh 2,000/mwezi - Fungua yaliyomo yote</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.mutedForeground} />
        </TouchableOpacity>

        <View style={styles.menuCard}>
          <MenuItem
            icon="call-outline"
            label="Nambari ya Simu"
            value={user?.phone || 'Haijawekwa'}
          />
          <MenuItem
            icon="headset-outline"
            label="Sauti za Afya"
            onPress={() => nav.navigate('Audios')}
          />
          <MenuItem
            icon="ribbon-outline"
            label="Hali ya Usajili"
            value={user?.subscription_status === 'active' ? 'Premium' : 'Bure'}
          />
        </View>

        {user && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.destructive} />
            <Text style={styles.logoutText}>Toka</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: SPACING.xl },
  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground, marginBottom: SPACING.md },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { flex: 1 },
  userName: { fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground },
  userSub: { fontSize: FONTS.size.sm, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  section: { padding: SPACING.md },
  loginCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.2)',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  loginIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  loginTxt: { flex: 1 },
  loginTitle: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.text },
  loginSub: { fontSize: 12, color: COLORS.mutedForeground, marginTop: 2 },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.2)',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  premiumIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  premiumTxt: { flex: 1 },
  premiumTitle: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.text },
  premiumSub: { fontSize: 12, color: COLORS.mutedForeground, marginTop: 2 },
  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  menuLabel: { flex: 1, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.medium, color: COLORS.cardForeground },
  menuValue: { fontSize: 12, color: COLORS.mutedForeground },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.md,
    ...SHADOW.card,
  },
  logoutText: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.medium, color: COLORS.destructive },
});
