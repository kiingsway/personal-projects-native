import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR from 'swr';
import { getAlbums, getAssets } from '../../scripts/api_requests';
import { Album, Asset, PagedInfo, usePermissions } from 'expo-media-library';
import Button from './components/Button';
import Footer from './Footer';
import Main from './Main';

export default function Gallery2(): JSX.Element {

  const [permissionResponse, requestPermission] = usePermissions();

  const getAlbumsAssets = async (): Promise<Album[]> => await getAlbums({ permissionResponse, requestPermission });
  const getMediaAssets = async (): Promise<Asset[]> => await getAssets();

  const swrOpt = { revalidateOnMount: true, refreshInterval: 1, revalidateOnFocus: false }
  const { data: albums } = useSWR("AssetAlbums", getAlbumsAssets, swrOpt);
  const { data: assets, mutate: mutateAssets } = useSWR("Assets", getMediaAssets, swrOpt);
  const updateAssets = () => mutateAssets(assets);

  getAlbums({ permissionResponse, requestPermission })

  return (
    <View style={styles.main}>
      <Footer albums_qtd={albums?.length} assets_qtd={assets?.length} />
      <Main assets={assets} updateAssets={updateAssets} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%'
  }
});