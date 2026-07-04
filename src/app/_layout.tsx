import "@/utilities/error-handler";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { database, expoDB } from "@/database";
import migrations from "@/drizzle/migrations";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import OnboardProvider, { useOnboard } from "@/contexts/onboard-context";
import { ToastProvider, showGlobalError } from "@/contexts/toast-context";
import ErrorBoundaryComponent from "@/components/common/error-boundary";

export { default as ErrorBoundary } from "@/components/common/error-boundary";

void SplashScreen.preventAutoHideAsync();

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      console.error("Global Query Error caught:", err);
      showGlobalError(err.message || "An error occurred while fetching data.");
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      console.error("Global Mutation Error caught:", err);
      showGlobalError(err.message || "An error occurred while saving data.");
    },
  }),
});

export default function RootLayout() {
  const { success, error } = useMigrations(database, migrations);

  if (error) {
    return (
      <ErrorBoundaryComponent
        error={error}
        retry={async () => {
          const { DevSettings } = await import("react-native");
          DevSettings.reload();
        }}
      />
    );
  }

  if (!success) return null;

  return (
    <OnboardProvider>
      <QueryClientProvider client={client}>
        <ToastProvider>
          <Children />
          <StatusBar style="dark" />
        </ToastProvider>
      </QueryClientProvider>
    </OnboardProvider>
  );
}

function Children() {
  useDrizzleStudio(expoDB);
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
