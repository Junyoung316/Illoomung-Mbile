import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AsyncBoundary } from '../../shared/components/AsyncBoundary';
import { useNotifications } from './hooks/useNotifications';
import { NotificationItem } from './api/getNotifications';

const getIconConfig = (type: string) => {
  switch (type) {
    case 'reservation': return { name: 'notifications', color: '#FF6B00' };
    case 'coupon': return { name: 'pricetag', color: '#4169E1' };
    default: return { name: 'information', color: '#888' };
  }
};

// ---------------------------------------------------------
// 1. 실제 데이터를 보여주는 내부 컴포넌트
// ---------------------------------------------------------
const NotificationList = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // 👇 훅 사용! (데이터가 없으면 여기서 멈추고 로딩 화면으로 전환됨)
  const { data: notifications, refetch } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  // 당겨서 새로고침 로직
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconConfig = getIconConfig(item.type);
    return (
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: iconConfig.color }]}>
          <Ionicons name={iconConfig.name} size={24} color="#fff" />
        </View>
        <View style={styles.contentBox}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      
      {/* 헤더 */}
      <View style={{ backgroundColor: '#fff', paddingTop: insets.top }}>
        <View style={styles.headerToolbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>알림 센터</Text>
          <TouchableOpacity style={styles.textButton}>
            <Text style={styles.readAllText}>모두 읽음</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 리스트 (API 데이터 연결됨) */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        
        style={{ flex: 1, backgroundColor: 'transparent' }} // 투명 배경 유지
        
        contentContainerStyle={{ 
          paddingHorizontal: 20,
          
          // 👇 1. ListHeaderComponent 대신 여기서 적당한 여백(12px)을 줍니다.
          // 20px는 너무 넓어서 스피너가 위로 쏠려 보였던 겁니다.
          paddingTop: 12, 
          
          paddingBottom: insets.bottom + 20, 
        }}
        
        // 👇 2. 아까 추가했던 강제 여백(Spacer) 컴포넌트는 삭제합니다!
        // ListHeaderComponent={<View style={{ height: 20 }} />}  <-- 삭제
        
        showsVerticalScrollIndicator={false}
        
        // iOS 스크롤 동작 최적화 (헤더 영역 간섭 방지)
        contentInsetAdjustmentBehavior="never"
        
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#FF6B00"
            colors={['#FF6B00']}
          />
        }
      />
    </View>
  );
};

export default function NotificationPage() {
  return (
    <AsyncBoundary>
      <NotificationList />
    </AsyncBoundary>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  
  // ⭐️ 툴바 스타일 (높이 50으로 고정하여 컴팩트하게 만듦)
  headerToolbar: {
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  
  headerTitle: { 
    fontSize: 17, // 글자 크기 살짝 조정
    fontWeight: 'bold', 
    color: '#111' 
  },
  readAllText: { 
    fontSize: 14, 
    color: '#FF6B00', 
    fontWeight: '600',
  },
  
  // 터치 영역 확보용
  iconButton: { padding: 5 },
  textButton: { padding: 5 },

  // 카드 스타일 (기존 유지)
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentBox: { flex: 1, justifyContent: 'center' },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 6,
    alignItems: 'center',
  },
  title: { fontSize: 15, fontWeight: 'bold', color: '#111' },
  time: { fontSize: 12, color: '#999', fontWeight: '500' },
  desc: { fontSize: 13, color: '#666', lineHeight: 19 },
});