import { useNativeTheme } from "@/utils/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input({ style, ...props }: TextInputProps) {
  const { colors } = useNativeTheme();

  return (
    <TextInput
      style={[
        styles.input,
        { backgroundColor: colors.background, color: colors.text },
      ]}
      cursorColor={colors.text}
      selectionColor={colors.text}
      returnKeyType="done"
      placeholderTextColor={colors.placeholder}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
});
