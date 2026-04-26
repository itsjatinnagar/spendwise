import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  TextProps,
} from "react-native";
import Text from "./text";

function Root({ children, disabled, ...props }: PressableProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...props}
    >
      {disabled ? <ActivityIndicator color="#000000" size="small" /> : children}
    </Pressable>
  );
}

function Label({ style, ...props }: TextProps) {
  return <Text style={[styles.label, style]} {...props} />;
}

const styles = StyleSheet.create({
  pressable: {
    gap: 8,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFBA00",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: 600,
  },
});

const Button = Object.assign(Root, { Label });
export default Button;
