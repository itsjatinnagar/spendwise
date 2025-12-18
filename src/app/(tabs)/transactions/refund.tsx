import RefundForm from "@/components/forms/refund-form";
import { useTransaction } from "@/hooks/use-transaction";
import { useWallets } from "@/hooks/use-wallet";
import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";

export default function Modal() {
  const { txnId } = useLocalSearchParams();
  const { data: wallets, isLoading: isL1 } = useWallets();
  const { data: transaction, isLoading: isL2 } = useTransaction(
    txnId as string
  );

  if (isL1 || isL2) return;

  if (
    wallets === null ||
    wallets === undefined ||
    transaction === null ||
    transaction === undefined
  )
    return Alert.alert("Error", "Undefined Data: Create Refund Screen");

  return (
    <View style={styles.container}>
      <RefundForm transaction={transaction} wallets={wallets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
