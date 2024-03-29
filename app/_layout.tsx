import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        swipeEdgeWidth: 50,
      }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="(tabs)/WageCalculator/index"
          options={{
            drawerLabel: "Wage Calculator",
            title: "Wage Calculator",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}