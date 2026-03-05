/**
 * Dr.Job - App navigator (tabs + stacks)
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchSymptomsScreen from '../screens/SearchSymptomsScreen';
import SymptomsResultScreen from '../screens/SymptomsResultScreen';
import DiseasesScreen from '../screens/DiseasesScreen';
import DiseaseDetailScreen from '../screens/DiseaseDetailScreen';
import HerbsScreen from '../screens/HerbsScreen';
import HerbDetailScreen from '../screens/HerbDetailScreen';
import VideosScreen from '../screens/VideosScreen';
import AudiosScreen from '../screens/AudiosScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import { COLORS } from '../utils/constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabIconText, focused && styles.tabIconTextActive]}>{label.charAt(0)}</Text>
  </View>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Nyumbani',
          tabBarIcon: ({ focused }) => <TabIcon label="Nyumbani" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="DiseasesTab"
        component={DiseasesScreen}
        options={{
          tabBarLabel: 'Magonjwa',
          tabBarIcon: ({ focused }) => <TabIcon label="Magonjwa" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="HerbsTab"
        component={HerbsScreen}
        options={{
          tabBarLabel: 'Dawa za Asili',
          tabBarIcon: ({ focused }) => <TabIcon label="Dawa" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="VideosTab"
        component={VideosScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: ({ focused }) => <TabIcon label="Video" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Wasifu',
          tabBarIcon: ({ focused }) => <TabIcon label="Wasifu" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="SearchSymptoms" component={SearchSymptomsScreen} />
        <Stack.Screen name="SymptomsResult" component={SymptomsResultScreen} />
        <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen} />
        <Stack.Screen name="HerbDetail" component={HerbDetailScreen} />
        <Stack.Screen name="Audios" component={AudiosScreen} />
        <Stack.Screen name="Premium" component={PremiumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    height: Platform.OS === 'ios' ? 88 : 64,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tabIconTextActive: {
    color: COLORS.primary,
  },
});
