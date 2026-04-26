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
        name="index"
        options={{ headerTitle: "My Statements" }}
      />
      <Stack.Screen
        name="upload"
        options={{ headerTitle: "Upload Statement" }}
      />
      <Stack.Screen
        name="review/[id]"
        options={{ headerTitle: "" }}
      />
    </Stack>
  );
}
