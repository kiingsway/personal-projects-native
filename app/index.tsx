import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Home(): JSX.Element {
  return (
    <View style={styles.main}>
      <Text>Select one of the tabs on the menu on the left to see the projects!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});