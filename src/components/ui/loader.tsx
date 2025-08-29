import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#000000" size={48} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
