import { Storage } from "expo-sqlite/kv-store";
import { createContext, useContext, useEffect, useState } from "react";
import categoryData from "@/assets/data/categories.json";
import * as SplashScreen from "expo-splash-screen";
import * as Crypto from "expo-crypto";
import { database } from "@/database";
import { categories } from "@/database/schema";

type State = {
  isOnboarded: boolean | null;
  isPending: boolean;
};
const initialState = {
  isOnboarded: null,
  onboard: async () => {},
  offboard: async () => {},
};

type ContextType = {
  isOnboarded: boolean | null;
  onboard: () => Promise<void>;
  offboard: () => Promise<void>;
};
const Context = createContext<ContextType>(initialState);

export default function OnboardProvider({ children }: React.PropsWithChildren) {
  const [state, setState] = useState<State>({
    isOnboarded: initialState.isOnboarded,
    isPending: true,
  });

  useEffect(() => {
    async function syncCategories(version: number) {
      if (version >= categoryData.version) return;

      const existing = await database.select().from(categories);
      const existingKeys = new Set(existing.map((c) => `${c.name}::${c.type}`));

      const missing = categoryData.categories.filter(
        (c) => !existingKeys.has(`${c.name}::${c.type}`),
      );

      if (missing.length > 0) {
        const values = missing.map((category) => ({
          id: Crypto.randomUUID(),
          name: category.name,
          type: category.type,
        }));
        await database.insert(categories).values(values);
      }

      await Storage.setItem("category_version", String(categoryData.version));
    }

    async function load() {
      const onboard = await Storage.getItem("onboard");
      const categoryVersion = await Storage.getItem("category_version");
      const isOnboarded = !onboard ? false : (JSON.parse(onboard) as boolean);
      const version = !categoryVersion ? 0 : parseInt(categoryVersion);
      await syncCategories(version);
      await SplashScreen.hideAsync();
      setState({ isOnboarded, isPending: false });
    }

    load();

    return () => {
      setState({ isOnboarded: null, isPending: true });
    };
  }, []);

  if (state.isPending) return;

  const onboard = async () => {
    setState((prev) => ({ ...prev, isPending: true }));
    await Storage.setItem("onboard", JSON.stringify(true));
    setState({ isOnboarded: true, isPending: false });
  };

  const offboard = async () => {
    setState((prev) => ({ ...prev, isPending: true }));
    await Storage.clear();
    setState({ isOnboarded: false, isPending: true });
  };

  const value = { isOnboarded: state.isOnboarded, offboard, onboard };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useOnboard = () => {
  const context = useContext(Context);
  if (context == null) {
    throw new Error("useOnboard must be used within a <OnboardProvider>");
  }
  return context;
};
