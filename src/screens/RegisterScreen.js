/**
 * Asilia - Register (afyabora auth style)
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOW } from '../utils/constants';

export default function RegisterScreen() {
  const nav = useNavigation();
  const auth = React.useContext(AuthContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !phone.trim() || !password) {
      setError('Jaza sehemu zote.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await auth.register(name.trim(), phone.trim(), password);
      nav.goBack();
    } catch (e) {
      setError(e?.message || 'Usajili haukufanikiwa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primaryForeground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sajili</Text>
        <View style={styles.backBtn} />
      </View>
      <Text style={styles.subtitle}>Fungua akaunti mpya ya Dr.Job.</Text>
      <View style={styles.form}>
        <View style={styles.inputWrap}>
          <Ionicons name="person-outline" size={18} color={COLORS.mutedForeground} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Jina lako" placeholderTextColor={COLORS.mutedForeground} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputWrap}>
          <Ionicons name="call-outline" size={18} color={COLORS.mutedForeground} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Nambari ya simu" placeholderTextColor={COLORS.mutedForeground} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={18} color={COLORS.mutedForeground} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Nenosiri" placeholderTextColor={COLORS.mutedForeground} value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        {error ? <Text style={styles.err}>{error}</Text> : null}
        <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
          <Text style={styles.btnText}>{loading ? 'Inaendelea...' : 'Sajili'}</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>
          Una akaunti tayari?{' '}
          <Text style={styles.link} onPress={() => nav.navigate('Login')}>Ingia</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg + 24,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: COLORS.primaryForeground },
  subtitle: { fontSize: FONTS.size.sm, color: COLORS.mutedForeground, paddingHorizontal: SPACING.md, marginTop: SPACING.md },
  form: { padding: SPACING.md },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  inputIcon: { marginRight: SPACING.sm },
  input: { flex: 1, paddingVertical: 14, fontSize: FONTS.size.sm, color: COLORS.text },
  err: { color: COLORS.destructive, fontSize: FONTS.size.sm, marginBottom: SPACING.sm },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
    ...SHADOW.button,
  },
  btnText: { fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: COLORS.primaryForeground },
  footer: { marginTop: SPACING.lg, textAlign: 'center', fontSize: FONTS.size.sm, color: COLORS.mutedForeground },
  link: { color: COLORS.primary, fontWeight: FONTS.weight.semibold },
});
