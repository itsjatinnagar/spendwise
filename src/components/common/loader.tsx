import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#FFBA00" size="large" />
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
