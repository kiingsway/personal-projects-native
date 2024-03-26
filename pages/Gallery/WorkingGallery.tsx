import { useEffect, useState } from 'react';
import { Button, Text, ScrollView, Image, View, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Album } from 'expo-media-library';

interface Props {
  albums: MediaLibrary.Album[];
}

export default function WorkingGallery({ albums }: Props): React.JSX.Element {

  return (
    <View>
      <ScrollView>
        {albums && albums.map((album) => <AlbumEntry key={album.id} album={album} />)}
      </ScrollView>
    </View>
  );
}

function AlbumEntry({ album }: { album: MediaLibrary.Album }): React.JSX.Element {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {

    async function getAlbumAssets(): Promise<void> {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }

    getAlbumAssets();

  }, [album]);

  return (
    <View key={album.id}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View>
        {assets && assets.map(({ uri }) => <Image source={{ uri }} width={50} height={50} />)}
      </View>
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
    display: 'flex',
    flexDirection: 'row'
  },
  gallery: {
    width: '100%',
    justifyContent: "center",
    alignSelf: 'center'
  },
  h1: {
    fontSize: 40
  }
});