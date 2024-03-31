import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AssetsProvider, useAssets } from '../../../../services/hooks/useAssets';

export default function Album(): JSX.Element {
  const Main = (): JSX.Element => {

    const { assets } = useAssets();

    const { albumType } = useLocalSearchParams();

    console.log('albumType', albumType);

    return (
      <View>
        <BackButton />
        <Text>
          {albumType}
        </Text>
      </View>
    );
  };

  return <AssetsProvider><Main /></AssetsProvider>;
}

const BackButton = (): JSX.Element => (
  <Link href="/GalleryItems2" asChild>
    <Button>
      <IonIcon name='chevron-back' size={26} color="#007AFF" />
      <Text>Back to Albums</Text>
    </Button>
  </Link>
);