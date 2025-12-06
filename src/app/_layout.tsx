import OnboardProvider, { useOnboard } from "@/contexts/onboard-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ThemeProvider } from "@react-navigation/native";
import { theme, useNativeTheme } from "@/utils/theme";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

export default function RootLayout() {
  return (
    <OnboardProvider>
      <SQLiteProvider databaseName="spendwise.db" onInit={initDB}>
        <QueryClientProvider client={client}>
          <ThemeProvider value={theme}>
            <Children />
            <StatusBar style="dark" />
          </ThemeProvider>
        </QueryClientProvider>
      </SQLiteProvider>
    </OnboardProvider>
  );
}

function Children() {
  useDrizzleStudio(useSQLiteContext());

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

const initDB = async (db: SQLiteDatabase) => {
  const version = 1;
  const { user_version } = (await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  )) ?? { user_version: 0 };
  if (user_version === 0) {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE users (
        id CHAR(36) PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        currency VARCHAR(4) NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE wallets (
        id CHAR(36) PRIMARY KEY,
        name TEXT NOT NULL,
        type INTEGER NOT NULL,
        initial_balance DECIMAL(19, 4) NOT NULL,
        current_balance DECIMAL(19, 4) NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE categories (
        id CHAR(36) PRIMARY KEY,
        name TEXT NOT NULL,
        type INTEGER NOT NULL,
        parent_id CHAR(36),
        created_at TEXT NOT NULL,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      );
      CREATE TABLE transactions (
        id CHAR(36) PRIMARY KEY,
        wallet_id CHAR(36) NOT NULL,
        category_id CHAR(36) NOT NULL,
        type INTEGER NOT NULL,
        amount DECIMAL(19,4) NOT NULL,
        note TEXT,
        timestamp TEXT NOT NULL,
        related_txn CHAR(36),
        created_at TEXT NOT NULL,
        FOREIGN KEY (wallet_id) REFERENCES wallets (id) ON DELETE RESTRICT,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL,
        FOREIGN KEY (related_txn) REFERENCES transactions (id) ON DELETE SET NULL
      );
      CREATE TABLE transfers (
        id CHAR(36) PRIMARY KEY,
        from_wallet CHAR(36) NOT NULL,
        to_wallet CHAR(36) NOT NULL,
        amount DECIMAL(19,4) NOT NULL,
        timestamp TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (from_wallet) REFERENCES wallets (id) ON DELETE RESTRICT,
        FOREIGN KEY (to_wallet) REFERENCES wallets (id) ON DELETE RESTRICT
      );
      CREATE TABLE budgets (
        id CHAR(36) PRIMARY KEY,
        category_id CHAR(36) NOT NULL,
        amount DECIMAL(19, 4) NOT NULL,
        year CHAR(4) NOT NULL,
        month VARCHAR(2) NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
      );
      CREATE TABLE loans (
        id CHAR(36) PRIMARY KEY,
        person TEXT NOT NULL,
        type INTEGER NOT NULL,
        repaid DECIMAL(19, 4) NOT NULL,
        status INTEGER NOT NULL,
        note TEXT,
        transaction_id CHAR(36) NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE RESTRICT
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${version}`);
  SplashScreen.hide();
};
