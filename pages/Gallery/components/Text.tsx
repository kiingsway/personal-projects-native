import { Text as ReactNativeText, StyleSheet, TextProps, TextStyle } from "react-native";

const Text = (props: React.PropsWithChildren<TextProps>) => {

  const style = props.style ? { ...styles.text, ...props.style as TextStyle } : styles.text;

  return (
    <ReactNativeText style={style}>
      {props.children}
    </ReactNativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
});

export default Text;