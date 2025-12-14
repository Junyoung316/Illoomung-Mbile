import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 1. 헤더 (비회원 대응 수정)
export const HomeHeader = ({ userName, location, onNotificationPress }: { userName: string | null, location?: string, onNotificationPress?: () => void; }) => {
  return (
    <View style={styles.header}>
      <View>
        {/* 1. 위치 정보 줄 (작은 글씨) */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.locationText}>
            {location || '동네를 설정 해주세요'} 
          </Text>
        </View>
        {/* userName이 있으면 이름 표시, 없으면 로그인 유도 */}
        {/* 2. 인사말 줄 (큰 글씨) */}
        {userName ? (
          <Text style={styles.greetingTitle}>
            안녕하세요, <Text style={styles.highlightName}>{userName}</Text>님! 👋
          </Text>
        ) : (
          <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.greetingTitle}>
              안녕하세요, <Text style={styles.highlightName}>게스트</Text>님! 👋
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* 오른쪽: 알림 버튼 (종 모양) */}
      <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
        <Ionicons name="notifications-outline" size={24} color="#333" />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
};

// 2. 상태 배너 (비회원 대응 수정)
export const StatusBanner = ({ status, onPress }: any) => {
  if (!status) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.bannerContent}>
        {/* 비회원일 때는 '오늘의 상태'라는 라벨 대신 환영 문구 등을 써도 됨 */}
        <Text style={styles.bannerLabel}>
           {status.action === '로그인 및 회원가입' ? 'Welcome!' : '오늘의 상태'}
        </Text>
        
        <Text style={styles.bannerTitle}>{status.title}</Text>
        
        <TouchableOpacity style={styles.bannerBtn} onPress={onPress}>
          <Text style={styles.bannerBtnText}>{status.action}</Text>
        </TouchableOpacity>
      </View>
      
      {/* 이미지에 어두운 필터를 씌워 글씨가 잘 보이게 처리 */}
      <Image source={{ uri: status.bgImage }} style={styles.bannerImage} />
      <View style={[styles.bannerImage, { backgroundColor: 'rgba(0,0,0,0.1)', position: 'absolute' }]} />
    </View>
  );
};

// ... (ServiceGrid, PopularSection 등 나머지는 그대로 유지)

// 3. 서비스 그리드 메뉴
export const ServiceGrid = () => {
  const menus = [
    { label: '미용', icon: '✂️', color: '#FFF0F0' },
    { label: '호텔/돌봄', icon: '🏠', color: '#FFF8E1' },
    { label: '훈련/교육', icon: '🎓', color: '#E3F2FD' },
    { label: '산책', icon: '🐕', color: '#E8F5E9' },
  ];

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.sectionTitle}>어떤 서비스가 필요하세요?</Text>
      <View style={styles.gridRow}>
        {menus.map((menu, idx) => (
          <TouchableOpacity key={idx} style={styles.gridItem}>
            <View style={[styles.iconBox, { backgroundColor: '#F9F9F9' }]}>
              <Text style={{ fontSize: 24 }}>{menu.icon}</Text>
            </View>
            <Text style={styles.gridLabel}>{menu.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// 4. 인기 서비스 리스트
export const PopularSection = ({ items }: any) => {

  if (!items) return null;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>인기 서비스 🔥</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>전체보기 &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items?.map((item: any) => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9}>
            {/* 이미지 영역 */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.img }} style={styles.cardImg} />
              <View style={styles.cardTag}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            </View>

            {/* 텍스트 정보 영역 */}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>

              {/* 별점 & 리뷰수 */}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 4 }} />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewText}>({item.reviewCount})</Text>
              </View>

              {/* 가격 & 예약 버튼 */}
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>
                  {item.price ? item.price.toLocaleString() : '0'}원
                </Text>
                <TouchableOpacity style={styles.reserveButton}>
                  <Text style={styles.reserveButtonText}>예약</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', // 세로 중앙 정렬 안 함 (텍스트가 2줄이라 위쪽 정렬이 나을 수도 있음, 여기선 center)
    marginBottom: 20, 
    paddingHorizontal: 20, 
    marginTop: 10
  },
  
  // 위치 정보 줄
  locationRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  locationText: { 
    fontSize: 13, 
    color: '#666', 
    fontWeight: '500' 
  },

  // 인사말 줄
  greetingTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#111' 
  },
  highlightName: { 
    color: '#FF6B00' // 이름만 주황색 강조
  },

  // 알림 버튼 스타일
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // 연한 회색 배경 (선택사항)
    borderRadius: 20,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'red'
  },

  userName: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  profileButton: {
    padding: 5,
  },

  banner: { margin: 20, marginTop: 10, backgroundColor: '#FF6B00', borderRadius: 24, padding: 24, flexDirection: 'row', justifyContent: 'space-between', height: 160, overflow: 'hidden' },
  bannerContent: { zIndex: 1 },
  bannerLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 8 },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', lineHeight: 26, marginBottom: 16 },
  bannerBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#FF6B00', fontWeight: 'bold', fontSize: 12 },
  bannerImage: { position: 'absolute', right: -20, bottom: -20, width: 140, height: 140, borderRadius: 70, opacity: 0.9 },

  gridContainer: { paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { alignItems: 'center', width: width / 4 - 20 },
  iconBox: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridLabel: { fontSize: 12, color: '#555' },

  sectionContainer: { marginTop: 30, paddingLeft: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, marginBottom: 15 },
  moreText: { color: '#aaa', fontSize: 13 },
  scrollContent: { paddingRight: 20 },
  // 카드 스타일
  card: {
    width: 220, // 카드를 조금 더 넓게
    marginRight: 15,
    borderRadius: 16,
    backgroundColor: '#fff',

    // 그림자 (카드 입체감)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },

  imageContainer: { position: 'relative' },
  cardImg: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#eee'
  },
  cardTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  tagText: { fontSize: 11, fontWeight: 'bold', color: '#333' },

  cardContent: { padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 6 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingText: { fontSize: 13, fontWeight: 'bold', color: '#333', marginRight: 2 },
  reviewText: { fontSize: 13, color: '#999' },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#FF6B00' },

  reserveButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  reserveButtonText: { fontSize: 12, fontWeight: '600', color: '#555' },
});