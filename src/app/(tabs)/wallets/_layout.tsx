import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", headerTitle: "" }}
      />
    </Stack>
  );
}

const screenOptions = {
  contentStyle: {
    backgroundColor: "#FFFFFF",
  },
};
