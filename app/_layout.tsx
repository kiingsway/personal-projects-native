import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {

  const tabs = [
    { key: "index", title: "Home" },
    { key: "(tabs)/WageCalculator/index", title: "Wage Calculator" },
    { key: "(tabs)/GalleryItems/index", title: "Gallery Items" },
    { key: "(tabs)/GalleryItems/ImageList/[type]", title: "Gallery Items", hide: true, },
    { key: "item/[id]", title: "", hide: true, },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ swipeEdgeWidth: 50, drawerType: 'back' }}>
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
  );
}