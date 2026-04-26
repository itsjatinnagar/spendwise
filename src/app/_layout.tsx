import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { database } from "@/database";
import migrations from "@/drizzle/migrations";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import OnboardProvider, { useOnboard } from "@/contexts/onboard-context";

void SplashScreen.preventAutoHideAsync();
const client = new QueryClient();

export default function RootLayout() {
  const { success, error } = useMigrations(database, migrations);

  if (error || !success) return;

  return (
    <OnboardProvider>
      <QueryClientProvider client={client}>
        <Children />
        <StatusBar style="dark" />
      </QueryClientProvider>
    </OnboardProvider>
  );
}

function Children() {
  const { isOnboarded } = useOnboard();

  if (isOnboarded === null) return;

  const screenOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: "#FFFFFF",
    },
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="onboard" />
      </Stack.Protected>
    </Stack>
  );
}
