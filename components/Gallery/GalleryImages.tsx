import { Asset } from 'expo-media-library';
import React, { useState } from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ModalImagem from './ModalImage';

interface Props {
  filteredAssets: Asset[];
}

export default function GalleryImages({ filteredAssets }: Props): JSX.Element {

  const [selectedAsset, selectAsset] = useState<Asset['id']>();

  const renderItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity style={styles.item} onPress={() => selectAsset(item.id)}>
      <Image source={{ uri: item.uri }} style={styles.imagem} />
    </TouchableOpacity>
  );

  const open = Boolean(selectedAsset);

  const index = filteredAssets.findIndex(item => item.id === selectedAsset);

  const keyExtractor = (item: Asset) => item.id;

  return (
    <React.Fragment>
      <ModalImagem
        open={open}
        filteredAssets={filteredAssets}
        index={index}
        selectAsset={selectAsset}
      />
      <FlatList
        data={filteredAssets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={4}
        removeClippedSubviews
        windowSize={1}
        maxToRenderPerBatch={30}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 1,
    aspectRatio: 1,
  },
  imagem: {
    flex: 1,
    resizeMode: 'cover',
  },
});