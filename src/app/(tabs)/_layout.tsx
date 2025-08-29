import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "#FFFFFF" },
        tabBarActiveTintColor: "#111111",
        tabBarInactiveTintColor: "#AFAFAF",
        tabBarLabelPosition: "beside-icon",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="space-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="wallet" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
