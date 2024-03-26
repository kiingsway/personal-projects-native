import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400,
    backgroundColor: "red"
  },
  row: {
    flexDirection: "row"
  },
  "1col": {
    backgroundColor: "lightblue",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 1
  },
  "2col": {
    backgroundColor: "green",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2
  },
  "3col": {
    backgroundColor: "orange",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 3
  },
  "4col": {
    flex: 4
  }
});

export const Col = ({ numRows, children }: React.PropsWithChildren<{ numRows: number }>) => (
  <View style={styles[`${numRows}col` as keyof typeof styles]}>{children}</View>
);

export const Row = ({ children }: React.PropsWithChildren) => (
  <View style={styles.row}>{children}</View>
);