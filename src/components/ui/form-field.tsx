import { StyleSheet, View, ViewProps } from "react-native";

export default function FormField({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.view, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    rowGap: 8,
    flexDirection: "column",
  },
});
