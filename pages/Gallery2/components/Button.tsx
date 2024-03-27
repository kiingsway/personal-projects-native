import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(10,132,255,0.5)',
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  btn: {
    fontSize: 20,
    letterSpacing: 0.8,
    color: '#FFFFFFD4'
  }
});

interface ButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
}

const Button = (p: React.PropsWithChildren<ButtonProps>) => {

  const { style: propStyle, onPress, children } = p;
  const mainStyle = [styles.main, propStyle];

  return (
    <TouchableOpacity style={mainStyle} onPress={onPress}>
      <Text style={styles.btn}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button;