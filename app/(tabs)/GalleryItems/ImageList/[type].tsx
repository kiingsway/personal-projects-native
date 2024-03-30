import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight } from 'react-native';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { AssetsProvider, useAssets } from '../../../../services/hooks/useAssets';
import getGalleryTypes from '../../../../components/Gallery/galleryTypes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GalleryImages from '../../../../components/Gallery/GalleryImages';
import { padding } from '../../../../services/helpers';

export default function Type(): JSX.Element {

  const Main = () => {

    const nav = useNavigation();
    const { assets, loading } = useAssets();
    const { type: typeData } = useLocalSearchParams();

    React.useLayoutEffect(() => {
      const title = `${galleryType?.title || `Gallery Items`} (${filteredAssets.length} itens)`
      nav.setOptions({ title, headerShown: false });
    }, []);

    if (!typeData) throw new Error('Não há type');

    const type = Array.isArray(typeData) ? typeData[0] : typeData;

    const filteredAssets = assets.filter(a => (a.mediaSubtypes as undefined | string[])?.includes(type) || a.mediaType === type);

    const galleryType = getGalleryTypes(filteredAssets).find(g => g.type === type);

    return (
      <SafeAreaView>
        <Link href="/GalleryItems" asChild>
          <TouchableOpacity>
            <View style={styles.header_back}>
              <IonIcon name='chevron-back' size={26} color="#007AFF" />
              <Text style={styles.button_back}>Back to Albums</Text>
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.header_page}>
          <Text style={styles.header_title}>{galleryType?.title}</Text>
          <Text style={styles.header_subtitle}>{filteredAssets.length} itens</Text>
        </View>
        <GalleryImages filteredAssets={filteredAssets} />
      </SafeAreaView>
    );
  }

  return <AssetsProvider><Main /></AssetsProvider>;
}

const styles = StyleSheet.create({
  header_back: {
    paddingLeft: 6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  header_page: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    ...padding("0 0 6px 32px"),
    gap: 6
  },
  button_back: {
    fontSize: 20,
    color: "#007AFF"
  },
  header_title: {
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center'
  },
  header_subtitle: {
    fontSize: 12,
    paddingBottom: 3,
  }
});