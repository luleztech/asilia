/**
 * Dr.Job - Icon wrapper (@expo/vector-icons Ionicons)
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ name, size = 22, color = '#64748b', style }) => (
  <Ionicons name={name} size={size} color={color} style={StyleSheet.flatten(style)} />
);

export default Icon;
export { Ionicons };
