import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Button } from './Button';
import Octicon from 'react-native-vector-icons/Octicons';
import { confirmDelete } from '../../services/requests';

interface Props {
  onPress: () => void;
  selectedAssets: string[] | undefined;
  selectAssets: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  updateAssets: () => void;
}

export default function DeleteSelected({ onPress, updateAssets, selectedAssets }: Props): JSX.Element {

  if (!selectedAssets) return <></>;

  const len = selectedAssets.length;
  const hasSelectedItems = Boolean(len);
  const backgroundColor = hasSelectedItems ? "#E9190F" : "#6A6262CC";
  const text = hasSelectedItems ? `Excluir ${len} ite${len > 1 ? "ns" : "m"}` : "Selecione um item...";

  return (
    <View style={styles.main}>
      <TouchableHighlight onPress={hasSelectedItems ? onPress : undefined}>
        <View style={{ ...styles.button, backgroundColor }}>
          <Octicon name="trash" color="white" size={18} />
          <Text style={styles.button_text}>{text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingVertical: 15,
    gap: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  button_text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
});