/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useClock } from 'react-native-timer-hooks';

export const useTimer = (currentQuestion: any) => {
  const [counter, start, reset] = useClock(0, 1000, false);

  useEffect(() => {
    console.log('countter', counter);
  }, [counter]);

  useEffect(() => {
    reset;
  }, [currentQuestion]);

  useEffect(() => {
    start();
  }, []);

  return {
    counter,
  };
};
