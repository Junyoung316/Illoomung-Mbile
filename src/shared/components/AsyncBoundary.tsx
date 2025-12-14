import React, { Suspense, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface Props {
  children: ReactNode;
  pendingFallback?: ReactNode; // 로딩 중에 보여줄 커스텀 UI (없으면 기본 스피너)
  rejectedFallback?: (props: FallbackProps) => ReactNode; // 에러 났을 때 보여줄 커스텀 UI
}

export function AsyncBoundary({ children, pendingFallback, rejectedFallback }: Props) {
  // React Query의 에러 재시도 기능을 연결하기 위한 훅
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset} // 에러 발생 후 '재시도' 클릭 시 React Query 캐시 초기화
      fallbackRender={({ error, resetErrorBoundary }) => {
        // 1. 개발자가 커스텀 에러 화면을 넣었다면 그걸 보여줌
        if (rejectedFallback) {
          return <>{rejectedFallback({ error, resetErrorBoundary })}</>;
        }
        
        // 2. 없으면 기본 에러 화면 보여줌
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>잠시 후 다시 시도해주세요.</Text>
            <Text style={styles.errorDetail}>{error.message}</Text>
            <Button title="다시 시도" onPress={resetErrorBoundary} color="#FF6B00" />
          </View>
        );
      }}
    >
      <Suspense
        fallback={
          pendingFallback || (
            // 기본 로딩 화면 (중앙 정렬 스피너)
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#FF6B00" />
            </View>
          )
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  errorDetail: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },
});