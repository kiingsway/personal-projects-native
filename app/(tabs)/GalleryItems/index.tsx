import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import MenuButton from '../../../components/Gallery/MenuButton';
import getGalleryTypes from '../../../components/Gallery/galleryTypes';
import { AssetsProvider, useAssets } from '../../../services/hooks/useAssets';
import { WebNoGalleryBanner } from './components/WebNoGalleryBanner';

export default function GalleryItems(): JSX.Element {

  const isWeb = Platform.OS === 'web';
  if (isWeb) return <WebNoGalleryBanner isWeb={isWeb} />;

  const Main = () => {

    const { assets, loading, updateAssets } = useAssets();

    React.useEffect(updateAssets, []);

    const buttons = getGalleryTypes(assets);
    const firstLoading = loading && !assets.length;
    const filteredButtons = buttons.filter(b => firstLoading ? b.type === 'photo' || b.type === "video" : b.length);

    return (
      <ScrollView contentContainerStyle={styles.main}>
        {filteredButtons.map(props => <MenuButton key={props.type} loading={firstLoading} {...props} />)}
      </ScrollView>
    );
  }

  return <AssetsProvider><Main /></AssetsProvider>;
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});