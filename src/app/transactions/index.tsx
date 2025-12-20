import TransactionCard from "@/components/transaction-card";
import { useCategories } from "@/hooks/use-category";
import { useTransactions } from "@/hooks/use-transaction";
import { useWallets } from "@/hooks/use-wallet";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function Screen() {
  const { data: transactions, isLoading: isL1 } = useTransactions();
  const { data: categories, isLoading: isL2 } = useCategories();
  const { data: wallets, isLoading: isL3 } = useWallets();

  if (isL1 || isL2 || isL3) return;

  if (
    transactions === null ||
    transactions === undefined ||
    categories === null ||
    categories === undefined ||
    wallets === null ||
    wallets === undefined
  )
    return Alert.alert("Error", "Undefined Data: My Transactions Screen");

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TransactionCard
            categories={categories}
            transaction={item}
            wallets={wallets}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
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
