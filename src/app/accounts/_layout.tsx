import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";

export default function Layout() {
  const screenOptions: NativeStackNavigationOptions = {
    contentStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerShadowVisible: false,
    headerTitleAlign: "center",
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "Add Account",
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
        }}
      />
    </Stack>
  );
}
