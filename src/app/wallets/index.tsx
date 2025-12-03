import WalletCard from "@/components/wallet-card";
import { useWallets } from "@/hooks/use-wallet";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function Screen() {
  const { data: wallets, isLoading: isL1 } = useWallets();

  if (isL1) return;

  if (wallets === null || wallets === undefined)
    return Alert.alert("Error", "Undefined Data: Wallets Screen");

  return (
    <View style={styles.container}>
      <FlatList
        data={wallets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <WalletCard wallet={item} />}
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
