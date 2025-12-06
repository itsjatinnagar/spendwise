import TransferCard from "@/components/transfer-card";
import { useTransfers } from "@/hooks/use-transfer";
import { useWallets } from "@/hooks/use-wallet";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function Screen() {
  const { data: transfers, isLoading: isL1 } = useTransfers();
  const { data: wallets, isLoading: isL2 } = useWallets();

  if (isL1 || isL2) return;

  if (
    transfers === null ||
    transfers === undefined ||
    wallets === null ||
    wallets === undefined
  )
    return Alert.alert("Error", "Undefined Data: Transfers Screen");

  return (
    <View style={styles.container}>
      <FlatList
        data={transfers}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TransferCard transfer={item} wallets={wallets} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
