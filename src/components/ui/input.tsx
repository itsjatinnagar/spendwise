import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export default function Input(props: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        cursorColor="black"
        selectionColor="black"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#AFAFAF",
    borderRadius: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
