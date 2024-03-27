import { View, Switch, Text as NativeText, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';
import WorkingGallery from './WorkingGallery';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { getAlbums } from '../../scripts/api_requests';
import Folder from './components/Folder';
import AlbumImages from './components/AlbumImages';
import Text from './components/Text';
import { sortAlbums } from '../../scripts/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import useBoolean from '../../scripts/hooks/useBoolean';
import AnotherGallery from './AnotherGallery';
import useSWR from 'swr';
import { IGalleryContext } from '../../interfaces';

type TTabNames = 'Gallery1' | 'Gallery2';

interface ITab {
  title: TTabNames;
}

const tabs: ITab[] = [
  {
    title: "Gallery1"
  },
  {
    title: "Gallery2"
  },
];

export const GalleryContext = React.createContext<IGalleryContext | undefined>(undefined);

export default function Gallery(): React.JSX.Element {

  const [albums, setAlbums] = useState<MediaLibrary.Album[]>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [selectedAlbum, selectAlbum] = useState<MediaLibrary.Album>();
  const [menuModal, { setTrue: openMenu, setFalse: closeMenu }] = useBoolean();

  const swrOpt = { revalidateOnMount: true, refreshInterval: 5 * 60 * 1000, revalidateOnFocus: false }
  const { data: assetAlbums, error: errorAssetAlbum, mutate: updateAlbumsAssets } = useSWR("AssetAlbums", getAlbums, swrOpt);
  console.log('assetAlbums', assetAlbums);
  const [tab, setTab] = useState<ITab>(tabs[0]);

  const handleAlbums = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      getAlbums({ permissionResponse, requestPermission })
        .then(new_albums => {
          setAlbums(new_albums.sort(sortAlbums).filter(a => a.assetCount))
          resolve(true);
        })
        .catch(e => {
          const error = `❌ ERRO ao obter álbuns: ${e}`;
          Toast.show(error, { duration: Toast.durations.LONG, });
          reject(error);
        });
    });
  };

  useEffect(() => {
    handleAlbums();
  }, [permissionResponse]);

  const goHome = () => selectAlbum(undefined);

  const AlbumTitleLength = (): JSX.Element => {
    const text = albums?.length ? `${albums.length} albuns encontrados` : `Nenhum album encontrado.`;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {!selectedAlbum ? <></> : <TouchableOpacity style={styles.icon_button} onPress={goHome} >
            <Ionicons name="arrow-back" size={24} color="rgb(10,132,255)" />
          </TouchableOpacity>}
          <Text style={styles.h1}>{selectedAlbum?.title || text}</Text>
        </View>
        <Ionicons name="menu" onPress={openMenu} size={48} color="rgb(10,132,255)" />
      </View>
    );
  }

  const Main = (): JSX.Element => {
    if (!albums) return <></>;
    // if (selectedAlbum) return <AlbumImages album={selectedAlbum} handleAlbums={handleAlbums} goHome={goHome} />;
    if (tab.title === 'Gallery1') return (
      <>
        <FlatList
          contentContainerStyle={styles.gallery}
          numColumns={4}
          data={albums}
          renderItem={({ item: album }) => <Folder key={album.id} album={album} onPress={() => selectAlbum(album)} />}
          keyExtractor={item => item.id}
        />
      </>
    );
    if (tab.title === 'Gallery2') return (
      <AnotherGallery />
    );
    return <Text>Nenhuma guia selecionada... Isso não deveria ter acontecido</Text>;
  }

  if (!assetAlbums) return <></>;

  return (
    <View style={styles.container}>
      <AlbumTitleLength />
      <GalleryContext.Provider value={{ assetAlbums }}>
        <Main />
      </GalleryContext.Provider>

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuModal}
        onRequestClose={closeMenu}>
        <View style={styles.centeredView}>

          <View style={styles.modal}>

            <Pressable style={styles.button} onPress={closeMenu}>
              <Ionicons name="close" size={24} color="rgb(0,0,0)" />
            </Pressable>

            <View style={styles.modalView}>
              {tabs.map(tab => {
                const onPress = () => {
                  setTab(tab);
                  closeMenu();
                };
                return (
                  <TouchableOpacity
                    key={tab.title}
                    style={styles.tab_button}
                    onPress={onPress}>
                    <NativeText style={{ fontSize: 24, fontWeight: '600' }}>{tab.title}</NativeText>
                  </TouchableOpacity>
                );
              })}
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    width: '100%',
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  gallery: {
    width: '100%',
    alignSelf: 'center',
  },
  h1: {
    fontSize: 40
  },
  icon_button: {
    margin: 4,
    padding: 6,
    backgroundColor: '#00000011',
    height: 38,
    borderRadius: 4
  },
  tab_button: {
    borderWidth: 1,
    borderColor: '#000000',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    backgroundColor: 'rgba(10, 75, 255, 0.3)',
    paddingLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    rowGap: 4,
  },
  button: {
    padding: 10,
    elevation: 2,
    position: 'relative',
    top: 0,
    width: 44,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});