import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { AssetsProvider, useAssets } from '../../../../services/hooks/useAssets';
import getGalleryTypes from '../../../../components/Gallery/galleryTypes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GalleryImages from '../../../../components/Gallery/GalleryImages';
import AlbumHeader from '../../../../components/Gallery/AlbumHeader';
import { Button } from '../../../../components/Gallery/Button';
import { Asset } from 'expo-media-library';
import DeleteSelected from '../../../../components/Gallery/DeleteSelected';
import { confirmDelete } from '../../../../services/requests';
import { IAppFilters, IGalleryConfig } from '../interfaces';
import useGalleryConfig from '../../../../services/hooks/useGalleryConfig';
export default function Type(): JSX.Element {

  const Main = () => {

    const nav = useNavigation();
    const configState = useGalleryConfig();
    const [assetIdsToDelete, setAssetIdsToDelete] = React.useState<Asset['id'][]>();
    const { assets, updateAssets } = useAssets();
    const { type: typeData } = useLocalSearchParams();

    React.useLayoutEffect(() => {
      const title = `${galleryType?.title || `Gallery Items`} (${filteredAssets.length} itens)`
      nav.setOptions({ title, headerShown: false });
    }, []);

    const toggleAsset = (newAssetId: Asset['id']) => {
      setAssetIdsToDelete(prev => {
        // Se não tiver nada selecionado, adicione o newAssetId.
        if (!prev) return [newAssetId];

        // Se o state já tiver o assetId, remova o newAssetId.
        if (prev.includes(newAssetId)) return prev.filter(p => p !== newAssetId);

        // Retorne o estado antigo com o newAssetId.
        return [...prev, newAssetId];
      })
    };

    if (!typeData) throw new Error('Não há type');

    const type = Array.isArray(typeData) ? typeData[0] : typeData;

    const filteredAssets = assets.filter(a => (a.mediaSubtypes as undefined | string[])?.includes(type) || a.mediaType === type);

    const galleryType = getGalleryTypes(filteredAssets).find(g => g.type === type);

    const selectedAssets = assetIdsToDelete?.map(id => filteredAssets.find(a => a.id === id)).filter(Boolean) as Asset[] | undefined;

    const onDeletePress = () => {
      if (!selectedAssets || !selectedAssets.length) return;
      confirmDelete(selectedAssets).then(v => {
        if (v === 'deleted') {
          updateAssets();
          setAssetIdsToDelete(undefined);
        }
      });
    }

    return (
      <SafeAreaView style={{ height: '100%' }}>

        <BackButton />

        <AlbumHeader
        configState={configState}
          // config={config}
          // changeView={changeView}
          // filters={filters}
          // setFilters={setFilters}
          selectedAssets={assetIdsToDelete}
          title={galleryType?.title}
          lengthItems={filteredAssets.length}
          selectAssets={setAssetIdsToDelete} />

        <GalleryImages
          toggleAsset={toggleAsset}
          selectedAssets={assetIdsToDelete}
          filteredAssets={filteredAssets}
          selectMode={Array.isArray(assetIdsToDelete)}
        />

        <DeleteSelected
          onPress={onDeletePress}
          selectedAssets={assetIdsToDelete}
          updateAssets={updateAssets}
          selectAssets={setAssetIdsToDelete} />

      </SafeAreaView>
    );
  }

  return <AssetsProvider><Main /></AssetsProvider>;
}

const BackButton = () => (
  <Link href="(tabs)/GalleryItems" asChild>
    <Button title="Back to Albums" fontSize={20} icon={<IonIcon name='chevron-back' size={26} color="#007AFF" />} />
  </Link>
);
