import { useSuspenseQuery } from '@tanstack/react-query';
import { getNotifications, NotificationItem } from '../api/getNotifications';

export const useNotifications = () => {
  // useSuspenseQuery: 데이터가 올 때까지 컴포넌트 렌더링을 멈추고(Suspend), 
  // 부모의 AsyncBoundary가 로딩바를 보여주게 합니다.
  const { data, refetch } = useSuspenseQuery<NotificationItem[]>({
    queryKey: ['notifications'], // 캐싱 키
    queryFn: getNotifications,   // 실행할 API 함수
  });

  return { data, refetch };
};