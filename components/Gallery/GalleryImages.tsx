import { Asset } from 'expo-media-library';
import React, { useState } from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ModalImagem from './ModalImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  filteredAssets: Asset[];
  selectMode: boolean;
  toggleAsset: (assetId: Asset['id']) => void;
  selectedAssets: string[] | undefined;
}

export default function GalleryImages({ filteredAssets, selectMode, toggleAsset, selectedAssets }: Props): JSX.Element {

  const [assetFul, setAssetFull] = useState<Asset['id']>();

  React.useEffect(() => {
    if (!selectMode) setAssetFull(undefined);
  }, [selectMode])

  const renderItem = ({ item }: { item: Asset }) => {

    const onPress = () => selectMode ? toggleAsset(item.id) : setAssetFull(item.id);

    const isSelected = (selectedAssets || []).some(a => a === item.id);

    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image source={{ uri: item.uri }} style={styles.imagem} />
        { selectMode && isSelected ? <View style={styles.selection}>
          <Icon name="checkbox-marked-outline" size={50} color="white" />
        </View> : <></>}
      </TouchableOpacity>
    );
  }

  const open = Boolean(assetFul);

  const index = filteredAssets.findIndex(item => item.id === assetFul);

  const keyExtractor = (item: Asset) => item.id;

  return (
    <React.Fragment>

      <ModalImagem
        open={open}
        filteredAssets={filteredAssets}
        index={index}
        selectAsset={setAssetFull}
      />

      <FlatList
        style={{ paddingBottom: 100 }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
  selection: {
    position: 'absolute',
    backgroundColor: '#5E8C6199',
  }
});