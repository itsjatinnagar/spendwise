import OnboardProvider, { useOnboard } from "@/contexts/onboard-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import { ThemeProvider } from "@react-navigation/native";
import { theme, useNativeTheme } from "@/utils/theme";
import { StatusBar } from "expo-status-bar";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { database, expoDB } from "@/database";
import migrations from "../../drizzle/migrations";

const client = new QueryClient();

export default function RootLayout() {
  const { success, error } = useMigrations(database, migrations);

  if (error || !success) return;

  return (
    <OnboardProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider value={theme}>
          <Children />
          <StatusBar style="dark" />
        </ThemeProvider>
      </QueryClientProvider>
    </OnboardProvider>
  );
}

function Children() {
  useSQLiteDevTools(expoDB);

  const theme = useNativeTheme();
  const { isOnboarded } = useOnboard();

  if (isOnboarded == null) return;

  const options = {
    headerShown: false,
    contentStyle: { backgroundColor: theme.colors.surface },
  };

  return (
    <Stack screenOptions={options}>
      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="onboard" />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
