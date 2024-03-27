import { StyleSheet, TextProps, Text as TextRN } from "react-native";

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Jost-Regular'
  }
});

const Text = (p: TextProps) => {
  const { style: propsStyle, ...props } = p;
  return <TextRN style={[style.text, propsStyle]} {...props}>{props.children}</TextRN>
}

export default Text;