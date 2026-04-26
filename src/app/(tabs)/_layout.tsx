import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    sceneStyle: styles.scene,
    tabBarInactiveTintColor: "#777777",
    tabBarActiveTintColor: "#FFBA00",
    tabBarLabelPosition: "beside-icon",
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBar,
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ android: "dashboard" }}
              colors={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ android: "wallet" }}
              colors={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ android: "receipt" }}
              colors={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ android: "settings" }}
              colors={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: "#FFFFFF",
  },
  tabBar: {
    elevation: 0,
    borderTopWidth: 0,
  },
});
