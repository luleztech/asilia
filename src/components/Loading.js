/**
 * Asilia - Loading spinner (afyabora style)
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from '../utils/constants';

export default function Loading({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  spinner: { marginBottom: SPACING.sm },
  text: {
    marginTop: SPACING.sm,
    fontSize: FONTS.size.sm,
    color: COLORS.mutedForeground,
  },
});
