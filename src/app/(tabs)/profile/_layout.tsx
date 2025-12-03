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
    </Stack>
  );
}
