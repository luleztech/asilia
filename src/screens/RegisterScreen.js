/**
 * Dr.Job - Register screen
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { AuthContext } from '../context';
import { COLORS } from '../utils/constants';

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
      <Header title="Jisajili" onBack={() => nav.goBack()} />
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Jina lako" placeholderTextColor={COLORS.textSecondary} value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Nambari ya simu" placeholderTextColor={COLORS.textSecondary} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Nenosiri" placeholderTextColor={COLORS.textSecondary} value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={styles.err}>{error}</Text> : null}
        <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
          <Text style={styles.btnText}>{loading ? 'Inasajili...' : 'Jisajili'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Login')}>
          <Text style={styles.link}>Una akaunti? Ingia</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { padding: 16 },
  input: { backgroundColor: COLORS.card, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  err: { color: COLORS.error, fontSize: 14, marginBottom: 8 },
  btn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 8 },
  btnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  link: { marginTop: 16, textAlign: 'center', fontSize: 14, color: COLORS.primary, fontWeight: '600' },
});
