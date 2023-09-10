import {Platform} from 'react-native';
import {
  AdEventType,
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

import React, {memo} from 'react';

const Banner = () => {
  return (
    <>
      <BannerAd
        unitId={
          Platform.OS === 'ios'
            ? 'ca-app-pub-1593000496031877/1315551873'
            : 'ca-app-pub-1593000496031877/7624496272'
        }
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  );
};

export default memo(Banner);
