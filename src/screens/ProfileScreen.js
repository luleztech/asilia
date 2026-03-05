import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context';
import { COLORS } from '../utils/constants';

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Wasifu</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Jina</Text>
          <Text style={styles.value}>{user?.name || 'Mgeni'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Simu</Text>
          <Text style={styles.value}>{user?.phone || '—'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Usajili</Text>
          <Text style={styles.value}>{user?.subscription_status === 'active' ? 'Premium' : 'Kawaida'}</Text>
        </View>
      </View>
      {user ? (
        <TouchableOpacity style={styles.logout} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Toka</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.login} onPress={() => nav.navigate('Login')} activeOpacity={0.85}>
          <Text style={styles.loginText}>Ingia / Jisajili</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.premiumBtn} onPress={() => nav.navigate('Premium')} activeOpacity={0.85}>
        <Text style={styles.premiumBtnText}>Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.card },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  card: { margin: 16, backgroundColor: COLORS.card, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  label: { fontSize: 14, color: COLORS.textSecondary },
  value: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  logout: { marginHorizontal: 16, marginTop: 12, backgroundColor: COLORS.error, borderRadius: 12, padding: 14, alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  login: { marginHorizontal: 16, marginTop: 12, backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  loginText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  premiumBtn: { marginHorizontal: 16, marginTop: 8, backgroundColor: COLORS.card, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  premiumBtnText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },
});
