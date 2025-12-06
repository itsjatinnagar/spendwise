import TransferForm from "@/components/forms/transfer-form";
import { useWallets } from "@/hooks/use-wallet";
import { Alert, StyleSheet, View } from "react-native";

export default function Modal() {
  const { data: wallets, isLoading: isL1 } = useWallets();

  if (isL1) return;

  if (wallets === null || wallets === undefined)
    return Alert.alert("Error", "Undefined Data: Create Transfer Screen");

  return (
    <View style={styles.container}>
      <TransferForm wallets={wallets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
