import React from 'react';
import { View, Text, Platform } from 'react-native'; // Platform 추가
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../features/home/HomePage';

// 👇 1. 이 훅을 새로 불러옵니다!
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{name}</Text>
    <Text style={{ color: '#888' }}>페이지 준비 중입니다 🛠️</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // 👇 2. 현재 기기의 안전 영역(Safe Area) 크기를 가져옵니다.
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
        
        // 👇 3. 스타일 수정 (여기가 핵심!)
        tabBarStyle: {
          // 높이: 기본 60 + 바닥 여백만큼 더해줌
          height: 50 + insets.bottom, 
          
          // 내부 여백: 바닥 여백이 있으면 그만큼 위로 띄워줌 (없으면 10)
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          backgroundColor: '#fff',
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 0,

          // 아이폰이 아니거나 여백이 없는 폰은 글자 위치 미세 조정
          marginBottom: insets.bottom > 0 ? 0 : 5, 
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          switch (route.name) {
            case '홈': iconName = focused ? 'home' : 'home-outline'; break;
            case '검색': iconName = focused ? 'search' : 'search-outline'; break;
            case '예약': iconName = focused ? 'calendar' : 'calendar-outline'; break;
            case 'AI상담': iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'; break;
            case '마이': iconName = focused ? 'person' : 'person-outline'; break;
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="홈" component={HomePage} />
      <Tab.Screen name="검색" children={() => <PlaceholderScreen name="검색" />} />
      <Tab.Screen name="예약" children={() => <PlaceholderScreen name="예약 내역" />} />
      <Tab.Screen name="AI상담" children={() => <PlaceholderScreen name="AI 멍멍 상담" />} />
      <Tab.Screen name="마이" children={() => <PlaceholderScreen name="마이페이지" />} />
    </Tab.Navigator>
  );
}