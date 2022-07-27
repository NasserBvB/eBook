import { useAuth } from 'core';
import React, { useEffect } from 'react';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';

export const useAd = () => {
  const { rewardedAd: rewarded, addCoins, showAd } = useAuth();
  const [loaded, setLoaded] = React.useState(true);
  useEffect(() => {
    if (!rewarded || !loaded) {
      return;
    }
    const unsubscribeLoaded = rewarded?.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded?.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        addCoins(reward.amount);
        showAd(false);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded?.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded?.();
      unsubscribeEarned?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewarded, loaded]);

  return {
    rewarded,
    loaded,
  };
};
