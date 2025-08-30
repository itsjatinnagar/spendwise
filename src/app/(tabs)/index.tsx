import TransactionCard from "@/components/transaction-card";
import Loader from "@/components/ui/loader";
import WalletCard from "@/components/wallet-card";
import { useTransactions } from "@/hooks/use-transaction";
import { useUser } from "@/hooks/use-user";
import { useWallets } from "@/hooks/use-wallet";
import { formatCurrency } from "@/utils/formatter";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: user, isLoading: isL1 } = useUser();
  const { data: wallets, isLoading: isL2 } = useWallets();
  const { data: transactions, isLoading: isL3 } = useTransactions();

  if (isL1 || isL2 || isL3) return <Loader />;

  if (
    user === null ||
    user === undefined ||
    wallets === undefined ||
    transactions === undefined
  )
    return Alert.alert("Error", "Undefined Data: Dashboard Screen");

  const firstName = user.name.split(" ")[0];
  const balance = wallets.reduce(
    (init, { currentBalance }) => init + currentBalance,
    0
  );
  const recent = transactions.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20 }}>Hello, {firstName}</Text>
      <View style={styles.section}>
        <Text style={{ fontSize: 16 }}>Available Balance</Text>
        <Text style={{ fontSize: 32, fontWeight: "700" }}>
          {formatCurrency(balance)}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>My Wallets</Text>
        <FlatList
          data={wallets}
          renderItem={({ item }) => <WalletCard wallet={item} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
      <View style={[styles.section, { flex: 1 }]}>
        <Text style={styles.title}>Recent Transactions</Text>
        <FlatList
          data={recent}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
  section: {
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: "#3F3F3F",
  },
});
