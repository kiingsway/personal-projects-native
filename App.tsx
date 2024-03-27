import { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Gallery2 from './pages/Gallery2';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App(): React.JSX.Element {

  const [fontsLoaded, fontError] = useFonts({
    'Jost-Regular': require('./fonts/Jost-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <RootSiblingParent>
        <Gallery2 />
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