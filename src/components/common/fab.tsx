import { Link, LinkProps } from "expo-router";
import { Plus } from "@/components/icons/plus";
import { StyleSheet, View } from "react-native";

export default function FAB(props: LinkProps) {
  return (
    <Link style={styles.container} {...props}>
      <View style={styles.button}>
        <Plus />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBA00",
  },
});
