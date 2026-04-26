import TransactionCard from "@/components/cards/transaction-card";
import Text from "@/components/common/text";
import { useTransactions } from "@/hooks/use-transactions";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data } = useTransactions();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <Text.Title style={{ fontSize: 28 }}>My Transactions</Text.Title>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
  },
});
