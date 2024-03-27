import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Switch, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TAsset } from '.';
import { friendlySeconds, friendlySizeText } from '../../../../scripts/helpers';
import Text from '../Text';
import Toast from 'react-native-root-toast';

interface Props {
  asset: TAsset;
  onSharePress: () => void;
  onDeletePress: () => void;
  selectedAssetsState: [TAsset[], React.Dispatch<React.SetStateAction<TAsset[]>>]
}

export default function AssetItem({ asset, onDeletePress, onSharePress, selectedAssetsState }: Props): JSX.Element {

  const [selectedAssets, selectAssets] = selectedAssetsState;
  const isSelected = selectedAssets.some(a => a.id === asset.id);

  const toggleSelected = () => {
    selectAssets(prev => {
      if (isSelected) return prev.filter(a => a.id !== asset.id)
      else return [...prev, asset];
    });
  };

  const onDetailsPress = (): void => {
    const ext = asset.filename.split('.').slice(-1);
    const assetURI = `assets-library://asset/asset.${ext}?id=${asset.uri.slice(5, 41)}&ext=${ext}`;
    try {
      Linking.openURL(assetURI)
        .catch(e => {
          Toast.show(`❌ ${e?.message || `Erro ao abrir link: ${assetURI}`}`, { duration: Toast.durations.SHORT, });
        });
    } catch (e) {
      Toast.show(`❌ ${`Erro ao abrir link: ${assetURI}`}`, { duration: Toast.durations.SHORT, });
    }
  }

  return (
    <View style={styles.list_item}>
      <Switch value={isSelected} onValueChange={toggleSelected} />

      <TouchableOpacity style={styles.item_left} onPress={toggleSelected}>
        <View style={styles.img_container}>
          <Image source={{ uri: asset.uri }} style={{ borderRadius: 4 }} width={60} height={60} />
          {asset.isFavorite ? <Ionicons name="star" color="gold" size={18} style={styles.img_container_icon} /> : <></>}
        </View>
        <View style={styles.item_details}>
          <Text style={styles.item_title}>{asset.filename}</Text>
          {asset.size ? <Text style={styles.item_size}>{friendlySizeText(asset.size)}</Text> : <></>}
          <Text style={styles.item_size}>{friendlySeconds(asset.duration)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.item_left}>
        <TouchableOpacity style={styles.icon_button} onPress={onSharePress} >
          <Ionicons name="share-outline" size={24} color="rgb(10,132,255)" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon_button} onPress={onDeletePress} >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    borderRadius: 4,
    padding: 4,
  },
  item_left: {
    flexDirection: 'row',
    gap: 10,
  },
  item_details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  item_title: {
    fontSize: 18,
  },
  item_size: {
    fontSize: 14,
  },
  icon_button: {
    margin: 4,
    padding: 6,
    backgroundColor: '#00000011',
    height: 38,
    borderRadius: 4
  },
  img_container: {
    width: 60,
    height: 60,
  },
  img_container_icon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    opacity: 0.8,
  }
});