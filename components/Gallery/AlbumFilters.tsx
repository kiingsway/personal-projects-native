import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModernButton from './ModernButton';
import { IAppFilters, TFilter, TView } from '../../app/(tabs)/GalleryItems/interfaces';

interface Props {
  filters: Record<TFilter, boolean>;
  setFilters: React.Dispatch<React.SetStateAction<IAppFilters>>;
  // changeView: (new_view: TView) => void;
}

export default function AlbumFilters({ filters, setFilters }: Props): JSX.Element {

  const onNonHdPress = () => setFilters(prev => ({ ...prev, nonFullHd: !prev.nonFullHd }));
  const onAbove2kPress = () => setFilters(prev => ({ ...prev, above2k: !prev.above2k }));

  return (
    <View style={styles.main}>
      <Text style={styles.h1}>Filtros</Text>
      <View style={styles.buttons}>
        <ModernButton style={styles.btn} checked={filters.nonFullHd} onChange={onNonHdPress}>
          Non Full-HD
        </ModernButton>
        <ModernButton style={styles.btn} checked={filters.above2k} onChange={onAbove2kPress}>
          Above{'>'}2k
        </ModernButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 10,
    paddingVertical: 30,
  },
  h1: {
    fontSize: 28,
    fontWeight: '500'
  },
  buttons: {
    flexDirection: 'column',
    gap: 5
  },
  btn: {
    width: 200,
  }
});
