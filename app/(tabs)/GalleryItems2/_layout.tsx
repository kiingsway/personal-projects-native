import React from 'react';
import { Platform, View } from 'react-native';
import { WebNoGalleryBanner } from './components/WebNoGalleryBanner';
import { Slot } from 'expo-router';

export default function Layout(): JSX.Element {

  const isWeb = Platform.OS === 'web';

  return (
    <View>
      <WebNoGalleryBanner isWeb={isWeb} />
      {isWeb ? <></> : <Slot />}
    </View>
  );
}