import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardHeight = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) =>
      setState(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () => setState(0));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return state;
};
