import { Pressable, StyleSheet } from "react-native";
import Text from "./text";

type Props = {
  callback: () => void;
  label: string;
  selected: boolean;
};

export default function Chip({ callback, label, selected }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        selected && styles.selected,
      ]}
      onPress={callback}
    >
      <Text.Caption style={selected && { color: "#FFBA00" }}>
        {label}
      </Text.Caption>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    height: 36,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    borderColor: "#000000",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  selected: {
    borderColor: "#FFBA00",
  },
});
