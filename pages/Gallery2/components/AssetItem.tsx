import React from 'react';
import Text from './Text';
import Button from './Button';
import { Asset } from 'expo-media-library';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { formatDateTimeByTimestamp, friendlySeconds } from '../../../scripts/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import { shareAsset, confirmDelete } from '../Main';

interface Props {
  asset: Asset;
  onSelect: () => void;
  selected: boolean;
}

const img_size = 60;

export default function AssetItem({ asset, onSelect, selected }: Props): JSX.Element {

  const onShare = () => shareAsset(asset);

  const onDelete = () => confirmDelete(asset);

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={onSelect} style={styles.left}>
        <>
          <Image style={styles.img} source={{ uri: asset.uri }} width={img_size} height={img_size} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              {!selected ? <></> : <Ionicons name="checkbox-outline" size={16} color="green" />}
              <Text style={{ fontSize: 16 }}>{asset.filename}</Text>
            </View>
            <Text style={{ fontSize: 12, opacity: 0.9 }}>{friendlySeconds(asset.duration)}</Text>
            <Text style={{ fontSize: 12, opacity: 0.7 }}>{formatDateTimeByTimestamp(asset.creationTime)}</Text>
          </View>
        </>
      </TouchableOpacity>

      <View style={styles.left}>
        <Button style={{ backgroundColor: 'transparent' }} onPress={onShare}>
          <Ionicons name="share-outline" size={24} color="rgb(10,132,255)" />
        </Button>
        <Button style={{ backgroundColor: 'transparent' }} onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="#f22b29" />
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    gap: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  details: {

  },
  img: {
    borderRadius: img_size / 2
  }
});

