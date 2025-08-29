import OnboardProvider, { useOnboard } from "@/contexts/onboard-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useSQLiteDevTools } from "expo-sqlite-devtools";

SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

export default function RootLayout() {
  return (
    <OnboardProvider>
      <SQLiteProvider databaseName="spendwise.db" onInit={initDB}>
        <QueryClientProvider client={client}>
          <Children />
        </QueryClientProvider>
      </SQLiteProvider>
    </OnboardProvider>
  );
}

function Children() {
  useSQLiteDevTools(useSQLiteContext());
  const { isOnboarded } = useOnboard();

  if (isOnboarded == null) return;

  return (
    <Stack screenOptions={{ headerShown: false }}>
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
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE users (
        id CHAR(32) PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        mobile TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE wallets (
        id CHAR(32) PRIMARY KEY,
        name TEXT NOT NULL,
        start_balance REAL NOT NULL,
        current_balance REAL NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE categories (
        id CHAR(32) PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE transactions (
        id CHAR(32) PRIMARY KEY,
        wallet_id CHAR(32) NOT NULL,
        category_id CHAR(32) NOT NULL,
        related_txn CHAR(32),
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        timestamp TEXT NOT NULL,
        note TEXT,
        FOREIGN KEY (related_txn) REFERENCES transactions (id)
      );
      CREATE TABLE transfers (
        id CHAR(32) PRIMARY KEY,
        from_wallet CHAR(32) NOT NULL,
        to_wallet CHAR(32) NOT NULL,
        amount REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (from_wallet) REFERENCES wallets (id),
        FOREIGN KEY (to_wallet) REFERENCES wallets (id)
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${version}`);
  SplashScreen.hide();
};
