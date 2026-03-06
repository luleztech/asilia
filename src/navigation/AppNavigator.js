/**
 * Dr.Job - App navigator (tabs + stacks)
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

import { COLORS, FONTS } from '../utils/constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  DiseasesTab: { active: 'medkit', inactive: 'medkit-outline' },
  HerbsTab: { active: 'leaf', inactive: 'leaf-outline' },
  VideosTab: { active: 'videocam', inactive: 'videocam-outline' },
  ProfileTab: { active: 'person', inactive: 'person-outline' },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Nyumbani',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={tabIcons.HomeTab[focused ? 'active' : 'inactive']}
              size={24}
              color={focused ? COLORS.primary : COLORS.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DiseasesTab"
        component={DiseasesScreen}
        options={{
          tabBarLabel: 'Magonjwa',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={tabIcons.DiseasesTab[focused ? 'active' : 'inactive']}
              size={24}
              color={focused ? COLORS.primary : COLORS.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HerbsTab"
        component={HerbsScreen}
        options={{
          tabBarLabel: 'Dawa za Asili',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={tabIcons.HerbsTab[focused ? 'active' : 'inactive']}
              size={24}
              color={focused ? COLORS.primary : COLORS.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="VideosTab"
        component={VideosScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={tabIcons.VideosTab[focused ? 'active' : 'inactive']}
              size={24}
              color={focused ? COLORS.primary : COLORS.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Wasifu',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={tabIcons.ProfileTab[focused ? 'active' : 'inactive']}
              size={24}
              color={focused ? COLORS.primary : COLORS.textSecondary}
            />
          ),
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
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 10,
    height: Platform.OS === 'ios' ? 88 : 68,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: FONTS.weight.medium,
  },
  tabBarIcon: {
    marginBottom: -2,
  },
});
