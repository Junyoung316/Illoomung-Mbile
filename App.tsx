import React from 'react';
import { StatusBar, StyleSheet } from 'react-native'; // ❌ SafeAreaView 제거
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // ✅ 여기서 가져오기

// import ReservationPage from './src/features/reservation/ReservationPage'; // 예약 페이지 임포트
// import HomePage from './src/features/home/HomePage'; // 홈 페이지 임포트

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 1,
    },
  },
});

function App(): React.JSX.Element {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <SafeAreaProvider>
    //     {/* 이제 이 SafeAreaView는 호환성이 더 좋은 라이브러리 버전입니다 */}
    //     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    //       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
    //       <NavigationContainer>
    //       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
    //       {/* 이제 여기서 탭 네비게이터를 보여줍니다 */}
    //       <RootNavigator />
          
    //     </NavigationContainer>
    //     </SafeAreaView>
    //   </SafeAreaProvider>
    // </QueryClientProvider>
    <QueryClientProvider client={queryClient}>
      {/* 👇 SafeAreaView가 아닙니다! Provider여야 합니다. */}
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
          {/* 여기서 RootNavigator를 바로 보여줍니다. */}
          <RootNavigator />
          
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;