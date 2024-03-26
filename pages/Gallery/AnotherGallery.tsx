import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Text from './components/Text';
import * as MediaLibrary from 'expo-media-library';
import useBoolean from '../../scripts/hooks/useBoolean';
import Toast from 'react-native-root-toast';

type TVideoAsset = MediaLibrary.PagedInfo<MediaLibrary.Asset>['assets'];

export default function AnotherGallery(): JSX.Element {

  const [loading, { setTrue: startLoad, setFalse: stopLoad }] = useBoolean();
  const [assets, setAssets] = useState<TVideoAsset>([]);

  const getAssets = async (after?: string) => {
    if (after) startLoad();
    const { assets: new_assets, endCursor, hasNextPage, totalCount } = await MediaLibrary.getAssetsAsync({
      after, mediaType: ['video'], sortBy: 'duration', first: 1000
    });

    if (totalCount === assets.length) {
      stopLoad();
      return;
    }

    setAssets(prevAssets => {
      const filteredNewAssets = new_assets.filter(newAsset =>
        !prevAssets.some(prevAsset => prevAsset.id === newAsset.id));

      const all_new_assets = [...prevAssets, ...filteredNewAssets];

      if (all_new_assets.length === totalCount) stopLoad();

      Toast.show(`Assets carregados: ${all_new_assets.length}`, { duration: Toast.durations.SHORT, });

      if (hasNextPage && endCursor) getAssets(endCursor);
      return all_new_assets;
    });
  }

  useEffect(() => {
    startLoad();
    getAssets().finally(stopLoad);
  }, [])

  console.log('assets', assets.slice(0, 10));

  const AssetItem = ({ asset }: { asset: MediaLibrary.Asset }): JSX.Element => {

    return (
      <View style={styles.asset_item}>
        <Text style={{ fontSize: 24 }}>{asset.filename}</Text>
        <Text style={{ fontSize: 18 }}>{asset.duration}</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        {loading ? <ActivityIndicator /> : <></>}
        <Text style={{ fontSize: 24 }}>{assets.length} itens obtidos</Text>
      </View>
      <FlatList
        // contentContainerStyle={styles.list}
        data={assets}
        renderItem={({ item }) => <AssetItem key={item.id} asset={item} />}
        keyExtractor={item => item.id}
      />
      {/* {assets.map(asset => <AssetItem key={asset.id} asset={asset} />)} */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    justifyContent: 'flex-end',
  },
  asset_item: {
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF44',
    elevation: 5,
    padding: 15,
    minHeight: 100,
  },
});