// 1. 데이터 타입 정의 (export 필수)
export interface NotificationItem {
  id: string;
  type: 'reservation' | 'report' | 'coupon' | 'info';
  title: string;
  desc: string;
  time: string;
  isRead: boolean; // 읽음 여부 추가 (나중을 위해)
}

// 2. 서버 응답 시뮬레이션
export const getNotifications = async (): Promise<NotificationItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'reservation',
          title: '예약 확정 안내',
          desc: '두부의 [프리미엄 스파 & 컷] 예약이 확정되었습니다. 내일 오후 2시에 뵙겠습니다! 🐾',
          time: '방금 전',
          isRead: false,
        },
        {
          id: '2',
          type: 'report',
          title: '산책 리포트 도착',
          desc: '오늘 도그워커님과의 산책 리포트가 도착했습니다. 두부의 즐거운 모습을 확인해보세요.',
          time: '2시간 전',
          isRead: true,
        },
        {
          id: '3',
          type: 'coupon',
          title: '여름 맞이 20% 할인 쿠폰',
          desc: '무더운 여름, 시원한 펫캉스를 위한 호텔 할인 쿠폰이 발급되었습니다.',
          time: '1일 전',
          isRead: false,
        },
        {
          id: '4',
          type: 'info',
          title: '정기 검진 알림',
          desc: '두부의 정기 건강검진 시기가 다가왔습니다. AI 멍멍닥터와 상담해보세요.',
          time: '3일 전',
          isRead: true,
        },
      ]);
    }, 1000); // 1초 뒤 데이터 도착
  });
};