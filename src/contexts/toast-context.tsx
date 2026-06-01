import Text from "@/components/common/text";
import { createContext, useContext, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";

type ContextType = { showError: (message: string) => void };
const Context = createContext<ContextType>({ showError: () => {} });

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [message, setMessage] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;
  const showError = (msg: string) => {
    setMessage(msg);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Context.Provider value={{ showError }}>
      {children}
      <Animated.View style={[styles.view, { opacity }]} pointerEvents="none">
        <Text.Label style={{ color: "#E7000B" }}>{message}</Text.Label>
      </Animated.View>
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);
  if (context == null) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return context;
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FFE0E2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: "85%",
  },
});
