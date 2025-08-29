import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OOPS!</Text>
      <Text style={styles.text}>This screen doesn't exists.</Text>
      <Link href="/" style={styles.link}>
        <Text>Go Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: 600,
  },
  text: {
    fontSize: 20,
  },
  link: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    backgroundColor: "#000",
    color: "#fff",
  },
});
