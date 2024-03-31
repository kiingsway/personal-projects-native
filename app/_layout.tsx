import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { PaperProvider } from 'react-native-paper';

interface ITabs {
  key: string;
  title: string,
  hide?: boolean;
}

export default function Layout() {

  const tabs: ITabs[] = [
    { key: "index", title: "Home" },
    { key: "(tabs)/WageCalculator/index", title: "Wage Calculator" },
    { key: "(tabs)/GalleryItems/index", title: "Gallery Items" },
    { key: "(tabs)/GalleryItems/ImageList/[type]", title: "Gallery Items", hide: true, },
    { key: "(tabs)/GalleryItems2", title: "Gallery Items 2.0", hide: true },
  ];

  const initialRouteName = tabs.slice(-1)[0].key;

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer screenOptions={{ swipeEdgeWidth: 50, drawerType: 'slide' }}>
          {tabs.map(tab => (
            <Drawer.Screen
              key={tab.key}
              name={tab.key}
              options={{
                drawerLabel: tab.title,
                title: tab.title,
                drawerItemStyle: { display: tab.hide ? 'none' : 'flex' },
              }}
            />
          ))}
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}