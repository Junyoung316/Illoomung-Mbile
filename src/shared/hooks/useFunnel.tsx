import React, { useState, ReactNode, ReactElement } from 'react';

// Step 컴포넌트가 받을 Props 타입 정의
export interface StepProps<T> {
  name: T;
  children: ReactNode;
}

// Funnel 컴포넌트가 받을 Props 타입 정의
export interface FunnelProps {
  children: ReactNode;
}

export const useFunnel = <T extends string>(defaultStep: T) => {
  const [step, setStep] = useState<T>(defaultStep);

  // 1. Step 컴포넌트
  const Step = (props: StepProps<T>) => {
    return <>{props.children}</>;
  };

  // 2. Funnel 컴포넌트
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = React.Children.toArray(children).find((child) => {
      // (중요) 유효한 리액트 엘리먼트인지 먼저 검사합니다.
      if (!React.isValidElement(child)) {
        return false;
      }
      
      // 유효하다면 props에 접근하되, 우리가 정의한 StepProps 타입이라고 알려줍니다.
      return (child.props as StepProps<T>).name === step;
    });

    return <>{targetStep}</>;
  };

  // Funnel.Step으로 사용할 수 있게 병합
  const FunnelComponent = Object.assign(Funnel, { Step });

  return { Funnel: FunnelComponent, setStep, step };
};