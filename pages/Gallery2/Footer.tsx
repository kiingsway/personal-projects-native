import React from 'react';
import Text from './components/Text';
import { View, StyleSheet, Switch } from 'react-native';

interface Props {
  albums_qtd?: number;
  assets_qtd?: number;
}

export default function Footer(p: Props): JSX.Element {
  const { albums_qtd, assets_qtd } = p;

  const text = {
    albums: albums_qtd && albums_qtd >= 0 ? `${albums_qtd} álbums` : `álbums não obtidos`,
    assets: assets_qtd && assets_qtd >= 0 ? `${assets_qtd} itens` : `itens não obtidas`,
  }

  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 18, color: '#333' }}>{text.albums}</Text>
      <Text style={{ fontSize: 18, color: '#333' }}>{text.assets}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF77',
    height: 60,
    borderRadius: 4,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});