import { Gear } from "@/components/icons/gear";
import { Home } from "@/components/icons/home";
import { Receipt } from "@/components/icons/receipt";
import { Wallet } from "@/components/icons/wallet";
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
            <Home color={color} height={size} width={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Wallet color={color} height={size} width={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Receipt color={color} height={size} width={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Gear color={color} height={size} width={size} />
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
