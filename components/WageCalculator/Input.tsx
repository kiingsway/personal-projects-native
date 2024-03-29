import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardType } from 'react-native';

interface Props {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  value: string | number;
  onChange?: (new_value: string) => void;
  keyboardType: KeyboardType
}

export default function Input({ addonAfter, addonBefore, onChange, value, keyboardType }: Props): JSX.Element {

  const AddonBefore = () => {
    if (!addonBefore) return <></>;
    if (typeof value === 'string' || typeof value === 'number') return <Text>{addonBefore}</Text>;
    else return addonBefore;
  }

  const AddonAfter = () => {
    if (!addonAfter) return <></>;
    if (typeof value === 'string' || typeof value === 'number') return <Text>{addonAfter}</Text>;
    else return addonAfter;
  }

  return (
    <View style={styles.main}>
      <AddonBefore />
      <TextInput
        keyboardType={keyboardType}
        value={value?.toString()}
        onChangeText={onChange} />
      <AddonAfter />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    gap: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});