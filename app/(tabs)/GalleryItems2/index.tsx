import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { WebNoGalleryBanner } from './components/WebNoGalleryBanner';
import { AlbumButton } from './components/AlbumButton';
import { getGalleryTypes } from './handlers/galleryTypes';
import { AssetsProvider, useAssets } from '../../../services/hooks/useAssets';

export default function GalleryItems2(): JSX.Element {
  const Main = (): JSX.Element => {

    const { assets, loading } = useAssets();

    const buttons = getGalleryTypes(assets);
    const firstLoading = loading && !assets.length;
    const filteredButtons = buttons.filter(b => firstLoading ? b.type === 'photo' || b.type === "video" : b.length);

    console.log('filteredButtons', filteredButtons);

    return (
      <ScrollView contentContainerStyle={styles.main}>
        {firstLoading ? <Text>Carregando...</Text> : <></>}
        {filteredButtons.map(btn => {
          return (
            <AlbumButton
              key={btn.type}
              title={btn.title}
              disabled={!btn.length}
              description={btn.length}
              href={`/GalleryItems2/Album/${btn.type}`}
            />
          );
        })}
      </ScrollView>
    );
  };

  return <AssetsProvider><Main /></AssetsProvider>;
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});