import React, { useState } from 'react';
import { ScrollView, View, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AsyncBoundary } from '../../shared/components/AsyncBoundary';
import { useHomeData } from './hooks/useHomeData';
import { HomeHeader, StatusBanner, ServiceGrid, PopularSection } from './components/HomeComponents';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 데이터가 로딩된 후 보여질 진짜 콘텐츠
const HomeContent = () => {
  const { data, refetch } = useHomeData();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<any>();

  // 👇 2. 안전 영역 수치 가져오기
  const insets = useSafeAreaInsets();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // 배너 버튼 클릭 핸들러
  const handleBannerPress = () => {
    if (!data.user) {
      console.log('로그인 화면으로 이동합니다!');
      // navigation.navigate('Login'); // 나중에 로그인 페이지 만들면 연결
    } else {
      console.log('예약/산책 화면으로 이동합니다!');
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      // 👇 contentContainerStyle의 여백은 유지
      contentContainerStyle={{ paddingTop: insets.top }} 
      
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          
          // ⭐️ 1. iOS용: 스피너 색상을 주황색으로 변경 (흰색 배경에서 보이게 함)
          tintColor="#FF6B00"
          
          // ⭐️ 2. Android용: 스피너 색상 변경
          colors={['#FF6B00']}
          
          // ⭐️ 3. 위치 조정
          // iOS: 스크롤 시작 위치에 맞춰 스피너가 내려오도록 설정
          // Android: 노치 높이만큼 스피너를 아래로 내림
          progressViewOffset={insets.top + 10} 
        />
      }
    >
      {/* 유저 정보가 null일 수 있음을 HomeHeader가 처리함 */}
      <HomeHeader
        userName={data.user}
        location={data.location}
        onNotificationPress={() => navigation.navigate('Notification')}
        />
      
      <StatusBanner 
        status={data.status} 
        onPress={handleBannerPress} 
      />
      
      <ServiceGrid />
      <PopularSection items={data.popularServices} />
      <View style={{ height: 100 }} /> 
    </ScrollView>
  );
};

// 메인 페이지
export default function HomePage() {
  return (
    // AsyncBoundary는 에러와 로딩을 잡아줍니다.
    // ScrollView는 이제 HomeContent 안으로 들어갔습니다.
    <AsyncBoundary>
      <HomeContent />
    </AsyncBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});