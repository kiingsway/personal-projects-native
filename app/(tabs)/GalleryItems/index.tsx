import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MenuButton from '../../../components/Gallery/MenuButton';
import getGalleryTypes from '../../../components/Gallery/galleryTypes';
import { AssetsProvider, useAssets } from '../../../services/hooks/useAssets';

export default function GalleryItems(): JSX.Element {

  const Main = () => {
    
    const { assets, loading } = useAssets();

    const buttons = getGalleryTypes(assets);

    const filteredButtons = buttons.filter(b => loading ? b.type === 'photo' || b.type === "video" : b.length);

    return (
      <ScrollView contentContainerStyle={styles.main}>
        {filteredButtons.map(props => <MenuButton key={props.type} loading={loading} {...props} />)}
      </ScrollView>
    );
  }

  return (
    <AssetsProvider>
      <Main />
    </AssetsProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});