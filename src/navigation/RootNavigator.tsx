import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import NotificationPage from '../features/notification/NotificationPage';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. 메인 화면 (탭 네비게이션) */}
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      
      {/* 2. 알림 화면 (스택으로 쌓임) */}
      <Stack.Screen name="Notification" component={NotificationPage} />
    </Stack.Navigator>
  );
}