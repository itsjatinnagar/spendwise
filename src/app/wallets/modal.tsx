import WalletForm from "@/components/forms/wallet-form";
import { StyleSheet, View } from "react-native";

export default function Modal() {
  return (
    <View style={styles.container}>
      <WalletForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
