import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFunnel } from '../../shared/hooks/useFunnel'; // ⭐️ 직접 만든 훅 경로 확인
import { AsyncBoundary } from './../../shared/components/AsyncBoundary';

// 1. 단계(Step) 타입 정의
type StepType = '날짜선택' | '서비스선택' | '예약확인';

// 2. 예약 데이터 타입 정의
interface ReservationData {
  date: string | null;
  serviceName: string | null;
  price: number;
}

export default function ReservationPage() {
  // 3. 상태 관리: 예약 데이터 모으기
  const [reservation, setReservation] = useState<ReservationData>({
    date: null,
    serviceName: null,
    price: 0,
  });

  // 4. 퍼널 훅 사용 (제네릭으로 단계 이름 주입)
  const { Funnel, setStep } = useFunnel<StepType>('날짜선택');

  // --- 이벤트 핸들러 ---
  const handleDateSelect = (date: string) => {
    setReservation((prev) => ({ ...prev, date }));
    setStep('서비스선택'); // 다음 단계로 이동
  };

  const handleServiceSelect = (serviceName: string, price: number) => {
    setReservation((prev) => ({ ...prev, serviceName, price }));
    setStep('예약확인'); // 다음 단계로 이동
  };

  const handleFinalSubmit = () => {
    // 여기에 실제 API 호출 로직이 들어갑니다.
    Alert.alert('예약 완료', `${reservation.date}에 ${reservation.serviceName} 예약이 완료되었습니다!`);
  };

  return (
    <View style={styles.pageContainer}>
      <AsyncBoundary>
        <Funnel>
          {/* Step 1: 날짜 선택 */}
          <Funnel.Step name="날짜선택">
            <DateSelectView onNext={handleDateSelect} />
          </Funnel.Step>

          {/* Step 2: 서비스 선택 */}
          <Funnel.Step name="서비스선택">
            <ServiceSelectView 
              selectedDate={reservation.date} 
              onNext={handleServiceSelect} 
            />
          </Funnel.Step>

          {/* Step 3: 최종 확인 */}
          <Funnel.Step name="예약확인">
            <ConfirmView 
              data={reservation} 
              onSubmit={handleFinalSubmit}
              onBack={() => setStep('서비스선택')} // 뒤로가기 기능
            />
          </Funnel.Step>
        </Funnel>
      </AsyncBoundary>
    </View>
  );
}

// --- 하위 컴포넌트들 (나중에 파일 분리 추천) ---

// 1. 날짜 선택 뷰
const DateSelectView = ({ onNext }: { onNext: (date: string) => void }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>언제 방문하실 건가요?</Text>
    <Text style={styles.stepSubtitle}>원하시는 날짜를 선택해주세요.</Text>
    
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.optionButton} onPress={() => onNext('2025-12-15 (월)')}>
        <Text style={styles.optionText}>12월 15일 (월)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => onNext('2025-12-16 (화)')}>
        <Text style={styles.optionText}>12월 16일 (화)</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// 2. 서비스 선택 뷰
const ServiceSelectView = ({ selectedDate, onNext }: { selectedDate: string | null, onNext: (name: string, price: number) => void }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>어떤 서비스가 필요하세요?</Text>
    <Text style={styles.stepDescription}>선택하신 날짜: {selectedDate}</Text>

    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.cardButton} onPress={() => onNext('데이케어 (종일)', 35000)}>
        <Text style={styles.cardTitle}>☀️ 데이케어</Text>
        <Text style={styles.cardPrice}>35,000원</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cardButton} onPress={() => onNext('위생 미용', 50000)}>
        <Text style={styles.cardTitle}>✂️ 위생 미용</Text>
        <Text style={styles.cardPrice}>50,000원</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// 3. 최종 확인 뷰
const ConfirmView = ({ data, onSubmit, onBack }: { data: ReservationData, onSubmit: () => void, onBack: () => void }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>예약 정보를 확인해주세요</Text>
    
    <View style={styles.receiptContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>날짜</Text>
        <Text style={styles.value}>{data.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>서비스</Text>
        <Text style={styles.value}>{data.serviceName}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>결제 금액</Text>
        <Text style={styles.totalValue}>{data.price.toLocaleString()}원</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitButtonText}>예약 확정하기</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>이전으로</Text>
    </TouchableOpacity>
  </View>
);

// --- 스타일 정의 ---
const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: '#fff', padding: 20 },
  stepContainer: { flex: 1, justifyContent: 'center' },
  stepTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  stepSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  stepDescription: { fontSize: 14, color: '#FF6B00', marginBottom: 20, fontWeight: '600' },
  
  buttonGroup: { gap: 15 },
  optionButton: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  optionText: { fontSize: 16, fontWeight: '500' },

  cardButton: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardPrice: { fontSize: 16, color: '#FF6B00', fontWeight: '600' },

  receiptContainer: {
    backgroundColor: '#FAFAFA',
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#888', fontSize: 15 },
  value: { color: '#333', fontSize: 15, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#FF6B00' },

  submitButton: {
    backgroundColor: '#FF6B00',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backButton: { alignItems: 'center', padding: 10 },
  backButtonText: { color: '#888', fontSize: 14 },
});