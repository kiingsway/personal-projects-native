import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  style: any;
  checked: boolean;
  onChange: () => void;
}

export default function ModernButton({ children, style, checked, onChange }: React.PropsWithChildren<Props>): JSX.Element {

  const icon = checked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onChange}>
      <Text style={styles.txt}>
        {children}
      </Text>
      <MaterialCommunityIcon name={icon} size={20} color={checked ? "green" : "black"} />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: "center"
  },
  txt: {
    fontSize: 16,
    fontWeight: '500'
  }
});
