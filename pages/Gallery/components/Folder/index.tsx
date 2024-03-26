import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as MediaLibrary from 'expo-media-library';

interface Props {
  album: MediaLibrary.Album;
  onPress: () => void;
}

export default function Folder({ album, onPress }: Props): JSX.Element {

  const folderColor = album.type === 'smartAlbum' ? '#FFCB3C' : "rgba(249, 180, 45, 0.25)"

  return (
    <TouchableOpacity style={{ ...styles.item, backgroundColor: folderColor }} onPress={onPress}>
      <Text style={styles.title} numberOfLines={1}>{album.title}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{album.assetCount} itens</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#1A1A1A",
    borderRadius: 4,
  },
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 12
  },
});