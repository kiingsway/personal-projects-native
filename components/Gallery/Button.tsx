import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, ViewStyle } from "react-native";

interface Props {
  title?: string;
  icon?: JSX.Element;
  fontSize?: number;
  onPress?: () => void;
  // color?: ColorValue;
  style?: any
}

export const Button = ({ icon, title, onPress, style, fontSize }: Props) => {

  const { color } = style || { color: "#007AFF" };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.header_back, style]}>
        {icon}
        <Text style={{ ...styles.button_back, fontSize, color }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header_back: {
    paddingLeft: 6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button_back: {
    fontSize: 20,
    color: "#007AFF"
  },
});