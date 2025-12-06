import { useNativeTheme } from "@/utils/theme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type Props = PressableProps & {
  label: string;
};
export default function Button({ disabled, label, style, ...props }: Props) {
  const { colors } = useNativeTheme();
  style = [
    styles.pressable,
    { backgroundColor: colors.primary },
    style,
    disabled && styles.disabled,
  ];

  return (
    <Pressable style={style} {...props}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  disabled: {},
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
});
