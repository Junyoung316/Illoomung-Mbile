export interface HomeDataResponse {
  user: string | null; // ⭐️ 유저 이름이 없으면 null
  petName?: string;    // ⭐️ 펫 이름도 로그인 안 하면 없을 수 있음
  location?: string;   // ⭐️ 위치 정보 (예: 서울시 강남구...)
  status: {
    title: string;
    action: string;
    bgImage: string;
    target?: string;   // 클릭 시 이동할 경로 (로그인/예약 등)
  };
  popularServices: Array<{
    id: number;
    tag: string;
    title: string;
    img: string;
    rating: number;
    reviewCount: number;
    price: number;
  }>;
}

// 비회원(게스트) 상태 테스트용 데이터
export const getHomeData = async (): Promise<HomeDataResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // user: null, // 👈 비회원 상태 시뮬레이션 (나중에 '두부맘'으로 바꾸면 회원 모드)
        // petName: undefined,
        // location: undefined, // ⭐️ 위치 데이터 추가
        // status: {
        //   // 비회원용 문구
        //   title: '반려견을 위한 모든 것\n일루멍에서 시작하세요! 🐾',
        //   action: '로그인 및 회원가입',
        //   bgImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
        //   target: 'Login', 
        // },

        user: "두부맘", // 👈 회원 상태
        petName: "두부",
        location: '서울시 강남구 삼성동', // ⭐️ 위치 데이터 추가
        status: {
          // 회원용 멘트
          title: '두부와 산책할\n시간이에요! 🐕',
          action: '예약하러 가기',
          bgImage: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=400',
          target: 'Reservation',
        },
        popularServices: [
          { 
            id: 1, 
            tag: '미용', 
            title: '프리미엄 스파 & 컷', 
            img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
            rating: 4.9,
            reviewCount: 128,
            price: 85000
          },
          { 
            id: 2, 
            tag: '호텔/돌봄', 
            title: '디럭스 펫 호텔 (1박)', 
            img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
            rating: 4.8,
            reviewCount: 85,
            price: 55000
          },
        ]
      });
    }, 1000); 
  });
};