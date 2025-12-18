import { useNativeTheme } from "@/utils/theme";
import { Stack } from "expo-router";

export default function Layout() {
  const { colors } = useNativeTheme();

  const options = {
    contentStyle: {
      backgroundColor: colors.surface,
    },
  };

  return (
    <Stack screenOptions={options}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerTitle: "Create Transaction",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="refund"
        options={{
          headerTitle: "Create Refund",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: "", headerShadowVisible: false }}
      />
    </Stack>
  );
}
