import React from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import AssetItem from './components/AssetItem';
import Button from './components/Button';
import Toast from 'react-native-root-toast';

import { Asset, deleteAssetsAsync, getAssetInfoAsync } from 'expo-media-library';
import { shareAsync, isAvailableAsync } from 'expo-sharing';
import { copyAsync, documentDirectory } from 'expo-file-system';

interface Props {
  assets?: Asset[];
  updateAssets: () => void;
}

export default function Main({ assets, updateAssets }: Props): JSX.Element {

  const [selectedAssets, selectAssets] = React.useState<string[]>([]);

  const toggleSelectedAssets = (assetId: string) => {
    selectAssets(prev => {
      const isToRemoveAsset = prev.some(p => p === assetId)
      if (isToRemoveAsset) return prev.filter(p => p !== assetId);
      else return [...prev, assetId];
    });
  };

  const DeleteSelected = (): JSX.Element => {
    if (!selectedAssets.length) return <></>;
    const assetsToDelete = selectedAssets.map(assetId => assets?.find(a => a.id === assetId)).filter(Boolean) as Asset[];
    const onDelete = () => confirmDelete(assetsToDelete).then(st => {
      if (st === 'deleted') {
        selectAssets([]);
        updateAssets();
      }
    });
    return (
      <Button style={styles.btn} onPress={onDelete}>
        Excluir {selectedAssets.length} selecionado(s)
      </Button>
    );
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={assets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const onSelect = () => toggleSelectedAssets(item.id);
          const selected = selectedAssets.includes(item.id);
          return (
            <AssetItem asset={item} onSelect={onSelect} selected={selected} />
          );
        }}
      />
      <View style={styles.float}>
        <DeleteSelected />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    justifyContent: 'center',
  },
  float: {
    position: 'absolute',
    top: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btn: {
    backgroundColor: '#ef6f6c',
  }
});

export const shareAsset = async (asset: Asset): Promise<void> => {

  if (!(await isAvailableAsync())) {
    Alert.alert("Sharing is not available", "Your device does not allow sharing");
    return;
  }

  const downloadPath = documentDirectory + asset.filename;
  const assetInfo = await getAssetInfoAsync(asset, { shouldDownloadFromNetwork: true });

  if (!assetInfo.localUri) {
    Alert.alert("ERROR", "Local URI is empty. We can't share this right now.");
    return;
  }

  const file_uri = await (async (): Promise<string> => {
    const from = assetInfo.localUri || "";
    await copyAsync({ from, to: downloadPath });
    return downloadPath;
  })();

  shareAsync(file_uri);
};

export const confirmDelete = (assetsData: Asset | Asset[]): Promise<'cancel' | 'deleted'> => {

  const assets = Array.isArray(assetsData) ? assetsData : [assetsData];

  const asset = assets.length === 1 ? assets?.[0] : undefined;

  return new Promise((res, rej) => {

    const delete_asset = async () => {
      const isDeleted = await deleteAssetsAsync(assets);
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