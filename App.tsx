import { SafeAreaView, StyleSheet } from 'react-native';
import Gallery from './pages/Gallery';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <RootSiblingParent>
        <Gallery />
      </RootSiblingParent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
});