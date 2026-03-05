/**
 * Dr.Job - Swahili health education & symptom checker
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, UserProvider } from './src/context';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/constants';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.card} />
        <AuthProvider>
          <UserProvider>
            <AppNavigator />
          </UserProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
