import { Asset } from 'expo-media-library';
import React from 'react';
import { Modal, View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Button, FlatList } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface Props {
  open: boolean;
  filteredAssets: Asset[];
  index: number;
  selectAsset: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ModalImagem = ({ open, filteredAssets, index, selectAsset }: Props) => {

  const { width } = Dimensions.get('window');

  const renderItem = ({ item }: { item: Asset }) => {

    const { id, uri, mediaType } = item;
    const isVideo = mediaType === 'video';

    return (
      <View key={id} style={styles.imagemContainer}>
        {isVideo ? <Image source={{ uri }} style={styles.imagem} /> : <Image source={{ uri }} style={styles.imagem} />}
      </View>
    );
  };

  const onClose = () => selectAsset(undefined);

  const contentOffset = {
    x: width * (index),
    y: 0,
  };

  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.overlay}>

        <FlatList
          data={filteredAssets}
          renderItem={renderItem}
          pagingEnabled
          initialNumToRender={index + 1}
          maxToRenderPerBatch={5}
          horizontal
          contentOffset={contentOffset}
        />
        <TouchableOpacity style={styles.close_btn} onPress={onClose}>
          <Text style={styles.close_txt}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  imagemContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  close_btn: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  close_txt: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalImagem;
