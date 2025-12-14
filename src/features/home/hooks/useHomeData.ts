import { useSuspenseQuery } from '@tanstack/react-query';

// 👇 1. 여기서 'getHomeData' 함수와 'HomeDataResponse' 타입을 가져옵니다. (연결의 핵심!)
import { getHomeData, HomeDataResponse } from '../api/getHomeData';

export const useHomeData = () => {
  // 👇 2. 꺽쇠 괄호 <HomeDataResponse>를 통해 
  //     "이 쿼리의 결과는 반드시 가격(price)이 포함된 데이터야!"라고 선언합니다.
  const { data, refetch } = useSuspenseQuery<HomeDataResponse>({
    queryKey: ['home', 'main'], 
    queryFn: getHomeData, // 👈 3. 실제 데이터를 가져오는 함수 연결
  });

  return { data, refetch };
};