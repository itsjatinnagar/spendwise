import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      autoCapitalize="none"
      cursorColor="#000000"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    gap: 4,
    height: 48,
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F2F4F6",
  },
});
