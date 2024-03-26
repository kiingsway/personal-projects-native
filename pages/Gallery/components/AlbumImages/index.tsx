import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Alert, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AssetItem from './AssetItem';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-root-toast';
import Text from '../../components/Text';
import { rawText, sortAssetsByDuration } from '../../../../scripts/helpers';
import useBoolean from '../../../../scripts/hooks/useBoolean';

interface Props {
  album: MediaLibrary.Album;
  handleAlbums: () => Promise<boolean>;
  goHome: () => void
}

export type TAsset = MediaLibrary.AssetInfo & FileSystem.FileInfo & { size?: number };

export default function AlbumImages({ album, handleAlbums, goHome }: Props): JSX.Element {

  const [selectedAssets, selectAssets] = useState<TAsset[]>([]);
  const [assets, setAssets] = useState<TAsset[]>([]);
  const [loading, load] = useBoolean();
  const [search, setSearch] = useState('');

  async function getAlbumAssets(after?: string): Promise<void> {

    load.setTrue();

    const getAssetsOpts = { mediaType: ['video'], first: 1000, after };
    // const getAssetsOpts = { album, mediaType: ['photo', 'video', 'unknown', 'audio'], first: 1100, after };
    const assetsData = await MediaLibrary.getAssetsAsync(getAssetsOpts as MediaLibrary.AssetsOptions);

    const { assets: pageAssets, hasNextPage, endCursor } = assetsData;

    const new_assets_promises = pageAssets.map(async asset => {
      const file_info = {};
      const asset_info = {};
      // const file_info = await FileSystem.getInfoAsync(asset.uri, { size: true });
      // const asset_info = await MediaLibrary.getAssetInfoAsync(asset, { shouldDownloadFromNetwork: true });
      return { ...asset, ...file_info, ...asset_info } as TAsset;
    });

    Promise.all(new_assets_promises).then(responses => {

      const assets = responses.sort(sortAssetsByDuration);

      setAssets(prev => {
        const filteredNewAssets = assets.filter(newAsset => !prev.some(prevAsset => prevAsset.id === newAsset.id));
        const new_assets = [...prev, ...filteredNewAssets];
        Toast.show(`Assets carregados: ${new_assets.length}`, { duration: Toast.durations.SHORT, });
        if (hasNextPage && endCursor) getAlbumAssets(endCursor);
        return new_assets;
      });
    });
  }

  useEffect(() => { getAlbumAssets(); }, [album]);
  useEffect(() => { if (assets.length === album.assetCount) load.setFalse(); }, [assets]);

  const handleDeleteAsset = (assets: TAsset[]): void => {
    confirmDelete(assets).then(resp => {
      if (resp === 'deleted') handleAlbums().then(() => {
        getAlbumAssets();
        goHome();
      })
    });
  };

  const data = React.useMemo(() => {
    if (!search) return assets;
    return assets.filter(asset => {
      const [s, ...values] = [search, asset.filename].map(rawText);
      return values.some(v => v.includes(s));
    })
  }, [search, assets]);

  const Asset = ({ asset }: { asset: TAsset }) => (
    <AssetItem
      asset={asset}
      selectedAssetsState={[selectedAssets, selectAssets]}
      onSharePress={() => shareAsset(asset)}
      onDeletePress={() => handleDeleteAsset([asset])} />
  );

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text numberOfLines={1} style={styles.subtitle}>
          {album.assetCount} itens
          {assets.length !== album.assetCount && ` (${assets.length} obtidos)`}
        </Text>
        {loading ? <ActivityIndicator size="large" /> : <></>}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search..."
        keyboardType="default"
      />

      <Button
        color="red"
        title={`Excluir${selectedAssets.length ? ` ${selectedAssets.length}` : ""} selecionados`}
        disabled={!selectedAssets.length}
        onPress={() => handleDeleteAsset(selectedAssets)} />

      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        renderItem={({ item }) => <Asset asset={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  h1: {
    fontSize: 40
  },
  subtitle: {
    fontSize: 18
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingBottom: 300,
  },
  input: {
    color: 'white',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFFFFF88'
  }
});

const shareAsset = async (asset: TAsset): Promise<void> => {

  if (!(await Sharing.isAvailableAsync())) {
    Alert.alert("Sharing is not available", "Your device does not allow sharing");
    return;
  }

  const downloadPath = FileSystem.documentDirectory + asset.filename;
  const assetInfo = await MediaLibrary.getAssetInfoAsync(asset, { shouldDownloadFromNetwork: true });

  if (!assetInfo.localUri) {
    Alert.alert("ERROR", "Local URI is empty. We can't share this right now.");
    return;
  }

  const file_uri = await (async (): Promise<string> => {
    const from = assetInfo.localUri || "";
    await FileSystem.copyAsync({ from, to: downloadPath });
    return downloadPath;
  })();

  Sharing.shareAsync(file_uri);
};

const confirmDelete = (assets: TAsset[]): Promise<'cancel' | 'deleted'> => {

  const asset = assets.length === 1 ? assets?.[0] : undefined;

  return new Promise((res, rej) => {

    const delete_asset = async () => {
      const isDeleted = await MediaLibrary.deleteAssetsAsync(assets);
      if (isDeleted) {
        const msg = asset ? `Arquivo "${asset.filename}" excluído!` : `Arquivo selecionados excluídos!`;
        Toast.show(`✅ ${msg}`, { duration: Toast.durations.SHORT, });
        res('deleted');
      } else {
        const msg = asset ? ` arquivo "${asset.filename}".` : `s arquivos selecionados.`;
        const error = `❌ ERRO: Não foi possível excluir o${msg}`;
        Toast.show(error, { duration: Toast.durations.LONG, });
        rej(error);
      }
    }

    const msg = `Tem certeza que deseja excluir o${asset ? ` arquivo "${asset.filename}"` : `s arquivos selecionados`}?`;

    Alert.alert(
      `Excluir arquivo`,
      msg,
      [
        {
          text: "Não",
          style: "cancel",
          onPress: () => res('cancel'),
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: delete_asset
        },
      ]
    );
  });
}