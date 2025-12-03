import { Storage } from "expo-sqlite/kv-store";
import { createContext, useContext, useEffect, useState } from "react";

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
    async function load() {
      const onboard = await Storage.getItem("onboard");
      const isOnboarded = !onboard ? false : (JSON.parse(onboard) as boolean);
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
