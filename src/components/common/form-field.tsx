import { StyleSheet, View } from "react-native";

export default function FormField({ children }: React.PropsWithChildren) {
  return <View style={styles.view}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    gap: 4,
  },
});
