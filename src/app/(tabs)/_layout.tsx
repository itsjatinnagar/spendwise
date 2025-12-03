import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";

export default function Layout() {
  const { colors } = useTheme();
  const options: BottomTabNavigationOptions = {
    headerShown: false,
    sceneStyle: { backgroundColor: colors.card },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarLabelPosition: "beside-icon",
    tabBarShowLabel: false,
    tabBarStyle: { height: 60, elevation: 0, borderTopWidth: 0 },
  };

  return (
    <Tabs screenOptions={options}>
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
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
